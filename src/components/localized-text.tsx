import { type Locale } from "@/lib/i18n/locales";
import { selectCopy, type CopyText } from "@/lib/i18n/copy";

/** Language belongs to each resolved field, including English fallback on /ja. */
export function Text({
  value,
  locale = "en",
}: {
  value: CopyText | undefined;
  locale?: Locale;
}) {
  if (value === undefined) return null;
  const selected = selectCopy(value, locale);
  return <span lang={selected.lang}>{selected.value}</span>;
}
