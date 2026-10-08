import { Text } from "@/components/localized-text";
import { text, type CopyText } from "@/lib/i18n/copy";
import Link from "next/link";
import { type ComponentProps, type ComponentType } from "react";
import { type Locale } from "@/lib/i18n/locales";
import { type Project } from "@/lib/content/schema";
import { Hero, type HeroContent } from "./hero";
import { ProjectIndex } from "./project-index";
import { ContactMethods } from "./contact-resources";
import { contactMethods } from "@/content/contact";

export interface HomepageContent {
  hero: HeroContent;
  work: { title: CopyText; linkLabel: CopyText; emptyText: CopyText };
  capabilities: {
    title: CopyText;
    /** Optional one-line summary for compositions that pair a label with a headline. */
    lead?: CopyText;
    items: { title: CopyText; description: CopyText }[];
  };
  about: {
    label: CopyText;
    title: CopyText;
    paragraphs: CopyText[];
    linkLabel: CopyText;
  };
  lab: {
    title: CopyText;
    description: CopyText;
    emptyText: CopyText;
    linkLabel: CopyText;
  };
  contact: {
    label: CopyText;
    title: CopyText;
    description: CopyText;
    linkLabel: CopyText;
  };
}

export interface HomepageProps {
  content: HomepageContent;
  projects: Project[];
  locale: Locale;
  HeroRenderer?: ComponentType<ComponentProps<typeof Hero>>;
  FeatureRenderer?: ComponentProps<typeof ProjectIndex>["FeatureRenderer"];
  projectHref?: (project: Project) => string;
  assetUrl?: ComponentProps<typeof ProjectIndex>["assetUrl"];
}

export function HomeSectionHeader({
  title,
  href,
  linkLabel,
  id,
  locale = "en",
}: {
  locale?: Locale;
  title: CopyText;
  href?: string;
  linkLabel?: CopyText;
  id: string;
}) {
  return (
    <header className="home-section-header" data-motion-reveal>
      <h2 id={id}>
        <Text value={title} locale={locale} />
      </h2>
      {href && linkLabel && (
        <Link className="text-link" href={href}>
          <Text value={linkLabel} locale={locale} />
        </Link>
      )}
    </header>
  );
}

export function CapabilityList({
  content,
  locale = "en",
}: {
  content: HomepageContent["capabilities"];
  locale?: Locale;
}) {
  return (
    <section
      className="home-section"
      aria-labelledby="capabilities-heading"
      data-motion-id="capabilities"
      data-motion-group
    >
      <HomeSectionHeader
        locale={locale}
        title={content.title}
        id="capabilities-heading"
      />
      <div className="capability-list">
        {content.items.map((item) => (
          <div
            className="capability"
            key={text(item.title, locale)}
            data-motion-reveal
          >
            <h3>
              <Text value={item.title} locale={locale} />
            </h3>
            <p>
              <Text value={item.description} locale={locale} />
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ProfilePreview({
  content,
  locale,
}: {
  content: HomepageContent["about"];
  locale: Locale;
}) {
  return (
    <section
      className="home-section profile-preview"
      data-motion-id="about"
      aria-labelledby="about-heading"
    >
      <div className="profile-preview__label">
        <p className="eyebrow">
          <Text value={content.label} locale={locale} />
        </p>
      </div>
      <div className="profile-preview__narrative">
        <h2 id="about-heading">
          <Text value={content.title} locale={locale} />
        </h2>
        {content.paragraphs.map((paragraph) => (
          <p key={text(paragraph, locale)}>
            <Text value={paragraph} locale={locale} />
          </p>
        ))}
        <Link className="text-link" href={`/${locale}/about`}>
          <Text value={content.linkLabel} locale={locale} />
        </Link>
      </div>
    </section>
  );
}

export function LabPreview({
  content,
  locale,
}: {
  content: HomepageContent["lab"];
  locale: Locale;
}) {
  return (
    <section
      className="home-section lab-preview"
      aria-labelledby="lab-heading"
      data-motion-id="lab"
    >
      <HomeSectionHeader
        locale={locale}
        title={content.title}
        id="lab-heading"
        href={`/${locale}/lab`}
        linkLabel={content.linkLabel}
      />
      <p>
        <Text value={content.description} locale={locale} />
      </p>
      <p className="empty-content">
        <Text value={content.emptyText} locale={locale} />
      </p>
    </section>
  );
}

export function ContactClosing({
  content,
  locale,
  actionAfterMethods = false,
}: {
  content: HomepageContent["contact"];
  locale: Locale;
  actionAfterMethods?: boolean;
}) {
  const action = (
    <Link
      className="text-link contact-closing__action"
      href={`/${locale}/contact`}
    >
      <Text value={content.linkLabel} locale={locale} />
    </Link>
  );
  return (
    <section
      className="home-section contact-closing"
      data-motion-id="contact"
      aria-labelledby="contact-heading"
    >
      <div>
        <h2 id="contact-heading">
          <Text value={content.label} locale={locale} />
        </h2>
        <p>
          <Text value={content.title} locale={locale} />
        </p>
        <p>
          <Text value={content.description} locale={locale} />
        </p>
        {!actionAfterMethods && action}
      </div>
      <ContactMethods methods={contactMethods} locale={locale} />
      {actionAfterMethods && action}
    </section>
  );
}

export function Homepage({
  content,
  projects,
  locale,
  FeatureRenderer,
  projectHref,
  assetUrl,
  HeroRenderer = Hero,
}: HomepageProps) {
  return (
    <div className="homepage" lang="en">
      <HeroRenderer content={content.hero} locale={locale} />
      <section
        className="home-section selected-work"
        data-motion-id="work"
        data-motion-group
        aria-labelledby="selected-work-heading"
      >
        <HomeSectionHeader
          locale={locale}
          title={content.work.title}
          id="selected-work-heading"
          href={`/${locale}/work`}
          linkLabel={content.work.linkLabel}
        />
        {projects.length ? (
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
            <Text value={content.work.emptyText} locale={locale} />
          </p>
        )}
      </section>
      <CapabilityList locale={locale} content={content.capabilities} />
      <ProfilePreview content={content.about} locale={locale} />
      <LabPreview content={content.lab} locale={locale} />
      <ContactClosing content={content.contact} locale={locale} />
    </div>
  );
}
