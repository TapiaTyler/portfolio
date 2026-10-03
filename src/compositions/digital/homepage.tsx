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
          <p className="empty-content">{content.work.emptyText}</p>
        )}
      </section>
      <section
        className="home-section digital-bridge"
        data-motion-id="about"
        aria-labelledby="about-heading"
      >
        <div>
          <p className="eyebrow">{content.about.label}</p>
          <h2 id="about-heading">{content.about.title}</h2>
          {content.about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <Link className="text-link" href={`/${locale}/about`}>
            {content.about.linkLabel}
          </Link>
        </div>
        <div className="digital-bridge__system">
          <DigitalVisual variant="bridge" />
          <ul>
            {content.capabilities.items.map((item) => (
              <li key={item.title}>{item.title}</li>
            ))}
          </ul>
        </div>
      </section>
      <CapabilityList content={content.capabilities} />
      <LabPreview content={content.lab} locale={locale} />
      <ContactClosing content={content.contact} locale={locale} />
    </div>
  );
}
