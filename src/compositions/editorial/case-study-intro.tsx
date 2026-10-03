import type { ComponentProps } from "react";
import { CaseStudyIntro } from "@/components/semantic/case-study";

export function EditorialCaseStudyIntro(
  props: ComponentProps<typeof CaseStudyIntro>,
) {
  return (
    <div className="editorial-case-study-intro">
      <CaseStudyIntro {...props} />
    </div>
  );
}
