import { type CaseStudyBodyProps } from "@/components/semantic/case-study";
import { CaseStudyBlock } from "@/components/semantic/case-study-block";
import { type SelectedBlock } from "@/lib/i18n/project-content";
import { groupCaseStudyEvidence } from "./case-study-groups";

/**
 * Render one block through the composition's specialized renderer when it has
 * one, otherwise through the shared semantic fallback. Custom bodies use this
 * so the registry's `blockRenderers` slot stays meaningful.
 */
export function blockRenderer(
  {
    content,
    level,
    anchorPrefix,
    assetUrl,
    blockRenderers,
  }: CaseStudyBodyProps,
  mediaSizes?: string,
) {
  return function render(entry: SelectedBlock) {
    const Renderer = blockRenderers[entry.block.type] ?? CaseStudyBlock;
    return (
      <Renderer
        key={entry.block.id}
        entry={entry}
        project={content.project}
        locale={content.locale}
        level={level}
        anchorPrefix={anchorPrefix}
        assetUrl={assetUrl}
        mediaSizes={mediaSizes}
      />
    );
  };
}

/**
 * Narrative blocks share one surface with the evidence that declares them as
 * its owner. Standalone media and galleries keep their own visual sequence.
 */
export function GroupedCaseStudyBody({
  surfaceClassName,
  evidenceClassName,
  ...props
}: CaseStudyBodyProps & {
  surfaceClassName: string;
  evidenceClassName: string;
}) {
  const render = blockRenderer(props);
  return (
    <>
      {groupCaseStudyEvidence(props.content.blocks).map(
        ({ owner, evidence }) => {
          if (owner.block.type === "gallery" || owner.block.type === "media")
            return render(owner);
          return (
            <div
              key={owner.block.id}
              className={surfaceClassName}
              data-record-type={owner.block.type}
            >
              {render(owner)}
              {evidence.length > 0 && (
                <div className={evidenceClassName}>{evidence.map(render)}</div>
              )}
            </div>
          );
        },
      )}
    </>
  );
}
