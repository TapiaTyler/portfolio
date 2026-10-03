import type { CompositionProfile } from "../contract";
import { EditorialSecondaryPage } from "./secondary-page";
import { EditorialHero } from "./hero";
import { EditorialHomepage } from "./homepage";
import { EditorialProjectFeature } from "./project-feature";
import { EditorialCaseStudyIntro } from "./case-study-intro";
import { EditorialCaseStudy } from "./case-study";

export const editorialComposition = {
  SecondaryPage: EditorialSecondaryPage,
  Hero: EditorialHero,
  Homepage: EditorialHomepage,
  ProjectFeature: EditorialProjectFeature,
  CaseStudyIntro: EditorialCaseStudyIntro,
  CaseStudy: EditorialCaseStudy,
} satisfies CompositionProfile;
