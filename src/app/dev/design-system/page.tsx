import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/semantic/case-study";
import { ProjectFeature } from "@/components/semantic/project-feature";
import { isLocale } from "@/lib/i18n/locales";
import { selectProjectContent } from "@/lib/i18n/project-content";
import { createProjectRegistry } from "@/lib/content/registry";

export default async function DesignSystemPage({
  searchParams,
}: {
  searchParams: Promise<{ locale?: string; project?: string }>;
}) {
  if (process.env.NODE_ENV !== "development") notFound();
  const { fixtureProjects } = await import("@/content/fixtures/projects");
  const query = await searchParams;
  const locale = query.locale ?? "en";
  if (typeof locale !== "string" || !isLocale(locale)) notFound();
  const fixtures = createProjectRegistry(fixtureProjects, {
    allowFixtures: true,
  });
  const project = fixtures.getProject(query.project ?? "fixture-system");
  if (!project) notFound();
  const assetUrl = (source: string) =>
    source.replace("/media/fixtures/", "/dev/fixtures/");

  return (
    <>
      <header className="page-intro" data-motion-id="page-intro">
        <p className="eyebrow">Development only</p>
        <h1>Shared semantic rendering</h1>
        <p>
          Synthetic fixtures for reviewing the common fallback components. This
          is a provisional baseline for the three presentation modes.
        </p>
        <nav className="project-links" aria-label="Preview language">
          {["en", "ja"].map((option) => (
            <Link
              key={option}
              href={`/dev/design-system?locale=${option}&project=${project.slug}`}
              aria-current={locale === option ? "page" : undefined}
            >
              {option.toUpperCase()}
            </Link>
          ))}
        </nav>
      </header>
      <section aria-labelledby="previews-heading">
        <h2 id="previews-heading">Project previews</h2>
        <div className="project-index">
          {fixtures.getPublishedProjects().map((fixture) => (
            <ProjectFeature
              key={fixture.slug}
              content={selectProjectContent(fixture, locale)}
              href={`/dev/design-system?locale=${locale}&project=${fixture.slug}#selected-case-study`}
              level={3}
              assetUrl={assetUrl}
            />
          ))}
        </div>
      </section>
      <section
        id="selected-case-study"
        aria-label="Selected fixture case study"
      >
        <p className="eyebrow">Selected fixture / full case study</p>
        <CaseStudy
          content={selectProjectContent(project, locale)}
          level={2}
          anchorPrefix={`${project.slug}-`}
          assetUrl={assetUrl}
        />
      </section>
    </>
  );
}
