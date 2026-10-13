"use client";
import { messageLanguage, message } from "@/lib/i18n/messages";
import { type Locale } from "@/lib/i18n/locales";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  centreInStrip,
  useHorizontalStrip,
  useNavigationSelector,
} from "./use-navigation-selector";

export function ChronicleProjectPreview({
  identity,
  locale = "en",
  chapters,
  evidence,
  action,
}: {
  locale?: Locale;
  identity: ReactNode;
  chapters: { id: string; label: string; content: ReactNode }[];
  evidence?: ReactNode;
  action: ReactNode;
}) {
  const [selected, setSelected] = useState(0);
  // Chapters slide in from the direction of travel along the chapter rail.
  const [direction, setDirection] = useState(1);
  const prefix = useId();
  const navigation = useRef<HTMLElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const chosen = useRef(false);
  const horizontal = useHorizontalStrip();
  const select = (next: number) => {
    setDirection(next >= selected ? 1 : -1);
    setSelected(next);
    chosen.current = true;
    const button = navigation.current?.querySelectorAll("button")[next];
    if (horizontal && navigation.current && button)
      centreInStrip(navigation.current, button);
  };
  useNavigationSelector(navigation, selected, chapters.length);
  // In the portrait strip layout the identity fills most of the short copy
  // area, so a chosen chapter would barely show. Bring its text to the top of
  // the copy area, as a tab panel opens at its start on About.
  useEffect(() => {
    if (!chosen.current || !horizontal) return;
    chosen.current = false;
    const area = copy.current;
    const chapter = area?.querySelector<HTMLElement>(
      ".chronicle-preview__narrative:not([hidden])",
    );
    if (!area || !chapter) return;
    area.scrollTo({
      top:
        area.scrollTop +
        chapter.getBoundingClientRect().top -
        area.getBoundingClientRect().top,
      behavior: "instant",
    });
  }, [selected, horizontal]);
  // No-script overrides must outrank scoped CSS; its initial preview stays static.
  return (
    <div
      className="chronicle-preview__composition"
      style={{ "--swipe-dir": direction } as CSSProperties}
    >
      <noscript>
        <style>{`.chronicle-preview__chapters{display:none!important}.chronicle-preview__panel,.chronicle-preview__narrative{animation:none!important}.chronicle-preview__composition{grid-template-columns:minmax(0,1fr) minmax(0,1fr)!important}.chronicle-preview__copy{grid-column:1!important}.chronicle-preview__evidence,.chronicle-preview__action{grid-column:2!important}@media(max-width:900px){.chronicle-preview__composition{grid-template-columns:minmax(0,1fr)!important;grid-template-rows:minmax(225px,1fr) 210px 62px!important}.chronicle-preview__copy{grid-row:1!important}.chronicle-preview__evidence{grid-column:1!important;grid-row:2!important}.chronicle-preview__action{grid-column:1!important;grid-row:3!important}}`}</style>
      </noscript>
      <nav
        className="chronicle-preview__chapters"
        aria-label={message(locale, "Project preview chapters")}
        lang={messageLanguage(locale, "Project preview chapters")}
        ref={navigation}
      >
        <span className="chronicle-preview__selector" aria-hidden="true" />
        {chapters.map((chapter, index) => (
          <button
            key={chapter.id}
            type="button"
            aria-pressed={selected === index}
            aria-controls={`${prefix}-${chapter.id}`}
            onClick={() => select(index)}
          >
            <span className="chronicle-chapter-symbol" aria-hidden="true" />
            {chapter.label}
          </button>
        ))}
      </nav>
      {/* Only the copy column scrolls, so it is the single keyboard stop here. */}
      <div
        className="chronicle-preview__copy"
        ref={copy}
        tabIndex={0}
        role="region"
        aria-label={message(locale, "Selected project summary")}
        lang={messageLanguage(locale, "Selected project summary")}
      >
        <div className="chronicle-preview__identity">{identity}</div>
        {chapters.map((chapter, index) => (
          <div
            id={`${prefix}-${chapter.id}`}
            key={chapter.id}
            hidden={selected !== index}
            className="chronicle-preview__narrative"
            role="region"
            aria-label={message(locale, "{title} preview", {
              title: chapter.label,
            })}
            lang={messageLanguage(locale, "{title} preview")}
          >
            {chapter.content}
          </div>
        ))}
      </div>
      {evidence && (
        <div className="chronicle-preview__evidence">{evidence}</div>
      )}
      <div className="chronicle-preview__action">{action}</div>
    </div>
  );
}
