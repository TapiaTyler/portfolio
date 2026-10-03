import { defaultTheme, isThemeId, type ThemeId } from "./ids";

export const themeCookieName = "portfolio-mode";
export const themeCookieOptions = {
  path: "/",
  maxAge: 60 * 60 * 24 * 365,
  sameSite: "lax" as const,
  httpOnly: true,
};

export function resolveThemePreference(value: unknown): ThemeId {
  return isThemeId(value) ? value : defaultTheme;
}
