import { type CopyText } from "@/lib/i18n/copy";
import { message } from "@/lib/i18n/messages";
import { type ProjectContent } from "@/lib/i18n/project-content";
import { type ComponentProps, type ComponentType, type ReactNode } from "react";
import { type BlockRenderers } from "@/compositions/contract";
import { CaseStudyBlock } from "./case-study-block";
import { FallbackNotice } from "./fallback-notice";
import { MediaFrame, type AssetUrl } from "./media-frame";
import { ProjectLinks, ProjectMeta } from "./project-meta";
import { SectionHeading, type HeadingLevel } from "./section-heading";
import { CaseStudyOrientation } from "./case-study-orientation";
import { CaseStudyTitle } from "./case-study-title";
import { CaseStudyNavigation } from "./case-study-navigation";
import { caseStudySections } from "@/lib/content/case-study-sections";

export function CaseStudyIntro({
  content,
  level = 1,
  assetUrl,
}: {
  content: ProjectContent;
  level?: HeadingLevel;
  assetUrl?: AssetUrl;
}) {
  const { project } = content;
  const media = project.media.find(
    (media) => media.id === project.previewMediaId,
  );
  return (
    <header
      className="case-study-intro"
      data-motion-id="case-study-intro"
      data-project-slug={project.slug}
    >
      <SectionHeading level={level}>
        <CaseStudyTitle title={content.title} />
      </SectionHeading>
      {content.summary && (
        <p lang={content.summary.lang}>{content.summary.value}</p>
      )}
      {content.description && (
        <p lang={content.description.lang}>{content.description.value}</p>
      )}
      <CaseStudyOrientation content={content} />
      <ProjectMeta
        locale={content.locale}
        project={project}
        exclude={["Role", "Status"]}
      />
      <ProjectLinks locale={content.locale} project={project} />
      {media && (
        <MediaFrame media={media} locale={content.locale} assetUrl={assetUrl} />
      )}
    </header>
  );
}

export function CaseStudy({
  content,
  level = 1,
  anchorPrefix = "",
  assetUrl,
  IntroRenderer = CaseStudyIntro,
  blockRenderers = {},
  afterIntro,
  BodyRenderer = CaseStudyBody,
  navigationLabel,
  navigationDirectory,
  containedReading = false,
  navigationLabels,
}: {
  content: ProjectContent;
  level?: HeadingLevel;
  anchorPrefix?: string;
  assetUrl?: AssetUrl;
  IntroRenderer?: ComponentType<ComponentProps<typeof CaseStudyIntro>>;
  blockRenderers?: BlockRenderers;
  afterIntro?: ReactNode;
  BodyRenderer?: ComponentType<CaseStudyBodyProps>;
  navigationLabel?: CopyText;
  navigationDirectory?: string;
  containedReading?: boolean;
  navigationLabels?: Record<string, CopyText>;
}) {
  const blockLevel = Math.min(level + 1, 6) as HeadingLevel;
  const sections = caseStudySections(content, anchorPrefix);
  return (
    <article className="case-study" lang={content.locale}>
      <FallbackNotice content={content} />
      <IntroRenderer content={content} level={level} assetUrl={assetUrl} />
      {afterIntro}
      <div
        className={
          sections.length > 1 ? "case-study-reading-layout" : undefined
        }
      >
        {sections.length > 1 && (
          <CaseStudyNavigation
            locale={content.locale}
            sections={sections}
            label={navigationLabel}
            directoryRoot={navigationDirectory}
            labels={navigationLabels}
          />
        )}
        <div
          className="case-study-body"
          tabIndex={containedReading ? 0 : undefined}
          role={containedReading ? "region" : undefined}
          aria-label={
            containedReading
              ? message(content.locale, "Case study reading panel")
              : undefined
          }
        >
          <BodyRenderer
            content={content}
            level={blockLevel}
            anchorPrefix={anchorPrefix}
            assetUrl={assetUrl}
            blockRenderers={blockRenderers}
          />
        </div>
      </div>
    </article>
  );
}

export interface CaseStudyBodyProps {
  content: ProjectContent;
  level: HeadingLevel;
  anchorPrefix: string;
  assetUrl?: AssetUrl;
  blockRenderers: BlockRenderers;
}

function CaseStudyBody({
  content,
  level,
  anchorPrefix,
  assetUrl,
  blockRenderers,
}: CaseStudyBodyProps) {
  return (
    <>
      {content.blocks.map((entry) => {
        const Renderer = blockRenderers[entry.block.type] ?? CaseStudyBlock;
        return (
          <Renderer
            key={entry.block.id}
            entry={entry}
            project={content.project}
            locale={content.locale}
            level={level}
            anchorPrefix={anchorPrefix}
            assetUrl={assetUrl}
          />
        );
      })}
    </>
  );
}
