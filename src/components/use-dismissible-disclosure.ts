"use client";

import { useEffect, type RefObject } from "react";
import { usePathname } from "next/navigation";

/**
 * Closes a `<details>` menu when a press lands outside it, keyboard focus moves
 * outside it, the route or `resetKey` (e.g. the active theme) changes, or the menu
 * stops rendering (the viewport crossed the breakpoint that hides it). Focus that
 * leaves the document (switching windows) keeps the menu open. Escape stays with
 * the component, which also returns focus to the summary.
 */
export function useDismissibleDisclosure(
  ref: RefObject<HTMLDetailsElement | null>,
  resetKey?: unknown,
) {
  const pathname = usePathname();
  useEffect(() => {
    if (ref.current) ref.current.open = false;
  }, [pathname, resetKey, ref]);
  useEffect(() => {
    const details = ref.current;
    if (!details) return;
    const close = () => {
      details.open = false;
    };
    const outside = (target: EventTarget | null) =>
      target instanceof Node && !details.contains(target);
    const onPointerDown = (event: PointerEvent) => {
      if (details.open && outside(event.target)) close();
    };
    const onFocusIn = (event: FocusEvent) => {
      if (details.open && outside(event.target)) close();
    };
    const onResize = () => {
      if (details.open && !details.getClientRects().length) close();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("focusin", onFocusIn);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("focusin", onFocusIn);
      window.removeEventListener("resize", onResize);
    };
  }, [ref]);
}
