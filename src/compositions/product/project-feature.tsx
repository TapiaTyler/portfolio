import Link from "next/link";
import { type ComponentProps } from "react";
import { ProjectFeature } from "@/components/semantic/project-feature";
import { MediaFrame } from "@/components/semantic/media-frame";
import { SectionHeading } from "@/components/semantic/section-heading";
import { Text } from "@/components/localized-text";
import { interfaceCopy } from "@/lib/i18n/messages";
import { projectStatusLabels } from "@/lib/content/status";
import { capabilities } from "@/registries/capabilities";

export function ProductProjectFeature({
  content,
  href,
  level = 3,
  assetUrl,
}: ComponentProps<typeof ProjectFeature>) {
  const { project, locale } = content;
  const media = project.media.find(
    (item) => item.id === project.previewMediaId,
  );
  return (
    <article
      className={`product-project${media ? " product-project--media" : ""}`}
      data-motion-id={`project-${project.slug}`}
      data-project-slug={project.slug}
      lang="en"
    >
      <div className="product-project__copy">
        <SectionHeading level={level}>
          <Link href={href} lang={content.title.lang}>
            {content.title.value}
          </Link>
        </SectionHeading>
        <p className="product-project__status">
          <Text
            value={interfaceCopy(projectStatusLabels[project.status])}
            locale={locale}
          />
        </p>
        {content.summary && (
          <p lang={content.summary.lang}>{content.summary.value}</p>
        )}
        {project.capabilityIds.length > 0 && (
          <ul className="product-project__focus">
            {project.capabilityIds.map((id) => (
              <li key={id}>
                <Text
                  value={interfaceCopy(capabilities[id].label)}
                  locale={locale}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
      {media && (
        <MediaFrame
          media={media}
          locale={locale}
          assetUrl={assetUrl}
          sizes="(max-width: 600px) 85vw, (max-width: 900px) 30vw, 220px"
        />
      )}
    </article>
  );
}
