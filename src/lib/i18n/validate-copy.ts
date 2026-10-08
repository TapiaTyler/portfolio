import { z } from "zod";

export const localizedCopySchema = z
  .object({
    en: z.string().trim().min(1),
    ja: z.string().trim().min(1).optional(),
  })
  .strict();

/** Validate localized fields in a source tree without treating IDs/URLs as copy. */
export function validateCopyTree(value: unknown, path = "copy") {
  if (value === null || typeof value !== "object") return;
  if ("en" in value || "ja" in value) {
    const copy = localizedCopySchema.parse(value);
    const tokens = (text: string) =>
      Array.from(new Set(text.match(/\{\w+\}/g) ?? [])).sort();
    if (
      copy.ja &&
      JSON.stringify(tokens(copy.en)) !== JSON.stringify(tokens(copy.ja))
    )
      throw new Error(
        `${path}: Japanese copy must retain the English interpolation fields.`,
      );
    return;
  }
  for (const [key, child] of Object.entries(value))
    validateCopyTree(child, `${path}.${key}`);
}
