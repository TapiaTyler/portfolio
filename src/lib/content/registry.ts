import { projectSchema, type Project } from "./schema";
import type { TechnologyId } from "@/registries/technologies";
import type { CapabilityId } from "@/registries/capabilities";

/** Public selectors share one publication gate, including direct slug lookup. */
export function createProjectRegistry(
  records: readonly unknown[],
  { allowFixtures = false }: { allowFixtures?: boolean } = {},
) {
  const projects = records.map((record, index) => {
    const result = projectSchema.safeParse(record);
    if (!result.success) {
      throw new Error(
        `Invalid project record at index ${index}:\n${result.error.message}`,
      );
    }
    if (result.data.kind === "fixture" && !allowFixtures) {
      throw new Error(
        `Fixture ${result.data.slug} cannot enter the public project registry`,
      );
    }
    return result.data;
  });

  const slugs = new Set<string>();
  for (const project of projects) {
    if (slugs.has(project.slug))
      throw new Error(`Duplicate project slug: ${project.slug}`);
    slugs.add(project.slug);
  }

  const published = projects
    .filter((project) => project.publication.status === "published")
    .sort((a, b) => {
      const first = a.publication.priority ?? Number.MAX_SAFE_INTEGER;
      const second = b.publication.priority ?? Number.MAX_SAFE_INTEGER;
      return first - second || a.slug.localeCompare(b.slug, "en");
    });

  // A composition can rearrange its result without mutating the next composition's source.
  const select = (predicate: (project: Project) => boolean = () => true) =>
    published.filter(predicate).map((project) => structuredClone(project));

  return {
    getProject: (slug: string): Project | undefined => {
      const project = published.find((project) => project.slug === slug);
      return project ? structuredClone(project) : undefined;
    },
    getPublishedProjects: (): Project[] => select(),
    getFeaturedProjects: (): Project[] =>
      select((project) => project.publication.featured),
    getProjectsByTechnology: (id: TechnologyId): Project[] =>
      select((project) => project.technologyIds.includes(id)),
    getProjectsByCapability: (id: CapabilityId): Project[] =>
      select((project) => project.capabilityIds.includes(id)),
  };
}
