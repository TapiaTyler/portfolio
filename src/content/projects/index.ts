import type { ProjectInput } from "@/lib/content/schema";
import { portfolioProject } from "./portfolio";
import { japanTravelPlannerProject } from "./japan-travel-planner";

// Add reviewed project records here. Development fixtures have a separate entry point.
export const projectRecords: readonly ProjectInput[] = [
  portfolioProject,
  japanTravelPlannerProject,
];
