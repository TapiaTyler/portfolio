import { type CaseStudyBodyProps } from "@/components/semantic/case-study";
import { GroupedCaseStudyBody } from "../grouped-body";

export function EngineerCaseStudyBody(props: CaseStudyBodyProps) {
  return (
    <GroupedCaseStudyBody
      {...props}
      surfaceClassName="engineer-block-record"
      evidenceClassName="engineer-record-evidence"
    />
  );
}
