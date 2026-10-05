"use client";

import {
  useId,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { useNavigationSelector } from "./use-navigation-selector";

export function ChronicleProjectPreview({
  identity,
  chapters,
  evidence,
  action,
}: {
  identity: ReactNode;
  chapters: { id: string; label: string; content: ReactNode }[];
  evidence?: ReactNode;
  action: ReactNode;
}) {
  const [selected, setSelected] = useState(0);
  // Chapters slide in from the direction of travel along the chapter rail.
  const [direction, setDirection] = useState(1);
  const select = (next: number) => {
    setDirection(next >= selected ? 1 : -1);
    setSelected(next);
  };
  const prefix = useId();
  const navigation = useRef<HTMLElement>(null);
  useNavigationSelector(navigation, selected, chapters.length);
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
        aria-label="Project preview chapters"
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
        tabIndex={0}
        role="region"
        aria-label="Selected project summary"
      >
        <div className="chronicle-preview__identity">{identity}</div>
        {chapters.map((chapter, index) => (
          <div
            id={`${prefix}-${chapter.id}`}
            key={chapter.id}
            hidden={selected !== index}
            className="chronicle-preview__narrative"
            role="region"
            aria-label={`${chapter.label} preview`}
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
