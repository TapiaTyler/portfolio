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
    </section>
  );
}
