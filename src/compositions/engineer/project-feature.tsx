import Link from "next/link";
import type { ComponentProps } from "react";
import type { ProjectFeature } from "@/components/semantic/project-feature";
import { SectionHeading } from "@/components/semantic/section-heading";
import { ProjectMeta } from "@/components/semantic/project-meta";
import { MediaFrame } from "@/components/semantic/media-frame";
import { FallbackNotice } from "@/components/semantic/fallback-notice";

export function EngineerProjectFeature({
  content,
  href,
  level = 2,
  assetUrl,
}: ComponentProps<typeof ProjectFeature>) {
  const media = content.project.media.find(
    (media) => media.id === content.project.previewMediaId,
  );
  return (
    <article
      data-motion-id={`project-${content.project.slug}`}
      className={`project-feature engineer-project${media ? " engineer-project--media" : ""}`}
      lang={content.locale}
    >
      <header className="engineer-project__header">
        <p className="engineer-record-id" lang="en">
          Project / {content.project.slug}
        </p>
        <SectionHeading level={level}>
          <Link href={href} lang={content.title.lang}>
            {content.title.value}
          </Link>
        </SectionHeading>
      </header>
      <div className="engineer-project__body">
        {media && (
          <div className="engineer-project__evidence">
            <MediaFrame
              media={media}
              locale={content.locale}
              assetUrl={assetUrl}
            />
          </div>
        )}
        <div className="engineer-project__dossier">
          <ProjectMeta project={content.project} />
          {content.summary && (
            <p lang={content.summary.lang}>{content.summary.value}</p>
          )}
          <FallbackNotice content={content} />
          <Link className="text-link" href={href} lang="en">
            Explore the Project
          </Link>
        </div>
      </div>
    </article>
  );
}
