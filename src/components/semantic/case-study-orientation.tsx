import type { ProjectContent } from "@/lib/i18n/project-content";
import { resolveOptionalValue } from "@/lib/i18n/project-content";

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
      aria-label="Project at a Glance"
      lang="en"
    >
      <p className="eyebrow">At a Glance</p>
      <dl>
        {distinction && (
          <div className="case-study-orientation__approach">
            <dt>Distinguishing Approach</dt>
            <dd lang={distinction.lang}>{distinction.value}</dd>
          </div>
        )}
        {project.roles.length > 0 && (
          <div className="case-study-orientation__role">
            <dt>Role</dt>
            <dd>{project.roles.join(" / ")}</dd>
          </div>
        )}
        {workflow && (
          <div className="case-study-orientation__workflow">
            <dt>Implementation</dt>
            <dd>
              {
                {
                  manual: "Manually authored",
                  "ai-assisted": "AI-assisted development",
                  mixed: "Manual and AI-assisted development",
                }[workflow]
              }
            </dd>
          </div>
        )}
        <div className="case-study-orientation__state">
          <dt>Current State</dt>
          <dd>
            <span className="case-study-status">{project.status}</span>
            {state && <p lang={state.lang}>{state.value}</p>}
          </dd>
        </div>
      </dl>
      {project.contribution?.review && (
        <details className="case-study-contribution">
          <summary>Ownership and Review</summary>
          <p>{project.contribution.review}</p>
          {project.contribution.testing && (
            <p>{project.contribution.testing}</p>
          )}
        </details>
      )}
    </section>
  );
}
