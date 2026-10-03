import type { CaseStudyBodyProps } from "@/components/semantic/case-study";
import { CaseStudyBlock } from "@/components/semantic/case-study-block";
import type { SelectedBlock } from "@/lib/i18n/project-content";
import { groupCaseStudyEvidence } from "../case-study-groups";

export function EngineerCaseStudyBody({
  content,
  level,
  anchorPrefix,
  assetUrl,
}: CaseStudyBodyProps) {
  const render = (entry: SelectedBlock) => (
    <CaseStudyBlock
      key={entry.block.id}
      entry={entry}
      project={content.project}
      locale={content.locale}
      level={level}
      anchorPrefix={anchorPrefix}
      assetUrl={assetUrl}
    />
  );
  return (
    <>
      {groupCaseStudyEvidence(content.blocks).map(({ owner, evidence }) => {
        if (owner.block.type === "gallery" || owner.block.type === "media")
          return render(owner);
        return (
          <div
            key={owner.block.id}
            className="engineer-block-record"
            data-record-type={owner.block.type}
          >
            {render(owner)}
            {evidence.length > 0 && (
              <div className="engineer-record-evidence">
                {evidence.map(render)}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}
