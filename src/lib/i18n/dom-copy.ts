import { isLocale } from "./locales";
import { message, messageLanguage, type MessageId } from "./messages";

/** Progressive controls use the route locale rather than a project field's fallback. */
export function documentLocale() {
  const language = document.documentElement.lang;
  return isLocale(language) ? language : "en";
}

export function setInterfaceText(
  element: HTMLElement,
  id: MessageId,
  values?: Record<string, string | number>,
) {
  const locale = documentLocale();
  element.textContent = message(locale, id, values);
  element.lang = messageLanguage(locale, id);
}
