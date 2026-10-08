"use client";
import { Text } from "@/components/localized-text";
import { text, textLanguage, type CopyText } from "@/lib/i18n/copy";
import { interfaceCopy, messageLanguage, message } from "@/lib/i18n/messages";

import { type Locale } from "@/lib/i18n/locales";

import { useEffect, useRef, useState } from "react";
import { type caseStudySections } from "@/lib/content/case-study-sections";
import { useDismissibleDisclosure } from "../use-dismissible-disclosure";

export function CaseStudyNavigation({
  sections,
  locale = "en",
  label = interfaceCopy("On this page"),
  directoryRoot,
  labels,
}: {
  locale?: Locale;
  sections: ReturnType<typeof caseStudySections>;
  label?: CopyText;
  directoryRoot?: string;
  labels?: Record<string, CopyText>;
}) {
  const root = useRef<HTMLElement>(null);
  const mobileMenu = useRef<HTMLDetailsElement>(null);
  useDismissibleDisclosure(mobileMenu);
  const [current, setCurrent] = useState<string | null>(null);
  useEffect(() => {
    const study = root.current?.closest(".case-study");
    if (!study) return;
    const targets = sections
      .map(({ id }) =>
        Array.from(
          study.querySelectorAll<HTMLElement>(".case-study-block"),
        ).find((element) => element.id === id),
      )
      .filter((element) => element !== undefined);
    let frame = 0;
    const update = () => {
      frame = 0;
      const panel = study.querySelector<HTMLElement>(".case-study-body");
      const contained =
        panel && /(auto|scroll)/.test(getComputedStyle(panel).overflowY);
      const threshold = contained
        ? panel.getBoundingClientRect().top + panel.clientHeight * 0.25
        : innerHeight * 0.35;
      // Short final chapters cannot always reach the normal reading threshold.
      const atEnd = contained
        ? panel.scrollTop > 0 &&
          panel.scrollTop + panel.clientHeight >= panel.scrollHeight - 2
        : scrollY > 0 &&
          scrollY + innerHeight >= document.documentElement.scrollHeight - 2;
      const last = atEnd
        ? targets.at(-1)
        : targets
            .filter(
              (element) => element.getBoundingClientRect().top <= threshold,
            )
            .at(-1);
      setCurrent(last?.id ?? null);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = window.ResizeObserver
      ? new ResizeObserver(schedule)
      : null;
    observer?.observe(study);
    const panel = study.querySelector<HTMLElement>(".case-study-body");
    if (panel) observer?.observe(panel);
    study.addEventListener("scroll", schedule, {
      passive: true,
      capture: true,
    });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      study.removeEventListener("scroll", schedule, true);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [sections]);
  const links = (mobile = false) => (
    <ol>
      {sections.map(({ id, title }, index) => (
        <li key={id}>
          <a
            href={`#${id}`}
            title={labels?.[id] ? title.value : undefined}
            // A composition's short label leads; the canonical heading keeps its meaning.
            aria-label={
              labels?.[id]
                ? `${text(labels[id], locale)}: ${title.value}`
                : undefined
            }
            aria-current={current === id ? "location" : undefined}
            onClick={
              mobile
                ? (event) => {
                    if (
                      event.defaultPrevented ||
                      event.button !== 0 ||
                      event.metaKey ||
                      event.ctrlKey ||
                      event.shiftKey ||
                      event.altKey
                    )
                      return;
                    const disclosure = event.currentTarget.closest("details");
                    if (disclosure) disclosure.open = false;
                    // Preserve the native hash and scroll; move focus out of the closed disclosure.
                    requestAnimationFrame(() =>
                      document
                        .getElementById(id)
                        ?.focus({ preventScroll: true }),
                    );
                  }
                : undefined
            }
          >
            <span className="case-study-navigation__number" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            {directoryRoot && (
              <svg
                className="case-study-navigation__file"
                aria-hidden="true"
                viewBox="0 0 16 18"
                fill="none"
              >
                <path d="M3 1h6l4 4v12H3V1Z" />
                <path d="M9 1v4h4M5 9h6M5 12h6" />
              </svg>
            )}
            <span
              lang={
                labels?.[id] ? textLanguage(labels[id], locale) : title.lang
              }
            >
              {labels?.[id] ? text(labels[id], locale) : title.value}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
  const directory = directoryRoot && (
    <p className="case-study-navigation__root">
      <svg aria-hidden="true" viewBox="0 0 20 16" fill="none">
        <path d="M1 3V1h7l2 3h9v11H1V3Z" />
        <path d="M1 4h9" />
      </svg>
      <span>{directoryRoot}/</span>
    </p>
  );
  return (
    <aside
      ref={root}
      className="case-study-navigation"
      data-motion-id="case-study-navigation"
      lang="en"
    >
      <nav
        className="case-study-navigation__desktop"
        aria-label={message(locale, "Case study sections")}
        lang={messageLanguage(locale, "Case study sections")}
      >
        <p className="eyebrow">
          <Text value={label} locale={locale} />
        </p>
        {directory}
        {links()}
      </nav>
      <details
        className="case-study-navigation__mobile"
        ref={mobileMenu}
        onKeyDown={(event) => {
          if (event.key === "Escape" && mobileMenu.current?.open) {
            mobileMenu.current.open = false;
            mobileMenu.current.querySelector("summary")?.focus();
          }
        }}
      >
        <summary>
          <Text value={label} locale={locale} />
          <span
            lang={
              sections.find(({ id }) => id === current)?.title.lang ??
              messageLanguage(locale, "{count} sections")
            }
          >
            {sections.find(({ id }) => id === current)?.title.value ??
              message(locale, "{count} sections", { count: sections.length })}
          </span>
        </summary>
        <nav
          aria-label={message(locale, "Case study sections")}
          lang={messageLanguage(locale, "Case study sections")}
        >
          {directory}
          {links(true)}
        </nav>
      </details>
    </aside>
  );
}
