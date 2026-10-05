import type { ThemeId } from "./ids";

/**
 * `progress` is how far the reading line was through the anchor (0–1) when it was
 * inside it; otherwise `offset` is the anchor's distance from the reading line.
 * Both are relative to the reading line, because compositions place it differently.
 */
interface ReadingAnchor {
  id: string;
  offset: number;
  progress?: number;
}

interface ActiveTransition {
  target: ThemeId;
  view: ViewTransition | null;
  release: () => void;
  timeout: ReturnType<typeof setTimeout>;
  elements: HTMLElement[];
  cleared: boolean;
  anchor?: ReadingAnchor;
  focus: HTMLElement | null;
}

/**
 * The line a reader is looking at: just inside a contained reading panel (Chronicle)
 * or below the sticky header for ordinary document scrolling.
 */
/** A case-study body that scrolls on its own (a contained reading region). */
function containedReading() {
  const reading = document.querySelector<HTMLElement>(".case-study-body");
  return reading &&
    /(auto|scroll)/.test(getComputedStyle(reading).overflowY) &&
    reading.scrollHeight > reading.clientHeight + 2
    ? reading
    : null;
}

function readingLine() {
  const reading = containedReading();
  return reading
    ? reading.getBoundingClientRect().top +
        Math.min(100, reading.clientHeight * 0.25)
    : 120;
}

/** Visible semantic modules of the document's own presentation, one per identity. */
function visibleModules() {
  const seen = new Set<string>();
  return Array.from(
    document.querySelectorAll<HTMLElement>(
      "[data-theme-transition-scope] [data-motion-id]",
    ),
  ).filter((element) => {
    const id = element.dataset.motionId!;
    const rect = element.getBoundingClientRect();
    if (
      element.closest("[data-theme]") !== document.documentElement ||
      seen.has(id) ||
      rect.width === 0 ||
      rect.height === 0 ||
      rect.bottom < 0 ||
      rect.top > innerHeight
    )
      return false;
    seen.add(id);
    return true;
  });
}

/**
 * View-transition snapshots are drawn above the page, ignoring ancestor overflow,
 * so a module that a scroll container cuts off would spill its hidden text over
 * the banner and header while morphing. Such modules are not named; they change
 * with the page's own cross-fade, which is clipped correctly. `except` is an
 * ancestor whose nested group clips its contents during the transition; only
 * clipping between the module and that ancestor is checked.
 */
function unclipped(element: HTMLElement, except?: Element | null) {
  const rect = element.getBoundingClientRect();
  for (
    let ancestor = element.parentElement;
    ancestor && ancestor !== document.body;
    ancestor = ancestor.parentElement
  ) {
    // The nested group clips at least as tightly as anything outside it.
    if (ancestor === except) return true;
    const style = getComputedStyle(ancestor);
    if (style.overflowX === "visible" && style.overflowY === "visible")
      continue;
    const box = ancestor.getBoundingClientRect();
    if (
      rect.top < box.top - 1 ||
      rect.bottom > box.bottom + 1 ||
      rect.left < box.left - 1 ||
      rect.right > box.right + 1
    )
      return false;
  }
  return true;
}

/** Nested view-transition groups let a named parent clip its children's snapshots. */
const nestedGroups =
  typeof CSS !== "undefined" &&
  CSS.supports("view-transition-group", "contain");

/**
 * Clips the nested reading group to the panel's edges. Inserted at runtime because
 * the build's CSS parser does not yet recognise ::view-transition-group-children.
 */
function ensureNestedClip() {
  if (document.getElementById("contained-reading-clip")) return;
  const style = document.createElement("style");
  style.id = "contained-reading-clip";
  style.textContent =
    "html[data-theme-transition]::view-transition-group-children(contained-reading){overflow:clip}";
  document.head.append(style);
}

// Identities belong to semantic modules. Content never needs to know the active mode.
function nameModules(active: ActiveTransition) {
  // React can reuse an old element for a different semantic module. Remove
  // imperative names before assigning the identities of the committed tree.
  for (const element of active.elements) {
    element.style.removeProperty("view-transition-name");
    element.style.removeProperty("view-transition-group");
  }
  // Text in a contained reading region still morphs into place, but inside a
  // group named after the region, which clips it to the region's edges (see
  // theme-transition.css). Without nested groups that text cross-fades in place,
  // since unclipped snapshots would slide over the banner and header.
  const reading = containedReading();
  const nested = nestedGroups ? reading : null;
  active.elements = visibleModules().filter((element) =>
    reading?.contains(element)
      ? nested && unclipped(element, nested)
      : unclipped(element),
  );
  if (nested) {
    ensureNestedClip();
    nested.style.viewTransitionName = "contained-reading";
    nested.style.setProperty("view-transition-group", "contain");
  }
  for (const element of active.elements) {
    const id = element.dataset.motionId!;
    const name = Array.from(id, (character) =>
      character.codePointAt(0)!.toString(16),
    ).join("-");
    element.style.viewTransitionName =
      id === "site-navigation" ? "module-site-navigation" : `module-${name}`;
  }
  if (nested) active.elements.push(nested);
}

/** Record the reader's place before a different composition changes the layout. */
function captureAnchor(): ReadingAnchor | undefined {
  const reading = document.querySelector<HTMLElement>(".case-study-body");
  const main = document.querySelector("main");
  if (
    scrollY <= 160 &&
    (reading?.scrollTop ?? 0) <= 160 &&
    (main?.scrollTop ?? 0) <= 160
  )
    return undefined;
  const threshold = readingLine();
  const candidates = visibleModules().filter(
    (element) =>
      element.closest("main") && !element.closest(".case-study-navigation"),
  );
  // Prefer the innermost narrative module that contains the reading line.
  // Supporting evidence can sit beside its owner in one composition and below
  // it in another, so anchoring on it would jump the reader a whole section.
  const containing = candidates
    .filter((element) => {
      if (element.hasAttribute("data-motion-supporting")) return false;
      const { top, bottom } = element.getBoundingClientRect();
      return top <= threshold && bottom > threshold;
    })
    .sort(
      (a, b) => b.getBoundingClientRect().top - a.getBoundingClientRect().top,
    )[0];
  const anchor =
    containing ??
    candidates.sort(
      (a, b) =>
        Math.abs(a.getBoundingClientRect().top - threshold) -
        Math.abs(b.getBoundingClientRect().top - threshold),
    )[0];
  if (!anchor) return undefined;
  const { top, height } = anchor.getBoundingClientRect();
  return {
    id: anchor.dataset.motionId!,
    offset: top - threshold,
    progress: containing ? (threshold - top) / height : undefined,
  };
}

/** Put the anchor back at the reader's place in whichever composition is now live. */
function restoreAnchor(saved: ReadingAnchor) {
  const anchor = Array.from(
    document.querySelectorAll<HTMLElement>(
      "[data-theme-transition-scope] [data-motion-id]",
    ),
  ).find((element) => element.dataset.motionId === saved.id);
  if (!anchor) return;
  let panel = anchor.parentElement;
  while (panel && panel !== document.documentElement) {
    if (
      /(auto|scroll)/.test(getComputedStyle(panel).overflowY) &&
      panel.scrollHeight > panel.clientHeight + 2
    )
      break;
    panel = panel.parentElement;
  }
  // A section the reader was inside keeps the same progress at the new layout's
  // reading line; compositions can change its height and evidence placement.
  const bounds = anchor.getBoundingClientRect();
  const line = readingLine();
  const desiredTop =
    saved.progress !== undefined
      ? line - saved.progress * bounds.height
      : line + saved.offset;
  if (panel && panel !== document.documentElement)
    // Instant: reading panels use smooth scrolling, which the transition interrupts.
    panel.scrollTo({
      top: panel.scrollTop + bounds.top - desiredTop,
      behavior: "instant",
    });
  else
    scrollTo({ top: scrollY + bounds.top - desiredTop, behavior: "instant" });
}

export function createThemeTransitionController() {
  let active: ActiveTransition | null = null;
  // Reading position is restored on commit even when no animation runs (reduced
  // motion, unsupported API, or a slow response that outlasts the capture bound).
  let pending: { target: ThemeId; anchor: ReadingAnchor } | null = null;

  function restoreFocus(current: ActiveTransition) {
    if (
      !current.focus?.closest(".mode-picker") ||
      document.activeElement !== document.body
    )
      return;
    const replacement = Array.from(
      document.querySelectorAll<HTMLElement>(
        `[data-theme-option="${current.target}"]`,
      ),
    ).find((element) => element.getBoundingClientRect().width > 0);
    replacement?.focus({ preventScroll: true });
  }

  function positionModules(current: ActiveTransition) {
    if (current.anchor) restoreAnchor(current.anchor);
    nameModules(current);
  }

  function clear(current: ActiveTransition) {
    if (current.cleared) return;
    current.cleared = true;
    clearTimeout(current.timeout);
    current.release();
    for (const element of current.elements) {
      element.style.removeProperty("view-transition-name");
      element.style.removeProperty("view-transition-group");
    }
    if (active === current) {
      active = null;
      delete document.documentElement.dataset.themeTransition;
      delete document.documentElement.dataset.themeTransitionTarget;
    }
  }

  /** Stop the animation only; a still-pending commit keeps its reading position. */
  function abandonAnimation() {
    if (!active) return;
    const current = active;
    current.view?.skipTransition();
    clear(current);
  }

  /** Route changes and failed actions discard both the animation and the position. */
  function cancel() {
    pending = null;
    abandonAnimation();
  }

  return {
    cancel,
    begin(target: ThemeId, dispatch: () => void) {
      cancel();
      document.dispatchEvent(new Event("portfolio:theme-transition"));
      const anchor = captureAnchor();
      pending = anchor ? { target, anchor } : null;
      if (
        !document.startViewTransition ||
        matchMedia("(prefers-reduced-motion: reduce)").matches ||
        document.querySelector(".motion-preview--reduced")
      )
        return false;
      let release!: () => void;
      const committed = new Promise<void>((resolve) => {
        release = resolve;
      });
      const current: ActiveTransition = {
        target,
        view: null,
        release,
        timeout: setTimeout(abandonAnimation, 1500),
        elements: [],
        cleared: false,
        anchor,
        focus: document.activeElement as HTMLElement | null,
      };
      active = current;
      document.documentElement.dataset.themeTransition = "pending";
      document.documentElement.dataset.themeTransitionTarget = target;
      nameModules(current);
      let dispatched = false;
      try {
        current.view = document.startViewTransition(async () => {
          dispatched = true;
          dispatch();
          // The Server Action finishes independently; the provider releases this
          // only when the returned server composition has actually committed.
          await committed;
          if (active !== current) return;
          await document.fonts.ready;
          if (active === current) positionModules(current);
        });
        void current.view.ready.then(
          () => {
            if (active === current) {
              clearTimeout(current.timeout);
              document.documentElement.dataset.themeTransition = "animating";
              restoreFocus(current);
            }
          },
          () => clear(current),
        );
        void current.view.finished.then(
          () => clear(current),
          () => clear(current),
        );
      } catch {
        clear(current);
        if (!dispatched) dispatch();
      }
      return true;
    },
    committed(theme: ThemeId) {
      const current = active;
      if (current && current.target === theme) {
        pending = null;
        positionModules(current);
        restoreFocus(current);
        current.release();
        return;
      }
      if (pending?.target !== theme) return;
      const { anchor } = pending;
      pending = null;
      restoreAnchor(anchor);
      // Late font metrics can still move the layout; settle once more.
      void document.fonts.ready.then(() => restoreAnchor(anchor));
    },
  };
}

export type ThemeTransitionController = ReturnType<
  typeof createThemeTransitionController
>;
