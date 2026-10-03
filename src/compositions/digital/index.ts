import type { CompositionProfile } from "../contract";
import { DigitalSecondaryPage } from "./secondary-page";
import { DigitalHero } from "./hero";
import { DigitalHomepage } from "./homepage";
import { DigitalProjectFeature } from "./project-feature";
import { DigitalCaseStudyIntro } from "./case-study-intro";
import { DigitalBlock } from "./record-block";
import { DigitalCaseStudy } from "./case-study";

export const digitalComposition = {
  SecondaryPage: DigitalSecondaryPage,
  Hero: DigitalHero,
  Homepage: DigitalHomepage,
  ProjectFeature: DigitalProjectFeature,
  CaseStudyIntro: DigitalCaseStudyIntro,
  CaseStudy: DigitalCaseStudy,
  blockRenderers: { decision: DigitalBlock, technical: DigitalBlock },
} satisfies CompositionProfile;
