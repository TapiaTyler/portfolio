export const capabilities = {
  "product-ui-engineering": { label: "Product & UI Engineering" },
  "frontend-development": { label: "Frontend Development" },
  "backend-development": { label: "Backend Development" },
  "full-stack-development": { label: "Full-stack Development" },
  "system-architecture": { label: "System Architecture" },
  "api-design": { label: "API Design" },
  "data-modeling": { label: "Data Modeling" },
  "design-systems": { label: "Design Systems" },
  accessibility: { label: "Accessibility" },
  performance: { label: "Performance" },
  localization: { label: "Localization" },
  security: { label: "Security" },
  "devops-deployment": { label: "DevOps / Deployment" },
  "testing-quality": { label: "Testing / Quality Engineering" },
  "developer-tooling": { label: "Developer Tooling" },
  "technical-documentation": { label: "Technical Documentation" },
} as const;

export type CapabilityId = keyof typeof capabilities;
