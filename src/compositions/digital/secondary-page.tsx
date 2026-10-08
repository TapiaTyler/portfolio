import {
  SecondaryPage,
  SecondaryPageIntro,
  SecondaryPageSection,
  type SecondaryPageProps,
} from "@/components/semantic/secondary-page";
import { type ComponentProps } from "react";
import { DigitalProjectFeature } from "./project-feature";

function Intro(props: ComponentProps<typeof SecondaryPageIntro>) {
  return (
    <div className="secondary-page-opening digital-secondary-surface">
      <SecondaryPageIntro {...props} />
    </div>
  );
}
function Section(props: ComponentProps<typeof SecondaryPageSection>) {
  // A project deck is its own collection; don't put project cards inside a panel.
  return props.section.collection ? (
    <SecondaryPageSection {...props} />
  ) : (
    <div className="digital-secondary-surface">
      <SecondaryPageSection {...props} />
    </div>
  );
}
export function DigitalSecondaryPage(props: SecondaryPageProps) {
  return (
    <div className="digital-secondary-page">
      <SecondaryPage
        {...props}
        FeatureRenderer={DigitalProjectFeature}
        IntroRenderer={Intro}
        SectionRenderer={Section}
      />
    </div>
  );
}
