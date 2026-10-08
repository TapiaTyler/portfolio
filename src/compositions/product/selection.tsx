"use client";

import { useId, useState, type ReactNode } from "react";
import { type Locale } from "@/lib/i18n/locales";
import { message, messageLanguage } from "@/lib/i18n/messages";
import { UiText } from "@/components/ui-text";

/** Server-rendered content slots preserve the native project links when JS is unavailable. */
export function ProductSelection({
  items,
  locale,
}: {
  items: { slug: string; title: string; row: ReactNode; preview: ReactNode }[];
  locale: Locale;
}) {
  const [selection, setSelection] = useState(items[0]?.slug);
  const prefix = useId();
  const selected = items.some((item) => item.slug === selection)
    ? selection
    : items[0]?.slug;
  return (
    <div className="product-collection">
      <noscript>
        <style>{`.product-preview-control,.product-preview{display:none!important}.product-collection{grid-template-columns:1fr!important}`}</style>
      </noscript>
      <ul className="product-project-list">
        {items.map((item) => (
          <li
            key={item.slug}
            className="product-project-row"
            data-selected={selected === item.slug}
          >
            {item.row}
            <button
              type="button"
              className="product-preview-control"
              aria-label={message(locale, "Preview {title}", {
                title: item.title,
              })}
              lang={messageLanguage(locale, "Preview {title}")}
              aria-pressed={selected === item.slug}
              aria-controls={`${prefix}-preview-${item.slug}`}
              onClick={() => setSelection(item.slug)}
            >
              <UiText locale={locale} id="Preview" />
            </button>
          </li>
        ))}
      </ul>
      <aside
        className="product-preview"
        aria-label={message(locale, "Selected project")}
        lang={messageLanguage(locale, "Selected project")}
      >
        {items.map((item) => (
          <div
            key={item.slug}
            id={`${prefix}-preview-${item.slug}`}
            hidden={selected !== item.slug}
            className="product-preview__panel"
          >
            {item.preview}
          </div>
        ))}
      </aside>
    </div>
  );
}
