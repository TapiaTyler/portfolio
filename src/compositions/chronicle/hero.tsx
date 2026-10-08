import { Text } from "@/components/localized-text";

import Link from "next/link";
import { type ComponentProps } from "react";
import { type Hero } from "@/components/semantic/hero";
import { identity } from "@/content/identity";

export function ChronicleHero({
  content,
  locale,
}: ComponentProps<typeof Hero>) {
  return (
    <section className="chronicle-hero" lang="en">
      <div
        className="chronicle-hero__narrative"
        data-motion-id="hero-narrative"
      >
        <p className="eyebrow">
          Chronicle{" "}
          <span className="visually-hidden">
            — <Text value={content.label} locale={locale} />
          </span>
        </p>
        <p className="chronicle-hero__name">{identity.name}</p>
        <h1>
          <Text value={content.title} locale={locale} />
          {content.emphasis && (
            <>
              {" "}
              <Text value={content.emphasis} locale={locale} />
            </>
          )}
        </h1>
        <p>
          <Text value={content.description} locale={locale} />
        </p>
        <Link
          className="text-link"
          href={`/${locale}${content.link.destination}`}
        >
          <Text value={content.link.label} locale={locale} />
        </Link>
      </div>
      <div
        className="chronicle-hero__scene"
        data-motion-id="hero-visual"
        aria-hidden="true"
      />
    </section>
  );
}
