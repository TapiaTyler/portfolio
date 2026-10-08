import { z } from "zod";
import { idSchema, richTextSchema, textSchema } from "./text";

const identity = { id: idSchema };

// Add block types only when content needs them. Every type will need a semantic fallback renderer.
export const caseStudyBlockSchema = z.discriminatedUnion("type", [
  z.strictObject({
    ...identity,
    type: z.literal("intro"),
    heading: textSchema,
    body: richTextSchema.optional(),
  }),
  z.strictObject({
    ...identity,
    type: z.literal("problem"),
    heading: textSchema.optional(),
    body: richTextSchema,
  }),
  z.strictObject({
    ...identity,
    type: z.literal("goals"),
    heading: textSchema.optional(),
    items: z.array(textSchema).min(1),
  }),
  z.strictObject({
    ...identity,
    type: z.literal("constraints"),
    items: z
      .array(
        z.strictObject({ title: textSchema, detail: textSchema.optional() }),
      )
      .min(1),
  }),
  z.strictObject({
    ...identity,
    type: z.literal("decision"),
    title: textSchema,
    context: richTextSchema.optional(),
    decision: richTextSchema,
    rationale: richTextSchema.optional(),
    tradeoffs: richTextSchema.optional(),
    alternatives: richTextSchema.optional(),
  }),
  z.strictObject({
    ...identity,
    type: z.literal("media"),
    mediaId: idSchema,
    caption: textSchema.optional(),
    supportsBlockId: idSchema.optional(),
  }),
  z.strictObject({
    ...identity,
    type: z.literal("gallery"),
    mediaIds: z.array(idSchema).min(1),
    relationship: z
      .enum(["sequence", "comparison", "alternatives", "details", "states"])
      .optional(),
  }),
  z.strictObject({
    ...identity,
    type: z.literal("architecture"),
    title: textSchema.optional(),
    diagramId: idSchema,
    explanation: richTextSchema.optional(),
  }),
  z.strictObject({
    ...identity,
    type: z.literal("challenge"),
    title: textSchema,
    problem: richTextSchema,
    response: richTextSchema.optional(),
    result: richTextSchema.optional(),
  }),
  z.strictObject({
    ...identity,
    type: z.literal("technical"),
    title: textSchema,
    summary: textSchema,
    body: richTextSchema.optional(),
    codeSnippetIds: z.array(idSchema).optional(),
    defaultExpanded: z.boolean().optional(),
  }),
  z.strictObject({
    ...identity,
    type: z.literal("result"),
    body: richTextSchema,
    metrics: z
      .array(
        z.strictObject({
          label: textSchema,
          value: textSchema,
          context: textSchema,
        }),
      )
      .min(1)
      .optional(),
  }),
]);

export type CaseStudyBlock = z.output<typeof caseStudyBlockSchema>;
