import type { Project } from "@/lib/content/schema";
import { capabilities } from "@/registries/capabilities";

/** The reference's inline topic line: capability labels separated by slashes. */
export function ChronicleTopics({ project }: { project: Project }) {
  if (!project.capabilityIds.length) return null;
  return (
    <ul className="project-meta chronicle-topics" aria-label="Topics" lang="en">
      {project.capabilityIds.map((id) => (
        <li key={id}>{capabilities[id].label}</li>
      ))}
    </ul>
  );
}
