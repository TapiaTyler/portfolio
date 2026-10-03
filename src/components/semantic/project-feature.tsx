import Link from "next/link";
import type { ProjectContent } from "@/lib/i18n/project-content";
import { MediaFrame, type AssetUrl } from "./media-frame";
import { FallbackNotice } from "./fallback-notice";
import { ProjectMeta } from "./project-meta";
import { SectionHeading, type HeadingLevel } from "./section-heading";

export function ProjectFeature({
  content,
  href,
  level = 2,
  assetUrl,
}: {
  content: ProjectContent;
  href: string;
  level?: HeadingLevel;
  assetUrl?: AssetUrl;
}) {
  const { project } = content;
  const media = project.media.find(
    (media) => media.id === project.previewMediaId,
  );
  return (
    <article
      className="project-feature"
      lang={content.locale}
      data-motion-id={`project-${content.project.slug}`}
    >
      <SectionHeading level={level}>
        <Link href={href} lang={content.title.lang}>
          {content.title.value}
        </Link>
      </SectionHeading>
      {content.summary && (
        <p lang={content.summary.lang}>{content.summary.value}</p>
      )}
      <FallbackNotice content={content} />
      <ProjectMeta project={project} />
      {media && (
        <MediaFrame media={media} locale={content.locale} assetUrl={assetUrl} />
      )}
      <Link className="text-link" href={href} lang="en">
        Explore the project <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}
