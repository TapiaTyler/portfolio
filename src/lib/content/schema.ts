import { z } from "zod";
import { capabilities, type CapabilityId } from "@/registries/capabilities";
import { technologies, type TechnologyId } from "@/registries/technologies";
import { caseStudyBlockSchema } from "./blocks";
import {
  assetSourceSchema,
  externalLinkSchema,
  idSchema,
  localizedTextSchema,
  textSchema,
} from "./text";

const technologyIdSchema = z.enum(
  Object.keys(technologies) as [TechnologyId, ...TechnologyId[]],
);
const capabilityIdSchema = z.enum(
  Object.keys(capabilities) as [CapabilityId, ...CapabilityId[]],
);

const mediaFields = {
  id: idSchema,
  src: assetSourceSchema,
  alt: localizedTextSchema,
  caption: localizedTextSchema.optional(),
  label: localizedTextSchema.optional(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  purpose: z.enum([
    "overview",
    "detail",
    "mobile",
    "architecture",
    "process",
    "result",
  ]),
  focalPoint: z
    .strictObject({ x: z.number().min(0).max(1), y: z.number().min(0).max(1) })
    .optional(),
};

export const mediaSchema = z.discriminatedUnion("type", [
  z.strictObject({ ...mediaFields, type: z.literal("image") }),
  z.strictObject({
    ...mediaFields,
    type: z.literal("video"),
    poster: assetSourceSchema,
  }),
]);

export const diagramSchema = z.strictObject({
  id: idSchema,
  title: localizedTextSchema,
  accessibleSummary: localizedTextSchema,
  nodes: z
    .array(z.strictObject({ id: idSchema, label: localizedTextSchema }))
    .min(1),
  edges: z.array(
    z.strictObject({
      from: idSchema,
      to: idSchema,
      label: localizedTextSchema.optional(),
    }),
  ),
});

const localizedProjectSchema = z.strictObject({
  title: textSchema,
  shortTitle: textSchema.optional(),
  summary: textSchema.optional(),
  description: textSchema.optional(),
  overview: z
    .strictObject({
      distinction: textSchema.optional(),
      currentState: textSchema.optional(),
    })
    .optional(),
  blocks: z.array(caseStudyBlockSchema).default([]),
});

const ownershipSchema = z.enum(["primary", "shared", "supporting"]);

export const projectSchema = z
  .strictObject({
    kind: z.enum(["project", "fixture"]),
    slug: idSchema,
    year: z
      .union([z.number().int().min(1900).max(2100), textSchema])
      .optional(),
    status: z.enum(["active", "complete", "prototype", "planned", "archived"]),
    type: z.array(textSchema).default([]),
    roles: z.array(textSchema).default([]),
    technologyIds: z.array(technologyIdSchema).default([]),
    capabilityIds: z.array(capabilityIdSchema).default([]),
    publication: z.strictObject({
      status: z.enum(["draft", "published", "hidden"]),
      featured: z.boolean().default(false),
      priority: z.number().int().nonnegative().optional(),
    }),
    links: z
      .strictObject({
        live: externalLinkSchema.optional(),
        repository: externalLinkSchema.optional(),
        documentation: externalLinkSchema.optional(),
        // Says plainly that source exists but is not public, instead of omitting it.
        repositoryVisibility: z.literal("private").optional(),
      })
      .refine((links) => !(links.repository && links.repositoryVisibility), {
        message: "A private repository cannot also have a public link",
        path: ["repositoryVisibility"],
      })
      .optional(),
    media: z.array(mediaSchema).default([]),
    previewMediaId: idSchema.optional(),
    diagrams: z.array(diagramSchema).default([]),
    codeSnippets: z
      .array(
        z.strictObject({
          id: idSchema,
          language: textSchema,
          source: z.string().min(1),
          title: localizedTextSchema.optional(),
        }),
      )
      .default([]),
    locale: z.strictObject({
      en: localizedProjectSchema,
      ja: localizedProjectSchema.optional(),
    }),
    translationStatus: z
      .strictObject({ ja: z.enum(["none", "summary", "partial", "complete"]) })
      .default({ ja: "none" }),
    contribution: z
      .strictObject({
        productDirection: ownershipSchema.optional(),
        architecture: ownershipSchema.optional(),
        uiDirection: ownershipSchema.optional(),
        implementation: z.enum(["manual", "ai-assisted", "mixed"]).optional(),
        review: textSchema.optional(),
        testing: textSchema.optional(),
      })
      .optional(),
  })
  .superRefine((project, ctx) => {
    const issue = (path: (string | number)[], message: string) =>
      ctx.addIssue({ code: "custom", path, message });
    const unique = (ids: string[], path: (string | number)[]) => {
      const seen = new Set<string>();
      ids.forEach((id, index) => {
        if (seen.has(id))
          issue([...path, index], `Duplicate identifier: ${id}`);
        seen.add(id);
      });
    };
    unique(project.technologyIds, ["technologyIds"]);
    unique(project.capabilityIds, ["capabilityIds"]);
    unique(
      project.media.map(({ id }) => id),
      ["media"],
    );
    unique(
      project.diagrams.map(({ id }) => id),
      ["diagrams"],
    );
    unique(
      project.codeSnippets.map(({ id }) => id),
      ["codeSnippets"],
    );

    if (
      project.publication.featured &&
      project.publication.status !== "published"
    ) {
      issue(
        ["publication", "featured"],
        "Only published projects can be featured",
      );
    }

    const mediaIds = new Set(project.media.map(({ id }) => id));
    const diagramIds = new Set(project.diagrams.map(({ id }) => id));
    const codeIds = new Set(project.codeSnippets.map(({ id }) => id));
    if (project.previewMediaId && !mediaIds.has(project.previewMediaId)) {
      issue(["previewMediaId"], "Preview media does not exist in this project");
    }

    project.diagrams.forEach((diagram, index) => {
      unique(
        diagram.nodes.map(({ id }) => id),
        ["diagrams", index, "nodes"],
      );
      const nodes = new Set(diagram.nodes.map(({ id }) => id));
      diagram.edges.forEach((edge, edgeIndex) => {
        for (const endpoint of ["from", "to"] as const) {
          if (!nodes.has(edge[endpoint]))
            issue(
              ["diagrams", index, "edges", edgeIndex, endpoint],
              "Diagram endpoint does not exist",
            );
        }
      });
    });

    for (const locale of ["en", "ja"] as const) {
      const localized = project.locale[locale];
      if (!localized) continue;
      unique(
        localized.blocks.map(({ id }) => id),
        ["locale", locale, "blocks"],
      );
      localized.blocks.forEach((block, index) => {
        const path = ["locale", locale, "blocks", index];
        if (
          locale === "en" &&
          block.type === "media" &&
          block.supportsBlockId
        ) {
          // Evidence stays adjacent to its owner so composition never reorders the narrative.
          const previous = localized.blocks[index - 1];
          const owner = localized.blocks.find(
            (entry) => entry.id === block.supportsBlockId,
          );
          if (
            !owner ||
            ["media", "gallery"].includes(owner.type) ||
            !(
              previous?.id === owner.id ||
              (previous?.type === "media" &&
                previous.supportsBlockId === owner.id)
            )
          )
            issue(
              [...path, "supportsBlockId"],
              "Supporting media must immediately follow its narrative block or that block's supporting media",
            );
        }
        if (block.type === "media" && !mediaIds.has(block.mediaId))
          issue([...path, "mediaId"], "Media reference does not exist");
        if (block.type === "gallery") {
          unique(block.mediaIds, [...path, "mediaIds"]);
          block.mediaIds.forEach((id, item) => {
            if (!mediaIds.has(id))
              issue(
                [...path, "mediaIds", item],
                "Media reference does not exist",
              );
          });
        }
        if (block.type === "architecture" && !diagramIds.has(block.diagramId))
          issue([...path, "diagramId"], "Diagram reference does not exist");
        if (block.type === "technical") {
          unique(block.codeSnippetIds ?? [], [...path, "codeSnippetIds"]);
          block.codeSnippetIds?.forEach((id, item) => {
            if (!codeIds.has(id))
              issue(
                [...path, "codeSnippetIds", item],
                "Code snippet reference does not exist",
              );
          });
        }
      });
    }

    const ja = project.locale.ja;
    const depth = project.translationStatus.ja;
    if (depth === "none" && ja)
      issue(
        ["locale", "ja"],
        "Japanese text requires an explicit translation status",
      );
    if (depth !== "none" && !ja)
      issue(
        ["translationStatus", "ja"],
        "Translation status requires Japanese text",
      );
    if (!ja) return;
    if (depth === "summary" && (!ja.summary || ja.blocks.length > 0)) {
      issue(
        ["locale", "ja"],
        "Summary translation requires a summary and no deep case-study blocks",
      );
    }
    if (depth === "partial" && !ja.summary && ja.blocks.length === 0) {
      issue(
        ["locale", "ja"],
        "Partial translation requires a summary or case-study blocks",
      );
    }

    const englishBlocks = new Map(
      project.locale.en.blocks.map((block) => [block.id, block]),
    );
    ja.blocks.forEach((block, index) => {
      const original = englishBlocks.get(block.id);
      if (!original || original.type !== block.type) {
        issue(
          ["locale", "ja", "blocks", index],
          "Translated block must match an English block ID and type",
        );
        return;
      }
      // Media, diagrams, and code remain locale-neutral references.
      for (const field of [
        "mediaId",
        "mediaIds",
        "diagramId",
        "codeSnippetIds",
        "relationship",
        "supportsBlockId",
      ] as const) {
        if (
          (field in original || field in block) &&
          JSON.stringify(Reflect.get(original, field)) !==
            JSON.stringify(Reflect.get(block, field))
        ) {
          issue(
            ["locale", "ja", "blocks", index, field],
            "Translated block must retain shared references",
          );
        }
      }
    });
    if (depth === "complete") {
      for (const field of ["distinction", "currentState"] as const) {
        if (project.locale.en.overview?.[field] && !ja.overview?.[field])
          issue(
            ["locale", "ja", "overview", field],
            "Complete translation is missing overview text",
          );
      }
      ja.blocks.forEach((block, index) => {
        const original = englishBlocks.get(block.id);
        if (!original) return;
        for (const field of [
          "heading",
          "body",
          "context",
          "rationale",
          "tradeoffs",
          "alternatives",
          "caption",
          "explanation",
          "response",
          "result",
          "metrics",
        ] as const) {
          if (field in original && !(field in block))
            issue(
              ["locale", "ja", "blocks", index, field],
              "Complete translation is missing narrative content",
            );
        }
      });
      for (const field of ["summary", "description", "shortTitle"] as const) {
        if (project.locale.en[field] && !ja[field])
          issue(
            ["locale", "ja", field],
            "Complete translation is missing text",
          );
      }
      if (ja.blocks.length !== englishBlocks.size)
        issue(
          ["locale", "ja", "blocks"],
          "Complete translation must cover every English block",
        );
      for (const media of project.media) {
        if (!media.alt.ja || (media.caption && !media.caption.ja))
          issue(
            ["media"],
            `Complete translation is missing text for ${media.id}`,
          );
      }
      for (const diagram of project.diagrams) {
        if (
          !diagram.title.ja ||
          !diagram.accessibleSummary.ja ||
          diagram.nodes.some((node) => !node.label.ja) ||
          diagram.edges.some((edge) => edge.label && !edge.label.ja)
        ) {
          issue(
            ["diagrams"],
            `Complete translation is missing text for ${diagram.id}`,
          );
        }
      }
      for (const snippet of project.codeSnippets) {
        if (snippet.title && !snippet.title.ja)
          issue(
            ["codeSnippets"],
            `Complete translation is missing a title for ${snippet.id}`,
          );
      }
    }
  });

export type ProjectInput = z.input<typeof projectSchema>;
export type Project = z.output<typeof projectSchema>;
export type ProjectMedia = z.output<typeof mediaSchema>;
export type Diagram = z.output<typeof diagramSchema>;
