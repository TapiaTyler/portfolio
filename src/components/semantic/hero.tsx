import Link from "next/link";
import type { Locale } from "@/lib/i18n/locales";

export interface HeroContent {
  name?: string;
  label: string;
  title: string;
  emphasis?: string;
  description: string;
  link: { label: string; destination: string };
}

export function Hero({
  content,
  locale,
}: {
  content: HeroContent;
  locale: Locale;
}) {
  return (
    <section className="home-hero" lang="en" data-motion-id="hero-narrative">
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
      <p>{content.description}</p>
      <Link
        className="text-link"
        href={`/${locale}${content.link.destination}`}
      >
        {content.link.label}
      </Link>
    </section>
  );
}
