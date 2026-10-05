/** Geometry shared by tab controls and ordinary chapter links. */
export function measureChronicleNavigation(
  rail: HTMLElement,
  controls: HTMLElement[],
  current: HTMLElement,
) {
  const origin = rail.getBoundingClientRect();
  const bounds = current.getBoundingClientRect();
  const first = controls[0]?.getBoundingClientRect();
  const last = controls.at(-1)?.getBoundingClientRect();
  if (!first || !last) return;
  rail.style.setProperty(
    "--selector-x",
    `${bounds.left - origin.left + rail.scrollLeft}px`,
  );
  rail.style.setProperty(
    "--selector-offset",
    `${bounds.top - origin.top + rail.scrollTop}px`,
  );
  rail.style.setProperty("--selector-width", `${bounds.width}px`);
  rail.style.setProperty("--selector-height", `${bounds.height}px`);
  rail.style.setProperty(
    "--rail-start",
    `${first.top - origin.top + rail.scrollTop + first.height / 2}px`,
  );
  rail.style.setProperty(
    "--rail-length",
    `${last.top + last.height / 2 - first.top - first.height / 2}px`,
  );
}

export function setupChronicleChapterNavigation() {
  const cleanups: (() => void)[] = [];
  for (const rail of document.querySelectorAll<HTMLElement>(
    ".case-study-navigation ol",
  )) {
    if (
      rail.closest<HTMLElement>("[data-theme]")?.dataset.theme !== "chronicle"
    )
      continue;
    const controls = Array.from(rail.querySelectorAll<HTMLAnchorElement>("a"));
    if (!controls.length) continue;
    const marker = document.createElement("li");
    marker.className = "chronicle-navigation__selector";
    marker.setAttribute("role", "presentation");
    marker.setAttribute("aria-hidden", "true");
    rail.append(marker);
    let disposed = false;
    const update = () => {
      if (disposed) return;
      const current =
        controls.find((link) => link.hasAttribute("aria-current")) ??
        controls[0];
      measureChronicleNavigation(rail, controls, current);
    };
    const attributes = new MutationObserver(update);
    attributes.observe(rail, {
      subtree: true,
      attributes: true,
      attributeFilter: ["aria-current"],
    });
    const size = new ResizeObserver(update);
    size.observe(rail);
    controls.forEach((link) => size.observe(link));
    update();
    void document.fonts.ready.then(update);
    cleanups.push(() => {
      disposed = true;
      attributes.disconnect();
      size.disconnect();
      marker.remove();
    });
  }
  return () => cleanups.forEach((cleanup) => cleanup());
}
