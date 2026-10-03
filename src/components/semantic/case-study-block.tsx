import type { ReactNode } from "react";
import type { Project } from "@/lib/content/schema";
import type { Locale } from "@/lib/i18n/locales";
import {
  resolveValue,
  resolveOptionalValue,
  type SelectedBlock,
  type LocalizedValue,
} from "@/lib/i18n/project-content";
import { ArchitectureDisplay } from "./architecture-display";
import { MediaFrame, type AssetUrl } from "./media-frame";
import { RichText } from "./rich-text";
import { SectionHeading, type HeadingLevel } from "./section-heading";
import { TechnicalDetail } from "./technical-detail";

function BlockSection({
  id,
  title,
  level,
  children,
}: {
  id: string;
  title: LocalizedValue<string>;
  level: HeadingLevel;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="case-study-block"
      tabIndex={-1}
      data-motion-id={`block-${id}`}
      aria-labelledby={`${id}-heading`}
    >
      <SectionHeading id={`${id}-heading`} level={level}>
        <span lang={title.lang}>{title.value}</span>
      </SectionHeading>
      {children}
    </section>
  );
}

/** Complete semantic fallback for every currently supported block. Specialized compositions can reuse it. */
export function CaseStudyBlock({
  entry,
  project,
  locale,
  level = 2,
  anchorPrefix = "",
  assetUrl,
}: {
  entry: SelectedBlock;
  project: Project;
  locale: Locale;
  level?: HeadingLevel;
  anchorPrefix?: string;
  assetUrl?: AssetUrl;
}) {
  const { block, translation } = entry;
  const id = `${anchorPrefix}${block.id}`;
  const childLevel = Math.min(level + 1, 6) as HeadingLevel;
  const wrapper = (title: LocalizedValue<string>, children: ReactNode) => (
    <BlockSection id={id} title={title} level={level}>
      {children}
    </BlockSection>
  );
  const plainTitle = (title: string) => resolveValue(title, undefined, "en");

  switch (block.type) {
    case "intro": {
      const translated =
        translation?.type === "intro" ? translation : undefined;
      const body = resolveOptionalValue(block.body, translated?.body, locale);
      return wrapper(
        resolveValue(block.heading, translated?.heading, locale),
        body && <RichText content={body} anchorPrefix={anchorPrefix} />,
      );
    }
    case "problem": {
      const translated =
        translation?.type === "problem" ? translation : undefined;
      return wrapper(
        resolveValue(block.heading ?? "Problem", translated?.heading, locale),
        <RichText
          content={resolveValue(block.body, translated?.body, locale)}
          anchorPrefix={anchorPrefix}
        />,
      );
    }
    case "goals": {
      const translated =
        translation?.type === "goals" ? translation : undefined;
      const items = resolveValue(block.items, translated?.items, locale);
      return wrapper(
        resolveValue(block.heading ?? "Goals", translated?.heading, locale),
        <ul lang={items.lang}>
          {items.value.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>,
      );
    }
    case "constraints": {
      const translated =
        translation?.type === "constraints" ? translation : undefined;
      const items = resolveValue(block.items, translated?.items, locale);
      return wrapper(
        plainTitle("Constraints"),
        <dl lang={items.lang}>
          {items.value.map((item, index) => (
            <div key={index}>
              <dt>{item.title}</dt>
              {item.detail && <dd>{item.detail}</dd>}
            </div>
          ))}
        </dl>,
      );
    }
    case "decision": {
      const translated =
        translation?.type === "decision" ? translation : undefined;
      const fields = [
        {
          label: "Context",
          value: resolveOptionalValue(
            block.context,
            translated?.context,
            locale,
          ),
        },
        {
          label: "Decision",
          value: resolveValue(block.decision, translated?.decision, locale),
        },
        {
          label: "Rationale",
          value: resolveOptionalValue(
            block.rationale,
            translated?.rationale,
            locale,
          ),
        },
        {
          label: "Tradeoffs",
          value: resolveOptionalValue(
            block.tradeoffs,
            translated?.tradeoffs,
            locale,
          ),
        },
        {
          label: "Alternatives",
          value: resolveOptionalValue(
            block.alternatives,
            translated?.alternatives,
            locale,
          ),
        },
      ];
      return wrapper(
        resolveValue(block.title, translated?.title, locale),
        fields
          .filter((field) => field.value)
          .map(({ label, value }) => (
            <div key={label}>
              <SectionHeading level={childLevel}>
                <span lang="en">{label}</span>
              </SectionHeading>
              <RichText content={value!} anchorPrefix={anchorPrefix} />
            </div>
          )),
      );
    }
    case "media": {
      const media = project.media.find((media) => media.id === block.mediaId);
      const translated =
        translation?.type === "media" ? translation : undefined;
      return media ? (
        <section
          id={id}
          className="case-study-block"
          aria-label="Project media"
          aria-describedby={
            block.supportsBlockId
              ? `${anchorPrefix}${block.supportsBlockId}-heading`
              : undefined
          }
          data-motion-id={`block-${id}`}
          lang="en"
        >
          <MediaFrame
            media={media}
            locale={locale}
            caption={resolveOptionalValue(
              block.caption,
              translated?.caption,
              locale,
            )}
            assetUrl={assetUrl}
          />
        </section>
      ) : null;
    }
    case "gallery": {
      return (
        <section
          id={id}
          className="case-study-block"
          aria-label="Project gallery"
          data-motion-id={`block-${id}`}
          lang="en"
        >
          <div className="media-gallery">
            {block.mediaIds.map((mediaId) => {
              const media = project.media.find((media) => media.id === mediaId);
              return media ? (
                <MediaFrame
                  key={mediaId}
                  media={media}
                  locale={locale}
                  assetUrl={assetUrl}
                />
              ) : null;
            })}
          </div>
        </section>
      );
    }
    case "architecture": {
      const diagram = project.diagrams.find(
        (diagram) => diagram.id === block.diagramId,
      );
      const translated =
        translation?.type === "architecture" ? translation : undefined;
      const explanation = resolveOptionalValue(
        block.explanation,
        translated?.explanation,
        locale,
      );
      return wrapper(
        resolveValue(block.title ?? "Architecture", translated?.title, locale),
        <>
          {diagram && <ArchitectureDisplay diagram={diagram} locale={locale} />}
          {explanation && (
            <RichText content={explanation} anchorPrefix={anchorPrefix} />
          )}
        </>,
      );
    }
    case "challenge": {
      const translated =
        translation?.type === "challenge" ? translation : undefined;
      const fields = [
        {
          label: "Challenge",
          value: resolveValue(block.problem, translated?.problem, locale),
        },
        {
          label: "Response",
          value: resolveOptionalValue(
            block.response,
            translated?.response,
            locale,
          ),
        },
        {
          label: "Current result",
          value: resolveOptionalValue(block.result, translated?.result, locale),
        },
      ];
      return wrapper(
        resolveValue(block.title, translated?.title, locale),
        fields
          .filter((field) => field.value)
          .map(({ label, value }) => (
            <div key={label}>
              <SectionHeading level={childLevel}>
                <span lang="en">{label}</span>
              </SectionHeading>
              <RichText content={value!} anchorPrefix={anchorPrefix} />
            </div>
          )),
      );
    }
    case "technical": {
      const translated =
        translation?.type === "technical" ? translation : undefined;
      return (
        <TechnicalDetail
          block={block}
          translation={translated}
          project={project}
          locale={locale}
          level={level}
          id={id}
          anchorPrefix={anchorPrefix}
        />
      );
    }
    case "result": {
      const translated =
        translation?.type === "result" ? translation : undefined;
      const metrics = resolveOptionalValue(
        block.metrics,
        translated?.metrics,
        locale,
      );
      return wrapper(
        plainTitle("Result"),
        <>
          <RichText
            content={resolveValue(block.body, translated?.body, locale)}
            anchorPrefix={anchorPrefix}
          />
          {metrics && (
            <dl className="project-meta" lang={metrics.lang}>
              {metrics.value.map((metric, index) => (
                <div key={index}>
                  <dt>{metric.label}</dt>
                  <dd>
                    {metric.value}
                    <p>{metric.context}</p>
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </>,
      );
    }
    default: {
      const unsupported: never = block;
      throw new Error(`Missing semantic renderer: ${unsupported}`);
    }
  }
}
