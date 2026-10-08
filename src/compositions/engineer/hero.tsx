import { UiText } from "@/components/ui-text";
import { Text } from "@/components/localized-text";

import Link from "next/link";
import { type ComponentProps } from "react";
import { type Hero } from "@/components/semantic/hero";

export function EngineerHero({ content, locale }: ComponentProps<typeof Hero>) {
  return (
    <section
      className="engineer-profile"
      lang="en"
      data-motion-id="hero-narrative"
    >
      <p className="engineer-panel-label">
        <UiText locale={locale} id="Profile /" />{" "}
        <Text value={content.label} locale={locale} />
      </p>
      <div className="engineer-profile__body">
        <h1>
          {content.name ?? <Text value={content.title} locale={locale} />}
        </h1>
        <dl className="engineer-profile__fields">
          {content.name && (
            <div>
              <dt>
                <UiText locale={locale} id="Role" />
              </dt>
              <dd>
                <Text value={content.title} locale={locale} />{" "}
                <Text value={content.emphasis} locale={locale} />
              </dd>
            </div>
          )}
          <div>
            <dt>
              <UiText locale={locale} id="Introduction" />
            </dt>
            <dd>
              <Text value={content.description} locale={locale} />
            </dd>
          </div>
        </dl>
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
