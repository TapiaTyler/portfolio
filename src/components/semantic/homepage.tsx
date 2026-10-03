import Link from "next/link";
import type { ComponentProps, ComponentType } from "react";
import type { Locale } from "@/lib/i18n/locales";
import type { Project } from "@/lib/content/schema";
import { Hero, type HeroContent } from "./hero";
import { ProjectIndex } from "./project-index";

export interface HomepageContent {
  hero: HeroContent;
  work: { title: string; linkLabel: string; emptyText: string };
  capabilities: {
    title: string;
    items: { title: string; description: string }[];
  };
  about: {
    label: string;
    title: string;
    paragraphs: string[];
    linkLabel: string;
  };
  lab: {
    title: string;
    description: string;
    emptyText: string;
    linkLabel: string;
  };
  contact: {
    label: string;
    title: string;
    description: string;
    linkLabel: string;
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
}: {
  title: string;
  href?: string;
  linkLabel?: string;
  id: string;
}) {
  return (
    <header className="home-section-header" data-motion-reveal>
      <h2 id={id}>{title}</h2>
      {href && linkLabel && (
        <Link className="text-link" href={href}>
          {linkLabel}
        </Link>
      )}
    </header>
  );
}

export function CapabilityList({
  content,
}: {
  content: HomepageContent["capabilities"];
}) {
  return (
    <section
      className="home-section"
      aria-labelledby="capabilities-heading"
      data-motion-id="capabilities"
      data-motion-group
    >
      <HomeSectionHeader title={content.title} id="capabilities-heading" />
      <div className="capability-list">
        {content.items.map((item) => (
          <div className="capability" key={item.title} data-motion-reveal>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
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
        <p className="eyebrow">{content.label}</p>
      </div>
      <div className="profile-preview__narrative">
        <h2 id="about-heading">{content.title}</h2>
        {content.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <Link className="text-link" href={`/${locale}/about`}>
          {content.linkLabel}
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
        title={content.title}
        id="lab-heading"
        href={`/${locale}/lab`}
        linkLabel={content.linkLabel}
      />
      <p>{content.description}</p>
      <p className="empty-content">{content.emptyText}</p>
    </section>
  );
}

export function ContactClosing({
  content,
  locale,
}: {
  content: HomepageContent["contact"];
  locale: Locale;
}) {
  return (
    <section
      className="home-section contact-closing"
      data-motion-id="contact"
      aria-labelledby="contact-heading"
    >
      <div>
        <p className="eyebrow">{content.label}</p>
        <h2 id="contact-heading">{content.title}</h2>
        <Link className="text-link" href={`/${locale}/contact`}>
          {content.linkLabel}
        </Link>
      </div>
      <p>{content.description}</p>
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
          <p className="empty-content">{content.work.emptyText}</p>
        )}
      </section>
      <CapabilityList content={content.capabilities} />
      <ProfilePreview content={content.about} locale={locale} />
      <LabPreview content={content.lab} locale={locale} />
      <ContactClosing content={content.contact} locale={locale} />
    </div>
  );
}
