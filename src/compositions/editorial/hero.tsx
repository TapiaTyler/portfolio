import { Text } from "@/components/localized-text";

import Link from "next/link";
import { type ComponentProps } from "react";
import { type Hero } from "@/components/semantic/hero";

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
        <p className="eyebrow">
          <Text value={content.label} locale={locale} />
        </p>
        <h1>
          <Text value={content.title} locale={locale} />
          {content.emphasis && (
            <>
              <br />
              <em>
                <Text value={content.emphasis} locale={locale} />
              </em>
            </>
          )}
        </h1>
        <p className="editorial-hero__description">
          <Text value={content.description} locale={locale} />
        </p>
        <Link
          className="text-link"
          href={`/${locale}${content.link.destination}`}
        >
          <Text value={content.link.label} locale={locale} />
        </Link>
      </div>
    </section>
  );
}
