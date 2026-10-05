interface GalleryItem {
  figure: HTMLElement;
  image: HTMLImageElement;
  trigger: HTMLButtonElement;
  failed: boolean;
}

/** Gallery navigation uses media identity; each selected image retains its page frame. */
export function setupDigitalMedia() {
  if (
    typeof HTMLDialogElement === "undefined" ||
    !HTMLDialogElement.prototype.showModal
  )
    return () => {};
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const disposers: (() => void)[] = [];
  const items: GalleryItem[] = [];
  let active: {
    dialog: HTMLDialogElement;
    item: GalleryItem;
    animations: Animation[];
    closing: boolean;
    overflow: string;
  } | null = null;
  function shut(restoreFocus = true) {
    if (!active) return;
    const viewer = active;
    active = null;
    viewer.animations.forEach((animation) => animation.cancel());
    viewer.dialog.close();
    viewer.dialog.remove();
    document.documentElement.style.overflow = viewer.overflow;
    if (restoreFocus && viewer.item.figure.isConnected) {
      viewer.item.figure.scrollIntoView({
        block: "center",
        behavior: "instant",
      });
      if (!viewer.item.trigger.hidden)
        viewer.item.trigger.focus({ preventScroll: true });
      else {
        const previous = viewer.item.figure.getAttribute("tabindex");
        viewer.item.figure.tabIndex = -1;
        viewer.item.figure.focus({ preventScroll: true });
        if (previous === null) viewer.item.figure.removeAttribute("tabindex");
        else viewer.item.figure.setAttribute("tabindex", previous);
      }
    }
  }
  function settle() {
    shut(false);
  }
  function preference() {
    if (reduced.matches)
      active?.animations.forEach((animation) => animation.finish());
  }
  const motionAllowed = (element: Element) =>
    !reduced.matches &&
    !element.closest(".motion-preview--reduced") &&
    !!Element.prototype.animate;
  function open(origin: GalleryItem) {
    if (
      !origin.image.isConnected ||
      !origin.image.naturalWidth ||
      origin.failed
    )
      return;
    shut(false);
    const study = origin.figure.closest(".case-study");
    const identities = new Map<string, GalleryItem>();
    for (const item of items) {
      if (
        item.failed ||
        !item.image.isConnected ||
        item.figure.closest(".case-study") !== study
      )
        continue;
      const key = item.figure.dataset.mediaId ?? item.image.src;
      if (!identities.has(key) || item === origin) identities.set(key, item);
    }
    const gallery = Array.from(identities.values());
    let index = gallery.indexOf(origin);
    let selection = 0;
    const from = origin.image.getBoundingClientRect();
    const dialog = document.createElement("dialog");
    dialog.className = "media-viewer";
    dialog.dataset.theme =
      origin.figure.closest<HTMLElement>("[data-theme]")?.dataset.theme ??
      "digital";
    dialog.setAttribute("aria-label", "Project image gallery");
    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "media-viewer__close";
    closeButton.textContent = "Close Gallery";
    closeButton.autofocus = true;
    const stage = document.createElement("div");
    stage.className = "media-viewer__stage";
    const expanded = document.createElement("img");
    stage.append(expanded);
    const caption = document.createElement("p");
    caption.className = "media-viewer__caption";
    const navigation = document.createElement("div");
    navigation.className = "media-viewer__navigation";
    const previous = document.createElement("button");
    previous.type = "button";
    previous.textContent = "Previous Image";
    const next = document.createElement("button");
    next.type = "button";
    next.textContent = "Next Image";
    const counter = document.createElement("span");
    counter.setAttribute("role", "status");
    counter.setAttribute("aria-atomic", "true");
    navigation.append(previous, counter, next);
    previous.disabled = next.disabled = gallery.length < 2;
    dialog.append(closeButton, stage, caption, navigation);
    document.body.append(dialog);
    const viewer = {
      dialog,
      item: origin,
      animations: [] as Animation[],
      closing: false,
      overflow: document.documentElement.style.overflow,
    };
    active = viewer;
    function fit() {
      const image = viewer.item.image;
      const ratio =
        (image.naturalWidth || image.width) /
        Math.max(1, image.naturalHeight || image.height);
      const width = Math.min(
        Number(image.getAttribute("width")) ||
          image.naturalWidth ||
          image.width,
        image.naturalWidth || Infinity,
        1100,
        innerWidth - 80,
        Math.max(80, innerHeight - 240) * ratio,
      );
      expanded.style.width = `${Math.max(1, width)}px`;
      expanded.style.height = `${Math.max(1, width / ratio)}px`;
    }
    function render() {
      const item = gallery[index];
      viewer.item = item;
      item.image.loading = "eager";
      expanded.src = item.image.currentSrc || item.image.src;
      expanded.alt = item.image.alt;
      expanded.lang = item.image.lang;
      const label = item.figure.querySelector<HTMLElement>("figcaption");
      caption.textContent = label?.textContent ?? item.image.alt;
      caption.lang = label?.lang || item.image.lang;
      counter.textContent = `Image ${index + 1} of ${gallery.length}`;
      dialog.dataset.imageIndex = String(index);
      fit();
    }
    render();
    document.documentElement.style.overflow = "hidden";
    dialog.showModal();
    // Chronicle opens images through a crystal: a diamond grows from the centre
    // until it covers the frame (same four vertices, so it interpolates cleanly).
    const crystal = dialog.dataset.theme === "chronicle";
    const crystalClosed = "polygon(50% 40%, 60% 50%, 50% 60%, 40% 50%)";
    const crystalOpen = "polygon(50% -50%, 150% 50%, 50% 150%, -50% 50%)";
    const map = (source: DOMRect, destination: DOMRect) =>
      `translate(${source.left - destination.left}px, ${source.top - destination.top}px) scale(${source.width / Math.max(1, destination.width)}, ${source.height / Math.max(1, destination.height)})`;
    if (motionAllowed(origin.figure))
      viewer.animations.push(
        expanded.animate(
          [
            {
              transform: map(from, expanded.getBoundingClientRect()),
              ...(crystal ? { clipPath: crystalClosed } : {}),
            },
            {
              transform: "translate(0, 0) scale(1)",
              ...(crystal ? { clipPath: crystalOpen } : {}),
            },
          ],
          {
            duration: crystal ? 600 : 520,
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
            fill: "backwards",
          },
        ),
      );
    async function change(direction: number) {
      if (active !== viewer || viewer.closing) return;
      viewer.animations.forEach((animation) => animation.cancel());
      viewer.animations = [];
      const sequence = ++selection;
      for (let attempt = 0; attempt < gallery.length; attempt++) {
        index = (index + direction + gallery.length) % gallery.length;
        if (!gallery[index].failed && gallery[index].image.isConnected) break;
      }
      if (gallery[index].failed || !gallery[index].image.isConnected) {
        shut();
        return;
      }
      render();
      await Promise.race([
        expanded.decode().catch(() => {}),
        new Promise<void>((resolve) => window.setTimeout(resolve, 250)),
      ]);
      if (active !== viewer || sequence !== selection || viewer.closing) return;
      fit();
      if (motionAllowed(viewer.item.figure))
        viewer.animations.push(
          expanded.animate(
            [
              { opacity: 0.35, translate: `${direction * 12}px 0` },
              { opacity: 1, translate: "0 0" },
            ],
            { duration: 220, easing: "ease-out" },
          ),
        );
    }
    async function close() {
      if (active !== viewer || viewer.closing) return;
      viewer.closing = true;
      selection++;
      const current = expanded.getBoundingClientRect();
      viewer.animations.forEach((animation) => animation.cancel());
      viewer.animations = [];
      if (!viewer.item.figure.isConnected) {
        shut();
        return;
      }
      viewer.item.figure.scrollIntoView({
        block: "center",
        behavior: "instant",
      });
      if (!motionAllowed(viewer.item.figure)) {
        shut();
        return;
      }
      const target = viewer.item.image.getBoundingClientRect();
      const destination = expanded.getBoundingClientRect();
      const animation = expanded.animate(
        [
          {
            transform: map(current, destination),
            ...(crystal ? { clipPath: crystalOpen } : {}),
          },
          {
            transform: map(target, destination),
            opacity: 0.35,
            ...(crystal ? { clipPath: crystalClosed } : {}),
          },
        ],
        {
          duration: 360,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          fill: "forwards",
        },
      );
      viewer.animations.push(animation);
      // Cleanup must not depend on the animation: an interrupted or stalled close
      // would otherwise leave the page scroll-locked behind a modal dialog.
      const fallback = window.setTimeout(() => {
        if (active === viewer) shut();
      }, 600);
      void animation.finished.then(
        () => {
          window.clearTimeout(fallback);
          if (active === viewer) shut();
        },
        () => {},
      );
    }
    previous.addEventListener("click", () => {
      void change(-1);
    });
    next.addEventListener("click", () => {
      void change(1);
    });
    closeButton.addEventListener("click", () => {
      void close();
    });
    dialog.addEventListener("cancel", (event) => {
      event.preventDefault();
      void close();
    });
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) void close();
    });
    dialog.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        void change(event.key === "ArrowLeft" ? -1 : 1);
      }
      if (event.key !== "Tab") return;
      const controls = Array.from(
        dialog.querySelectorAll<HTMLElement>("button:not([disabled])"),
      );
      const first = controls[0];
      const last = controls.at(-1);
      if (
        (event.shiftKey && document.activeElement === first) ||
        (!event.shiftKey && document.activeElement === last)
      ) {
        event.preventDefault();
        (event.shiftKey ? last : first)?.focus();
      }
    });
    window.addEventListener("resize", fit);
    // Removed with the dialog even when navigation interrupts a decode or animation.
    const removeResize = () => window.removeEventListener("resize", fit);
    dialog.addEventListener("close", removeResize, { once: true });
    // The browser can close a modal dialog itself (a repeated Escape or the Android
    // back gesture without a cancelable "cancel"); release the scroll lock then too.
    dialog.addEventListener("close", () => {
      if (active === viewer) shut();
    });
  }
  for (const figure of document.querySelectorAll<HTMLElement>(
    ".case-study .media-frame",
  )) {
    if (
      !["digital", "chronicle"].includes(
        figure.closest<HTMLElement>("[data-theme]")?.dataset.theme ?? "",
      )
    )
      continue;
    const candidate = figure.querySelector<HTMLImageElement>("img");
    if (!candidate) continue;
    const image = candidate;
    const trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "media-view-trigger";
    trigger.textContent = "View Image";
    trigger.setAttribute("aria-label", `View Image: ${image.alt}`);
    figure.insertBefore(trigger, figure.querySelector("figcaption"));
    const item: GalleryItem = { figure, image, trigger, failed: false };
    items.push(item);
    function availability() {
      trigger.hidden =
        item.failed ||
        !image.isConnected ||
        !image.complete ||
        !image.naturalWidth;
      if (!image.isConnected && active?.item === item) shut(false);
    }
    function failed() {
      item.failed = true;
      availability();
      if (active?.item === item) shut();
    }
    const observer = new MutationObserver(availability);
    observer.observe(figure, { childList: true });
    image.addEventListener("load", availability);
    image.addEventListener("error", failed);
    availability();
    const activate = () => open(item);
    // The image itself is also a touch target; the button remains the keyboard
    // and screen-reader path. Images inside links keep their link behaviour.
    const activateImage = () => {
      if (!trigger.hidden && !image.closest("a")) open(item);
    };
    trigger.addEventListener("click", activate);
    image.addEventListener("click", activateImage);
    disposers.push(() => {
      observer.disconnect();
      trigger.remove();
      trigger.removeEventListener("click", activate);
      image.removeEventListener("click", activateImage);
      image.removeEventListener("load", availability);
      image.removeEventListener("error", failed);
    });
  }
  document.addEventListener("portfolio:route-transition", settle);
  document.addEventListener("portfolio:theme-transition", settle);
  reduced.addEventListener("change", preference);
  return () => {
    shut(false);
    disposers.forEach((dispose) => dispose());
    document.removeEventListener("portfolio:route-transition", settle);
    document.removeEventListener("portfolio:theme-transition", settle);
    reduced.removeEventListener("change", preference);
  };
}
