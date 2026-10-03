import type { ProjectContent } from "@/lib/i18n/project-content";

export function FallbackNotice({ content }: { content: ProjectContent }) {
  if (content.locale !== "ja" || content.translationDepth === "complete")
    return null;
  return (
    <aside
      className="content-notice"
      lang="en"
      aria-label="Project translation status"
    >
      {content.translationDepth === "none"
        ? "This project's Japanese translation is not available yet. Showing English content."
        : "This project's Japanese translation is incomplete. Untranslated sections are shown in English."}
    </aside>
  );
}
