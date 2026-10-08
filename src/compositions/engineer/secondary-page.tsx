import { messageLanguage, message } from "@/lib/i18n/messages";
import { UiText } from "@/components/ui-text";

import { Text } from "@/components/localized-text";

import {
  SecondaryPage,
  type SecondaryPageProps,
} from "@/components/semantic/secondary-page";
import { EngineerProjectFeature } from "./project-feature";

export function EngineerSecondaryPage(props: SecondaryPageProps) {
  const { locale } = props;
  return (
    <div className="engineer-secondary-page">
      <SecondaryPage
        {...props}
        FeatureRenderer={EngineerProjectFeature}
        index={
          props.content.sections.length > 1 && (
            <nav
              className="secondary-page-index"
              aria-label={message(locale, "Page sections")}
              lang={messageLanguage(locale, "Page sections")}
              data-motion-id="page-index"
            >
              <p className="eyebrow">
                <UiText locale={locale} id="Record Index" />
              </p>
              <ol>
                {props.content.sections.map((section) => (
                  <li key={section.id}>
                    <a href={`#page-${section.id}-heading`}>
                      <Text value={section.title} locale={locale} />
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )
        }
      />
    </div>
  );
}
