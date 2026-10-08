import { type CompositionProfile } from "../contract";
import { ProductHero } from "./hero";
import { ProductHomepage } from "./homepage";
import { ProductProjectFeature } from "./project-feature";
import { ProductCaseStudy, ProductCaseStudyIntro } from "./case-study";
import { ProductSecondaryPage } from "./secondary-page";

export const productComposition = {
  Hero: ProductHero,
  Homepage: ProductHomepage,
  ProjectFeature: ProductProjectFeature,
  CaseStudyIntro: ProductCaseStudyIntro,
  CaseStudy: ProductCaseStudy,
  SecondaryPage: ProductSecondaryPage,
} satisfies CompositionProfile;
