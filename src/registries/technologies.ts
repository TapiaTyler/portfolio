// A vocabulary for project references, not a claim that every entry is a skill.
// `kind` groups them the way job listings do: languages, frameworks and
// libraries, then tools and platforms.
export const technologies = {
  typescript: { label: "TypeScript", kind: "language" },
  javascript: { label: "JavaScript", kind: "language" },
  java: { label: "Java", kind: "language" },
  go: { label: "Go", kind: "language" },
  nextjs: { label: "Next.js", kind: "framework" },
  react: { label: "React", kind: "framework" },
  "spring-boot": { label: "Spring Boot", kind: "framework" },
  tailwind: { label: "Tailwind CSS", kind: "framework" },
  zod: { label: "Zod", kind: "framework" },
  i18next: { label: "i18next", kind: "framework" },
  postgresql: { label: "PostgreSQL", kind: "tool" },
  supabase: { label: "Supabase", kind: "tool" },
  flyway: { label: "Flyway", kind: "tool" },
  docker: { label: "Docker", kind: "tool" },
  vite: { label: "Vite", kind: "tool" },
  mdx: { label: "MDX", kind: "tool" },
  playwright: { label: "Playwright", kind: "tool" },
  vitest: { label: "Vitest", kind: "tool" },
} as const;

export type TechnologyId = keyof typeof technologies;
export type TechnologyKind = (typeof technologies)[TechnologyId]["kind"];

/** Metadata labels for each kind, in display order. */
export const technologyKindLabels: Record<TechnologyKind, string> = {
  language: "Languages",
  framework: "Frameworks & Libraries",
  tool: "Tools & Platforms",
};
