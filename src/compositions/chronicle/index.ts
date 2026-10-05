import type { CompositionProfile } from "../contract";
import { ChronicleHero } from "./hero";
import { ChronicleHomepage } from "./homepage";
import { ChronicleProjectFeature } from "./project-feature";
import { ChronicleCaseStudy, ChronicleCaseStudyIntro } from "./case-study";
import { ChronicleSecondaryPage } from "./secondary-page";

export const chronicleComposition = {
  Hero: ChronicleHero,
  Homepage: ChronicleHomepage,
  ProjectFeature: ChronicleProjectFeature,
  CaseStudy: ChronicleCaseStudy,
  CaseStudyIntro: ChronicleCaseStudyIntro,
  SecondaryPage: ChronicleSecondaryPage,
} satisfies CompositionProfile;
