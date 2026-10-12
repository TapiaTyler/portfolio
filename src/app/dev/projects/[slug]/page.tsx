import Link from "next/link";
import { notFound } from "next/navigation";
import { projectSchema } from "@/lib/content/schema";
import { isLocale } from "@/lib/i18n/locales";
import { selectProjectContent } from "@/lib/i18n/project-content";
import { getActiveTheme } from "@/lib/theme/server";
import { resolveComposition } from "@/registries/compositions";

export default async function DraftProjectPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ locale?: string }>;
}) {
  if (process.env.NODE_ENV !== "development") notFound();
  // Draft lookup is confined to this guarded preview; public selectors keep their gate.
  const { projectRecords } = await import("@/content/projects");
  const { slug } = await params;
  const locale = (await searchParams).locale ?? "en";
  if (!isLocale(locale)) notFound();
  const record = projectRecords.find((record) => record.slug === slug);
  if (!record) notFound();
  const content = selectProjectContent(projectSchema.parse(record), locale);
  const composition = resolveComposition(await getActiveTheme());
  return (
    <div className="draft-project-review">
      <header className="page-intro">
        <p className="eyebrow">Development only / draft project review</p>
        <h1>Draft project preview</h1>
        <p>
          One canonical draft in the active composition. Final copy and media
          are pending review.
        </p>
        <nav className="project-links" aria-label="Preview language">
          <Link
            href={`?locale=en`}
            aria-current={locale === "en" ? "page" : undefined}
          >
            English source
          </Link>
          <Link
            href={`?locale=ja`}
            aria-current={locale === "ja" ? "page" : undefined}
          >
            Japanese fallback
          </Link>
          <Link href="/dev/compositions">Synthetic composition fixtures</Link>
        </nav>
      </header>
      <div data-theme-transition-scope>
        <composition.ProjectFeature
          content={content}
          href="#pilot-case-study"
          level={2}
        />
        <div id="pilot-case-study">
          <composition.CaseStudy
            content={content}
            level={2}
            IntroRenderer={composition.CaseStudyIntro}
            blockRenderers={composition.blockRenderers}
          />
        </div>
      </div>
    </div>
  );
}
