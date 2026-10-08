import Link from "next/link";
import { type Project } from "@/lib/content/schema";
import { type Locale } from "@/lib/i18n/locales";
import {
  resolveValue,
  resolveOptionalValue,
  selectProjectContent,
} from "@/lib/i18n/project-content";
import { MediaFrame, type AssetUrl } from "@/components/semantic/media-frame";
import { RichText } from "@/components/semantic/rich-text";
import { Text } from "@/components/localized-text";
import { UiText } from "@/components/ui-text";
import { interfaceCopy } from "@/lib/i18n/messages";
import { projectStatusLabels } from "@/lib/content/status";
import { capabilities } from "@/registries/capabilities";
import { ProductProjectFeature } from "./project-feature";
import { ProductSelection } from "./selection";

export function ProductCollection({
  projects,
  locale,
  assetUrl,
  projectHref = (project) => `/${locale}/work/${project.slug}`,
}: {
  projects: Project[];
  locale: Locale;
  assetUrl?: AssetUrl;
  projectHref?: (project: Project) => string;
}) {
  return (
    <ProductSelection
      locale={locale}
      items={projects.map((project) => {
        const content = selectProjectContent(project, locale);
        const problem = content.blocks.find(
          (entry) => entry.block.type === "problem",
        );
        const problemCopy =
          problem?.block.type === "problem"
            ? resolveValue(
                problem.block.body,
                problem.translation?.type === "problem"
                  ? problem.translation.body
                  : undefined,
                locale,
              )
            : undefined;
        const state = resolveOptionalValue(
          project.locale.en.overview?.currentState,
          project.locale.ja?.overview?.currentState,
          locale,
        );
        const media = project.media.find(
          (item) => item.id === project.previewMediaId,
        );
        const href = projectHref(project);
        return {
          slug: project.slug,
          title: content.title.value,
          row: (
            <ProductProjectFeature
              content={content}
              href={href}
              assetUrl={assetUrl}
            />
          ),
          preview: (
            <>
              <h3 lang={content.title.lang}>{content.title.value}</h3>
              <p className="product-project__status">
                <Text
                  value={interfaceCopy(projectStatusLabels[project.status])}
                  locale={locale}
                />
              </p>
              {media && (
                <MediaFrame
                  media={media}
                  locale={locale}
                  assetUrl={assetUrl}
                  sizes="(max-width: 900px) 1px, 440px"
                />
              )}
              <dl className="product-preview__facts">
                {problemCopy && (
                  <div>
                    <dt>
                      <UiText locale={locale} id="Need" />
                    </dt>
                    <dd>
                      <RichText
                        content={{
                          ...problemCopy,
                          value: problemCopy.value.slice(0, 1),
                        }}
                      />
                    </dd>
                  </div>
                )}
                {content.description && (
                  <div>
                    <dt>
                      <UiText locale={locale} id="Built" />
                    </dt>
                    <dd lang={content.description.lang}>
                      {content.description.value}
                    </dd>
                  </div>
                )}
                {project.capabilityIds.length > 0 && (
                  <div>
                    <dt>
                      <UiText locale={locale} id="Focus areas" />
                    </dt>
                    <dd>
                      {project.capabilityIds.map((id, index) => (
                        <span key={id}>
                          {index > 0 && ", "}
                          <Text
                            value={interfaceCopy(capabilities[id].label)}
                            locale={locale}
                          />
                        </span>
                      ))}
                    </dd>
                  </div>
                )}
                {state && (
                  <div>
                    <dt>
                      <UiText locale={locale} id="Current state" />
                    </dt>
                    <dd lang={state.lang}>{state.value}</dd>
                  </div>
                )}
              </dl>
              <Link className="product-action" href={href}>
                <UiText locale={locale} id="Read case study" />
              </Link>
            </>
          ),
        };
      })}
    />
  );
}
