import { isThemeId } from "@/lib/theme/ids";
import { setupMicrointeractions } from "./microinteractions";
import { setupChronicleEntrance } from "./chronicle-entrance";

export const motionProfiles = {
  product: {
    distance: 4,
    duration: 200,
    stagger: 20,
    easing: "cubic-bezier(.2,.7,.2,1)",
  },
  chronicle: {
    distance: 12,
    duration: 520,
    stagger: 55,
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
  },
  editorial: {
    distance: 12,
    duration: 600,
    stagger: 65,
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
  },
  engineer: {
    distance: 6,
    duration: 240,
    stagger: 35,
    easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
  },
  digital: {
    distance: 22,
    duration: 700,
    stagger: 90,
    easing: "cubic-bezier(0.16, 1, 0.3, 1)",
  },
};

/** Enhance visible semantic modules without hiding content before hydration or observation. */
export function setupPageMotion(skipVisible: boolean, enteredTheme = false) {
  const cleanupMicrointeractions = setupMicrointeractions();
  if (!window.IntersectionObserver || !Element.prototype.animate)
    return cleanupMicrointeractions;
  document.documentElement.dataset.motionEnhanced = "";
  const cleanupChronicle = setupChronicleEntrance(skipVisible, enteredTheme);
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const fine = matchMedia("(hover: hover) and (pointer: fine)");
  const active = new Map<Animation, HTMLElement>();
  const entered = new WeakSet<Element>();
  const disposers: (() => void)[] = [];
  const marked = new Set<HTMLElement>();

  function animate(
    element: HTMLElement,
    frames: Keyframe[],
    options: KeyframeAnimationOptions,
  ) {
    const animation = element.animate(frames, {
      ...options,
      fill: "backwards",
    });
    active.set(animation, element);
    void animation.finished.then(
      () => {
        active.delete(animation);
        element.dataset.motionState = "settled";
      },
      () => {
        active.delete(animation);
      },
    );
  }

  function settle() {
    for (const [animation, element] of active) {
      animation.cancel();
      element.dataset.motionState = "settled";
    }
    active.clear();
  }

  const targets = Array.from(
    document.querySelectorAll<HTMLElement>(
      "main [data-motion-id], main [data-motion-reveal]",
    ),
  )
    // Animate leaf modules; moving both a section and its cards doubles travel.
    .filter(
      (element) =>
        !element.hasAttribute("data-motion-group") &&
        !element.parentElement?.closest(
          "[data-motion-id]:not([data-motion-group])",
        ),
    );
  const observer = new IntersectionObserver(
    (entries) => {
      let order = 0;
      for (const entry of entries) {
        if (!entry.isIntersecting || entered.has(entry.target)) continue;
        const element = entry.target as HTMLElement;
        const rect = element.getBoundingClientRect();
        if (!rect.width || !rect.height) continue;
        entered.add(element);
        observer.unobserve(element);
        const mode =
          element.closest<HTMLElement>("[data-theme]")?.dataset.theme;
        if (!isThemeId(mode)) continue;
        marked.add(element);
        element.dataset.motionProfile = mode;
        element.dataset.motionState = "settled";
        if (
          reduced.matches ||
          element.closest(".motion-preview--reduced") ||
          document.documentElement.dataset.themeTransition ||
          document.documentElement.dataset.routeTransition
        )
          continue;
        // Chronicle deals its strip cards itself (chronicle-entrance.ts).
        if (
          mode === "chronicle" &&
          element.closest(".chronicle-selection__track")
        )
          continue;
        const profile = motionProfiles[mode];
        const delay = Math.min(order++, 3) * profile.stagger;
        element.dataset.motionState = "entering";
        animate(
          element,
          [{ translate: `0 ${profile.distance}px` }, { translate: "0 0" }],
          { duration: profile.duration, delay, easing: profile.easing },
        );
        if (
          mode === "digital" &&
          element.classList.contains("digital-visual")
        ) {
          const orbit = element.querySelector<HTMLElement>(
            ".digital-visual__orbit",
          );
          if (orbit)
            animate(
              orbit,
              [
                { rotate: "-10deg", opacity: 0.25 },
                { rotate: "0deg", opacity: 0.5 },
              ],
              { duration: 1200, delay, easing: profile.easing },
            );
        }
      }
    },
    { rootMargin: "0px 0px -40px 0px", threshold: 0 },
  );

  for (const element of targets) {
    const rect = element.getBoundingClientRect();
    if (
      skipVisible &&
      rect.bottom > 0 &&
      rect.top < innerHeight &&
      rect.width
    ) {
      entered.add(element);
      continue;
    }
    observer.observe(element);
  }

  for (const portal of document.querySelectorAll<HTMLElement>(
    ".digital-visual--portal",
  )) {
    if (
      portal.closest<HTMLElement>("[data-theme]")?.dataset.theme !== "digital"
    )
      continue;
    let frame = 0;
    let point = { x: 0, y: 0 };
    function reset() {
      cancelAnimationFrame(frame);
      frame = 0;
      portal.style.removeProperty("--portal-x");
      portal.style.removeProperty("--portal-y");
    }
    function move(event: PointerEvent) {
      if (
        event.pointerType !== "mouse" ||
        !fine.matches ||
        reduced.matches ||
        portal.closest(".motion-preview--reduced") ||
        document.documentElement.dataset.themeTransition ||
        document.documentElement.dataset.routeTransition
      )
        return;
      point = { x: event.clientX, y: event.clientY };
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = portal.getBoundingClientRect();
        const x = Math.max(
          -1,
          Math.min(1, ((point.x - rect.left) / rect.width) * 2 - 1),
        );
        const y = Math.max(
          -1,
          Math.min(1, ((point.y - rect.top) / rect.height) * 2 - 1),
        );
        portal.style.setProperty("--portal-x", `${-y * 3}deg`);
        portal.style.setProperty("--portal-y", `${x * 3}deg`);
      });
    }
    portal.addEventListener("pointermove", move);
    portal.addEventListener("pointerleave", reset);
    reduced.addEventListener("change", reset);
    fine.addEventListener("change", reset);
    document.addEventListener("portfolio:theme-transition", reset);
    document.addEventListener("portfolio:route-transition", reset);
    disposers.push(() => {
      reset();
      portal.removeEventListener("pointermove", move);
      portal.removeEventListener("pointerleave", reset);
      reduced.removeEventListener("change", reset);
      fine.removeEventListener("change", reset);
      document.removeEventListener("portfolio:theme-transition", reset);
      document.removeEventListener("portfolio:route-transition", reset);
    });
  }
  function focus(event: FocusEvent) {
    for (const [animation, element] of active) {
      if (event.target instanceof Node && element.contains(event.target)) {
        animation.cancel();
        element.dataset.motionState = "settled";
      }
    }
  }
  function preferenceChanged() {
    if (reduced.matches) settle();
  }
  function visibilityChanged() {
    if (document.hidden) settle();
  }
  document.addEventListener("portfolio:theme-transition", settle);
  document.addEventListener("portfolio:route-transition", settle);
  document.addEventListener("focusin", focus);
  document.addEventListener("visibilitychange", visibilityChanged);
  reduced.addEventListener("change", preferenceChanged);
  return () => {
    cleanupMicrointeractions();
    cleanupChronicle();
    delete document.documentElement.dataset.motionEnhanced;
    observer.disconnect();
    settle();
    disposers.forEach((dispose) => dispose());
    for (const element of marked) {
      delete element.dataset.motionState;
      delete element.dataset.motionProfile;
    }
    document.removeEventListener("portfolio:theme-transition", settle);
    document.removeEventListener("portfolio:route-transition", settle);
    document.removeEventListener("focusin", focus);
    document.removeEventListener("visibilitychange", visibilityChanged);
    reduced.removeEventListener("change", preferenceChanged);
  };
}
