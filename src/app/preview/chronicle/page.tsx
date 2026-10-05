import { notFound } from "next/navigation";
import { homepageContent } from "@/content/placeholder";
import { pageContent } from "@/content/pages";
import { projectSchema } from "@/lib/content/schema";
import { selectProjectContent } from "@/lib/i18n/project-content";
import { getActiveTheme } from "@/lib/theme/server";
import { resolveComposition } from "@/registries/compositions";

// Review real drafts in the actual site shell without changing public selectors.
export default async function ChronicleReviewPage({
  searchParams,
}: {
  searchParams: Promise<{ project?: string; surface?: string }>;
}) {
  if (process.env.NODE_ENV !== "development") notFound();
  const { projectRecords } = await import("@/content/projects");
  const projects = projectRecords.map((record) => projectSchema.parse(record));
  const { project: slug, surface } = await searchParams;
  const composition = resolveComposition(await getActiveTheme());
  if (surface === "work") {
    return (
      <div className="chronicle-review-stage">
        <composition.SecondaryPage
          content={pageContent.work}
          projects={projects}
          locale="en"
          projectHref={(project) =>
            `/preview/chronicle?project=${project.slug}`
          }
        />
      </div>
    );
  }
  if (slug) {
    const project = projects.find((item) => item.slug === slug);
    if (!project) notFound();
    return (
      <div className="chronicle-review-stage">
        <composition.CaseStudy content={selectProjectContent(project, "en")} />
      </div>
    );
  }
  return (
    <div className="chronicle-review-stage">
      <composition.Homepage
        content={homepageContent}
        projects={projects}
        locale="en"
        projectHref={(project) => `/preview/chronicle?project=${project.slug}`}
      />
    </div>
  );
}
