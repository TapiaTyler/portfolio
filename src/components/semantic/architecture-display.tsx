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
      {/* Each component appears once, as a card listing its outgoing connections;
          the separate node and edge lists repeated every name. Data attributes
          keep Engineer's connection inspector working. */}
      <ul
        className="diagram-nodes"
        aria-label={message(locale, "System components")}
        lang={messageLanguage(locale, "System components")}
      >
        {diagram.nodes.map((node) => {
          const label = nodes.get(node.id)!;
          const outgoing = diagram.edges.filter(
            (edge) => edge.from === node.id,
          );
          return (
            <li key={node.id} data-node-id={node.id}>
              <span className="diagram-node__label" lang={label.lang}>
                {label.value}
              </span>
              {outgoing.length > 0 && (
                <ul
                  className="diagram-connections"
                  aria-label={message(locale, "Component relationships")}
                  lang={messageLanguage(locale, "Component relationships")}
                >
                  {outgoing.map((edge, index) => {
                    const to = nodes.get(edge.to)!;
                    const relation = edge.label
                      ? resolveText(edge.label, locale)
                      : undefined;
                    return (
                      <li
                        key={index}
                        data-connection-from={edge.from}
                        data-connection-to={edge.to}
                      >
                        <span aria-hidden="true">→ </span>
                        <span className="visually-hidden">
                          <UiText locale={locale} id="connects to" />{" "}
                        </span>
                        <span
                          className="diagram-connection__target"
                          lang={to.lang}
                        >
                          {to.value}
                        </span>
                        {relation && (
                          <span
                            className="diagram-connection__label"
                            lang={relation.lang}
                          >
                            {relation.value}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </figure>
  );
}
