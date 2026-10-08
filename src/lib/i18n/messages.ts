import { interfaceMessages } from "@/content/interface";
import { selectCopy, type LocalizedText } from "./copy";
import type { Locale } from "./locales";

export type MessageId = keyof typeof interfaceMessages;
/** Registry keys and exclusion filters stay canonical; only display copy changes. */
export function interfaceCopy(source: string): LocalizedText {
  return Object.hasOwn(interfaceMessages, source)
    ? interfaceMessages[source as MessageId]
    : { en: source };
}
export function selectMessage(locale: Locale, id: MessageId) {
  const entry: LocalizedText = interfaceMessages[id];
  return selectCopy(entry, locale);
}
export function messageLanguage(locale: Locale, id: MessageId) {
  return selectMessage(locale, id).lang;
}

export function message(
  locale: Locale,
  id: MessageId,
  values: Record<string, string | number> = {},
) {
  return selectMessage(locale, id).value.replace(
    /\{(\w+)\}/g,
    (_, key: string) => {
      if (!(key in values))
        throw new Error(`Missing interface value: ${id}/${key}`);
      return String(values[key]);
    },
  );
}
