import { Text } from "@/components/localized-text";
import {
  interfaceCopy,
  interfaceCopy as navigationCopy,
  messageLanguage,
  message,
} from "@/lib/i18n/messages";

import { type CopyText } from "@/lib/i18n/copy";
import { UiText } from "@/components/ui-text";

import { type ComponentProps } from "react";
import { projectStatusLabels } from "@/lib/content/status";
import { ChronicleTopics } from "./topics";
import {
  CaseStudy,
  CaseStudyIntro,
  type CaseStudyBodyProps,
} from "@/components/semantic/case-study";
import { groupCaseStudyEvidence } from "../case-study-groups";
import { blockRenderer } from "../grouped-body";
import { SectionHeading } from "@/components/semantic/section-heading";
import { MediaFrame } from "@/components/semantic/media-frame";
import { ProjectMeta, ProjectLinks } from "@/components/semantic/project-meta";
import { CaseStudyOrientation } from "@/components/semantic/case-study-orientation";
import { DismissibleDetails } from "@/components/dismissible-details";

export function ChronicleCaseStudyIntro(
  props: ComponentProps<typeof CaseStudyIntro>,
) {
  const { content, level = 1 } = props;
  const locale = content.locale;
  return (
    <div
      className="chronicle-dossier-banner"
      data-project-slug={content.project.slug}
      tabIndex={0}
      role="region"
      aria-label={message(locale, "Project identity and topics")}
      lang={messageLanguage(locale, "Project identity and topics")}
    >
      <header className="case-study-intro" data-motion-id="case-study-intro">
        <p className="eyebrow" lang="en">
          <UiText locale={locale} id="Chronicle / Project" />
        </p>
        <SectionHeading level={level}>
          <span lang={content.title.lang}>{content.title.value}</span>
        </SectionHeading>
        <p className="chronicle-status" lang="en">
          <Text
            value={interfaceCopy(projectStatusLabels[content.project.status])}
            locale={content.locale}
          />
        </p>
        {content.summary && (
          <p lang={content.summary.lang}>{content.summary.value}</p>
        )}
        <ChronicleTopics locale={locale} project={content.project} />
      </header>
    </div>
  );
}

function ChronicleBody(props: CaseStudyBodyProps) {
  const { content, assetUrl } = props;
  const locale = content.locale;
  // Conservative layout bounds preserve density on high-DPI displays without
  // treating the desktop evidence column as a full-width 1200px image.
  const narrowScreenSizes =
    "(orientation: landscape) and (max-height: 500px) calc(69vw - 40px), (max-width: 900px) and (orientation: portrait) calc(100vw - 40px), (orientation: landscape) and (max-height: 650px) 85vw, (max-width: 900px) 100vw";
  const evidenceSizes = `${narrowScreenSizes}, 42vw`;
  const render = blockRenderer(props, `${narrowScreenSizes}, 85vw`);
  const renderEvidence = blockRenderer(props, evidenceSizes);
  return (
    <>
      {groupCaseStudyEvidence(content.blocks).map(
        ({ owner, evidence }, index) => {
          // The first chapter already shows the preview screenshot. Evidence that
          // repeats it stays in the document (every section is kept) but is hidden
          // in this composition, so the chapter shows only its other evidence.
          const shown = evidence.filter(
            ({ block }) =>
              block.type !== "media" ||
              block.mediaId !== content.project.previewMediaId,
          );
          return (
            <div
              key={owner.block.id}
              className={`chronicle-chapter${shown.length || (index === 0 && content.project.previewMediaId) ? " chronicle-chapter--evidence" : ""}`}
            >
              <div className="chronicle-chapter__narrative">
                {render(owner)}
                {index === 0 && (
                  <ProjectMeta
                    locale={locale}
                    project={content.project}
                    exclude={[
                      "Languages",
                      "Frameworks & Libraries",
                      "Tools & Platforms",
                      "Capabilities",
                    ]}
                  />
                )}
              </div>
              {(shown.length > 0 ||
                (index === 0 && content.project.previewMediaId)) && (
                <div className="chronicle-chapter__evidence">
                  {index === 0 &&
                    content.project.media
                      .filter(
                        (item) => item.id === content.project.previewMediaId,
                      )
                      .map((media) => (
                        <MediaFrame
                          key={media.id}
                          media={media}
                          locale={locale}
                          assetUrl={assetUrl}
                          loading="eager"
                          sizes={evidenceSizes}
                        />
                      ))}
                  {shown.map(renderEvidence)}
                </div>
              )}
              {shown.length < evidence.length && (
                <div hidden>
                  {evidence
                    .filter((entry) => !shown.includes(entry))
                    .map(renderEvidence)}
                </div>
              )}
            </div>
          );
        },
      )}
    </>
  );
}

export function ChronicleCaseStudy(props: ComponentProps<typeof CaseStudy>) {
  const locale = props.content.locale;
  const labels: Record<string, CopyText> = {};
  const shortLabels = {
    // Short rail labels follow the case-study spine (CASE-STUDY-CONTRACT.md).
    problem: "Objective",
    intro: "Overview",
    goals: "Goals",
    constraints: "Constraints",
    architecture: "System Overview",
    technical: "Engineering Details",
    result: "Outcome",
  };
  for (const { block } of props.content.blocks) {
    const occurrences = props.content.blocks.filter(
      (entry) => entry.block.type === block.type,
    ).length;
    if (block.type in shortLabels && occurrences === 1)
      labels[`${props.anchorPrefix ?? ""}${block.id}`] = interfaceCopy(
        shortLabels[block.type as keyof typeof shortLabels],
      );
  }
  return (
    <div className="chronicle-dossier">
      {/* Case-study subheads use this existing weight. Discover it early without
          making its font request compete with the scenic identity band. */}
      <link
        rel="preload"
        as="font"
        href="/fonts/chronicle/cormorant-garamond-latin-600-normal.woff2"
        type="font/woff2"
        crossOrigin="anonymous"
        fetchPriority="low"
      />
      {/* The visible reading panel already draws this frame. Keep its decorative
          request behind the scenic identity band on mobile viewports. */}
      <link
        rel="preload"
        as="image"
        href="/media/themes/chronicle/panel-frame-compact.avif"
        type="image/avif"
        media="(max-width: 900px)"
        fetchPriority="low"
      />
      <CaseStudy
        {...props}
        IntroRenderer={ChronicleCaseStudyIntro}
        BodyRenderer={ChronicleBody}
        navigationLabel={navigationCopy("Chapter Archive")}
        containedReading
        navigationLabels={labels}
        afterIntro={
          <DismissibleDetails
            className="chronicle-record-summary"
            data-motion-id="case-study-orientation"
          >
            <summary>
              <UiText locale={locale} id="Project at a Glance" />
            </summary>
            <div className="chronicle-record-summary__content" tabIndex={0}>
              {props.content.description && (
                <p lang={props.content.description.lang}>
                  {props.content.description.value}
                </p>
              )}
              <CaseStudyOrientation content={props.content} />
              <ProjectMeta
                locale={locale}
                project={props.content.project}
                exclude={["Role", "Status"]}
              />
              <ProjectLinks locale={locale} project={props.content.project} />
              {props.afterIntro}
            </div>
          </DismissibleDetails>
        }
      />
    </div>
  );
}
