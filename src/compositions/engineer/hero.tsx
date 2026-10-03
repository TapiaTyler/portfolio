import Link from "next/link";
import type { ComponentProps } from "react";
import type { Hero } from "@/components/semantic/hero";

export function EngineerHero({ content, locale }: ComponentProps<typeof Hero>) {
  return (
    <section
      className="engineer-profile"
      lang="en"
      data-motion-id="hero-narrative"
    >
      <p className="engineer-panel-label">Profile / {content.label}</p>
      <div className="engineer-profile__body">
        <h1>{content.name ?? content.title}</h1>
        <dl className="engineer-profile__fields">
          {content.name && (
            <div>
              <dt>Role</dt>
              <dd>
                {content.title} {content.emphasis}
              </dd>
            </div>
          )}
          <div>
            <dt>Introduction</dt>
            <dd>{content.description}</dd>
          </div>
        </dl>
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
