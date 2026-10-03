import type { ComponentProps } from "react";
import { getActiveTheme } from "@/lib/theme/server";
import { resolveComposition } from "@/registries/compositions";
import { Hero } from "./semantic/hero";
import { ProjectIndex } from "./semantic/project-index";
import { CaseStudy } from "./semantic/case-study";
import { Homepage } from "./semantic/homepage";
import type { SecondaryPageProps } from "./semantic/secondary-page";

export async function ComposedSecondaryPage(props: SecondaryPageProps) {
  const theme = await getActiveTheme();
  const { SecondaryPage: Renderer } = resolveComposition(theme);
  return (
    <div data-composition={theme}>
      <Renderer {...props} />
    </div>
  );
}

export async function ComposedHomepage(props: ComponentProps<typeof Homepage>) {
  const theme = await getActiveTheme();
  const composition = resolveComposition(theme);
  const Renderer = composition.Homepage;
  return (
    <div data-composition={theme}>
      <Renderer
        {...props}
        FeatureRenderer={composition.ProjectFeature}
        HeroRenderer={composition.Hero}
      />
    </div>
  );
}

export async function ComposedHero(props: ComponentProps<typeof Hero>) {
  const theme = await getActiveTheme();
  const { Hero: Renderer } = resolveComposition(theme);
  return (
    <div data-composition={theme}>
      <Renderer {...props} />
    </div>
  );
}

export async function ComposedProjectIndex(
  props: ComponentProps<typeof ProjectIndex>,
) {
  const theme = await getActiveTheme();
  const composition = resolveComposition(theme);
  return (
    <div data-composition={theme}>
      <ProjectIndex {...props} FeatureRenderer={composition.ProjectFeature} />
    </div>
  );
}

export async function ComposedCaseStudy(
  props: ComponentProps<typeof CaseStudy>,
) {
  const theme = await getActiveTheme();
  const composition = resolveComposition(theme);
  const Renderer = composition.CaseStudy;
  return (
    <div data-composition={theme}>
      <Renderer
        {...props}
        IntroRenderer={composition.CaseStudyIntro}
        blockRenderers={composition.blockRenderers}
      />
    </div>
  );
}
