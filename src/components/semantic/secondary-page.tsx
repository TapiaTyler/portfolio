import { messageLanguage, message } from "@/lib/i18n/messages";
import { UiText } from "@/components/ui-text";

import { Text } from "@/components/localized-text";
import { text, type CopyText } from "@/lib/i18n/copy";
import Link from "next/link";
import { type ComponentProps, type ComponentType, type ReactNode } from "react";
import { type Locale } from "@/lib/i18n/locales";
import { type Project } from "@/lib/content/schema";
import { ProjectIndex } from "./project-index";
import { ContactMethods, ContactDocuments } from "./contact-resources";
import { type ContactMethod, type ContactDocument } from "@/content/contact";

export interface PageSection {
  id: string;
  title: CopyText;
  paragraphs?: readonly CopyText[];
  items?: readonly { title: CopyText; description: CopyText }[];
  fields?: readonly { label: CopyText; value: CopyText }[];
  collection?: boolean;
  emptyText?: CopyText;
  contactMethods?: readonly ContactMethod[];
  documents?: readonly ContactDocument[];
}
export interface SecondaryPageContent {
  id: "work" | "about" | "lab" | "contact";
  title: CopyText;
  description: CopyText;
  lead: CopyText;
  sections: readonly PageSection[];
  related: readonly { label: CopyText; destination: string }[];
}
export interface SecondaryPageProps {
  content: SecondaryPageContent;
  locale: Locale;
  projects?: Project[];
  FeatureRenderer?: ComponentProps<typeof ProjectIndex>["FeatureRenderer"];
  projectHref?: ComponentProps<typeof ProjectIndex>["projectHref"];
  assetUrl?: ComponentProps<typeof ProjectIndex>["assetUrl"];
}
export function SecondaryPageIntro({
  content,
  tabIndex,
  locale = "en",
}: Pick<SecondaryPageProps, "content"> & {
  tabIndex?: number;
  locale?: Locale;
}) {
  return (
    <header
      className="secondary-page-intro"
      tabIndex={tabIndex}
      data-motion-id="page-intro"
      data-motion-reveal
    >
      <div className="secondary-page-intro__identity">
        <p className="eyebrow">
          <UiText locale={locale} id="Portfolio /" />{" "}
          <Text value={content.title} locale={locale} />
        </p>
        <h1>
          <Text value={content.title} locale={locale} />
        </h1>
        <p className="secondary-page-intro__description">
          <Text value={content.description} locale={locale} />
        </p>
      </div>
      <p className="secondary-page-intro__lead">
        <Text value={content.lead} locale={locale} />
      </p>
    </header>
  );
}
export function SecondaryPageSection({
  section,
  children,
  locale = "en",
}: {
  section: PageSection;
  locale?: Locale;
  children?: ReactNode;
}) {
  return (
    <section
      className={`secondary-page-section${section.collection ? " secondary-page-section--collection" : ""}`}
      aria-labelledby={`page-${section.id}-heading`}
      data-motion-id={`page-${section.id}`}
      data-motion-reveal
    >
      <h2 id={`page-${section.id}-heading`}>
        <Text value={section.title} locale={locale} />
      </h2>
      {section.paragraphs?.map((paragraph) => (
        <p key={text(paragraph, locale)}>
          <Text value={paragraph} locale={locale} />
        </p>
      ))}
      {section.fields && (
        <dl className="secondary-page-fields">
          {section.fields.map(({ label, value }) => (
            <div key={text(label, locale)}>
              <dt>
                <Text value={label} locale={locale} />
              </dt>
              <dd>
                <Text value={value} locale={locale} />
              </dd>
            </div>
          ))}
        </dl>
      )}
      {section.items && (
        <ul className="secondary-page-items">
          {section.items.map((item) => (
            <li key={text(item.title, locale)}>
              <h3>
                <Text value={item.title} locale={locale} />
              </h3>
              <p>
                <Text value={item.description} locale={locale} />
              </p>
            </li>
          ))}
        </ul>
      )}
      {section.contactMethods && (
        <ContactMethods methods={section.contactMethods} locale={locale} />
      )}
      {section.documents && (
        <ContactDocuments documents={section.documents} locale={locale} />
      )}
      {children}
    </section>
  );
}
export function SecondaryPage({
  content,
  locale,
  projects = [],
  FeatureRenderer,
  projectHref,
  assetUrl,
  IntroRenderer = SecondaryPageIntro,
  SectionRenderer = SecondaryPageSection,
  index,
}: SecondaryPageProps & {
  IntroRenderer?: ComponentType<ComponentProps<typeof SecondaryPageIntro>>;
  SectionRenderer?: ComponentType<ComponentProps<typeof SecondaryPageSection>>;
  index?: ReactNode;
}) {
  return (
    <article
      className={`secondary-page secondary-page--${content.id}`}
      lang="en"
    >
      <IntroRenderer locale={locale} content={content} />
      <div className="secondary-page-reading-layout">
        {index}
        <div
          className="secondary-page-body"
          data-motion-id="page-body"
          data-motion-group
        >
          {content.sections.map((section) => (
            <SectionRenderer locale={locale} key={section.id} section={section}>
              {section.collection &&
                (projects.length ? (
                  <ProjectIndex
                    projects={projects}
                    locale={locale}
                    level={3}
                    FeatureRenderer={FeatureRenderer}
                    projectHref={projectHref}
                    assetUrl={assetUrl}
                  />
                ) : (
                  <p className="empty-content">
                    <Text value={section.emptyText} locale={locale} />
                  </p>
                ))}
            </SectionRenderer>
          ))}
        </div>
      </div>
      <nav
        className="secondary-page-related"
        aria-label={message(locale, "Continue Exploring")}
        lang={messageLanguage(locale, "Continue Exploring")}
        data-motion-id="page-related"
      >
        <p className="eyebrow">
          <UiText locale={locale} id="Continue Exploring" />
        </p>
        {content.related.map(({ label, destination }) => (
          <Link
            className="text-link"
            key={destination}
            href={`/${locale}${destination}`}
          >
            <Text value={label} locale={locale} />
          </Link>
        ))}
      </nav>
    </article>
  );
}
