import { type CompositionProfile } from "../contract";
import { EngineerSecondaryPage } from "./secondary-page";
import { EngineerHero } from "./hero";
import { EngineerHomepage } from "./homepage";
import { EngineerProjectFeature } from "./project-feature";
import { EngineerCaseStudyIntro } from "./case-study-intro";
import { EngineerCaseStudy } from "./case-study";

// Record framing lives in the grouped case-study body; blockRenderers is reserved
// for block-specific treatments inside that frame.
export const engineerComposition = {
  SecondaryPage: EngineerSecondaryPage,
  Hero: EngineerHero,
  Homepage: EngineerHomepage,
  ProjectFeature: EngineerProjectFeature,
  CaseStudyIntro: EngineerCaseStudyIntro,
  CaseStudy: EngineerCaseStudy,
} satisfies CompositionProfile;
