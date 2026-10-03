import path from "node:path";
import { projectRecords } from "../src/content/projects";
import { fixtureProjects } from "../src/content/fixtures/projects";
import { validateAssetFiles } from "../src/lib/content/assets";
import { createProjectRegistry } from "../src/lib/content/registry";
import { projectSchema } from "../src/lib/content/schema";

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
