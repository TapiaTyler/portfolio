import { interfaceCopy as navigationCopy } from "@/lib/i18n/messages";

import { type ComponentProps } from "react";
import { CaseStudy } from "@/components/semantic/case-study";
import { EditorialCaseStudyIntro } from "./case-study-intro";

export function EditorialCaseStudy(props: ComponentProps<typeof CaseStudy>) {
  return (
    <CaseStudy
      {...props}
      IntroRenderer={EditorialCaseStudyIntro}
      navigationLabel={navigationCopy("Chapters")}
    />
  );
}
