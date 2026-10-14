import { projectRecords } from "../src/content/projects";
import { projectSchema } from "../src/lib/content/schema";

/**
 * Lists what each published project still needs for a complete Japanese case
 * study. It checks the record as if it were declared `complete`, so the list is
 * exactly what `content:validate` will demand once the status is raised. It
 * reports coverage only; it cannot judge translation quality.
 */
let outstanding = 0;
for (const record of projectRecords) {
  const declared = record.translationStatus?.ja ?? "none";
  const result = projectSchema.safeParse({
    ...record,
    translationStatus: { ja: "complete" },
    locale: {
      ...record.locale,
      ja: record.locale.ja ?? { title: "", blocks: [] },
    },
  });
  const missing = result.success
    ? []
    : result.error.issues.map(
        (issue) => `${issue.path.join(".")}: ${issue.message}`,
      );
  outstanding += missing.length;
  console.log(
    `\n${record.slug} (declared: ${declared}) — ${
      missing.length ? `${missing.length} items to translate` : "complete"
    }`,
  );
  for (const line of missing) console.log(`  - ${line}`);
}
console.log(
  `\n${outstanding ? `${outstanding} items outstanding` : "All projects can be declared complete"}.`,
);
