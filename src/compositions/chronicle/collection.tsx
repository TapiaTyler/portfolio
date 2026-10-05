import Link from "next/link";
import { projectStatusLabels } from "@/lib/content/status";
import type { Project } from "@/lib/content/schema";
import type { Locale } from "@/lib/i18n/locales";
import { selectProjectContent } from "@/lib/i18n/project-content";
import { CaseStudyBlock } from "@/components/semantic/case-study-block";
import { MediaFrame, type AssetUrl } from "@/components/semantic/media-frame";
import { ChronicleProjectFeature } from "./project-feature";
import { ChronicleSelection } from "./selection";
import { ChronicleProjectPreview } from "./preview";
import { ProjectMeta } from "@/components/semantic/project-meta";

export function ChronicleCollection({
  projects,
  locale,
  projectHref = (project) => `/${locale}/work/${project.slug}`,
  assetUrl,
  showPreview = true,
}: {
  projects: Project[];
  locale: Locale;
  projectHref?: (project: Project) => string;
  assetUrl?: AssetUrl;
  showPreview?: boolean;
}) {
  return (
    <ChronicleSelection
      showPreview={showPreview}
      items={projects.map((project) => {
        const content = selectProjectContent(project, locale);
        const overview = content.blocks.find(
          (entry) => entry.block.type === "intro",
        );
        const media = project.media.find(
          (item) => item.id === project.previewMediaId,
        );
        const href = projectHref(project);
        const approach = content.blocks.find(
          (entry) =>
            entry.block.type === "architecture" ||
            entry.block.type === "decision",
        );
        const outcome = content.blocks.find(
          (entry) => entry.block.type === "result",
        );
        const images = project.media
          .filter((item) => item.type === "image")
          .slice(0, 3);
        const renderBlock = (entry: (typeof content.blocks)[number]) => (
          <CaseStudyBlock
            entry={entry}
            project={project}
            locale={locale}
            level={4}
            anchorPrefix={`chronicle-preview-${project.slug}-`}
            assetUrl={assetUrl}
          />
        );
        const chapters = [
          {
            id: "overview",
            label: "Overview",
            content: (
              <>
                {content.description && (
                  <p lang={content.description.lang}>
                    {content.description.value}
                  </p>
                )}
                {overview && renderBlock(overview)}
              </>
            ),
          },
          {
            id: "topics",
            label: "Topics",
            content: (
              <ProjectMeta
                project={project}
                exclude={["Status", "Year", "Role"]}
              />
            ),
          },
          ...(approach
            ? [
                {
                  id: "approach",
                  label: "Approach",
                  content: renderBlock(approach),
                },
              ]
            : []),
          ...(images.length
            ? [
                {
                  id: "screenshots",
                  label: "Screenshots",
                  content: (
                    <div className="chronicle-preview__screenshots">
                      {images.map((image) => (
                        <MediaFrame
                          key={image.id}
                          media={image}
                          locale={locale}
                          assetUrl={assetUrl}
                        />
                      ))}
                    </div>
                  ),
                },
              ]
            : []),
          ...(outcome
            ? [
                {
                  id: "outcome",
                  label: "Outcome",
                  content: renderBlock(outcome),
                },
              ]
            : []),
        ];
        return {
          slug: project.slug,
          title: content.title.value,
          card: (
            <ChronicleProjectFeature
              content={content}
              href={href}
              level={3}
              assetUrl={assetUrl}
              previewOnly={showPreview}
            />
          ),
          preview: showPreview ? (
            <ChronicleProjectPreview
              chapters={chapters}
              identity={
                <>
                  <p className="eyebrow" lang="en">
                    Project
                  </p>
                  <h3 lang={content.title.lang}>{content.title.value}</h3>
                  <p className="chronicle-status" lang="en">
                    {projectStatusLabels[project.status]}
                  </p>
                  {content.summary && (
                    <p lang={content.summary.lang}>{content.summary.value}</p>
                  )}
                </>
              }
              evidence={
                media && (
                  <div className="chronicle-media-stack">
                    {[
                      ...images
                        .filter((image) => image.id !== media.id)
                        .slice(0, 2),
                      media,
                    ].map((image) => (
                      <MediaFrame
                        key={image.id}
                        media={image}
                        locale={locale}
                        assetUrl={assetUrl}
                      />
                    ))}
                  </div>
                )
              }
              action={
                <Link className="chronicle-action" href={href} lang="en">
                  View Details
                </Link>
              }
            />
          ) : null,
        };
      })}
    />
  );
}
