import { type SelectedBlock } from "@/lib/i18n/project-content";

/** Group declared evidence without changing canonical order or block identities. */
export function groupCaseStudyEvidence(blocks: SelectedBlock[]) {
  const groups: { owner: SelectedBlock; evidence: SelectedBlock[] }[] = [];
  for (const entry of blocks) {
    const previous = groups.at(-1);
    if (
      entry.block.type === "media" &&
      entry.block.supportsBlockId &&
      previous &&
      entry.block.supportsBlockId === previous.owner.block.id
    ) {
      previous.evidence.push(entry);
    } else {
      groups.push({ owner: entry, evidence: [] });
    }
  }
  return groups;
}
