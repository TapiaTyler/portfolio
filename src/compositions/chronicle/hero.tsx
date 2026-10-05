import Link from "next/link";
import type { ComponentProps } from "react";
import type { Hero } from "@/components/semantic/hero";
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
          Chronicle <span className="visually-hidden">— {content.label}</span>
        </p>
        <p className="chronicle-hero__name">{identity.name}</p>
        <h1>
          {content.title}
          {content.emphasis && <> {content.emphasis}</>}
        </h1>
        <p>{content.description}</p>
        <Link
          className="text-link"
          href={`/${locale}${content.link.destination}`}
        >
          {content.link.label}
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
