import { messageLanguage, message, interfaceCopy } from "@/lib/i18n/messages";
import { type Locale } from "@/lib/i18n/locales";

import { type Project } from "@/lib/content/schema";
import { capabilities } from "@/registries/capabilities";
import { Text } from "@/components/localized-text";

/** The reference's inline topic line: capability labels separated by slashes. */
export function ChronicleTopics({
  project,
  locale = "en",
}: {
  project: Project;
  locale?: Locale;
}) {
  if (!project.capabilityIds.length) return null;
  return (
    <ul
      className="project-meta chronicle-topics"
      aria-label={message(locale, "Topics")}
      lang={messageLanguage(locale, "Topics")}
    >
      {project.capabilityIds.map((id) => (
        <li key={id}>
          <Text value={interfaceCopy(capabilities[id].label)} locale={locale} />
        </li>
      ))}
    </ul>
  );
}
