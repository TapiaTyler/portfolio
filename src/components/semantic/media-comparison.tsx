"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { flushSync } from "react-dom";
import { message, messageLanguage } from "@/lib/i18n/messages";
import type { Locale } from "@/lib/i18n/locales";

/** Alternative views share one stage; without JavaScript they remain scrollable evidence. */
export function MediaComparison({
  items,
  locale,
}: {
  items: { id: string; label: string; lang: string; content: ReactNode }[];
  locale: Locale;
}) {
  const [selected, setSelected] = useState(0);
  const [enhanced, setEnhanced] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = root.current;
    const reveal = (event: Event) => {
      const id = (event as CustomEvent<string>).detail;
      const index = items.findIndex((item) => item.id === id);
      // The image viewer measures its closing destination immediately after this
      // event. Commit selection first so the destination is visible and focusable.
      if (index >= 0) flushSync(() => setSelected(index));
    };
    element?.addEventListener("media-comparison-reveal", reveal);
    return () =>
      element?.removeEventListener("media-comparison-reveal", reveal);
  }, [items]);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setEnhanced(true));
    return () => cancelAnimationFrame(frame);
  }, []);
  const choose = (index: number) =>
    setSelected((index + items.length) % items.length);
  return (
    <div
      ref={root}
      className="media-comparison"
      data-enhanced={enhanced || undefined}
    >
      <div
        className="media-comparison__controls"
        role="group"
        aria-label={message(locale, "Compare presentations")}
        lang={messageLanguage(locale, "Compare presentations")}
        onKeyDown={(event) => {
          if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
          event.preventDefault();
          choose(selected + (event.key === "ArrowRight" ? 1 : -1));
        }}
      >
        <div className="media-comparison__choices">
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              lang={item.lang}
              aria-pressed={index === selected}
              onClick={() => choose(index)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="media-comparison__steps">
          <button
            type="button"
            aria-label={message(locale, "Previous view")}
            onClick={() => choose(selected - 1)}
          >
            ‹
          </button>
          <span role="status" aria-live="polite" aria-atomic="true">
            {message(locale, "View {current} of {total}", {
              current: selected + 1,
              total: items.length,
            })}
          </span>
          <button
            type="button"
            aria-label={message(locale, "Next view")}
            onClick={() => choose(selected + 1)}
          >
            ›
          </button>
        </div>
      </div>
      <div
        className="media-comparison__stage"
        tabIndex={enhanced ? undefined : 0}
        role="group"
        aria-label={message(locale, "Project gallery")}
        lang={messageLanguage(locale, "Project gallery")}
      >
        {items.map((item, index) => (
          <div
            key={item.id}
            className="media-comparison__view"
            hidden={enhanced && index !== selected}
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
}
