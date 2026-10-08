import { interfaceCopy as navigationCopy } from "@/lib/i18n/messages";

import { type ComponentProps } from "react";
import {
  CaseStudy,
  type CaseStudyBodyProps,
} from "@/components/semantic/case-study";
import { DigitalCaseStudyIntro } from "./case-study-intro";
import { GroupedCaseStudyBody } from "../grouped-body";

function DigitalCaseStudyBody(props: CaseStudyBodyProps) {
  return (
    <GroupedCaseStudyBody
      {...props}
      surfaceClassName="digital-block-layer"
      evidenceClassName="digital-block-evidence"
    />
  );
}

export function DigitalCaseStudy(props: ComponentProps<typeof CaseStudy>) {
  return (
    <CaseStudy
      {...props}
      IntroRenderer={DigitalCaseStudyIntro}
      BodyRenderer={DigitalCaseStudyBody}
      navigationLabel={navigationCopy("Explore Sections")}
    />
  );
}
