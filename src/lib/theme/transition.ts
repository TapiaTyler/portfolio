import type { ThemeId } from "./ids";

interface ActiveTransition {
  target: ThemeId;
  view: ViewTransition | null;
  release: () => void;
  timeout: ReturnType<typeof setTimeout>;
  elements: HTMLElement[];
  cleared: boolean;
  anchor?: { id: string; top: number };
  focus: HTMLElement | null;
}

// Identities belong to semantic modules. Content never needs to know the active mode.
function nameModules(active: ActiveTransition) {
  // React can reuse an old element for a different semantic module. Remove
  // imperative names before assigning the identities of the committed tree.
  for (const element of active.elements)
    element.style.removeProperty("view-transition-name");
  active.elements = [];
  const seen = new Set<string>();
  for (const element of document.querySelectorAll<HTMLElement>(
    "[data-theme-transition-scope] [data-motion-id]",
  )) {
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
      continue;
    seen.add(id);
    const name = Array.from(id, (character) =>
      character.codePointAt(0)!.toString(16),
    ).join("-");
    element.style.viewTransitionName =
      id === "site-navigation" ? "module-site-navigation" : `module-${name}`;
    active.elements.push(element);
  }
}

export function createThemeTransitionController() {
  let active: ActiveTransition | null = null;

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
    if (current.anchor) {
      const anchor = Array.from(
        document.querySelectorAll<HTMLElement>(
          "[data-theme-transition-scope] [data-motion-id]",
        ),
      ).find((element) => element.dataset.motionId === current.anchor!.id);
      if (anchor)
        scrollTo({
          top:
            scrollY + anchor.getBoundingClientRect().top - current.anchor.top,
          behavior: "instant",
        });
    }
    nameModules(current);
  }

  function clear(current: ActiveTransition) {
    if (current.cleared) return;
    current.cleared = true;
    clearTimeout(current.timeout);
    current.release();
    for (const element of current.elements)
      element.style.removeProperty("view-transition-name");
    if (active === current) {
      active = null;
      delete document.documentElement.dataset.themeTransition;
      delete document.documentElement.dataset.themeTransitionTarget;
    }
  }

  function cancel() {
    if (!active) return;
    const current = active;
    current.view?.skipTransition();
    clear(current);
  }

  return {
    cancel,
    begin(target: ThemeId, dispatch: () => void) {
      cancel();
      document.dispatchEvent(new Event("portfolio:theme-transition"));
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
        timeout: setTimeout(cancel, 1500),
        elements: [],
        cleared: false,
        focus: document.activeElement as HTMLElement | null,
      };
      active = current;
      document.documentElement.dataset.themeTransition = "pending";
      document.documentElement.dataset.themeTransitionTarget = target;
      nameModules(current);
      // Preserve a reader's place when a different composition changes page height.
      if (scrollY > 160) {
        const anchor = current.elements
          .filter(
            (element) =>
              element.closest("main") &&
              !element.closest(".case-study-navigation"),
          )
          .sort(
            (a, b) =>
              Math.abs(a.getBoundingClientRect().top - 120) -
              Math.abs(b.getBoundingClientRect().top - 120),
          )[0];
        if (anchor)
          current.anchor = {
            id: anchor.dataset.motionId!,
            top: anchor.getBoundingClientRect().top,
          };
      }
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
      if (!current || current.target !== theme) return;
      positionModules(current);
      restoreFocus(current);
      current.release();
    },
  };
}

export type ThemeTransitionController = ReturnType<
  typeof createThemeTransitionController
>;
