import path from "node:path";
import { projectRecords } from "../src/content/projects";
import { fixtureProjects } from "../src/content/fixtures/projects";
import { validateAssetFiles } from "../src/lib/content/assets";
import { createProjectRegistry } from "../src/lib/content/registry";
import { projectSchema } from "../src/lib/content/schema";
import {
  homepageContent,
  placeholderPages,
  navigation,
} from "../src/content/placeholder";
import { pageContent } from "../src/content/pages";
import { interfaceMessages } from "../src/content/interface";
import { validateCopyTree } from "../src/lib/i18n/validate-copy";

validateCopyTree({
  homepageContent,
  placeholderPages,
  navigation,
  pageContent,
  interfaceMessages,
});
console.log(
  "Site copy: validated English sources and optional Japanese fields",
);

// Validate authoring records too, so a draft cannot conceal a broken reference.
for (const [name, records, allowFixtures, assetRoot] of [
  ["Portfolio", projectRecords, false, "public"],
  [
    "Development fixtures",
    fixtureProjects,
    true,
    "src/content/fixtures/assets",
  ],
] as const) {
  createProjectRegistry(records, { allowFixtures });
  validateAssetFiles(
    records.map((record) => projectSchema.parse(record)),
    path.resolve(assetRoot),
  );
  console.log(`${name}: validated ${records.length} records`);
}
