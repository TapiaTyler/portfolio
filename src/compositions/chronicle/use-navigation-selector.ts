"use client";

import { useEffect, useSyncExternalStore, type RefObject } from "react";
import { measureChronicleNavigation } from "@/lib/motion/chronicle-navigation";

/** Measure the controls, including wrapped labels and horizontally scrolled rails. */
export function useNavigationSelector(
  navigation: RefObject<HTMLElement | null>,
  selected: number,
  count: number,
) {
  useEffect(() => {
    const rail = navigation.current;
    if (!rail) return;
    let active = true;
    const measure = () => {
      if (!active) return;
      const buttons = rail.querySelectorAll<HTMLButtonElement>("button");
      const current = buttons[selected];
      const first = buttons[0];
      const last = buttons[buttons.length - 1];
      if (!current || !first || !last) return;
      measureChronicleNavigation(rail, Array.from(buttons), current);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(rail);
    rail
      .querySelectorAll("button")
      .forEach((button) => observer.observe(button));
    void document.fonts.ready.then(measure);
    return () => {
      active = false;
      observer.disconnect();
    };
  }, [navigation, selected, count]);
}

// Portrait phones lay chapter and tab rails out as horizontal strips (chronicle.css).
const stripQuery = "(max-width: 900px) and (orientation: portrait)";
function subscribeStrip(change: () => void) {
  const query = matchMedia(stripQuery);
  query.addEventListener("change", change);
  return () => query.removeEventListener("change", change);
}

/** Whether rails currently render as horizontal strips. */
export function useHorizontalStrip() {
  return useSyncExternalStore(
    subscribeStrip,
    () => matchMedia(stripQuery).matches,
    () => false,
  );
}

/** Centre a chosen control within a horizontal strip. */
export function centreInStrip(strip: HTMLElement, control: HTMLElement) {
  strip.scrollTo({
    left: control.offsetLeft - (strip.clientWidth - control.offsetWidth) / 2,
    behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "instant"
      : "smooth",
  });
}
