"use client";

import { useEffect, type RefObject } from "react";
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
