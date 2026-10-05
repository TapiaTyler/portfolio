import { setupEditorialReading } from "./editorial-reading";
import { setupChronicleGlitter } from "./chronicle-glitter";
import { setupChronicleChapterNavigation } from "./chronicle-navigation";
import { setupEngineerInteractions } from "./engineer-interactions";
import { setupDigitalMedia, setupDigitalPointerLabels } from "./digital-media";

/** Decorative responses stay outside content and preserve native links/details. */
export function setupMicrointeractions() {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const fine = matchMedia("(hover: hover) and (pointer: fine)");
  const dispose: (() => void)[] = [];
  dispose.push(
    setupEditorialReading(),
    setupChronicleGlitter(),
    setupChronicleChapterNavigation(),
    setupEngineerInteractions(),
    setupDigitalMedia(),
    setupDigitalPointerLabels(),
  );
  for (const details of document.querySelectorAll<HTMLDetailsElement>(
    ".case-study details:not(.case-study-navigation__mobile)",
  )) {
    if (typeof details.getAnimations !== "function") continue;
    const summary = details.querySelector("summary");
    let closing = false;
    let closingSerial = 0;
    let closingTimer: ReturnType<typeof setTimeout> | undefined;
    function finishClosing() {
      if (!closing) return;
      closing = false;
      closingSerial++;
      clearTimeout(closingTimer);
      details.open = false;
      delete details.dataset.disclosureClosing;
    }
    function close(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        !details.open ||
        details.closest<HTMLElement>("[data-theme]")?.dataset.theme !==
          "editorial" ||
        reduced.matches ||
        details.closest(".motion-preview--reduced") ||
        document.documentElement.dataset.routeTransition ||
        document.documentElement.dataset.themeTransition
      )
        return;
      const animations = details
        .getAnimations({ subtree: true })
        .filter((animation) =>
          /^editorial-footnote-(unfold|rule)$/.test(
            (animation as CSSAnimation).animationName ?? "",
          ),
        );
      if (
        !animations.length ||
        animations.some(
          (animation) => typeof animation.updatePlaybackRate !== "function",
        )
      )
        return;
      event.preventDefault();
      if (closing) {
        // A second activation reverses the fold in place without resetting its height.
        closing = false;
        closingSerial++;
        clearTimeout(closingTimer);
        delete details.dataset.disclosureClosing;
        animations.forEach((animation) => {
          animation.updatePlaybackRate(1);
          animation.play();
        });
        return;
      }
      closing = true;
      details.dataset.disclosureClosing = "";
      const serial = ++closingSerial;
      animations.forEach((animation) => {
        animation.updatePlaybackRate(-1.4);
        animation.play();
      });
      void Promise.allSettled(
        animations.map((animation) => animation.finished),
      ).then(() => {
        if (serial === closingSerial) finishClosing();
      });
      closingTimer = setTimeout(finishClosing, 700);
    }
    function focus(event: FocusEvent) {
      if (
        closing &&
        event.target instanceof Node &&
        !summary?.contains(event.target)
      ) {
        closing = false;
        closingSerial++;
        clearTimeout(closingTimer);
        delete details.dataset.disclosureClosing;
        details.getAnimations({ subtree: true }).forEach((animation) => {
          if (
            /^editorial-footnote-(unfold|rule)$/.test(
              (animation as CSSAnimation).animationName ?? "",
            )
          ) {
            animation.updatePlaybackRate(1);
            animation.play();
          }
        });
      }
    }
    function replay() {
      if (
        !details.open ||
        reduced.matches ||
        details.closest(".motion-preview--reduced") ||
        document.documentElement.dataset.routeTransition ||
        document.documentElement.dataset.themeTransition
      )
        return;
      // Closed details can retain finished CSS animations in a skipped subtree.
      // Replay their timeline explicitly rather than relying on selector removal.
      for (const animation of details.getAnimations({ subtree: true })) {
        if (
          !((animation as CSSAnimation).animationName ?? "").match(
            /^(editorial-footnote-(unfold|rule)|engineer-detail-open|control-enter)$/,
          )
        )
          continue;
        animation.playbackRate = 1;
        animation.currentTime = 0;
        animation.play();
      }
    }
    details.addEventListener("toggle", replay);
    summary?.addEventListener("click", close);
    details.addEventListener("focusin", focus);
    reduced.addEventListener("change", finishClosing);
    document.addEventListener("portfolio:route-transition", finishClosing);
    document.addEventListener("portfolio:theme-transition", finishClosing);
    dispose.push(() => {
      finishClosing();
      clearTimeout(closingTimer);
      details.removeEventListener("toggle", replay);
      summary?.removeEventListener("click", close);
      details.removeEventListener("focusin", focus);
      reduced.removeEventListener("change", finishClosing);
      document.removeEventListener("portfolio:route-transition", finishClosing);
      document.removeEventListener("portfolio:theme-transition", finishClosing);
    });
  }
  for (const nav of document.querySelectorAll<HTMLElement>(".site-nav")) {
    const marker = document.createElement("span");
    marker.className = "navigation-marker";
    marker.setAttribute("aria-hidden", "true");
    nav.append(marker);
    let hovered: HTMLElement | null = null;
    function update() {
      const focused = nav.contains(document.activeElement)
        ? document.activeElement?.closest<HTMLElement>("a")
        : null;
      const target =
        hovered ?? focused ?? nav.querySelector<HTMLElement>("a[aria-current]");
      marker.hidden = !target;
      if (!target) return;
      const parent = nav.getBoundingClientRect();
      const engineer =
        nav.closest<HTMLElement>("[data-theme]")?.dataset.theme === "engineer";
      const label = target.querySelector(".site-nav__label");
      const rect = (label ?? target).getBoundingClientRect();
      marker.style.left = `${rect.left - parent.left - (engineer ? 11 : 0)}px`;
      marker.style.top = `${engineer ? rect.top - parent.top + (rect.height - 5) / 2 : rect.bottom - parent.top + 2}px`;
      marker.style.width = `${engineer ? 5 : rect.width}px`;
    }
    function over(event: PointerEvent) {
      if (!fine.matches || event.pointerType !== "mouse") return;
      hovered = (event.target as Element).closest<HTMLElement>("a");
      update();
    }
    function leave() {
      hovered = null;
      update();
    }
    function focus() {
      queueMicrotask(update);
    }
    const observer = window.ResizeObserver ? new ResizeObserver(update) : null;
    observer?.observe(nav);
    nav.querySelectorAll("a").forEach((link) => observer?.observe(link));
    nav.addEventListener("pointerover", over);
    nav.addEventListener("pointerleave", leave);
    nav.addEventListener("focusin", update);
    nav.addEventListener("focusout", focus);
    const menu = nav.closest("details");
    menu?.addEventListener("toggle", update);
    update();
    dispose.push(() => {
      observer?.disconnect();
      marker.remove();
      nav.removeEventListener("pointerover", over);
      nav.removeEventListener("pointerleave", leave);
      nav.removeEventListener("focusin", update);
      nav.removeEventListener("focusout", focus);
      menu?.removeEventListener("toggle", update);
    });
  }
  for (const card of document.querySelectorAll<HTMLElement>(
    ".digital-project, .digital-block-layer, .digital-secondary-surface",
  )) {
    if (card.closest<HTMLElement>("[data-theme]")?.dataset.theme !== "digital")
      continue;
    let frame = 0;
    let lightReset: ReturnType<typeof setTimeout> | undefined;
    let point = { x: 0, y: 0 };
    const enabled = () =>
      !reduced.matches &&
      !card.closest(".motion-preview--reduced") &&
      !document.documentElement.dataset.routeTransition &&
      !document.documentElement.dataset.themeTransition;
    function clearLight() {
      clearTimeout(lightReset);
      cancelAnimationFrame(frame);
      frame = 0;
      card.style.removeProperty("--card-light-x");
      card.style.removeProperty("--card-light-y");
    }
    function resetLight() {
      clearTimeout(lightReset);
      cancelAnimationFrame(frame);
      frame = 0;
      // Retain the exit position while opacity fades, rather than flashing the fallback center.
      lightReset = setTimeout(() => {
        if (getComputedStyle(card, "::before").opacity === "0") clearLight();
      }, 220);
    }
    function stop() {
      clearLight();
      delete card.dataset.cardPressed;
    }
    function reset() {
      resetLight();
      delete card.dataset.cardPressed;
    }
    function move(event: PointerEvent) {
      if (event.pointerType !== "mouse" || !fine.matches || !enabled()) return;
      clearTimeout(lightReset);
      point = { x: event.clientX, y: event.clientY };
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = card.getBoundingClientRect();
        card.style.setProperty(
          "--card-light-x",
          `${Math.max(0, Math.min(rect.width, point.x - rect.left))}px`,
        );
        card.style.setProperty(
          "--card-light-y",
          `${Math.max(0, Math.min(rect.height, point.y - rect.top))}px`,
        );
      });
    }
    function press(event: PointerEvent | KeyboardEvent) {
      if (!card.matches(".digital-project")) return;
      if (!enabled() || !(event.target as Element).closest("a")) return;
      if (
        event instanceof KeyboardEvent
          ? event.key !== "Enter"
          : event.button !== 0
      )
        return;
      card.dataset.cardPressed = "";
    }
    function release() {
      delete card.dataset.cardPressed;
    }
    card.addEventListener("pointermove", move);
    card.addEventListener("pointerleave", reset);
    card.addEventListener("pointerdown", press);
    card.addEventListener("keydown", press);
    card.addEventListener("focusout", reset);
    card.addEventListener("focusin", resetLight);
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", reset);
    window.addEventListener("keyup", release);
    window.addEventListener("blur", reset);
    reduced.addEventListener("change", stop);
    fine.addEventListener("change", stop);
    document.addEventListener("portfolio:theme-transition", reset);
    document.addEventListener("portfolio:route-transition", reset);
    dispose.push(() => {
      stop();
      card.removeEventListener("pointermove", move);
      card.removeEventListener("pointerleave", reset);
      card.removeEventListener("pointerdown", press);
      card.removeEventListener("keydown", press);
      card.removeEventListener("focusout", reset);
      card.removeEventListener("focusin", resetLight);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", reset);
      window.removeEventListener("keyup", release);
      window.removeEventListener("blur", reset);
      reduced.removeEventListener("change", stop);
      fine.removeEventListener("change", stop);
      document.removeEventListener("portfolio:theme-transition", reset);
      document.removeEventListener("portfolio:route-transition", reset);
    });
  }
  return () => dispose.forEach((cleanup) => cleanup());
}
