import {
  SecondaryPage,
  type SecondaryPageProps,
} from "@/components/semantic/secondary-page";
import { EditorialProjectFeature } from "./project-feature";

export function EditorialSecondaryPage(props: SecondaryPageProps) {
  return (
    <div className="editorial-secondary-page">
      <SecondaryPage {...props} FeatureRenderer={EditorialProjectFeature} />
    </div>
  );
}
