/** Lazily decorate interacted controls; independent timelines avoid a shared blink. */
export function setupChronicleGlitter() {
  const decorated = new Set<HTMLElement>();
  const selector =
    ".chronicle-action,.chronicle-selection__controls > button,.mode-picker > summary,.locale-switcher a,.media-view-trigger,.chronicle-home-tabs__rail button,.chronicle-preview__chapters button";
  function decorate(event: Event) {
    const control = (event.target as Element)?.closest<HTMLElement>(selector);
    if (
      !control ||
      control.closest<HTMLElement>("[data-theme]")?.dataset.theme !==
        "chronicle" ||
      decorated.has(control) ||
      control.matches(":disabled")
    )
      return;
    const layer = document.createElement("span");
    layer.className = "chronicle-glitter";
    layer.setAttribute("aria-hidden", "true");
    for (let index = 0; index < 18; index++) {
      const spark = document.createElement("span");
      spark.className = "chronicle-glitter__spark";
      spark.style.left = `${3 + Math.random() * 94}%`;
      spark.style.top = `${8 + Math.random() * 84}%`;
      spark.style.setProperty("--spark-size", `${4 + Math.random() * 5}px`);
      spark.style.setProperty(
        "--spark-duration",
        `${3.5 + Math.random() * 4}s`,
      );
      spark.style.setProperty("--spark-delay", `${-Math.random() * 8}s`);
      layer.append(spark);
    }
    control.append(layer);
    control.dataset.chronicleGlitter = "";
    decorated.add(control);
  }
  document.addEventListener("pointerover", decorate);
  document.addEventListener("focusin", decorate);
  return () => {
    document.removeEventListener("pointerover", decorate);
    document.removeEventListener("focusin", decorate);
    for (const control of decorated) {
      control.querySelector(":scope > .chronicle-glitter")?.remove();
      delete control.dataset.chronicleGlitter;
    }
  };
}
