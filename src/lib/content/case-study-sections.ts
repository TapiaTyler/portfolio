import { interfaceCopy } from "@/lib/i18n/messages";
import { resolveValue, type ProjectContent } from "@/lib/i18n/project-content";

export function caseStudySections(content: ProjectContent, anchorPrefix = "") {
  return content.blocks.flatMap(({ block, translation }) => {
    if (block.type === "media" || block.type === "gallery") return [];
    const title =
      "title" in block
        ? block.title
        : "heading" in block
          ? block.heading
          : undefined;
    const translated =
      translation &&
      ("title" in translation
        ? translation.title
        : "heading" in translation
          ? translation.heading
          : undefined);
    const defaults = {
      intro: "Introduction",
      problem: "Problem",
      goals: "Goals",
      constraints: "Constraints",
      architecture: "Architecture",
      decision: "Decision",
      challenge: "Challenge",
      technical: "Technical Details",
      result: "Result",
    };
    // Untitled blocks take their label from the interface copy, so a Japanese
    // case study does not list English section names.
    const label = interfaceCopy(defaults[block.type]);
    return [
      {
        id: `${anchorPrefix}${block.id}`,
        title: title
          ? resolveValue(title, translated, content.locale)
          : resolveValue(label.en, label.ja, content.locale),
      },
    ];
  });
}
