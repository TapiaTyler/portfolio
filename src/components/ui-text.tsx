import { type Locale } from "@/lib/i18n/locales";
import { message, selectMessage, type MessageId } from "@/lib/i18n/messages";

export function UiText({
  locale,
  id,
  values,
}: {
  locale: Locale;
  id: MessageId;
  values?: Record<string, string | number>;
}) {
  return (
    <span lang={selectMessage(locale, id).lang}>
      {message(locale, id, values)}
    </span>
  );
}
