import Link from "next/link";
import type { ComponentProps } from "react";
import type { Hero } from "@/components/semantic/hero";
import { DigitalVisual } from "./visual";

export function DigitalHero({ content, locale }: ComponentProps<typeof Hero>) {
  const name = (content.name ?? content.title).split(" ");
  const surname = name.pop();
  return (
    <section className="digital-hero" lang="en">
      <div className="digital-hero__narrative" data-motion-id="hero-narrative">
        <p className="eyebrow digital-badge">{content.label}</p>
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
            {content.title} {content.emphasis}
          </p>
        )}
        <p className="digital-hero__description">{content.description}</p>
        <Link
          className="text-link digital-primary-action"
          href={`/${locale}${content.link.destination}`}
        >
          {content.link.label}
        </Link>
      </div>
      <DigitalVisual />
    </section>
  );
}
