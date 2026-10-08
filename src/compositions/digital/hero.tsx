import { Text } from "@/components/localized-text";
import { text } from "@/lib/i18n/copy";
import Link from "next/link";
import { type ComponentProps } from "react";
import { type Hero } from "@/components/semantic/hero";
import { DigitalVisual } from "./visual";

export function DigitalHero({ content, locale }: ComponentProps<typeof Hero>) {
  const name = (content.name ?? text(content.title, locale)).split(" ");
  const surname = name.pop();
  return (
    <section className="digital-hero" lang="en">
      <div className="digital-hero__narrative" data-motion-id="hero-narrative">
        <p className="eyebrow digital-badge">
          <Text value={content.label} locale={locale} />
        </p>
        <div className="digital-hero__identity">
          <span className="digital-watermark" aria-hidden="true">
            Digital
          </span>
          <h1>
            {name.join(" ")}
            <span>{surname}</span>
          </h1>
        </div>
        {content.name && (
          <p className="digital-hero__role">
            <Text value={content.title} locale={locale} />{" "}
            <Text value={content.emphasis} locale={locale} />
          </p>
        )}
        <p className="digital-hero__description">
          <Text value={content.description} locale={locale} />
        </p>
        <Link
          className="text-link digital-primary-action"
          href={`/${locale}${content.link.destination}`}
        >
          <Text value={content.link.label} locale={locale} />
        </Link>
      </div>
      <DigitalVisual />
    </section>
  );
}
