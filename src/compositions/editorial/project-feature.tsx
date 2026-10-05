import Link from "next/link";
import type { ComponentProps } from "react";
import type { ProjectFeature } from "@/components/semantic/project-feature";
import { SectionHeading } from "@/components/semantic/section-heading";
import { MediaFrame } from "@/components/semantic/media-frame";
import { FallbackNotice } from "@/components/semantic/fallback-notice";
import { projectStatusLabels } from "@/lib/content/status";
import { technologies } from "@/registries/technologies";

export function EditorialProjectFeature({
  content,
  href,
  level = 2,
  assetUrl,
}: ComponentProps<typeof ProjectFeature>) {
  const media = content.project.media.find(
    (media) => media.id === content.project.previewMediaId,
  );
  // A one-line kicker, as a magazine feature would carry: the full metadata
  // table belongs to the case study, not the index.
  const kicker = [
    content.project.year?.toString(),
    projectStatusLabels[content.project.status],
    content.project.technologyIds
      .slice(0, 3)
      .map((id) => technologies[id].label)
      .join(", "),
  ].filter(Boolean);
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
        <p className="editorial-project__kicker" lang="en">
          {kicker.join(" · ")}
        </p>
        {content.summary && (
          <p lang={content.summary.lang}>{content.summary.value}</p>
        )}
        <FallbackNotice content={content} />
        <Link className="text-link" href={href} lang="en">
          Explore the Project
        </Link>
      </div>
    </article>
  );
}
