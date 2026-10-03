import type { ComponentProps } from "react";
import type { CaseStudyIntro } from "@/components/semantic/case-study";
import { SectionHeading } from "@/components/semantic/section-heading";
import { ProjectLinks, ProjectMeta } from "@/components/semantic/project-meta";
import { MediaFrame } from "@/components/semantic/media-frame";
import { CaseStudyOrientation } from "@/components/semantic/case-study-orientation";

export function DigitalCaseStudyIntro({
  content,
  level = 1,
  assetUrl,
}: ComponentProps<typeof CaseStudyIntro>) {
  const { project } = content;
  const media = project.media.find(
    (media) => media.id === project.previewMediaId,
  );
  return (
    <header
      data-motion-id="case-study-intro"
      data-project-slug={project.slug}
      className="case-study-intro digital-case-study-intro"
      data-status={project.status}
    >
      <p className="eyebrow" lang="en">
        Project / {project.slug}
      </p>
      <SectionHeading level={level}>
        <span lang={content.title.lang}>{content.title.value}</span>
      </SectionHeading>
      {media && (
        <div className="digital-case-study-intro__media">
          <MediaFrame
            media={media}
            locale={content.locale}
            assetUrl={assetUrl}
            loading="eager"
          />
        </div>
      )}
      <div className="digital-case-study-intro__record">
        <div>
          {content.summary && (
            <p lang={content.summary.lang}>{content.summary.value}</p>
          )}
          {content.description && (
            <p lang={content.description.lang}>{content.description.value}</p>
          )}
          <ProjectLinks project={project} />
        </div>
        <CaseStudyOrientation content={content} />
        <ProjectMeta project={project} exclude={["Role", "Status"]} />
      </div>
    </header>
  );
}
