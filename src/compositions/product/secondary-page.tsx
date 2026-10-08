import Link from "next/link";
import {
  SecondaryPage,
  SecondaryPageIntro,
  SecondaryPageSection,
  type SecondaryPageProps,
} from "@/components/semantic/secondary-page";
import { Text } from "@/components/localized-text";
import { UiText } from "@/components/ui-text";
import { message, messageLanguage } from "@/lib/i18n/messages";
import { ProductProjectFeature } from "./project-feature";
import { ProductCollection } from "./collection";

export function ProductSecondaryPage(props: SecondaryPageProps) {
  if (props.content.id !== "work")
    return <SecondaryPage {...props} FeatureRenderer={ProductProjectFeature} />;
  const { content, locale, projects = [], assetUrl, projectHref } = props;
  return (
    <article
      className="secondary-page secondary-page--work product-work"
      lang="en"
    >
      <SecondaryPageIntro content={content} locale={locale} />
      <div
        className="secondary-page-body"
        data-motion-id="page-body"
        data-motion-group
      >
        {content.sections.map((section) => (
          <SecondaryPageSection
            section={section}
            locale={locale}
            key={section.id}
          >
            {section.collection &&
              (projects.length ? (
                <ProductCollection
                  projects={projects}
                  locale={locale}
                  assetUrl={assetUrl}
                  projectHref={projectHref}
                />
              ) : (
                <p>
                  <Text value={section.emptyText} locale={locale} />
                </p>
              ))}
          </SecondaryPageSection>
        ))}
      </div>
      <nav
        className="secondary-page-related"
        aria-label={message(locale, "Continue Exploring")}
        lang={messageLanguage(locale, "Continue Exploring")}
        data-motion-id="page-related"
      >
        <p>
          <UiText locale={locale} id="Continue Exploring" />
        </p>
        {content.related.map((item) => (
          <Link
            className="text-link"
            key={item.destination}
            href={`/${locale}${item.destination}`}
          >
            <Text value={item.label} locale={locale} />
          </Link>
        ))}
      </nav>
    </article>
  );
}
