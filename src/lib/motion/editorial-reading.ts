export function setupEditorialReading() {
  const disposers: (() => void)[] = [];
  for (const study of document.querySelectorAll<HTMLElement>(".case-study")) {
    if (
      study.closest<HTMLElement>("[data-theme]")?.dataset.theme !== "editorial"
    )
      continue;
    const progress = document.createElement("aside");
    progress.className = "reading-progress";
    progress.setAttribute("aria-hidden", "true");
    const label = document.createElement("span");
    const track = document.createElement("span");
    track.className = "reading-progress__track";
    const fill = document.createElement("span");
    fill.className = "reading-progress__fill";
    track.append(fill);
    progress.append(label, track);
    study.append(progress);
    let frame = 0;
    function update() {
      frame = 0;
      const rect = study.getBoundingClientRect();
      progress.hidden =
        rect.height < innerHeight * 1.25 ||
        rect.top >= innerHeight ||
        rect.bottom <= 0;
      const amount = Math.max(
        0,
        Math.min(1, -rect.top / Math.max(1, rect.height - innerHeight)),
      );
      progress.dataset.readingProgress = String(Math.round(amount * 100));
      fill.style.width = `${amount * 100}%`;
      const blocks = Array.from(
        study.querySelectorAll<HTMLElement>(".case-study-block"),
      );
      const current = blocks
        .filter(
          (block) => block.getBoundingClientRect().top <= innerHeight * 0.35,
        )
        .at(-1);
      label.textContent =
        current?.querySelector("h2, h3, h4, h5, h6")?.textContent ??
        current?.getAttribute("aria-label") ??
        study.querySelector("h1, h2, h3")?.textContent ??
        "";
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    const observer = window.ResizeObserver
      ? new ResizeObserver(schedule)
      : null;
    observer?.observe(study);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
    disposers.push(() => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      progress.remove();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    });
  }
  return () => disposers.forEach((dispose) => dispose());
}
