import {
  SecondaryPage,
  type SecondaryPageProps,
} from "@/components/semantic/secondary-page";
import { EngineerProjectFeature } from "./project-feature";

export function EngineerSecondaryPage(props: SecondaryPageProps) {
  return (
    <div className="engineer-secondary-page">
      <SecondaryPage
        {...props}
        FeatureRenderer={EngineerProjectFeature}
        index={
          props.content.sections.length > 1 && (
            <nav
              className="secondary-page-index"
              aria-label="Page sections"
              data-motion-id="page-index"
            >
              <p className="eyebrow">Record index</p>
              <ol>
                {props.content.sections.map((section) => (
                  <li key={section.id}>
                    <a href={`#page-${section.id}-heading`}>{section.title}</a>
                  </li>
                ))}
              </ol>
            </nav>
          )
        }
      />
    </div>
  );
}
