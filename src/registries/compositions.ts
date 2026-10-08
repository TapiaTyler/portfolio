import { Hero } from "@/components/semantic/hero";
import { SecondaryPage } from "@/components/semantic/secondary-page";
import { Homepage } from "@/components/semantic/homepage";
import { ProjectFeature } from "@/components/semantic/project-feature";
import { CaseStudyIntro, CaseStudy } from "@/components/semantic/case-study";
import { editorialComposition } from "@/compositions/editorial";
import { engineerComposition } from "@/compositions/engineer";
import { digitalComposition } from "@/compositions/digital";
import { chronicleComposition } from "@/compositions/chronicle";
import { productComposition } from "@/compositions/product";
import type {
  CompositionProfile,
  PortfolioComposition,
} from "@/compositions/contract";
import type { ThemeId } from "@/lib/theme/ids";

export const compositionRegistry: Record<ThemeId, CompositionProfile> = {
  editorial: editorialComposition,
  engineer: engineerComposition,
  digital: digitalComposition,
  chronicle: chronicleComposition,
  product: productComposition,
};

export function resolveComposition(theme: ThemeId): PortfolioComposition {
  const profile = compositionRegistry[theme];
  return {
    SecondaryPage: profile.SecondaryPage ?? SecondaryPage,
    CaseStudy: profile.CaseStudy ?? CaseStudy,
    Homepage: profile.Homepage ?? Homepage,
    Hero: profile.Hero ?? Hero,
    ProjectFeature: profile.ProjectFeature ?? ProjectFeature,
    CaseStudyIntro: profile.CaseStudyIntro ?? CaseStudyIntro,
    blockRenderers: profile.blockRenderers ?? {},
  };
}
