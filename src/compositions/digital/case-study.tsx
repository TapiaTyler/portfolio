import type { ComponentProps } from "react";
import {
  CaseStudy,
  type CaseStudyBodyProps,
} from "@/components/semantic/case-study";
import { CaseStudyBlock } from "@/components/semantic/case-study-block";
import type { SelectedBlock } from "@/lib/i18n/project-content";
import { DigitalCaseStudyIntro } from "./case-study-intro";
import { groupCaseStudyEvidence } from "../case-study-groups";

function DigitalCaseStudyBody({
  content,
  level,
  anchorPrefix,
  assetUrl,
}: CaseStudyBodyProps) {
  const groups = groupCaseStudyEvidence(content.blocks);
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
      {groups.map(({ owner, evidence }) => {
        if (owner.block.type === "gallery" || owner.block.type === "media")
          return render(owner);
        return (
          <div key={owner.block.id} className="digital-block-layer">
            {render(owner)}
            {evidence.length > 0 && (
              <div className="digital-block-evidence">
                {evidence.map(render)}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}

export function DigitalCaseStudy(props: ComponentProps<typeof CaseStudy>) {
  return (
    <CaseStudy
      {...props}
      IntroRenderer={DigitalCaseStudyIntro}
      BodyRenderer={DigitalCaseStudyBody}
      navigationLabel="Explore sections"
    />
  );
}
