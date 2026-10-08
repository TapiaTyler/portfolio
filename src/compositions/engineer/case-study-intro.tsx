import { UiText } from "@/components/ui-text";
import { type ComponentProps } from "react";
import { type CaseStudyIntro } from "@/components/semantic/case-study";
import { SectionHeading } from "@/components/semantic/section-heading";
import { ProjectMeta, ProjectLinks } from "@/components/semantic/project-meta";
import { MediaFrame } from "@/components/semantic/media-frame";
import { CaseStudyOrientation } from "@/components/semantic/case-study-orientation";

export function EngineerCaseStudyIntro({
  content,
  level = 1,
  assetUrl,
}: ComponentProps<typeof CaseStudyIntro>) {
  const locale = content.locale;
  const media = content.project.media.find(
    (media) => media.id === content.project.previewMediaId,
  );
  return (
    <header
      className="case-study-intro engineer-case-study-intro"
      data-motion-id="case-study-intro"
    >
      <p className="engineer-panel-label" lang="en">
        <UiText locale={locale} id="Project identity /" />{" "}
        {content.project.slug}
      </p>
      <div className="engineer-case-study-intro__body">
        <SectionHeading level={level}>
          <span lang={content.title.lang}>{content.title.value}</span>
        </SectionHeading>
        <div className="engineer-case-study-intro__record">
          <div className="engineer-case-study-intro__context">
            {content.summary && (
              <p lang={content.summary.lang}>{content.summary.value}</p>
            )}
            {content.description && (
              <p lang={content.description.lang}>{content.description.value}</p>
            )}
            <ProjectLinks locale={content.locale} project={content.project} />
          </div>
          <ProjectMeta
            locale={content.locale}
            project={content.project}
            exclude={["Role", "Status"]}
          />
        </div>
        <CaseStudyOrientation content={content} />
        {media && (
          <MediaFrame
            media={media}
            locale={content.locale}
            assetUrl={assetUrl}
          />
        )}
      </div>
    </header>
  );
}
