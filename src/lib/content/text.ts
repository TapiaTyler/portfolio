import { z } from "zod";

export const textSchema = z.string().trim().min(1);
export const idSchema = textSchema.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

export const externalLinkSchema = z
  .url()
  .refine(
    (value) => /^https?:\/\//i.test(value),
    "Links must use HTTP or HTTPS",
  );

export const localAssetSchema = textSchema.refine((value) => {
  // Assets resolve inside an explicit asset root, never relative to a source file.
  return (
    /^\/(?!\/)[a-zA-Z0-9_./-]+$/.test(value) &&
    !value.split("/").some((segment) => segment === "." || segment === "..")
  );
}, "Use an absolute public asset path without traversal, query, or fragment");

export const assetSourceSchema = z.union([
  localAssetSchema,
  z
    .url()
    .refine(
      (value) => /^https:\/\//i.test(value),
      "Remote assets must use HTTPS",
    ),
]);

export const localizedTextSchema = z.strictObject({
  en: textSchema,
  ja: textSchema.optional(),
});

const internalLinkSchema = textSchema.refine((value) => {
  return (
    (/^\/(?!\/)/.test(value) || /^#[a-zA-Z0-9_-]+$/.test(value)) &&
    !/[\\\s]/.test(value)
  );
}, "Internal links must use a site path or a section anchor");

const inlineSchema = z.discriminatedUnion("type", [
  z.strictObject({
    type: z.literal("text"),
    text: z
      .string()
      .refine(
        (value) => value.trim().length > 0,
        "Inline text cannot be empty",
      ),
    marks: z.array(z.enum(["strong", "emphasis", "code"])).optional(),
  }),
  z.strictObject({
    type: z.literal("link"),
    label: textSchema,
    href: z.union([externalLinkSchema, internalLinkSchema]),
  }),
]);

// Semantic rich text is sufficient for this milestone; MDX can join at the authoring boundary later.
export const richTextSchema = z
  .array(
    z.discriminatedUnion("type", [
      z.strictObject({
        type: z.literal("paragraph"),
        content: z.array(inlineSchema).min(1),
      }),
      z.strictObject({
        type: z.literal("list"),
        ordered: z.boolean().default(false),
        items: z.array(z.array(inlineSchema).min(1)).min(1),
      }),
    ]),
  )
  .min(1);

export type RichText = z.output<typeof richTextSchema>;
