import Link from "next/link";
import {
  type HomepageProps,
  HomeSectionHeader,
  CapabilityList,
  ProfilePreview,
  LabPreview,
} from "@/components/semantic/homepage";
import { ContactMethods } from "@/components/semantic/contact-resources";
import { contactMethods } from "@/content/contact";
import { Text } from "@/components/localized-text";
import { UiText } from "@/components/ui-text";
import { ProductHero } from "./hero";
import { ProductCollection } from "./collection";

export function ProductHomepage({
  content,
  projects,
  locale,
  projectHref,
  assetUrl,
}: HomepageProps) {
  return (
    <div className="homepage product-homepage" lang="en">
      <ProductHero content={content.hero} locale={locale} />
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
          locale={locale}
        />
        {projects.length ? (
          <ProductCollection
            projects={projects}
            locale={locale}
            projectHref={projectHref}
            assetUrl={assetUrl}
          />
        ) : (
          <p>
            <Text value={content.work.emptyText} locale={locale} />
          </p>
        )}
      </section>
      <div className="product-home-support">
        <ProfilePreview content={content.about} locale={locale} />
        <CapabilityList content={content.capabilities} locale={locale} />
        <LabPreview content={content.lab} locale={locale} />
      </div>
      <section
        className="home-section product-contact"
        data-motion-id="contact"
        aria-labelledby="contact-heading"
      >
        <div>
          <h2 id="contact-heading">
            <UiText locale={locale} id="Contact" />
          </h2>
          <p>
            <Text value={content.contact.title} locale={locale} />
          </p>
          <p>
            <Text value={content.contact.description} locale={locale} />
          </p>
          <Link className="text-link" href={`/${locale}/contact`}>
            <Text value={content.contact.linkLabel} locale={locale} />
          </Link>
        </div>
        <ContactMethods methods={contactMethods} locale={locale} />
      </section>
    </div>
  );
}
