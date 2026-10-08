import { type Project } from "@/lib/content/schema";
import { type ComponentProps, type ComponentType } from "react";
import { type Locale } from "@/lib/i18n/locales";
import { selectProjectContent } from "@/lib/i18n/project-content";
import { ProjectFeature } from "./project-feature";
import { type HeadingLevel } from "./section-heading";

export function ProjectIndex({
  projects,
  locale,
  level = 2,
  FeatureRenderer = ProjectFeature,
  projectHref,
  assetUrl,
}: {
  projects: Project[];
  locale: Locale;
  level?: HeadingLevel;
  FeatureRenderer?: ComponentType<ComponentProps<typeof ProjectFeature>>;
  projectHref?: (project: Project) => string;
  assetUrl?: ComponentProps<typeof ProjectFeature>["assetUrl"];
}) {
  return (
    <div className="project-index">
      {projects.map((project) => (
        <FeatureRenderer
          key={project.slug}
          content={selectProjectContent(project, locale)}
          href={projectHref?.(project) ?? `/${locale}/work/${project.slug}`}
          level={level}
          assetUrl={assetUrl}
        />
      ))}
    </div>
  );
}
