import { Text } from "@/components/localized-text";
import { interfaceCopy } from "@/lib/i18n/messages";
import Link from "next/link";
import { projectStatusLabels } from "@/lib/content/status";
import { ChronicleTopics } from "./topics";
import { type ComponentProps } from "react";
import { type ProjectFeature } from "@/components/semantic/project-feature";
import { SectionHeading } from "@/components/semantic/section-heading";
import { MediaFrame } from "@/components/semantic/media-frame";
import { FallbackNotice } from "@/components/semantic/fallback-notice";

export function ChronicleProjectFeature({
  content,
  href,
  level = 2,
  assetUrl,
  previewOnly = false,
}: ComponentProps<typeof ProjectFeature> & { previewOnly?: boolean }) {
  const media = content.project.media.find(
    (item) => item.id === content.project.previewMediaId,
  );
  return (
    <article
      className="project-feature chronicle-project"
      tabIndex={previewOnly ? 0 : undefined}
      lang={content.locale}
      data-project-slug={content.project.slug}
      data-has-media={Boolean(media)}
      data-motion-id={`project-${content.project.slug}`}
    >
      {media && (
        <MediaFrame
          media={media}
          locale={content.locale}
          assetUrl={assetUrl}
          loading="eager"
          // Card thumbnails follow the scenic hero in loading priority. Keep them
          // eager so horizontal selection never waits for lazy-load proximity.
          fetchPriority="low"
          sizes="(max-width: 900px) and (orientation: portrait) 90vw, (max-height: 500px) 35vw, 18vw"
        />
      )}
      <div className="chronicle-project__record">
        <SectionHeading level={level}>
          {previewOnly ? (
            <>
              <span
                className="chronicle-project__preview-title"
                lang={content.title.lang}
              >
                {content.title.value}
              </span>
              <noscript>
                <style>{`.chronicle-project__preview-title{display:none!important}`}</style>
                <Link href={href} lang={content.title.lang}>
                  {content.title.value}
                </Link>
              </noscript>
            </>
          ) : (
            <Link href={href} lang={content.title.lang}>
              {content.title.value}
            </Link>
          )}
        </SectionHeading>
        <p className="chronicle-status" lang="en">
          <Text
            value={interfaceCopy(projectStatusLabels[content.project.status])}
            locale={content.locale}
          />
        </p>
        {content.summary && (
          <p lang={content.summary.lang}>{content.summary.value}</p>
        )}
        <FallbackNotice content={content} />
      </div>
      <div className="chronicle-project__topics">
        <ChronicleTopics locale={content.locale} project={content.project} />
      </div>
    </article>
  );
}
