"use server";

import { cookies } from "next/headers";
import { isThemeId } from "./ids";
import { themeCookieName, themeCookieOptions } from "./preference";
import type { MessageId } from "@/lib/i18n/messages";

export interface ThemeActionState {
  error?: MessageId;
  message?: MessageId;
}

export async function saveThemePreference(
  _previous: ThemeActionState,
  formData: FormData,
): Promise<ThemeActionState> {
  const theme = formData.get("theme");
  if (!isThemeId(theme))
    return { error: "Choose an available presentation mode." };
  // Cookie mutation also invalidates the router cache and returns the new server composition.
  (await cookies()).set(themeCookieName, theme, themeCookieOptions);
  return { message: "Presentation mode saved." };
}
