import Link from "next/link";
import type { ComponentProps, ComponentType, ReactNode } from "react";
import type { Locale } from "@/lib/i18n/locales";
import type { Project } from "@/lib/content/schema";
import { ProjectIndex } from "./project-index";

export interface PageSection {
  id: string;
  title: string;
  paragraphs?: readonly string[];
  items?: readonly { title: string; description: string }[];
  fields?: readonly { label: string; value: string }[];
  collection?: boolean;
  emptyText?: string;
}
export interface SecondaryPageContent {
  id: "work" | "about" | "lab" | "contact";
  title: string;
  description: string;
  lead: string;
  sections: readonly PageSection[];
  related: readonly { label: string; destination: string }[];
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
}: Pick<SecondaryPageProps, "content"> & { tabIndex?: number }) {
  return (
    <header
      className="secondary-page-intro"
      tabIndex={tabIndex}
      data-motion-id="page-intro"
      data-motion-reveal
    >
      <div className="secondary-page-intro__identity">
        <p className="eyebrow">Portfolio / {content.title}</p>
        <h1>{content.title}</h1>
        <p className="secondary-page-intro__description">
          {content.description}
        </p>
      </div>
      <p className="secondary-page-intro__lead">{content.lead}</p>
    </header>
  );
}
export function SecondaryPageSection({
  section,
  children,
}: {
  section: PageSection;
  children?: ReactNode;
}) {
  return (
    <section
      className={`secondary-page-section${section.collection ? " secondary-page-section--collection" : ""}`}
      aria-labelledby={`page-${section.id}-heading`}
      data-motion-id={`page-${section.id}`}
      data-motion-reveal
    >
      <h2 id={`page-${section.id}-heading`}>{section.title}</h2>
      {section.paragraphs?.map((text) => (
        <p key={text}>{text}</p>
      ))}
      {section.fields && (
        <dl className="secondary-page-fields">
          {section.fields.map(({ label, value }) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      )}
      {section.items && (
        <ul className="secondary-page-items">
          {section.items.map((item) => (
            <li key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
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
      <IntroRenderer content={content} />
      <div className="secondary-page-reading-layout">
        {index}
        <div
          className="secondary-page-body"
          data-motion-id="page-body"
          data-motion-group
        >
          {content.sections.map((section) => (
            <SectionRenderer key={section.id} section={section}>
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
                  <p className="empty-content">{section.emptyText}</p>
                ))}
            </SectionRenderer>
          ))}
        </div>
      </div>
      <nav
        className="secondary-page-related"
        aria-label="Continue Exploring"
        data-motion-id="page-related"
      >
        <p className="eyebrow">Continue Exploring</p>
        {content.related.map(({ label, destination }) => (
          <Link
            className="text-link"
            key={destination}
            href={`/${locale}${destination}`}
          >
            {label}
          </Link>
        ))}
      </nav>
    </article>
  );
}
