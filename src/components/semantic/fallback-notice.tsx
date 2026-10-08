import { messageLanguage, message } from "@/lib/i18n/messages";
import { UiText } from "@/components/ui-text";

import { type ProjectContent } from "@/lib/i18n/project-content";

export function FallbackNotice({ content }: { content: ProjectContent }) {
  const locale = content.locale;
  if (content.locale !== "ja" || content.translationDepth === "complete")
    return null;
  return (
    <aside
      className="content-notice"
      lang={messageLanguage(locale, "Project translation status")}
      aria-label={message(locale, "Project translation status")}
    >
      <UiText
        locale={locale}
        id={
          content.translationDepth === "none"
            ? "This project's Japanese translation is not available yet. Showing English content."
            : "This project's Japanese translation is incomplete. Untranslated sections are shown in English."
        }
      />
    </aside>
  );
}
