import type { Locale } from "./locales";
import { resolveText } from "./project-content";

/** English is required; Japanese can be filled independently for each field. */
export interface LocalizedText {
  en: string;
  ja?: string;
}

// Plain text remains useful for verified proper names and development fixtures.
export type CopyText = LocalizedText | string;

export function selectCopy(value: CopyText, locale: Locale) {
  return resolveText(typeof value === "string" ? { en: value } : value, locale);
}

export function text(value: CopyText, locale: Locale = "en") {
  return selectCopy(value, locale).value;
}

export function textLanguage(value: CopyText, locale: Locale = "en") {
  return selectCopy(value, locale).lang;
}
