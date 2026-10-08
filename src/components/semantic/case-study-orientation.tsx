import { messageLanguage, interfaceCopy, message } from "@/lib/i18n/messages";
import { Text } from "@/components/localized-text";

import { UiText } from "@/components/ui-text";

import {
  type ProjectContent,
  resolveOptionalValue,
} from "@/lib/i18n/project-content";

export function CaseStudyOrientation({ content }: { content: ProjectContent }) {
  const { project, locale } = content;
  const en = project.locale.en.overview;
  const ja = project.locale.ja?.overview;
  const distinction = resolveOptionalValue(
    en?.distinction,
    ja?.distinction,
    locale,
  );
  const state = resolveOptionalValue(
    en?.currentState,
    ja?.currentState,
    locale,
  );
  const workflow = project.contribution?.implementation;
  return (
    <section
      className="case-study-orientation"
      aria-label={message(locale, "Project at a Glance")}
      lang={messageLanguage(locale, "Project at a Glance")}
    >
      <p className="eyebrow">
        <UiText locale={locale} id="At a Glance" />
      </p>
      <dl>
        {distinction && (
          <div className="case-study-orientation__approach">
            <dt>
              <UiText locale={locale} id="Distinguishing Approach" />
            </dt>
            <dd lang={distinction.lang}>{distinction.value}</dd>
          </div>
        )}
        {project.roles.length > 0 && (
          <div className="case-study-orientation__role">
            <dt>
              <UiText locale={locale} id="Role" />
            </dt>
            <dd>{project.roles.join(" / ")}</dd>
          </div>
        )}
        {workflow && (
          <div className="case-study-orientation__workflow">
            <dt>
              <UiText locale={locale} id="Implementation" />
            </dt>
            <dd>
              <Text
                locale={locale}
                value={interfaceCopy(
                  {
                    manual: "Manually authored",
                    "ai-assisted": "AI-assisted development",
                    mixed: "Manual and AI-assisted development",
                  }[workflow],
                )}
              />
            </dd>
          </div>
        )}
        <div className="case-study-orientation__state">
          <dt>
            <UiText locale={locale} id="Current State" />
          </dt>
          <dd>
            <span className="case-study-status">{project.status}</span>
            {state && <p lang={state.lang}>{state.value}</p>}
          </dd>
        </div>
      </dl>
      {project.contribution?.review && (
        <details className="case-study-contribution">
          <summary>
            <UiText locale={locale} id="Ownership and Review" />
          </summary>
          <p>{project.contribution.review}</p>
          {project.contribution.testing && (
            <p>{project.contribution.testing}</p>
          )}
        </details>
      )}
    </section>
  );
}
