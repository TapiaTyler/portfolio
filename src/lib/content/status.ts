import type { Project } from "./schema";

/** Reader-facing wording for the factual project status, shared by every mode. */
export const projectStatusLabels: Record<Project["status"], string> = {
  active: "Active development",
  complete: "Complete",
  prototype: "Prototype",
  planned: "Planned",
  archived: "Archived",
};
