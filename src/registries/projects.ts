import { projectRecords } from "@/content/projects";
import { createProjectRegistry } from "@/lib/content/registry";

export const {
  getProject,
  getPublishedProjects,
  getFeaturedProjects,
  getProjectsByTechnology,
  getProjectsByCapability,
} = createProjectRegistry(projectRecords);
