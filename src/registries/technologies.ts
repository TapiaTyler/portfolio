// A vocabulary for project references, not a claim that every entry is a skill.
export const technologies = {
  nextjs: { label: "Next.js", category: "frontend" },
  react: { label: "React", category: "frontend" },
  typescript: { label: "TypeScript", category: "language" },
  go: { label: "Go", category: "backend" },
  postgresql: { label: "PostgreSQL", category: "data" },
  javascript: { label: "JavaScript", category: "language" },
  java: { label: "Java", category: "language" },
  vite: { label: "Vite", category: "frontend" },
  "spring-boot": { label: "Spring Boot", category: "backend" },
  flyway: { label: "Flyway", category: "data" },
  i18next: { label: "i18next", category: "frontend" },
  docker: { label: "Docker", category: "infrastructure" },
} as const;

export type TechnologyId = keyof typeof technologies;
