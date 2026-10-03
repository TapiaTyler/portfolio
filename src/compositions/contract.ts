import type { ComponentProps, ComponentType } from "react";
import type { CaseStudyBlock as BlockData } from "@/lib/content/blocks";
import type { Hero } from "@/components/semantic/hero";
import type { SecondaryPageProps } from "@/components/semantic/secondary-page";
import type { Homepage } from "@/components/semantic/homepage";
import type { ProjectFeature } from "@/components/semantic/project-feature";
import type {
  CaseStudyIntro,
  CaseStudy,
} from "@/components/semantic/case-study";
import type { CaseStudyBlock } from "@/components/semantic/case-study-block";

export type BlockRenderers = Partial<
  Record<
    BlockData["type"],
    ComponentType<ComponentProps<typeof CaseStudyBlock>>
  >
>;

export interface PortfolioComposition {
  SecondaryPage: ComponentType<SecondaryPageProps>;
  CaseStudy: ComponentType<ComponentProps<typeof CaseStudy>>;
  Homepage: ComponentType<ComponentProps<typeof Homepage>>;
  Hero: ComponentType<ComponentProps<typeof Hero>>;
  ProjectFeature: ComponentType<ComponentProps<typeof ProjectFeature>>;
  CaseStudyIntro: ComponentType<ComponentProps<typeof CaseStudyIntro>>;
  blockRenderers: BlockRenderers;
}

export type CompositionProfile = Partial<PortfolioComposition>;
