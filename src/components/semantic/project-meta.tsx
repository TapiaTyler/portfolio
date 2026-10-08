import { externalLinkAttributes } from "@/lib/external-links";
import { messageLanguage, interfaceCopy, message } from "@/lib/i18n/messages";
import { Text } from "@/components/localized-text";

import { type Locale } from "@/lib/i18n/locales";
import { UiText } from "@/components/ui-text";

import { type Project } from "@/lib/content/schema";
import {
  technologies,
  technologyKindLabels,
  type TechnologyKind,
} from "@/registries/technologies";
import { capabilities } from "@/registries/capabilities";
import { projectStatusLabels } from "@/lib/content/status";

export function ProjectMeta({
  project,
  locale = "en",
  exclude = [],
}: {
  locale?: Locale;
  project: Project;
  exclude?: string[];
}) {
  const entries: [string, string | undefined][] = [
    ["Status", projectStatusLabels[project.status]],
    ["Year", project.year?.toString()],
    ["Type", project.type.length ? project.type.join(" / ") : undefined],
    ["Role", project.roles.length ? project.roles.join(" / ") : undefined],
    // Grouped as job listings group them, so a framework search finds a match.
    ...(Object.keys(technologyKindLabels) as TechnologyKind[]).map(
      (kind): [string, string | undefined] => {
        const labels = project.technologyIds
          .filter((id) => technologies[id].kind === kind)
          .map((id) => technologies[id].label);
        return [
          technologyKindLabels[kind],
          labels.length ? labels.join(", ") : undefined,
        ];
      },
    ),
    [
      "Capabilities",
      project.capabilityIds.length
        ? project.capabilityIds.map((id) => capabilities[id].label).join(", ")
        : undefined,
    ],
  ];
  const visibleEntries = entries.filter(
    ([label, value]) => value !== undefined && !exclude.includes(label),
  );
  if (!visibleEntries.length) return null;
  return (
    <dl className="project-meta" lang="en">
      {visibleEntries.map(([label, value]) => (
        <div key={label}>
          <dt>
            <Text value={interfaceCopy(label)} locale={locale} />
          </dt>
          <dd>
            {label === "Capabilities" ? (
              project.capabilityIds.map((id, index) => (
                <span key={id}>
                  {index > 0 && ", "}
                  <Text
                    value={interfaceCopy(capabilities[id].label)}
                    locale={locale}
                  />
                </span>
              ))
            ) : (
              <Text
                value={value ? interfaceCopy(value) : undefined}
                locale={locale}
              />
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function ProjectLinks({
  project,
  locale = "en",
}: {
  project: Project;
  locale?: Locale;
}) {
  const links = [
    { label: "Open Live Project", href: project.links?.live },
    { label: "View Source", href: project.links?.repository },
    { label: "Read Documentation", href: project.links?.documentation },
  ].filter((link) => link.href);
  const privateSource = project.links?.repositoryVisibility === "private";
  if (!links.length && !privateSource) return null;
  return (
    <nav
      className="project-links"
      aria-label={message(locale, "Project resources")}
      lang={messageLanguage(locale, "Project resources")}
    >
      {links.map(({ href, label }) => (
        <a key={label} href={href} {...externalLinkAttributes(href)}>
          <Text value={interfaceCopy(label)} locale={locale} />
        </a>
      ))}
      {privateSource && (
        <span className="project-links__note">
          <UiText locale={locale} id="Source private" />
        </span>
      )}
    </nav>
  );
}
