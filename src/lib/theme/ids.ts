export const themeIds = ["editorial", "engineer", "digital"] as const;
export type ThemeId = (typeof themeIds)[number];
export const defaultTheme: ThemeId = "editorial";

export function isThemeId(value: unknown): value is ThemeId {
  return typeof value === "string" && themeIds.some((id) => id === value);
}
