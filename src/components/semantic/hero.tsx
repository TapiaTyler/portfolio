import { Text } from "@/components/localized-text";
import { type CopyText } from "@/lib/i18n/copy";
import Link from "next/link";
import { type Locale } from "@/lib/i18n/locales";

export interface HeroContent {
  name?: string;
  label: CopyText;
  title: CopyText;
  emphasis?: CopyText;
  description: CopyText;
  link: { label: CopyText; destination: string };
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
      <p>
        <Text value={content.description} locale={locale} />
      </p>
      <Link
        className="text-link"
        href={`/${locale}${content.link.destination}`}
      >
        <Text value={content.link.label} locale={locale} />
      </Link>
    </section>
  );
}
