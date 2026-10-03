import type { ReactNode } from "react";
import type { RichText as RichTextData } from "@/lib/content/text";
import type { LocalizedValue } from "@/lib/i18n/project-content";

type Inline = Extract<
  RichTextData[number],
  { type: "paragraph" }
>["content"][number];

function InlineContent({
  content,
  anchorPrefix,
}: {
  content: Inline[];
  anchorPrefix: string;
}) {
  return content.map((inline, index) => {
    if (inline.type === "link") {
      const href = inline.href.startsWith("#")
        ? `#${anchorPrefix}${inline.href.slice(1)}`
        : inline.href;
      return (
        <a key={index} href={href}>
          {inline.label}
        </a>
      );
    }
    let text: ReactNode = inline.text;
    for (const mark of inline.marks ?? []) {
      if (mark === "strong") text = <strong>{text}</strong>;
      if (mark === "emphasis") text = <em>{text}</em>;
      if (mark === "code") text = <code>{text}</code>;
    }
    return <span key={index}>{text}</span>;
  });
}

export function RichText({
  content,
  anchorPrefix = "",
}: {
  content: LocalizedValue<RichTextData>;
  anchorPrefix?: string;
}) {
  return (
    <div className="rich-text" lang={content.lang}>
      {content.value.map((block, index) => {
        if (block.type === "paragraph")
          return (
            <p key={index}>
              <InlineContent
                content={block.content}
                anchorPrefix={anchorPrefix}
              />
            </p>
          );
        const List = block.ordered ? "ol" : "ul";
        return (
          <List key={index}>
            {block.items.map((item, itemIndex) => (
              <li key={itemIndex}>
                <InlineContent content={item} anchorPrefix={anchorPrefix} />
              </li>
            ))}
          </List>
        );
      })}
    </div>
  );
}
