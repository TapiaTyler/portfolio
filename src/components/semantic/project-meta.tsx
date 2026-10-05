import type { Project } from "@/lib/content/schema";
import { technologies } from "@/registries/technologies";
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
    [
      "Technology",
      project.technologyIds.length
        ? project.technologyIds.map((id) => technologies[id].label).join(", ")
        : undefined,
    ],
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
  if (!links.length) return null;
  return (
    <nav className="project-links" aria-label="Project resources" lang="en">
      {links.map(({ href, label }) => (
        <a key={label} href={href}>
          {label}
        </a>
      ))}
    </nav>
  );
}
