"use client";

import Link from "next/link";
import {
  useId,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { ChronicleAtmosphere } from "./atmosphere";
import { useNavigationSelector } from "./use-navigation-selector";

export function ChronicleHomeTabs({
  sections,
  label = "Portfolio overview",
  railLabel = "Portfolio sections",
}: {
  label?: string;
  railLabel?: string;
  sections: {
    id: string;
    label: string;
    content: ReactNode;
    action?: { href: string; label: string };
  }[];
}) {
  const [selected, setSelected] = useState(0);
  // Panels slide in from the direction of travel along the rail.
  const [direction, setDirection] = useState(1);
  const select = (next: number) => {
    setDirection(next >= selected ? 1 : -1);
    setSelected(next);
  };
  const prefix = useId();
  const tabs = useRef<HTMLDivElement>(null);
  useNavigationSelector(tabs, selected, sections.length);
  return (
    <section
      className="chronicle-home-tabs"
      aria-label={label}
      style={{ "--swipe-dir": direction } as CSSProperties}
    >
      <ChronicleAtmosphere />
      <noscript>
        <style>{`.chronicle-home-tabs__rail{display:none!important}.chronicle-home-tabs{display:block!important;overflow:auto!important}.chronicle-home-tabs__panel[hidden]{display:grid!important}.chronicle-home-tabs__panel{min-height:280px!important}.chronicle-home-tabs__content .text-link{display:inline-flex!important}`}</style>
      </noscript>
      <div
        className="chronicle-home-tabs__rail"
        role="tablist"
        aria-label={railLabel}
        aria-orientation="vertical"
        ref={tabs}
      >
        <span className="chronicle-home-tabs__selector" aria-hidden="true" />
        {sections.map((section, index) => (
          <button
            key={section.id}
            id={`${prefix}-tab-${section.id}`}
            type="button"
            role="tab"
            aria-selected={selected === index}
            aria-controls={`${prefix}-panel-${section.id}`}
            tabIndex={selected === index ? 0 : -1}
            onClick={() => select(index)}
            onKeyDown={(event) => {
              let next = index;
              if (event.key === "ArrowDown")
                next = (index + 1) % sections.length;
              else if (event.key === "ArrowUp")
                next = (index - 1 + sections.length) % sections.length;
              else if (event.key === "Home") next = 0;
              else if (event.key === "End") next = sections.length - 1;
              else return;
              event.preventDefault();
              select(next);
              tabs.current
                ?.querySelectorAll<HTMLButtonElement>("button")
                [next]?.focus();
            }}
          >
            <span className="chronicle-chapter-symbol" aria-hidden="true" />
            {section.label}
          </button>
        ))}
      </div>
      {sections.map((section, index) => (
        <div
          key={section.id}
          className="chronicle-home-tabs__panel"
          role="tabpanel"
          id={`${prefix}-panel-${section.id}`}
          aria-labelledby={`${prefix}-tab-${section.id}`}
          hidden={selected !== index}
        >
          {/* The scrollable content is the panel's keyboard stop. */}
          <div className="chronicle-home-tabs__content" tabIndex={0}>
            {section.content}
          </div>
          {section.action && (
            <Link
              className="chronicle-action chronicle-home-tabs__action"
              href={section.action.href}
            >
              {section.action.label}
            </Link>
          )}
        </div>
      ))}
    </section>
  );
}
