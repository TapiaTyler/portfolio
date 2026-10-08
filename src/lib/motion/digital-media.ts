import { setInterfaceText } from "@/lib/i18n/dom-copy";
export { setupDigitalMedia } from "./digital-gallery";

export function setupDigitalPointerLabels() {
  if (!document.querySelector(".digital-project")) return () => {};
  const fine = matchMedia("(hover: hover) and (pointer: fine)");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const label = document.createElement("span");
  label.className = "project-pointer-label";
  label.dataset.theme = "digital";
  setInterfaceText(label, "Open");
  label.setAttribute("aria-hidden", "true");
  label.hidden = true;
  document.body.append(label);
  let frame = 0;
  let point = { x: 0, y: 0 };
  function reset() {
    cancelAnimationFrame(frame);
    frame = 0;
    label.hidden = true;
  }
  function move(event: PointerEvent) {
    const link =
      event.target instanceof Element
        ? event.target.closest(".digital-project a")
        : null;
    if (
      !link ||
      link.closest<HTMLElement>("[data-theme]")?.dataset.theme !== "digital" ||
      event.pointerType !== "mouse" ||
      !fine.matches ||
      reduced.matches ||
      link.closest(".motion-preview--reduced") ||
      document.documentElement.dataset.routeTransition ||
      document.documentElement.dataset.themeTransition
    ) {
      reset();
      return;
    }
    point = { x: event.clientX, y: event.clientY };
    label.hidden = false;
    if (!frame)
      frame = requestAnimationFrame(() => {
        frame = 0;
        label.style.left = `${Math.max(8, Math.min(innerWidth - 70, point.x + 16))}px`;
        label.style.top = `${Math.max(8, Math.min(innerHeight - 36, point.y + 16))}px`;
      });
  }
  document.addEventListener("pointermove", move);
  document.addEventListener("pointerleave", reset);
  document.addEventListener("keydown", reset);
  document.addEventListener("focusin", reset);
  document.addEventListener("portfolio:route-transition", reset);
  document.addEventListener("portfolio:theme-transition", reset);
  window.addEventListener("blur", reset);
  fine.addEventListener("change", reset);
  reduced.addEventListener("change", reset);
  return () => {
    reset();
    label.remove();
    document.removeEventListener("pointermove", move);
    document.removeEventListener("pointerleave", reset);
    document.removeEventListener("keydown", reset);
    document.removeEventListener("focusin", reset);
    document.removeEventListener("portfolio:route-transition", reset);
    document.removeEventListener("portfolio:theme-transition", reset);
    window.removeEventListener("blur", reset);
    fine.removeEventListener("change", reset);
    reduced.removeEventListener("change", reset);
  };
}
