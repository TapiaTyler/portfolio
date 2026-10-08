import { Text } from "@/components/localized-text";
import { text } from "@/lib/i18n/copy";
import Link from "next/link";
import {
  CapabilityList,
  ContactClosing,
  HomeSectionHeader,
  LabPreview,
  type HomepageProps,
} from "@/components/semantic/homepage";
import { ProjectIndex } from "@/components/semantic/project-index";
import { DigitalHero } from "./hero";
import { DigitalVisual } from "./visual";
import { DigitalProjectFeature } from "./project-feature";

export function DigitalHomepage({
  content,
  projects,
  locale,
  projectHref,
  assetUrl,
}: HomepageProps) {
  return (
    <div className="homepage digital-homepage" lang="en">
      <DigitalHero content={content.hero} locale={locale} />
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
            FeatureRenderer={DigitalProjectFeature}
            projectHref={projectHref}
            assetUrl={assetUrl}
          />
        ) : (
          <p className="empty-content">
            <Text value={content.work.emptyText} locale={locale} />
          </p>
        )}
      </section>
      <section
        className="home-section digital-bridge"
        data-motion-id="about"
        aria-labelledby="about-heading"
      >
        <div>
          <p className="eyebrow">
            <Text value={content.about.label} locale={locale} />
          </p>
          <h2 id="about-heading">
            <Text value={content.about.title} locale={locale} />
          </h2>
          {content.about.paragraphs.map((paragraph) => (
            <p key={text(paragraph, locale)}>
              <Text value={paragraph} locale={locale} />
            </p>
          ))}
          <Link className="text-link" href={`/${locale}/about`}>
            <Text value={content.about.linkLabel} locale={locale} />
          </Link>
        </div>
        <div className="digital-bridge__system">
          <DigitalVisual variant="bridge" />
          <ul>
            {content.capabilities.items.map((item) => (
              <li key={text(item.title, locale)}>
                <Text value={item.title} locale={locale} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CapabilityList locale={locale} content={content.capabilities} />
      <LabPreview content={content.lab} locale={locale} />
      <ContactClosing
        content={content.contact}
        locale={locale}
        actionAfterMethods
      />
    </div>
  );
}
