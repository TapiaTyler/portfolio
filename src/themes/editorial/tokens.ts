import type { ThemeTokens } from "../contract";

// Warm paper and type roles follow the approved Editorial reference.
export const editorialTokens = {
  "surface-primary": "#faf8f5",
  "surface-secondary": "#f3f0eb",
  "text-primary": "#161616",
  "text-muted": "#5a5854",
  accent: "#126f83",
  "status-planning": "#5a5854",
  "border-subtle": "#e4dfd7",
  "focus-ring": "#126f83",
  "font-display":
    'var(--font-editorial-display, Georgia), "Times New Roman", serif',
  "font-body": "var(--font-interface, Arial), Helvetica, sans-serif",
  "font-mono": '"Cascadia Code", Consolas, monospace',
  "space-section": "clamp(4rem, 8vw, 7rem)",
  "space-content": "2rem",
  "radius-control": "999px",
  "border-width": "1px",
  "elevation-panel": "0 16px 36px -12px rgb(28 25 23 / 8%)",
  "grid-max-width": "87.5rem",
  "grid-gap": "2rem",
  "image-filter": "none",
  "motion-fast": "160ms",
  "motion-slow": "320ms",
  "motion-ease": "ease-out",
} satisfies ThemeTokens;
