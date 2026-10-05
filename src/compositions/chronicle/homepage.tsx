import type { ReactNode } from "react";
import type { HomepageProps } from "@/components/semantic/homepage";
import { HomeSectionHeader } from "@/components/semantic/homepage";
import { ChronicleHero } from "./hero";
import { ChronicleCollection } from "./collection";
import { ChronicleHomeTabs } from "./home-tabs";

/**
 * Every tab panel shares one header grammar: the section name as an eyebrow,
 * then a headline. Motion IDs match the shared homepage modules for morphing.
 */
function ChronicleTabSection({
  id,
  label,
  heading,
  children,
}: {
  id: string;
  label: string;
  heading: string;
  children: ReactNode;
}) {
  return (
    <section
      className="home-section chronicle-tab-section"
      data-motion-id={id}
      aria-labelledby={`${id}-heading`}
    >
      <p className="eyebrow">{label}</p>
      <h2 id={`${id}-heading`}>{heading}</h2>
      {children}
    </section>
  );
}

export function ChronicleHomepage({
  content,
  projects,
  locale,
  projectHref,
  assetUrl,
}: HomepageProps) {
  const { about, capabilities, lab, contact } = content;
  const aboutLabel = "About";
  return (
    <div className="homepage chronicle-homepage" lang="en">
      <ChronicleHero content={content.hero} locale={locale} />
      <section
        className="home-section selected-work chronicle-frame"
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
          <ChronicleCollection
            projects={projects}
            locale={locale}
            projectHref={projectHref}
            assetUrl={assetUrl}
            showPreview={false}
          />
        ) : (
          <p className="empty-content">{content.work.emptyText}</p>
        )}
      </section>
      <ChronicleHomeTabs
        sections={[
          {
            id: "about",
            label: aboutLabel,
            content: (
              <ChronicleTabSection
                id="about"
                label={aboutLabel}
                heading={about.title}
              >
                {about.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </ChronicleTabSection>
            ),
            action: { href: `/${locale}/about`, label: about.linkLabel },
          },
          {
            id: "capabilities",
            label: capabilities.title,
            content: (
              <ChronicleTabSection
                id="capabilities"
                label={capabilities.title}
                heading={capabilities.lead ?? capabilities.title}
              >
                <div className="capability-list">
                  {capabilities.items.map((item) => (
                    <div className="capability" key={item.title}>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  ))}
                </div>
              </ChronicleTabSection>
            ),
          },
          {
            id: "lab",
            label: lab.title,
            content: (
              <ChronicleTabSection
                id="lab"
                label={lab.title}
                heading={lab.description}
              >
                <p className="empty-content">{lab.emptyText}</p>
              </ChronicleTabSection>
            ),
            action: { href: `/${locale}/lab`, label: lab.linkLabel },
          },
          {
            id: "contact",
            label: contact.label,
            content: (
              <ChronicleTabSection
                id="contact"
                label={contact.label}
                heading={contact.title}
              >
                <p>{contact.description}</p>
              </ChronicleTabSection>
            ),
            action: { href: `/${locale}/contact`, label: contact.linkLabel },
          },
        ]}
      />
    </div>
  );
}
