import type { CompositionProfile } from "../contract";
import { EngineerSecondaryPage } from "./secondary-page";
import { EngineerHero } from "./hero";
import { EngineerHomepage } from "./homepage";
import { EngineerProjectFeature } from "./project-feature";
import { EngineerCaseStudyIntro } from "./case-study-intro";
import { EngineerCaseStudy } from "./case-study";
import { EngineerBlock } from "./record-block";

export const engineerComposition = {
  SecondaryPage: EngineerSecondaryPage,
  Hero: EngineerHero,
  Homepage: EngineerHomepage,
  ProjectFeature: EngineerProjectFeature,
  CaseStudyIntro: EngineerCaseStudyIntro,
  CaseStudy: EngineerCaseStudy,
  blockRenderers: {
    intro: EngineerBlock,
    problem: EngineerBlock,
    goals: EngineerBlock,
    challenge: EngineerBlock,
    result: EngineerBlock,
    architecture: EngineerBlock,
    decision: EngineerBlock,
    technical: EngineerBlock,
    constraints: EngineerBlock,
  },
} satisfies CompositionProfile;
