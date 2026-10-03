export const locales = ["en", "ja"] as const;

export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}

/** Keep the current destination when the visitor changes languages. */
export function pathForLocale(pathname: string, locale: Locale): string {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length > 0 && isLocale(segments[0])) {
    segments.shift();
  }

  return `/${locale}${segments.length ? `/${segments.join("/")}` : ""}`;
}
