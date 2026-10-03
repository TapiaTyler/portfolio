import Link from "next/link";
import type { ComponentProps } from "react";
import type { ProjectFeature } from "@/components/semantic/project-feature";
import { SectionHeading } from "@/components/semantic/section-heading";
import { ProjectMeta } from "@/components/semantic/project-meta";
import { MediaFrame } from "@/components/semantic/media-frame";
import { FallbackNotice } from "@/components/semantic/fallback-notice";

export function EditorialProjectFeature({
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
      className={`project-feature editorial-project${media ? " editorial-project--media" : ""}`}
      lang={content.locale}
    >
      <div className="editorial-project__title">
        <SectionHeading level={level}>
          <Link href={href} lang={content.title.lang}>
            {content.title.value}
          </Link>
        </SectionHeading>
      </div>
      {media && (
        <div className="editorial-project__media">
          <MediaFrame
            media={media}
            locale={content.locale}
            assetUrl={assetUrl}
          />
        </div>
      )}
      <div className="editorial-project__narrative">
        {content.summary && (
          <p lang={content.summary.lang}>{content.summary.value}</p>
        )}
        <FallbackNotice content={content} />
        <ProjectMeta project={content.project} />
        <Link className="text-link" href={href} lang="en">
          Explore the project
        </Link>
      </div>
    </article>
  );
}
