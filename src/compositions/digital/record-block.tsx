import type { ComponentProps } from "react";
import { CaseStudyBlock } from "@/components/semantic/case-study-block";

export function DigitalBlock(props: ComponentProps<typeof CaseStudyBlock>) {
  return (
    <div className="digital-block-layer">
      <CaseStudyBlock {...props} />
    </div>
  );
}
