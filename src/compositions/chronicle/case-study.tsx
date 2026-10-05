import type { ComponentProps } from "react";
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
  return (
    <div
      className="chronicle-dossier-banner"
      data-project-slug={content.project.slug}
      tabIndex={0}
      role="region"
      aria-label="Project identity and topics"
    >
      <header className="case-study-intro" data-motion-id="case-study-intro">
        <p className="eyebrow" lang="en">
          Chronicle / Project
        </p>
        <SectionHeading level={level}>
          <span lang={content.title.lang}>{content.title.value}</span>
        </SectionHeading>
        <p className="chronicle-status" lang="en">
          {projectStatusLabels[content.project.status]}
        </p>
        {content.summary && (
          <p lang={content.summary.lang}>{content.summary.value}</p>
        )}
        <ChronicleTopics project={content.project} />
      </header>
    </div>
  );
}

function ChronicleBody(props: CaseStudyBodyProps) {
  const { content, assetUrl } = props;
  const render = blockRenderer(props);
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
                          locale={content.locale}
                          assetUrl={assetUrl}
                          loading="eager"
                        />
                      ))}
                  {shown.map(render)}
                </div>
              )}
              {shown.length < evidence.length && (
                <div hidden>
                  {evidence
                    .filter((entry) => !shown.includes(entry))
                    .map(render)}
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
  const labels: Record<string, string> = {};
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
      labels[`${props.anchorPrefix ?? ""}${block.id}`] =
        shortLabels[block.type as keyof typeof shortLabels];
  }
  return (
    <div className="chronicle-dossier">
      <CaseStudy
        {...props}
        IntroRenderer={ChronicleCaseStudyIntro}
        BodyRenderer={ChronicleBody}
        navigationLabel="Chapter Archive"
        containedReading
        navigationLabels={labels}
        afterIntro={
          <DismissibleDetails
            className="chronicle-record-summary"
            data-motion-id="case-study-orientation"
          >
            <summary>Project at a Glance</summary>
            <div className="chronicle-record-summary__content" tabIndex={0}>
              {props.content.description && (
                <p lang={props.content.description.lang}>
                  {props.content.description.value}
                </p>
              )}
              <CaseStudyOrientation content={props.content} />
              <ProjectMeta
                project={props.content.project}
                exclude={["Role", "Status"]}
              />
              <ProjectLinks project={props.content.project} />
              {props.afterIntro}
            </div>
          </DismissibleDetails>
        }
      />
    </div>
  );
}
