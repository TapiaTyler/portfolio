"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { ChronicleAtmosphere } from "./atmosphere";

// Match programmatic selection to the native snap inset, preserving frame gutters.
function cardScrollPosition(track: HTMLElement, card: HTMLElement) {
  return (
    card.offsetLeft -
    track.offsetLeft -
    parseFloat(getComputedStyle(track).paddingLeft)
  );
}

// Server-rendered semantic cards/evidence cross the boundary; content never selects a theme.
export function ChronicleSelection({
  items,
  showPreview = true,
}: {
  items: { slug: string; title: string; card: ReactNode; preview: ReactNode }[];
  showPreview?: boolean;
}) {
  const [selected, setSelected] = useState(0);
  // The project preview slides in from the side the selection moved toward.
  const [direction, setDirection] = useState(1);
  const track = useRef<HTMLDivElement>(null);
  // Only a tap on a card arms it, and only a tap on the armed card opens it.
  // Swipes, dots and arrows move the selection but disarm, so a card that has
  // just slid into place never opens on a single tap.
  const armed = useRef<number | null>(null);
  useEffect(() => {
    const element = track.current;
    if (!element || !window.ResizeObserver) return;
    let width = element.clientWidth;
    const observer = new ResizeObserver(() => {
      if (element.clientWidth === width) return;
      width = element.clientWidth;
      const card = element.children[selected] as HTMLElement | undefined;
      if (card)
        element.scrollTo({
          left: cardScrollPosition(element, card),
          behavior: "instant",
        });
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [selected]);
  const choose = (index: number) => {
    armed.current = null;
    if (index < 0 || index >= items.length) return;
    setDirection(index >= selected ? 1 : -1);
    setSelected(index);
    const card = track.current?.children[index] as HTMLElement | undefined;
    if (card && track.current)
      track.current.scrollTo({
        left: cardScrollPosition(track.current, card),
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
  };
  if (!items.length) return null;
  return (
    <div
      className={`chronicle-selection${showPreview ? "" : " chronicle-selection--cards"}`}
    >
      <noscript>
        <style>{`.chronicle-selection__controls,.chronicle-selection__card-target{display:none!important}`}</style>
      </noscript>
      <div
        className="chronicle-selection__controls"
        aria-label="Project selection"
        role="group"
      >
        <button
          type="button"
          aria-label="Previous project"
          onClick={() => choose(selected - 1)}
          disabled={selected === 0}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path
              d="m14 5-7 7 7 7"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </button>
        <span role="status" aria-live="polite">
          {items[selected].title}
        </span>
        <div
          className="chronicle-selection__dots"
          role="group"
          aria-label="Choose a project"
        >
          {items.map((item, index) => (
            <button
              type="button"
              key={item.slug}
              aria-label={`Select ${item.title}`}
              aria-pressed={selected === index}
              onClick={() => choose(index)}
            >
              <span />
            </button>
          ))}
        </div>
        <button
          type="button"
          aria-label="Next project"
          onClick={() => choose(selected + 1)}
          disabled={selected === items.length - 1}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path
              d="m9 5 7 7-7 7"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </button>
      </div>
      <div
        className="chronicle-selection__track"
        ref={track}
        tabIndex={0}
        aria-label="Project cards"
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            choose(selected + (event.key === "ArrowRight" ? 1 : -1));
          }
        }}
        onScrollEnd={(event) => {
          const element = event.currentTarget;
          if (element.scrollWidth <= element.clientWidth + 2) return;
          const nearest = Array.from(element.children)
            .map((card, index) => ({
              index,
              distance: Math.abs(
                cardScrollPosition(element, card as HTMLElement) -
                  element.scrollLeft,
              ),
            }))
            .sort((a, b) => a.distance - b.distance)[0];
          if (nearest && nearest.index !== selected) {
            setDirection(nearest.index > selected ? 1 : -1);
            armed.current = null;
            setSelected(nearest.index);
          }
        }}
      >
        {items.map((item, index) => (
          <div
            className="chronicle-selection__item"
            key={item.slug}
            data-selected={selected === index}
          >
            {item.card}
            {/* The whole card is the touch target, as in a game's selection
                screen: a tap selects and arms the card, and tapping the armed
                card again opens it. On the homepage the title also stays a direct
                link above this target. */}
            <button
              type="button"
              className="chronicle-selection__card-target"
              aria-label={
                showPreview ? `Preview ${item.title}` : `Select ${item.title}`
              }
              aria-pressed={selected === index}
              aria-controls={
                showPreview ? `chronicle-preview-${item.slug}` : undefined
              }
              onClick={(event) => {
                if (armed.current !== index || selected !== index) {
                  choose(index);
                  armed.current = index;
                  return;
                }
                // Follow a real project link so the card-to-banner opening runs:
                // the card's title, or the preview's View Details where the card
                // title is not a link (Work).
                const link = showPreview
                  ? document
                      .getElementById(`chronicle-preview-${item.slug}`)
                      ?.querySelector(".chronicle-preview__action a")
                  : event.currentTarget.parentElement?.querySelector(
                      ".chronicle-project h3 a",
                    );
                if (link instanceof HTMLElement) link.click();
              }}
            />
          </div>
        ))}
      </div>
      {showPreview && (
        <section
          style={{ "--swipe-dir": direction } as CSSProperties}
          className="chronicle-preview"
          aria-label="Selected project preview"
        >
          <ChronicleAtmosphere />
          {items.map((item, index) => (
            <div
              id={`chronicle-preview-${item.slug}`}
              key={item.slug}
              hidden={selected !== index}
              className="chronicle-preview__panel"
              data-motion-id={
                selected === index ? "selected-project-preview" : undefined
              }
            >
              {item.preview}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
