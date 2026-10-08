import { type ComponentProps } from "react";
import {
  CaseStudy,
  type CaseStudyBodyProps,
  CaseStudyIntro,
} from "@/components/semantic/case-study";
import { FallbackNotice } from "@/components/semantic/fallback-notice";
import {
  SectionHeading,
  type HeadingLevel,
} from "@/components/semantic/section-heading";
import { CaseStudyOrientation } from "@/components/semantic/case-study-orientation";
import { MediaFrame } from "@/components/semantic/media-frame";
import { ProjectMeta, ProjectLinks } from "@/components/semantic/project-meta";
import { UiText } from "@/components/ui-text";
import { type SelectedBlock } from "@/lib/i18n/project-content";
import { groupCaseStudyEvidence } from "../case-study-groups";
import { blockRenderer } from "../grouped-body";
import { CaseStudyTitle } from "@/components/semantic/case-study-title";

export function ProductCaseStudyIntro({
  content,
  level = 1,
  assetUrl,
}: ComponentProps<typeof CaseStudyIntro>) {
  const media = content.project.media.find(
    (item) => item.id === content.project.previewMediaId,
  );
  return (
    <header
      className={`product-case-intro${media ? " product-case-intro--media" : ""}`}
      data-motion-id="case-study-intro"
      data-project-slug={content.project.slug}
    >
      <div className="product-case-intro__copy">
        <SectionHeading level={level}>
          <CaseStudyTitle title={content.title} />
        </SectionHeading>
        {content.summary && (
          <p
            className="product-case-intro__summary"
            lang={content.summary.lang}
          >
            {content.summary.value}
          </p>
        )}
        {content.description && (
          <p lang={content.description.lang}>{content.description.value}</p>
        )}
        <ProjectLinks project={content.project} locale={content.locale} />
        <CaseStudyOrientation content={content} />
        <ProjectMeta
          project={content.project}
          locale={content.locale}
          exclude={["Role", "Status"]}
        />
      </div>
      {media && (
        <MediaFrame
          media={media}
          locale={content.locale}
          assetUrl={assetUrl}
          loading="eager"
          sizes="(max-width: 900px) 90vw, 480px"
        />
      )}
    </header>
  );
}

function ProductCaseStudyBody(props: CaseStudyBodyProps) {
  const render = blockRenderer(props, "(max-width: 900px) 90vw, 480px");
  const renderFullWidth = blockRenderer(
    props,
    "(max-width: 900px) 90vw, 1200px",
  );
  const groups = groupCaseStudyEvidence(props.content.blocks);
  function repeatsOpeningImage(entry: SelectedBlock) {
    return (
      entry.block.type === "media" &&
      entry.block.mediaId === props.content.project.previewMediaId
    );
  }
  function isPortrait(entry?: SelectedBlock) {
    if (entry?.block.type !== "media") return false;
    const mediaId = entry.block.mediaId;
    const media = props.content.project.media.find(
      (item) => item.id === mediaId,
    );
    return Boolean(media && media.width / media.height <= 0.8);
  }
  function renderEvidence(entries: SelectedBlock[], className = "") {
    const visibleEntries = entries.filter(
      (entry) => !repeatsOpeningImage(entry),
    );
    return (
      <div
        className={`product-evidence ${className}`.trim()}
        hidden={visibleEntries.length === 0}
        data-portrait-pair={
          visibleEntries.some(
            (entry, index) =>
              isPortrait(entry) && isPortrait(visibleEntries[index + 1]),
          )
            ? ""
            : undefined
        }
      >
        {entries.map((entry) =>
          repeatsOpeningImage(entry) ? (
            // Keep canonical block anchors and order without repeating the cover.
            <div hidden key={entry.block.id}>
              {render(entry)}
            </div>
          ) : (
            render(entry)
          ),
        )}
      </div>
    );
  }
  return (
    <>
      {groups.map(({ owner, evidence }, index) => {
        if (owner.block.type === "decision") {
          if (index > 0 && groups[index - 1].owner.block.type === "decision")
            return null;
          const decisions = [];
          for (
            let offset = index;
            offset < groups.length &&
            groups[offset].owner.block.type === "decision";
            offset++
          )
            decisions.push(groups[offset]);
          const renderDecision = blockRenderer({
            ...props,
            level: Math.min(props.level + 1, 6) as HeadingLevel,
          });
          return (
            <section className="product-case-decisions" key={owner.block.id}>
              <SectionHeading level={props.level}>
                <UiText locale={props.content.locale} id="Key decisions" />
              </SectionHeading>
              <div className="product-decisions">
                {decisions.map((decision) => (
                  <div key={decision.owner.block.id}>
                    {renderDecision(decision.owner)}
                    {decision.evidence.length > 0 &&
                      renderEvidence(decision.evidence)}
                  </div>
                ))}
              </div>
            </section>
          );
        }
        return (
          <div
            className={`product-case-section${evidence.some((entry) => !repeatsOpeningImage(entry)) ? " product-case-section--evidence" : ""}`}
            key={owner.block.id}
            data-record-type={owner.block.type}
          >
            <div className="product-case-section__narrative">
              {owner.block.type === "media" || owner.block.type === "gallery"
                ? renderFullWidth(owner)
                : render(owner)}
            </div>
            {evidence.length > 0 &&
              renderEvidence(evidence, "product-case-section__evidence")}
          </div>
        );
      })}
    </>
  );
}

/** Product reads in normal document flow; each evidence group stays beside its own claim. */
export function ProductCaseStudy({
  content,
  level = 1,
  anchorPrefix = "",
  assetUrl,
  blockRenderers = {},
  IntroRenderer = ProductCaseStudyIntro,
  BodyRenderer = ProductCaseStudyBody,
  afterIntro,
}: ComponentProps<typeof CaseStudy>) {
  return (
    <article className="case-study product-case-study" lang={content.locale}>
      <FallbackNotice content={content} />
      <IntroRenderer content={content} level={level} assetUrl={assetUrl} />
      {afterIntro}
      <div className="case-study-body">
        <BodyRenderer
          content={content}
          level={Math.min(level + 1, 6) as HeadingLevel}
          anchorPrefix={anchorPrefix}
          assetUrl={assetUrl}
          blockRenderers={blockRenderers}
        />
      </div>
    </article>
  );
}
