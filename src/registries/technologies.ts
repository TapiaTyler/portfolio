// A vocabulary for project references, not a claim that every entry is a skill.
export const technologies = {
  nextjs: { label: "Next.js", category: "frontend" },
  react: { label: "React", category: "frontend" },
  typescript: { label: "TypeScript", category: "language" },
  go: { label: "Go", category: "backend" },
  postgresql: { label: "PostgreSQL", category: "data" },
} as const;

export type TechnologyId = keyof typeof technologies;
