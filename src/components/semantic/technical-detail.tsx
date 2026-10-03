import type { CaseStudyBlock } from "@/lib/content/blocks";
import type { Project } from "@/lib/content/schema";
import type { Locale } from "@/lib/i18n/locales";
import {
  resolveValue,
  resolveOptionalValue,
  resolveText,
} from "@/lib/i18n/project-content";
import { RichText } from "./rich-text";
import { SectionHeading, type HeadingLevel } from "./section-heading";

type TechnicalBlock = Extract<CaseStudyBlock, { type: "technical" }>;

export function TechnicalDetail({
  block,
  translation,
  project,
  locale,
  level,
  id,
  anchorPrefix,
}: {
  block: TechnicalBlock;
  translation?: TechnicalBlock;
  project: Project;
  locale: Locale;
  level: HeadingLevel;
  id: string;
  anchorPrefix: string;
}) {
  const title = resolveValue(block.title, translation?.title, locale);
  const summary = resolveValue(block.summary, translation?.summary, locale);
  const body = resolveOptionalValue(block.body, translation?.body, locale);
  const snippets = (block.codeSnippetIds ?? [])
    .map((snippetId) => project.codeSnippets.find(({ id }) => id === snippetId))
    .filter((snippet) => snippet !== undefined);
  return (
    <section
      id={id}
      className="case-study-block"
      tabIndex={-1}
      data-motion-id={`block-${id}`}
      aria-labelledby={`${id}-heading`}
    >
      <SectionHeading level={level} id={`${id}-heading`}>
        <span lang={title.lang}>{title.value}</span>
      </SectionHeading>
      <p lang={summary.lang}>{summary.value}</p>
      {(body || snippets.length > 0) && (
        <details open={block.defaultExpanded}>
          <summary lang="en">
            <span className="technical-detail__indicator" aria-hidden="true" />
            Read implementation details
          </summary>
          <div className="technical-detail__content">
            <div className="technical-detail__body">
              {body && <RichText content={body} anchorPrefix={anchorPrefix} />}
              {snippets.map((snippet) => {
                const label = snippet.title
                  ? resolveText(snippet.title, locale)
                  : undefined;
                return (
                  <figure className="code-snippet" key={snippet.id}>
                    <figcaption lang={label?.lang ?? "en"}>
                      {label?.value ?? snippet.language}
                    </figcaption>
                    <pre
                      lang="en"
                      tabIndex={0}
                      aria-label={`Code sample (${snippet.language})`}
                    >
                      <code>{snippet.source}</code>
                    </pre>
                  </figure>
                );
              })}
            </div>
          </div>
        </details>
      )}
    </section>
  );
}
