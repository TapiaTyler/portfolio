import { type CompositionProfile } from "../contract";
import { DigitalSecondaryPage } from "./secondary-page";
import { DigitalHero } from "./hero";
import { DigitalHomepage } from "./homepage";
import { DigitalProjectFeature } from "./project-feature";
import { DigitalCaseStudyIntro } from "./case-study-intro";
import { DigitalCaseStudy } from "./case-study";

// Layered surfaces live in the grouped case-study body; blockRenderers is reserved
// for block-specific treatments inside that surface.
export const digitalComposition = {
  SecondaryPage: DigitalSecondaryPage,
  Hero: DigitalHero,
  Homepage: DigitalHomepage,
  ProjectFeature: DigitalProjectFeature,
  CaseStudyIntro: DigitalCaseStudyIntro,
  CaseStudy: DigitalCaseStudy,
} satisfies CompositionProfile;
