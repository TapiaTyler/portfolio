export const themeIds = [
  "product",
  "editorial",
  "engineer",
  "digital",
  "chronicle",
] as const;
export type ThemeId = (typeof themeIds)[number];
export const defaultTheme: ThemeId = "product";

export function isThemeId(value: unknown): value is ThemeId {
  return typeof value === "string" && themeIds.some((id) => id === value);
}
