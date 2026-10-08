import { messageLanguage, message } from "@/lib/i18n/messages";
import { UiText } from "@/components/ui-text";

import { type Diagram } from "@/lib/content/schema";
import { type Locale } from "@/lib/i18n/locales";
import { resolveText } from "@/lib/i18n/project-content";

export function ArchitectureDisplay({
  diagram,
  locale,
}: {
  diagram: Diagram;
  locale: Locale;
}) {
  const title = resolveText(diagram.title, locale);
  const summary = resolveText(diagram.accessibleSummary, locale);
  const nodes = new Map(
    diagram.nodes.map((node) => [node.id, resolveText(node.label, locale)]),
  );
  return (
    <figure className="architecture-display">
      <figcaption lang={title.lang}>{title.value}</figcaption>
      <p lang={summary.lang}>{summary.value}</p>
      <ul
        className="diagram-nodes"
        aria-label={message(locale, "System components")}
        lang={messageLanguage(locale, "System components")}
      >
        {diagram.nodes.map((node) => {
          const label = nodes.get(node.id)!;
          return (
            <li key={node.id} lang={label.lang} data-node-id={node.id}>
              {label.value}
            </li>
          );
        })}
      </ul>
      {diagram.edges.length > 0 && (
        <ul
          className="diagram-connections"
          aria-label={message(locale, "Component relationships")}
          lang={messageLanguage(locale, "Component relationships")}
        >
          {diagram.edges.map((edge, index) => {
            const from = nodes.get(edge.from)!;
            const to = nodes.get(edge.to)!;
            const label = edge.label
              ? resolveText(edge.label, locale)
              : undefined;
            return (
              <li
                key={index}
                data-connection-from={edge.from}
                data-connection-to={edge.to}
              >
                <span lang={from.lang}>{from.value}</span>
                <span aria-hidden="true"> → </span>
                <span className="visually-hidden">
                  {" "}
                  <UiText locale={locale} id="connects to" />{" "}
                </span>
                <span lang={to.lang}>{to.value}</span>
                {label && (
                  <>
                    {" "}
                    — <span lang={label.lang}>{label.value}</span>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </figure>
  );
}
