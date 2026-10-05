/**
 * Chronicle's load choreography. Every effect is decorative: text and controls are
 * readable from the first frame, nothing waits on an animation, and reduced motion,
 * theme switches and route transitions skip straight to the finished state.
 */

const framed = [
  ".chronicle-selection__item",
  ".chronicle-dossier .case-study-reading-layout",
  ".chronicle-screen__panel",
  ".chronicle-chapter__evidence .media-frame",
].join(",");
const scenic = [
  ".chronicle-hero",
  ".chronicle-dossier-banner",
  ".chronicle-secondary-page .secondary-page-intro",
].join(",");
const ease = "cubic-bezier(0.22, 1, 0.36, 1)";

// The scene wakes once per document; later routes and mode switches arrive awake.
let woken = false;

function isChronicle(element: Element) {
  return (
    element.closest<HTMLElement>("[data-theme]")?.dataset.theme === "chronicle"
  );
}

function transitioning() {
  const root = document.documentElement.dataset;
  return Boolean(root.themeTransition || root.routeTransition);
}

// Glass-button state art is only needed on hover/press. Fetch it once the page has
// loaded and the browser is idle, so it never competes with first paint.
let stateArtRequested = false;
function prefetchStateArt() {
  if (stateArtRequested) return;
  stateArtRequested = true;
  const fetchArt = () => {
    for (const name of ["glass-button-hover", "glass-button-active"]) {
      const image = new Image();
      image.decoding = "async";
      image.src = `/media/themes/chronicle/${name}.webp`;
    }
  };
  const whenIdle = () =>
    "requestIdleCallback" in window
      ? requestIdleCallback(fetchArt, { timeout: 3000 })
      : setTimeout(fetchArt, 1500);
  if (document.readyState === "complete") whenIdle();
  else addEventListener("load", whenIdle, { once: true });
}

function inView(element: Element) {
  const rect = element.getBoundingClientRect();
  return rect.bottom > 0 && rect.top < innerHeight && rect.width > 0;
}

/**
 * @param skipVisible what is on screen already arrived through a morph.
 * @param enteredTheme this render follows a mode switch; when Chronicle is the new
 *   mode, its on-screen frames light up and corners bloom once the morph lands.
 */
export function setupChronicleEntrance(
  skipVisible: boolean,
  enteredTheme = false,
) {
  if (document.documentElement.dataset.theme === "chronicle")
    prefetchStateArt();
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const animations = new Set<Animation>();
  const cleanups: (() => void)[] = [];

  function play(
    element: Element,
    frames: Keyframe[],
    options: KeyframeAnimationOptions,
  ) {
    const animation = element.animate(frames, {
      fill: "backwards",
      ...options,
    });
    animations.add(animation);
    const done = () => animations.delete(animation);
    void animation.finished.then(done, done);
    return animation;
  }

  // 1. The haze over the scenery clears on the document's first load.
  if (!woken && !skipVisible && !reduced.matches && !transitioning()) {
    const bands = Array.from(
      document.querySelectorAll<HTMLElement>(scenic),
    ).filter(isChronicle);
    const haze = bands.map((band) =>
      play(band, [{ opacity: 0.92 }, { opacity: 0 }], {
        pseudoElement: "::after",
        duration: 1100,
        easing: "ease-out",
      }),
    );
    if (haze.length)
      void Promise.all(haze.map((animation) => animation.finished)).then(
        () => (woken = true),
        () => undefined,
      );
    else woken = true;
  } else woken = true;

  function bloomCorner(element: Element, delay: number) {
    play(
      element,
      [
        { opacity: 0, scale: "0.82" },
        { opacity: 1, scale: "1" },
      ],
      { duration: 900, delay: delay + 120, easing: ease },
    );
  }
  function lightFrame(element: Element, delay: number) {
    // Only image frames settle with a scale. Scaling a text panel makes a long
    // reading region visibly wobble into place after a mode switch, and cards in
    // a snapping strip must keep their geometry (snap uses the transformed box).
    if (element.matches(".media-frame"))
      play(element, [{ scale: "0.985" }, { scale: "1" }], {
        duration: 600,
        delay,
        easing: ease,
      });
    play(
      element,
      [
        { opacity: 0, filter: "brightness(1.6)" },
        { opacity: 1, filter: "brightness(1)" },
      ],
      { pseudoElement: "::after", duration: 700, delay, easing: ease },
    );
  }

  // 2. Frames light up and corner art blooms as they enter view.
  const entered = new WeakSet<Element>();
  const observer = new IntersectionObserver(
    (entries) => {
      let order = 0;
      let dealt = 0;
      for (const entry of entries) {
        if (!entry.isIntersecting || entered.has(entry.target)) continue;
        entered.add(entry.target);
        observer.unobserve(entry.target);
        if (reduced.matches || transitioning()) continue;
        const delay = Math.min(order++, 3) * 70;
        const element = entry.target as HTMLElement;
        // Cards are dealt in from the right, one after another. Only the card's
        // contents move; the snapping strip item keeps its geometry.
        if (element.matches(".chronicle-selection__track .chronicle-project")) {
          play(element, [{ translate: "36px 0" }, { translate: "0 0" }], {
            duration: 560,
            delay: Math.min(dealt++, 3) * 90,
            easing: ease,
          });
          continue;
        }
        if (element.classList.contains("chronicle-atmosphere__corner"))
          bloomCorner(element, delay);
        else lightFrame(element, delay);
      }
    },
    { rootMargin: "0px 0px -30px 0px" },
  );
  for (const element of document.querySelectorAll<HTMLElement>(
    `${framed},.chronicle-atmosphere__corner,.chronicle-selection__track .chronicle-project`,
  )) {
    if (!isChronicle(element)) continue;
    // On a mode switch, what is already on screen stays put (the morph handles it).
    if (skipVisible && inView(element)) continue;
    observer.observe(element);
  }
  cleanups.push(() => observer.disconnect());

  // 2b. Switching into Chronicle: after the morph has landed, the frames on screen
  // light up and the corner art blooms, as if the scene is powering on. The haze
  // does not replay; the scenery arrived with the morph.
  if (
    enteredTheme &&
    document.documentElement.dataset.theme === "chronicle" &&
    !reduced.matches
  ) {
    const root = document.documentElement;
    let frame = 0;
    const powerOn = () => {
      frame = requestAnimationFrame(() => {
        if (reduced.matches || transitioning()) return;
        let order = 0;
        for (const element of document.querySelectorAll(
          `${framed},.chronicle-atmosphere__corner`,
        )) {
          if (!isChronicle(element) || !inView(element)) continue;
          const delay = Math.min(order++, 4) * 70;
          if (element.classList.contains("chronicle-atmosphere__corner"))
            bloomCorner(element, delay);
          else lightFrame(element, delay);
        }
      });
    };
    if (root.dataset.themeTransition) {
      const watcher = new MutationObserver(() => {
        if (root.dataset.themeTransition) return;
        watcher.disconnect();
        powerOn();
      });
      watcher.observe(root, { attributeFilter: ["data-theme-transition"] });
      cleanups.push(() => watcher.disconnect());
    } else powerOn();
    cleanups.push(() => cancelAnimationFrame(frame));
  }

  // 3. Screenshots still loading show a gold shimmer, then fade in once decoded.
  for (const image of document.querySelectorAll<HTMLImageElement>(
    ".media-frame img",
  )) {
    if (!isChronicle(image) || (image.complete && image.naturalWidth)) continue;
    const frame = image.closest<HTMLElement>(".media-frame")!;
    frame.dataset.chronicleLoading = "";
    const settle = (loaded: boolean) => {
      if (!("chronicleLoading" in frame.dataset)) return;
      delete frame.dataset.chronicleLoading;
      if (loaded && !reduced.matches)
        play(image, [{ opacity: 0 }, { opacity: 1 }], {
          duration: 420,
          easing: "ease-out",
        });
    };
    const onLoad = () => settle(true);
    const onError = () => settle(false);
    image.addEventListener("load", onLoad, { once: true });
    image.addEventListener("error", onError, { once: true });
    cleanups.push(() => {
      image.removeEventListener("load", onLoad);
      image.removeEventListener("error", onError);
      delete frame.dataset.chronicleLoading;
    });
  }

  // 4. Pressing a glass button sends a gleam across the glass, by pointer or key.
  function gleam(target: EventTarget | null) {
    if (reduced.matches || !(target instanceof Element)) return;
    const button = target.closest(".chronicle-action, .media-view-trigger");
    if (!button || !isChronicle(button)) return;
    button.animate(
      [
        { opacity: 1, backgroundPosition: "100% 0" },
        { opacity: 1, backgroundPosition: "0% 0", offset: 0.85 },
        { opacity: 0, backgroundPosition: "0% 0" },
      ],
      { pseudoElement: "::after", duration: 520, easing: "ease-out" },
    );
  }
  const onPress = (event: PointerEvent) => {
    if (event.button === 0) gleam(event.target);
  };
  const onKeyPress = (event: KeyboardEvent) => {
    if (!event.repeat && (event.key === "Enter" || event.key === " "))
      gleam(event.target);
  };
  document.addEventListener("pointerdown", onPress);
  document.addEventListener("keydown", onKeyPress);
  cleanups.push(() => {
    document.removeEventListener("pointerdown", onPress);
    document.removeEventListener("keydown", onKeyPress);
  });

  function settleAll() {
    for (const animation of animations) animation.finish();
    animations.clear();
  }
  function preferenceChanged() {
    if (reduced.matches) settleAll();
  }
  // Keyboard focus never lands on something still moving.
  function focusSettles(event: FocusEvent) {
    for (const animation of animations) {
      const target = (animation.effect as KeyframeEffect | null)?.target;
      if (
        target &&
        event.target instanceof Node &&
        target.contains(event.target)
      )
        animation.finish();
    }
  }
  document.addEventListener("portfolio:theme-transition", settleAll);
  document.addEventListener("portfolio:route-transition", settleAll);
  reduced.addEventListener("change", preferenceChanged);
  document.addEventListener("focusin", focusSettles);
  return () => {
    document.removeEventListener("focusin", focusSettles);
    cleanups.forEach((cleanup) => cleanup());
    for (const animation of animations) animation.cancel();
    animations.clear();
    document.removeEventListener("portfolio:theme-transition", settleAll);
    document.removeEventListener("portfolio:route-transition", settleAll);
    reduced.removeEventListener("change", preferenceChanged);
  };
}
