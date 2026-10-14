"use client";

import { message, messageLanguage } from "@/lib/i18n/messages";
import { type Locale } from "@/lib/i18n/locales";

/**
 * On phones each page is a stack of one-screen snaps, and a full-screen
 * hero gives no sign that more follows. This corner button is that sign and moves
 * one screen down. It scrolls by the scroller's height rather than to a named
 * section, so it is right in every layout (where the hero shares its screen, the
 * next screen is whatever follows). CSS shows it only on phones.
 */
export function ChronicleNextScreen({ locale }: { locale: Locale }) {
  return (
    <button
      type="button"
      className="chronicle-next-screen"
      aria-label={message(locale, "Next screen")}
      lang={messageLanguage(locale, "Next screen")}
      onClick={(event) => {
        let scroller = event.currentTarget.parentElement;
        while (
          scroller &&
          !/(auto|scroll)/.test(getComputedStyle(scroller).overflowY)
        )
          scroller = scroller.parentElement;
        // Phones scroll the page itself; one screen is the space between the
        // sticky header and footer (measured by chronicle-viewport.ts).
        const page = !scroller;
        const root = getComputedStyle(document.documentElement);
        const chrome =
          (parseFloat(root.getPropertyValue("--chronicle-header")) || 0) +
          (parseFloat(root.getPropertyValue("--chronicle-footer")) || 0);
        (scroller ?? document.scrollingElement)?.scrollBy({
          top: page ? innerHeight - chrome : scroller!.clientHeight,
          behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "instant"
            : "smooth",
        });
      }}
    >
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <path
          d="m6 9 6 6 6-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    </button>
  );
}
