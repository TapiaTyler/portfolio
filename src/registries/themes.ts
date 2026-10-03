import { themeIds, type ThemeId } from "@/lib/theme/ids";
import type { ThemeTokens } from "@/themes/contract";
import { editorialTokens } from "@/themes/editorial/tokens";
import { engineerTokens } from "@/themes/engineer/tokens";
import { digitalTokens } from "@/themes/digital/tokens";

interface ThemeDefinition {
  label: string;
  colorScheme: "light" | "dark";
  tokens: ThemeTokens;
}

export const themeRegistry = {
  editorial: {
    label: "Editorial",
    colorScheme: "light",
    tokens: editorialTokens,
  },
  engineer: { label: "Engineer", colorScheme: "dark", tokens: engineerTokens },
  digital: { label: "Digital", colorScheme: "dark", tokens: digitalTokens },
} satisfies Record<ThemeId, ThemeDefinition>;

// Only labels and IDs enter the switcher's client bundle; tokens stay on the server.
export const themeOptions = themeIds.map((id) => ({
  id,
  label: themeRegistry[id].label,
}));

export function themeStyleSheet() {
  const profiles = themeIds
    .map((id) => {
      const { tokens, colorScheme } = themeRegistry[id];
      const declarations = Object.entries(tokens)
        .map(([key, value]) => `--${key}:${value};`)
        .join("");
      const selector =
        id === "editorial"
          ? `:root,[data-theme="${id}"]`
          : `[data-theme="${id}"]`;
      return `${selector}{color-scheme:${colorScheme};${declarations}}`;
    })
    .join("");
  // This rule follows every profile so it wins for both root and scoped preview themes.
  return `${profiles}@media(prefers-reduced-motion:reduce){:root,[data-theme]{--motion-fast:0ms;--motion-slow:0ms;scroll-behavior:auto;}}`;
}
