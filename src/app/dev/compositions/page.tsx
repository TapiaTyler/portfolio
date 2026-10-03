import Link from "next/link";
import { notFound } from "next/navigation";
import { themeIds } from "@/lib/theme/ids";
import { isLocale } from "@/lib/i18n/locales";
import { selectProjectContent } from "@/lib/i18n/project-content";
import { createProjectRegistry } from "@/lib/content/registry";
import { resolveComposition } from "@/registries/compositions";
import { themeRegistry } from "@/registries/themes";
import { getActiveTheme } from "@/lib/theme/server";
import { homepageContent } from "@/content/placeholder";
import { pageContent } from "@/content/pages";

export default async function CompositionsPage({
  searchParams,
}: {
  searchParams: Promise<{
    locale?: string;
    project?: string;
    surface?: string;
    motion?: string;
  }>;
}) {
  if (process.env.NODE_ENV !== "development") notFound();
  const { fixtureProjects } = await import("@/content/fixtures/projects");
  const query = await searchParams;
  const locale = query.locale ?? "en";
  if (!isLocale(locale)) notFound();
  const catalog = createProjectRegistry(fixtureProjects, {
    allowFixtures: true,
  });
  const project = catalog.getProject(query.project ?? "fixture-system");
  if (!project) notFound();
  const content = selectProjectContent(project, locale);
  const reduced = query.motion === "reduce";
  const disclosurePreview = (
    <Link
      href={`?surface=project&project=fixture-system&locale=${locale}${reduced ? "&motion=reduce" : ""}#technical`}
    >
      Review technical disclosures in the active theme
    </Link>
  );
  const motionControls = (
    <nav className="project-links" aria-label="Preview motion">
      {["default", "reduce"].map((motion) => (
        <Link
          key={motion}
          href={`?locale=${locale}&project=${project.slug}&surface=${query.surface === "homepage" ? "homepage" : "case-study"}&motion=${motion}`}
          aria-current={(motion === "reduce") === reduced ? "page" : undefined}
        >
          {motion === "reduce" ? "Reduced motion" : "Default motion"}
        </Link>
      ))}
    </nav>
  );
  const assetUrl = (src: string) =>
    src.replace("/media/fixtures/", "/dev/fixtures/");
  if (query.surface === "work") {
    const composition = resolveComposition(await getActiveTheme());
    return (
      <>
        <p className="eyebrow">Development only / synthetic Work collection</p>
        <Link href="/dev/compositions">Compare case studies</Link>
        <composition.SecondaryPage
          content={pageContent.work}
          locale={locale}
          projects={catalog.getPublishedProjects()}
          assetUrl={assetUrl}
          projectHref={(record) =>
            `/dev/compositions?surface=project&project=${record.slug}&locale=${locale}`
          }
        />
      </>
    );
  }
  if (query.surface === "project") {
    const composition = resolveComposition(await getActiveTheme());
    return (
      <div className={reduced ? "motion-preview--reduced" : undefined}>
        <p className="eyebrow">Development only / selected synthetic project</p>
        <Link
          href={`?surface=homepage&locale=${locale}${reduced ? "&motion=reduce" : ""}`}
        >
          Return to project cards
        </Link>
        <composition.CaseStudy
          content={content}
          level={1}
          assetUrl={assetUrl}
          IntroRenderer={composition.CaseStudyIntro}
          blockRenderers={composition.blockRenderers}
        />
      </div>
    );
  }
  if (query.surface === "homepage") {
    const composition = resolveComposition(await getActiveTheme());
    return (
      <>
        <p className="eyebrow">Development only / synthetic homepage content</p>
        <Link href="/dev/compositions">Compare case studies</Link>
        <p>{disclosurePreview}</p>
        {motionControls}
        <div
          className={reduced ? "motion-preview--reduced" : undefined}
          data-theme-transition-scope
        >
          <composition.Homepage
            content={homepageContent}
            locale={locale}
            projects={catalog.getPublishedProjects()}
            assetUrl={assetUrl}
            projectHref={(record) =>
              `/dev/compositions?locale=${locale}&project=${record.slug}&surface=project${reduced ? "&motion=reduce" : ""}`
            }
          />
        </div>
      </>
    );
  }
  return (
    <>
      <header className="page-intro" data-motion-id="page-intro">
        <p className="eyebrow">Development only</p>
        <h1>Composition comparison</h1>
        <p>
          Compare the same content through each registered composition.
          Editorial uses a publication layout; Engineer uses system records.
          Digital uses a spatial project deck and media-led introduction.
        </p>
        <Link href="?surface=homepage">
          Preview populated homepage in the active mode
        </Link>
        <p>
          <Link href="?surface=work">
            Preview populated Work collection in the active mode
          </Link>
        </p>
        <p>
          <Link href="/dev/projects/portfolio">
            Review the portfolio pilot draft
          </Link>
        </p>
        <p>{disclosurePreview}</p>
        <nav className="project-links" aria-label="Fixture selection">
          {catalog.getPublishedProjects().map((fixture) => (
            <Link
              key={fixture.slug}
              href={`?locale=${locale}&project=${fixture.slug}&motion=${reduced ? "reduce" : "default"}`}
              aria-current={fixture.slug === project.slug ? "page" : undefined}
            >
              {fixture.locale.en.title}
            </Link>
          ))}
        </nav>
        <nav className="project-links" aria-label="Preview language">
          {["en", "ja"].map((option) => (
            <Link
              key={option}
              href={`?locale=${option}&project=${project.slug}&motion=${reduced ? "reduce" : "default"}`}
              aria-current={option === locale ? "page" : undefined}
            >
              {option.toUpperCase()}
            </Link>
          ))}
        </nav>
        {motionControls}
      </header>
      <div className="composition-previews">
        {themeIds.map((theme) => {
          const composition = resolveComposition(theme);
          return (
            <section
              className={`composition-preview${reduced ? " motion-preview--reduced" : ""}`}
              data-theme={theme}
              data-composition={theme}
              key={theme}
              aria-labelledby={`${theme}-preview-heading`}
            >
              <h2 id={`${theme}-preview-heading`}>
                {themeRegistry[theme].label}
              </h2>
              <composition.ProjectFeature
                content={content}
                href={`?locale=${locale}&project=${project.slug}#${theme}-case-study`}
                level={3}
                assetUrl={assetUrl}
              />
              <div id={`${theme}-case-study`}>
                <composition.CaseStudy
                  content={content}
                  level={3}
                  anchorPrefix={`${theme}-${project.slug}-`}
                  assetUrl={assetUrl}
                  IntroRenderer={composition.CaseStudyIntro}
                  blockRenderers={composition.blockRenderers}
                />
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
