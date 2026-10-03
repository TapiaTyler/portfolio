import Link from "next/link";
import type { HomepageProps } from "@/components/semantic/homepage";
import {
  HomeSectionHeader,
  CapabilityList,
  ProfilePreview,
  LabPreview,
  ContactClosing,
} from "@/components/semantic/homepage";
import { ProjectIndex } from "@/components/semantic/project-index";
import { selectProjectContent } from "@/lib/i18n/project-content";
import { EngineerHero } from "./hero";
import { EngineerProjectFeature } from "./project-feature";

export function EngineerHomepage({
  content,
  projects,
  locale,
  projectHref,
  assetUrl,
}: HomepageProps) {
  return (
    <div className="homepage engineer-homepage" lang="en">
      <div className="engineer-hero-grid">
        <EngineerHero content={content.hero} locale={locale} />
        <section
          className="engineer-project-overview"
          data-motion-id="hero-visual"
          aria-labelledby="project-overview-heading"
        >
          <h2 id="project-overview-heading" className="engineer-panel-label">
            Project overview
          </h2>
          <div className="engineer-project-overview__body">
            <p className="engineer-index-count">
              {projects.length} selected{" "}
              {projects.length === 1 ? "project" : "projects"}
            </p>
            {projects.length ? (
              <ul>
                {projects.map((project) => {
                  const selected = selectProjectContent(project, locale);
                  return (
                    <li key={project.slug}>
                      <Link
                        href={
                          projectHref?.(project) ??
                          `/${locale}/work/${project.slug}`
                        }
                        lang={selected.title.lang}
                      >
                        {selected.title.value}
                      </Link>
                      <span lang="en" data-project-status={project.status}>
                        {project.status}
                      </span>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="empty-content">{content.work.emptyText}</p>
            )}
            <div className="engineer-route-study" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
        </section>
      </div>
      <section
        className="home-section selected-work"
        data-motion-id="work"
        data-motion-group
        aria-labelledby="selected-work-heading"
      >
        <HomeSectionHeader
          title={content.work.title}
          id="selected-work-heading"
          href={`/${locale}/work`}
          linkLabel={content.work.linkLabel}
        />
        {projects.length ? (
          <ProjectIndex
            projects={projects}
            locale={locale}
            level={3}
            FeatureRenderer={EngineerProjectFeature}
            projectHref={projectHref}
            assetUrl={assetUrl}
          />
        ) : (
          <p className="empty-content">{content.work.emptyText}</p>
        )}
      </section>
      <CapabilityList content={content.capabilities} />
      <div className="engineer-secondary-grid">
        <LabPreview content={content.lab} locale={locale} />
        <ProfilePreview content={content.about} locale={locale} />
      </div>
      <ContactClosing content={content.contact} locale={locale} />
    </div>
  );
}
