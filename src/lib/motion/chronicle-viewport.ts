/**
 * On phones Chronicle scrolls the page itself (so the browser can retract its
 * toolbar) with a sticky header and footer between which each screen must fit.
 * Their heights vary by orientation, width and font loading, so they are
 * measured into custom properties that chronicle.css subtracts from 100dvh.
 */
export function setupChronicleViewport() {
  const root = document.documentElement;
  if (root.dataset.theme !== "chronicle" || !window.ResizeObserver)
    return () => {};
  const header = document.querySelector<HTMLElement>(".site-header");
  const footer = document.querySelector<HTMLElement>(".site-footer");
  const measure = () => {
    if (header)
      root.style.setProperty("--chronicle-header", `${header.offsetHeight}px`);
    if (footer)
      root.style.setProperty("--chronicle-footer", `${footer.offsetHeight}px`);
  };
  measure();
  const observer = new ResizeObserver(measure);
  if (header) observer.observe(header);
  if (footer) observer.observe(footer);
  return () => {
    observer.disconnect();
    root.style.removeProperty("--chronicle-header");
    root.style.removeProperty("--chronicle-footer");
  };
}
