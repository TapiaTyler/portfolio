import { Homepage, type HomepageProps } from "@/components/semantic/homepage";
import { EditorialHero } from "./hero";
import { EditorialProjectFeature } from "./project-feature";

export function EditorialHomepage(props: HomepageProps) {
  return (
    <div className="editorial-homepage">
      <Homepage
        {...props}
        HeroRenderer={EditorialHero}
        FeatureRenderer={EditorialProjectFeature}
      />
    </div>
  );
}
