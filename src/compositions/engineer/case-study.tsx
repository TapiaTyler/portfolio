import {
  interfaceCopy as navigationCopy,
  messageLanguage,
  message,
} from "@/lib/i18n/messages";

import { UiText } from "@/components/ui-text";

import { type ComponentProps } from "react";
import { CaseStudy } from "@/components/semantic/case-study";
import {
  resolveText,
  resolveValue,
  resolveOptionalValue,
} from "@/lib/i18n/project-content";
import { EngineerCaseStudyIntro } from "./case-study-intro";
import { EngineerCaseStudyBody } from "./case-study-body";

export function EngineerCaseStudy(props: ComponentProps<typeof CaseStudy>) {
  const { content, anchorPrefix = "" } = props;
  const locale = content.locale;
  const systemBlocks = content.blocks
    .filter(({ block }) =>
      ["architecture", "decision", "technical"].includes(block.type),
    )
    .sort(
      (left, right) =>
        Number(right.block.type === "architecture") -
        Number(left.block.type === "architecture"),
    );
  const overview =
    systemBlocks.length > 0 ? (
      <aside
        className="engineer-system-overview"
        aria-label={message(locale, "System Overview")}
        lang={messageLanguage(locale, "System Overview")}
      >
        <p className="engineer-panel-label">
          <UiText locale={locale} id="System Overview" />
        </p>
        <nav
          aria-label={message(locale, "Technical sections")}
          lang={messageLanguage(locale, "Technical sections")}
        >
          <ul>
            {systemBlocks.map(({ block, translation }) => {
              const diagram =
                block.type === "architecture"
                  ? content.project.diagrams.find(
                      (diagram) => diagram.id === block.diagramId,
                    )
                  : undefined;
              const title =
                block.type === "architecture"
                  ? resolveText(diagram!.title, content.locale)
                  : block.type === "decision"
                    ? resolveValue(
                        block.title,
                        translation?.type === "decision"
                          ? translation.title
                          : undefined,
                        content.locale,
                      )
                    : block.type === "technical"
                      ? resolveValue(
                          block.title,
                          translation?.type === "technical"
                            ? translation.title
                            : undefined,
                          content.locale,
                        )
                      : undefined;
              if (!title) return null;
              const summary = diagram
                ? resolveText(diagram.accessibleSummary, content.locale)
                : block.type === "technical"
                  ? resolveValue(
                      block.summary,
                      translation?.type === "technical"
                        ? translation.summary
                        : undefined,
                      content.locale,
                    )
                  : block.type === "decision"
                    ? resolveOptionalValue(
                        block.context ?? block.decision,
                        translation?.type === "decision"
                          ? block.context
                            ? translation.context
                            : translation.decision
                          : undefined,
                        content.locale,
                      )
                    : undefined;
              const summaryText =
                summary &&
                (typeof summary.value === "string"
                  ? summary.value
                  : (() => {
                      const first = summary.value[0];
                      const inline =
                        first.type === "paragraph"
                          ? first.content
                          : first.items[0];
                      return inline
                        .map((part) =>
                          part.type === "text" ? part.text : part.label,
                        )
                        .join("");
                    })());
              return (
                <li key={block.id}>
                  <a href={`#${anchorPrefix}${block.id}`} lang={title.lang}>
                    {title.value}
                  </a>
                  {summary && <p lang={summary.lang}>{summaryText}</p>}
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    ) : undefined;
  return (
    <div className="engineer-case-study">
      <CaseStudy
        {...props}
        IntroRenderer={EngineerCaseStudyIntro}
        afterIntro={overview}
        BodyRenderer={EngineerCaseStudyBody}
        navigationLabel={navigationCopy("Section Directory")}
        navigationDirectory={content.project.slug}
      />
    </div>
  );
}
