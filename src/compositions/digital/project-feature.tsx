import { UiText } from "@/components/ui-text";
import Link from "next/link";
import { type ComponentProps } from "react";
import { type ProjectFeature } from "@/components/semantic/project-feature";
import { SectionHeading } from "@/components/semantic/section-heading";
import { ProjectMeta } from "@/components/semantic/project-meta";
import { MediaFrame } from "@/components/semantic/media-frame";
import { FallbackNotice } from "@/components/semantic/fallback-notice";

export function DigitalProjectFeature({
  content,
  href,
  level = 2,
  assetUrl,
}: ComponentProps<typeof ProjectFeature>) {
  const { project, locale } = content;
  const media = project.media.find(
    (media) => media.id === project.previewMediaId,
  );
  return (
    <article
      data-motion-id={`project-${project.slug}`}
      data-project-slug={project.slug}
      className="project-feature digital-project"
      lang={content.locale}
      data-status={project.status}
    >
      <header className="digital-project__bar" lang="en">
        <span>{project.slug}</span>
        <span className="digital-badge">{project.status}</span>
      </header>
      <SectionHeading level={level}>
        <Link href={href} lang={content.title.lang}>
          {content.title.value}
        </Link>
      </SectionHeading>
      {media && (
        <div className="digital-project__media">
          <MediaFrame
            media={media}
            locale={content.locale}
            assetUrl={assetUrl}
          />
        </div>
      )}
      {content.summary && (
        <p lang={content.summary.lang}>{content.summary.value}</p>
      )}
      <FallbackNotice content={content} />
      <ProjectMeta locale={content.locale} project={project} />
      <Link className="text-link" href={href} lang="en">
        <UiText locale={locale} id="Explore the Project" />
      </Link>
    </article>
  );
}
