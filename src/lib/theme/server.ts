import { cache } from "react";
import { cookies } from "next/headers";
import { resolveThemePreference, themeCookieName } from "./preference";

// Layout and page surfaces share the same request snapshot; content never reads mode state.
export const getActiveTheme = cache(async () => {
  const preferences = await cookies();
  return resolveThemePreference(preferences.get(themeCookieName)?.value);
});
