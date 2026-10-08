import { interfaceCopy } from "@/lib/i18n/messages";
import { type CopyText, text } from "@/lib/i18n/copy";
import { type Locale } from "@/lib/i18n/locales";
import { Text } from "@/components/localized-text";

import { type ReactNode } from "react";
import {
  type HomepageProps,
  HomeSectionHeader,
} from "@/components/semantic/homepage";

import { ChronicleHero } from "./hero";
import { ChronicleCollection } from "./collection";
import { ChronicleHomeTabs } from "./home-tabs";
import { ContactMethods } from "@/components/semantic/contact-resources";
import { contactMethods } from "@/content/contact";

/**
 * Every tab panel shares one header grammar: the section name as an eyebrow,
 * then a headline. Motion IDs match the shared homepage modules for morphing.
 */
function ChronicleTabSection({
  id,
  label,
  heading,
  children,
  locale,
}: {
  id: string;
  label: CopyText;
  heading: CopyText;
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <section
      className="home-section chronicle-tab-section"
      data-motion-id={id}
      aria-labelledby={`${id}-heading`}
    >
      {id !== "contact" && (
        <p className="eyebrow">
          <Text value={label} locale={locale} />
        </p>
      )}
      <h2 id={`${id}-heading`}>
        <Text value={heading} locale={locale} />
      </h2>
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
  const aboutLabel = interfaceCopy("About");
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
          locale={locale}
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
          <p className="empty-content">
            <Text value={content.work.emptyText} locale={locale} />
          </p>
        )}
      </section>
      <ChronicleHomeTabs
        locale={locale}
        sections={[
          {
            id: "about",
            label: aboutLabel,
            content: (
              <ChronicleTabSection
                locale={locale}
                id="about"
                label={aboutLabel}
                heading={about.title}
              >
                {about.paragraphs.map((paragraph) => (
                  <p key={text(paragraph, locale)}>
                    <Text value={paragraph} locale={locale} />
                  </p>
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
                locale={locale}
                id="capabilities"
                label={capabilities.title}
                heading={capabilities.lead ?? capabilities.title}
              >
                <div className="capability-list">
                  {capabilities.items.map((item) => (
                    <div className="capability" key={text(item.title, locale)}>
                      <h3>
                        <Text value={item.title} locale={locale} />
                      </h3>
                      <p>
                        <Text value={item.description} locale={locale} />
                      </p>
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
                locale={locale}
                id="lab"
                label={lab.title}
                heading={lab.description}
              >
                <p className="empty-content">
                  <Text value={lab.emptyText} locale={locale} />
                </p>
              </ChronicleTabSection>
            ),
            action: { href: `/${locale}/lab`, label: lab.linkLabel },
          },
          {
            id: "contact",
            label: contact.label,
            content: (
              <ChronicleTabSection
                locale={locale}
                id="contact"
                label={contact.label}
                heading={contact.label}
              >
                <p>
                  <Text value={contact.title} locale={locale} />
                </p>
                <p>
                  <Text value={contact.description} locale={locale} />
                </p>
                <ContactMethods methods={contactMethods} locale={locale} />
              </ChronicleTabSection>
            ),
            action: { href: `/${locale}/contact`, label: contact.linkLabel },
          },
        ]}
      />
    </div>
  );
}
