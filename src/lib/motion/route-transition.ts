import type { ThemeId } from "@/lib/theme/ids";

const chapters = ["", "work", "about", "lab", "contact"];

function projectAt(url: URL) {
  if (url.pathname === "/dev/compositions")
    return url.searchParams.get("surface") === "project"
      ? url.searchParams.get("project")
      : null;
  const segments = url.pathname.split("/").filter(Boolean);
  return segments[1] === "work" && segments.length === 3
    ? decodeURIComponent(segments[2])
    : null;
}
function isPortfolioRoute(url: URL) {
  return (
    /^\/(en|ja)(\/|$)/.test(url.pathname) ||
    url.pathname === "/dev/compositions"
  );
}

export function bookNavigation(from: URL, to: URL) {
  const path = (url: URL) =>
    url.pathname === "/dev/compositions"
      ? url.searchParams.get("surface") === "project"
        ? ["work", url.searchParams.get("project") ?? "project"]
        : url.searchParams.get("surface") === "work"
          ? ["work"]
          : []
      : url.pathname.split("/").filter(Boolean).slice(1);
  const source = path(from);
  const destination = path(to);
  const depth = destination.length - source.length;
  const forward =
    depth !== 0
      ? depth > 0
      : chapters.indexOf(destination[0] ?? "") >=
        chapters.indexOf(source[0] ?? "");
  return {
    direction: forward ? "forward" : "backward",
    turns: Math.min(3, Math.max(1, Math.abs(depth))),
  };
}

interface Pending {
  href: string;
  kind: "book" | "project" | "record" | "panel";
  slug?: string;
  view?: ViewTransition;
  release: () => void;
  timer: ReturnType<typeof setTimeout>;
  named: HTMLElement[];
  history: boolean;
  decorations: HTMLElement[];
  closing: boolean;
  hash: string;
  direction: string;
  turns: number;
  headerBottom: number;
}

/** Route snapshots use the same committed server tree as ordinary Next navigation. */
export function createRouteTransitionController() {
  let active: Pending | null = null;
  let currentUrl: URL | null = null;
  let connections = 0;
  function clear(pending: Pending) {
    clearTimeout(pending.timer);
    pending.release();
    pending.decorations.forEach((element) => element.remove());
    for (const element of pending.named)
      element.style.removeProperty("view-transition-name");
    if (active !== pending) return;
    active = null;
    const root = document.documentElement;
    delete root.dataset.routeTransition;
    delete root.dataset.routeDirection;
    delete root.dataset.routeProjectDirection;
    root.style.removeProperty("--route-turns");
    root.style.removeProperty("--route-header-bottom");
    root.style.removeProperty("--route-page-perspective");
  }
  function cancel() {
    if (!active) return;
    const pending = active;
    pending.view?.skipTransition();
    clear(pending);
  }
  function name(
    pending: Pending,
    element: HTMLElement | null,
    identity: string,
  ) {
    if (!element) return;
    element.style.viewTransitionName = identity;
    pending.named.push(element);
  }
  function projectDestination(pending: Pending) {
    return Array.from(
      document.querySelectorAll<HTMLElement>(
        pending.closing ? ".digital-project" : ".digital-case-study-intro",
      ),
    ).find((element) => element.dataset.projectSlug === pending.slug);
  }
  async function prepareDestination(pending: Pending) {
    if (pending.kind === "project" && !projectDestination(pending)) {
      // Next can commit a history URL before restoring its cached page subtree.
      await new Promise<void>((resolve) => {
        const observer = new MutationObserver(() => {
          if (projectDestination(pending)) finish();
        });
        const timer = setTimeout(finish, 500);
        function finish() {
          observer.disconnect();
          clearTimeout(timer);
          resolve();
        }
        observer.observe(document.body, { childList: true, subtree: true });
      });
    }
    if (active !== pending) return;
    for (const element of pending.named)
      element.style.removeProperty("view-transition-name");
    pending.decorations.forEach((element) => element.remove());
    pending.named = [];
    if (!pending.history) scrollTo({ top: 0, behavior: "instant" });
    const destination = projectDestination(pending);
    if (pending.closing && destination) {
      const rect = destination.getBoundingClientRect();
      if (rect.bottom <= 0 || rect.top >= innerHeight)
        destination.scrollIntoView({ block: "center", behavior: "instant" });
    }
    if (pending.hash && !pending.history) {
      try {
        document
          .getElementById(decodeURIComponent(pending.hash.slice(1)))
          ?.scrollIntoView({ behavior: "instant" });
      } catch {
        /* Malformed anchors keep ordinary URL behavior. */
      }
    }
    name(
      pending,
      pending.kind === "project"
        ? (destination ?? document.querySelector("main"))
        : document.querySelector("main"),
      pending.kind === "project"
        ? "route-project"
        : pending.kind === "book"
          ? "route-destination"
          : "route-page",
    );
    if (pending.kind === "book" && pending.direction === "down") {
      // A front-facing sheet must stay in front of the camera even on long pages.
      const height =
        document.querySelector("main")?.getBoundingClientRect().height ??
        innerHeight;
      document.documentElement.style.setProperty(
        "--route-page-perspective",
        `${Math.max(1800, height * 2)}px`,
      );
    }
  }
  function begin(
    to: URL,
    theme: ThemeId,
    origin: HTMLElement | null,
    dispatch: () => void,
    history = false,
  ) {
    const from = currentUrl ?? new URL(location.href);
    cancel();
    if (from.pathname + from.search === to.pathname + to.search) return false;
    if (
      !document.startViewTransition ||
      matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.querySelector(".motion-preview--reduced")
    )
      return false;
    document.dispatchEvent(new Event("portfolio:route-transition"));
    let release!: () => void;
    const committed = new Promise<void>((resolve) => {
      release = resolve;
    });
    const targetSlug = projectAt(to);
    const intro = document.querySelector<HTMLElement>(
      ".digital-case-study-intro",
    );
    const closing =
      theme === "digital" &&
      !!intro &&
      !targetSlug &&
      (to.pathname === "/dev/compositions"
        ? ["homepage", "work"].includes(to.searchParams.get("surface") ?? "")
        : /^(\/en|\/ja)(\/work)?\/?$/.test(to.pathname));
    const sourceCard =
      theme === "digital" && targetSlug
        ? (origin?.closest<HTMLElement>(
            ".digital-project[data-project-slug]",
          ) ??
          Array.from(
            document.querySelectorAll<HTMLElement>(".digital-project"),
          ).find((element) => element.dataset.projectSlug === targetSlug) ??
          null)
        : null;
    const source = sourceCard ?? (closing ? intro : null);
    const book = bookNavigation(from, to);
    const main = document.querySelector("main");
    const headerBottom = Math.max(
      0,
      document.querySelector(".site-header")?.getBoundingClientRect().bottom ??
        0,
    );
    const headerFlip =
      theme === "editorial" &&
      !!origin?.closest(".site-header") &&
      !origin.closest(".mode-picker");
    const pending: Pending = {
      href: to.pathname + to.search,
      kind: source
        ? "project"
        : theme === "digital"
          ? "panel"
          : theme === "engineer"
            ? "record"
            : "book",
      slug: source?.dataset.projectSlug,
      release,
      named: [],
      history,
      decorations: [],
      closing,
      hash: to.hash,
      direction: headerFlip ? "down" : book.direction,
      turns: headerFlip ? 1 : book.turns,
      headerBottom,
      timer: setTimeout(cancel, 1500),
    };
    active = pending;
    const root = document.documentElement;
    root.dataset.routeTransition = pending.kind;
    if (pending.kind === "project")
      root.dataset.routeProjectDirection = closing ? "close" : "open";
    root.dataset.routeDirection = pending.direction;
    root.style.setProperty("--route-turns", String(pending.turns));
    if (pending.kind === "book") {
      root.style.setProperty(
        "--route-header-bottom",
        `${pending.headerBottom}px`,
      );
    }
    if (main && (pending.kind === "book" || pending.kind === "record")) {
      const rect = main.getBoundingClientRect();
      const count = pending.kind === "record" ? 1 : pending.turns - 1;
      for (let index = 0; index < count; index++) {
        const decoration = document.createElement("div");
        decoration.className =
          pending.kind === "record" ? "route-record-rule" : "route-paper-sheet";
        decoration.setAttribute("aria-hidden", "true");
        decoration.inert = true;
        const top = Math.max(
          pending.kind === "book" ? headerBottom : 0,
          rect.top,
        );
        Object.assign(decoration.style, {
          position: "fixed",
          left: `${rect.left}px`,
          top: `${top}px`,
          width: `${rect.width}px`,
          height:
            pending.kind === "record"
              ? "1px"
              : `${Math.max(0, Math.min(rect.height, innerHeight - top))}px`,
          pointerEvents: "none",
          zIndex: "-1",
        });
        document.body.append(decoration);
        pending.decorations.push(decoration);
        name(
          pending,
          decoration,
          pending.kind === "record"
            ? "route-record-rule"
            : `route-sheet-${index + 1}`,
        );
      }
    }
    name(
      pending,
      source ??
        (pending.kind === "panel"
          ? origin?.closest<HTMLElement>("main [data-motion-id]")
          : null) ??
        document.querySelector("main"),
      source ? "route-project" : "route-page",
    );
    let dispatched = false;
    try {
      pending.view = document.startViewTransition(async () => {
        dispatched = true;
        dispatch();
        await committed;
        if (active !== pending) return;
        await prepareDestination(pending);
        if (active !== pending) return;
        await document.fonts.ready;
        if (active === pending && pending.kind === "project") {
          // Reuse cached card media in the incoming snapshot rather than
          // capturing a lazy image's empty frame. Slow media never holds navigation.
          const intro = pending.named.find((element) =>
            element.classList.contains("digital-case-study-intro"),
          );
          const images = Array.from(intro?.querySelectorAll("img") ?? []);
          let timer: ReturnType<typeof setTimeout> | undefined;
          await Promise.race([
            Promise.all(
              images.map((image) => {
                image.loading = "eager";
                return image.decode().catch(() => {});
              }),
            ),
            new Promise<void>((resolve) => {
              timer = setTimeout(resolve, 250);
            }),
          ]);
          clearTimeout(timer);
        }
      });
      void pending.view.ready.then(
        () => {
          if (active !== pending) return;
          clearTimeout(pending.timer);
          root.dataset.routeTransition = `${pending.kind}-animating`;
          if (!history) {
            const heading = document.querySelector<HTMLElement>(
              "main h1, main .case-study h3",
            );
            if (heading) {
              const previous = heading.getAttribute("tabindex");
              heading.setAttribute("tabindex", "-1");
              heading.focus({ preventScroll: true });
              heading.addEventListener(
                "blur",
                () => {
                  if (previous === null) heading.removeAttribute("tabindex");
                  else heading.setAttribute("tabindex", previous);
                },
                { once: true },
              );
            }
          }
        },
        () => clear(pending),
      );
      void pending.view.finished.then(
        () => clear(pending),
        () => clear(pending),
      );
    } catch {
      clear(pending);
      if (!dispatched) dispatch();
    }
    return true;
  }
  return {
    cancel,
    begin,
    connect() {
      connections++;
      return () => {
        connections--;
        // Locale root layouts can replace their provider in the same commit.
        queueMicrotask(() => {
          if (
            !connections &&
            active &&
            location.pathname + location.search !== active.href
          )
            cancel();
        });
      };
    },
    get running() {
      return active !== null;
    },
    committed(href: string) {
      currentUrl = new URL(href, location.origin);
      const pending = active;
      if (!pending) return;
      if (document.querySelector(".motion-preview--reduced")) {
        cancel();
        return;
      }
      if (href !== pending.href) {
        cancel();
        return;
      }
      const root = document.documentElement;
      root.dataset.routeTransition = pending.kind;
      root.dataset.routeDirection = pending.direction;
      root.style.setProperty("--route-turns", String(pending.turns));
      if (pending.kind === "book") {
        const headerBottom = Math.max(
          pending.headerBottom,
          document.querySelector(".site-header")?.getBoundingClientRect()
            .bottom ?? 0,
        );
        root.style.setProperty("--route-header-bottom", `${headerBottom}px`);
      }
      if (pending.kind === "project")
        root.dataset.routeProjectDirection = pending.closing ? "close" : "open";
      pending.release();
    },
  };
}

let browserController:
  ReturnType<typeof createRouteTransitionController> | undefined;
export function getRouteTransitionController() {
  // Never share mutable transition state between server requests.
  if (typeof window === "undefined") return createRouteTransitionController();
  return (browserController ??= createRouteTransitionController());
}

export function bindRouteNavigation(
  controller: ReturnType<typeof createRouteTransitionController>,
  theme: ThemeId,
  push: (href: string) => void,
  cancelTheme: () => void,
) {
  function click(event: MouseEvent) {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    const link =
      event.target instanceof Element
        ? event.target.closest<HTMLAnchorElement>("a[href]")
        : null;
    if (
      !link ||
      link.hasAttribute("download") ||
      (link.target && link.target !== "_self")
    )
      return;
    const to = new URL(link.href);
    const from = new URL(location.href);
    if (
      to.origin !== from.origin ||
      to.href === from.href ||
      to.pathname + to.search === from.pathname + from.search
    )
      return;
    if (!isPortfolioRoute(from) || !isPortfolioRoute(to)) return;
    cancelTheme();
    const menu = link.closest<HTMLDetailsElement>(".mobile-navigation");
    if (menu) menu.open = false;
    if (
      controller.begin(to, theme, link, () =>
        push(to.pathname + to.search + to.hash),
      )
    ) {
      event.preventDefault();
      // Next Link handles ordinary navigation when the enhancement declines.
      event.stopPropagation();
    } else controller.cancel();
  }
  function pop() {
    const to = new URL(location.href);
    if (!isPortfolioRoute(to)) {
      controller.cancel();
      return;
    }
    cancelTheme();
    controller.begin(to, theme, null, () => {}, true);
  }
  function traverse(event: NavigateEvent) {
    if (
      event.navigationType !== "traverse" ||
      !event.destination.sameDocument ||
      event.hashChange
    )
      return;
    const to = new URL(event.destination.url);
    if (!isPortfolioRoute(to)) {
      controller.cancel();
      return;
    }
    cancelTheme();
    controller.begin(to, theme, null, () => {}, true);
  }
  function preference() {
    if (reduced.matches) controller.cancel();
  }
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  document.addEventListener("click", click, true);
  // Capture before Next can synchronously restore a cached locale tree and
  // replace its provider/listeners during the same history event.
  if (window.navigation)
    window.navigation.addEventListener("navigate", traverse);
  else window.addEventListener("popstate", pop, true);
  document.addEventListener("portfolio:theme-transition", controller.cancel);
  reduced.addEventListener("change", preference);
  return () => {
    document.removeEventListener("click", click, true);
    if (window.navigation)
      window.navigation.removeEventListener("navigate", traverse);
    else window.removeEventListener("popstate", pop, true);
    document.removeEventListener(
      "portfolio:theme-transition",
      controller.cancel,
    );
    reduced.removeEventListener("change", preference);
  };
}
