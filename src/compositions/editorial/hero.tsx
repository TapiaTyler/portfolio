import Link from "next/link";
import type { ComponentProps } from "react";
import type { Hero } from "@/components/semantic/hero";

export function EditorialHero({
  content,
  locale,
}: ComponentProps<typeof Hero>) {
  return (
    <section className="editorial-hero" lang="en">
      <div
        className="editorial-hero__narrative"
        data-motion-id="hero-narrative"
      >
        <p className="eyebrow">{content.label}</p>
        <h1>
          {content.title}
          {content.emphasis && (
            <>
              <br />
              <em>{content.emphasis}</em>
            </>
          )}
        </h1>
        <p className="editorial-hero__description">{content.description}</p>
        <Link
          className="text-link"
          href={`/${locale}${content.link.destination}`}
        >
          {content.link.label}
        </Link>
      </div>
      <div
        className="editorial-study"
        aria-hidden="true"
        data-motion-id="hero-visual"
      >
        <svg viewBox="0 0 800 500" fill="none" focusable="false">
          <path d="M0 360H800M540 0V500M0 90H800" />
          <circle cx="540" cy="250" r="180" />
          <ellipse cx="540" cy="250" rx="80" ry="180" />
          <path d="M360 250H720" />
          <circle className="editorial-study__point" cx="540" cy="250" r="5" />
        </svg>
        <span className="editorial-study__ampersand">&amp;</span>
        <span className="editorial-study__caption">Form &amp; structure</span>
        <span className="editorial-study__index">01 / A study in balance</span>
      </div>
    </section>
  );
}
