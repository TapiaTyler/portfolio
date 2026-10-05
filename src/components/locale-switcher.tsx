"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { locales, pathForLocale, type Locale } from "@/lib/i18n/locales";

// Both header instances share the handoff when a locale layout remounts.
let pendingSlide: { from: Locale; to: Locale } | undefined;
let previousLocale: Locale | undefined;

export function LocaleSwitcher({
  locale,
  routePath,
}: {
  locale: Locale;
  routePath?: string;
}) {
  const pathname = usePathname();
  const indicator = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (
      previousLocale &&
      previousLocale !== locale &&
      pendingSlide?.to !== locale
    )
      pendingSlide = { from: previousLocale, to: locale };
    previousLocale = locale;
    const pending = pendingSlide;
    if (!pending || pending.to !== locale) return;
    const frame = requestAnimationFrame(() => {
      if (pendingSlide === pending) pendingSlide = undefined;
    });
    const element = indicator.current;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const animation =
      element?.animate && !reduced.matches
        ? element.animate(
            [
              { translate: pending.from === "en" ? "0 0" : "100% 0" },
              { translate: locale === "en" ? "0 0" : "100% 0" },
            ],
            {
              duration:
                parseFloat(getComputedStyle(element).transitionDuration) *
                  1000 || 280,
              easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
            },
          )
        : undefined;
    const settle = () => {
      if (reduced.matches) animation?.finish();
    };
    reduced.addEventListener("change", settle);
    return () => {
      cancelAnimationFrame(frame);
      animation?.cancel();
      reduced.removeEventListener("change", settle);
    };
  }, [locale]);

  return (
    <nav
      aria-label="Language"
      className="locale-switcher"
      data-selected={locale}
    >
      <span
        ref={indicator}
        className="locale-switcher__indicator"
        aria-hidden="true"
      />
      {locales.map((option) => (
        <Link
          key={option}
          href={pathForLocale(routePath ?? pathname, option)}
          hrefLang={option}
          lang="en"
          aria-current={locale === option ? "page" : undefined}
          onClick={(event) => {
            if (
              event.button !== 0 ||
              event.metaKey ||
              event.ctrlKey ||
              event.shiftKey ||
              event.altKey ||
              event.defaultPrevented
            )
              return;
            if (option !== locale) pendingSlide = { from: locale, to: option };
          }}
        >
          {option === "ja" ? "JP" : "EN"}
        </Link>
      ))}
    </nav>
  );
}
