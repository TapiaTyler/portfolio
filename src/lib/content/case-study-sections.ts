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
    return [
      {
        id: `${anchorPrefix}${block.id}`,
        title: resolveValue(
          title ?? defaults[block.type],
          translated,
          content.locale,
        ),
      },
    ];
  });
}
