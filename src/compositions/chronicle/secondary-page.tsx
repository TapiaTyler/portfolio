import { messageLanguage, message } from "@/lib/i18n/messages";

import { Text } from "@/components/localized-text";
import { text } from "@/lib/i18n/copy";
import Link from "next/link";
import {
  SecondaryPageIntro,
  SecondaryPageSection,
  type SecondaryPageProps,
} from "@/components/semantic/secondary-page";
import { ProjectIndex } from "@/components/semantic/project-index";
import { ChronicleCollection } from "./collection";
import { ChronicleProjectFeature } from "./project-feature";
import { ChronicleHomeTabs } from "./home-tabs";

/**
 * Supporting pages are game screens: the scenic page identity, an action dock of
 * related destinations beside it, and a stage that fills the rest of the screen.
 * Several sections share the homepage's tab rail; a single section gets one framed
 * panel. The dock follows the identity in reading order, as a local menu would.
 */
export function ChronicleSecondaryPage(props: SecondaryPageProps) {
  const { content, locale } = props;
  const dock = (
    <nav
      className="secondary-page-related chronicle-screen__dock"
      aria-label={message(locale, "Continue Exploring")}
      lang={messageLanguage(locale, "Continue Exploring")}
      data-motion-id="page-related"
    >
      {content.related.map((item) => (
        <Link
          className="chronicle-action"
          key={item.destination}
          href={`/${locale}${item.destination}`}
        >
          <Text value={item.label} locale={locale} />
        </Link>
      ))}
    </nav>
  );
  const section = (
    entry: SecondaryPageProps["content"]["sections"][number],
  ) => (
    <SecondaryPageSection locale={locale} key={entry.id} section={entry}>
      {entry.collection &&
        (props.projects?.length ? (
          content.id === "work" ? (
            <ChronicleCollection
              projects={props.projects}
              locale={locale}
              projectHref={props.projectHref}
              assetUrl={props.assetUrl}
            />
          ) : (
            <ProjectIndex
              projects={props.projects}
              locale={locale}
              level={3}
              FeatureRenderer={ChronicleProjectFeature}
              projectHref={props.projectHref}
              assetUrl={props.assetUrl}
            />
          )
        ) : (
          <p className="empty-content">
            <Text value={entry.emptyText} locale={locale} />
          </p>
        ))}
    </SecondaryPageSection>
  );
  return (
    <article
      className={`secondary-page secondary-page--${content.id} chronicle-secondary-page chronicle-screen`}
      lang="en"
    >
      <SecondaryPageIntro locale={locale} content={content} tabIndex={0} />
      {dock}
      {content.id === "work" ? (
        content.sections.map(section)
      ) : (
        <div className="chronicle-screen__stage" data-motion-id="page-body">
          {content.sections.length > 1 ? (
            <ChronicleHomeTabs
              locale={locale}
              labelLang={messageLanguage(locale, "{title} sections")}
              railLabelLang={messageLanguage(locale, "{title} topics")}
              label={message(locale, "{title} sections", {
                title: text(content.title, locale),
              })}
              railLabel={message(locale, "{title} topics", {
                title: text(content.title, locale),
              })}
              sections={content.sections.map((entry) => ({
                id: entry.id,
                label: entry.title,
                content: section(entry),
              }))}
            />
          ) : (
            // The panel scrolls when its content outgrows the screen.
            <div className="chronicle-screen__panel" tabIndex={0}>
              {content.sections.map(section)}
            </div>
          )}
        </div>
      )}
    </article>
  );
}
