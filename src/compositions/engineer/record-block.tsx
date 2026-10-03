import type { ComponentProps } from "react";
import { CaseStudyBlock } from "@/components/semantic/case-study-block";

export function EngineerBlock(props: ComponentProps<typeof CaseStudyBlock>) {
  return (
    <div
      className="engineer-block-record"
      data-record-type={props.entry.block.type}
    >
      <CaseStudyBlock {...props} />
    </div>
  );
}
