import type { Project } from "@/lib/content/schema";
import {
  technologies,
  technologyKindLabels,
  type TechnologyKind,
} from "@/registries/technologies";
import { capabilities } from "@/registries/capabilities";
import { projectStatusLabels } from "@/lib/content/status";

export function ProjectMeta({
  project,
  exclude = [],
}: {
  project: Project;
  exclude?: string[];
}) {
  const entries: [string, string | undefined][] = [
    ["Status", projectStatusLabels[project.status]],
    ["Year", project.year?.toString()],
    ["Type", project.type.length ? project.type.join(" / ") : undefined],
    ["Role", project.roles.length ? project.roles.join(" / ") : undefined],
    // Grouped as job listings group them, so a framework search finds a match.
    ...(Object.keys(technologyKindLabels) as TechnologyKind[]).map(
      (kind): [string, string | undefined] => {
        const labels = project.technologyIds
          .filter((id) => technologies[id].kind === kind)
          .map((id) => technologies[id].label);
        return [
          technologyKindLabels[kind],
          labels.length ? labels.join(", ") : undefined,
        ];
      },
    ),
    [
      "Capabilities",
      project.capabilityIds.length
        ? project.capabilityIds.map((id) => capabilities[id].label).join(", ")
        : undefined,
    ],
  ];
  const visibleEntries = entries.filter(
    ([label, value]) => value !== undefined && !exclude.includes(label),
  );
  if (!visibleEntries.length) return null;
  return (
    <dl className="project-meta" lang="en">
      {visibleEntries.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ProjectLinks({ project }: { project: Project }) {
  const links = [
    { label: "Open Live Project", href: project.links?.live },
    { label: "View Source", href: project.links?.repository },
    { label: "Read Documentation", href: project.links?.documentation },
  ].filter((link) => link.href);
  const privateSource = project.links?.repositoryVisibility === "private";
  if (!links.length && !privateSource) return null;
  return (
    <nav className="project-links" aria-label="Project resources" lang="en">
      {links.map(({ href, label }) => (
        <a key={label} href={href}>
          {label}
        </a>
      ))}
      {privateSource && (
        <span className="project-links__note">Source private</span>
      )}
    </nav>
  );
}
