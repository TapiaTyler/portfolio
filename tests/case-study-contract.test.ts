import assert from "node:assert/strict";
import test from "node:test";
import { projectRecords } from "../src/content/projects";
import { projectSchema, type Project } from "../src/lib/content/schema";

// docs/CASE-STUDY-CONTRACT.md: measurable rules for published case studies.
type Block = Project["locale"]["en"]["blocks"][number];

const published = projectRecords
  .map((record) => projectSchema.parse(record))
  .filter((project) => project.publication.status === "published");

/** Every `text` string inside a value (plain text or rich text). */
function texts(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(texts);
  if (value && typeof value === "object")
    return Object.entries(value).flatMap(([key, entry]) =>
      key === "text" && typeof entry === "string" ? [entry] : texts(entry),
    );
  return [];
}
const words = (value: unknown) =>
  texts(value).join(" ").match(/\S+/g)?.length ?? 0;

/** Visible text of one block; the Engineering details body and code are collapsed. */
function visible(block: Block, project: Project): unknown[] {
  const caption = (id: string) =>
    project.media.find((media) => media.id === id)?.caption;
  switch (block.type) {
    case "technical":
      return [block.title, block.summary];
    case "media":
      return [block.caption ?? caption(block.mediaId)];
    case "gallery":
      return block.mediaIds.map(caption);
    default: {
      const { id: _id, type: _type, ...fields } = block;
      void _id;
      void _type;
      return Object.values(fields);
    }
  }
}

for (const project of published) {
  const name = project.slug;
  const blocks = project.locale.en.blocks;
  const sections = blocks.filter(
    (block) => block.type !== "media" && block.type !== "gallery",
  );

  test(`${name}: follows the case-study spine`, () => {
    const types = sections.map((block) => block.type);
    const decisions = types.filter((type) => type === "decision").length;
    const challenges = types.filter((type) => type === "challenge").length;
    assert.ok(decisions >= 2 && decisions <= 3, `${decisions} decisions`);
    assert.ok(challenges <= 1, `${challenges} challenges`);
    assert.equal(decisions + challenges, 3, "decision/challenge slots");
    assert.deepEqual(types, [
      "problem",
      "intro",
      ...Array(decisions).fill("decision"),
      "architecture",
      ...Array(challenges).fill("challenge"),
      "technical",
      "result",
    ]);
    assert.ok(sections.length <= 8);
    const details = sections.find((block) => block.type === "technical");
    assert.equal(
      details?.type === "technical" && texts(details.title).join(" "),
      "Engineering details",
    );
  });

  test(`${name}: stays within the media budget`, () => {
    const media = blocks.filter(
      (block) => block.type === "media" || block.type === "gallery",
    );
    assert.ok(media.length <= 6, `${media.length} media items`);
    assert.ok(
      media.filter((block) => block.type === "gallery").length <= 2,
      "galleries",
    );
    let run = 0;
    for (const block of blocks) {
      run = block.type === "media" || block.type === "gallery" ? run + 1 : 0;
      assert.ok(run <= 2, `more than two media after a section (${block.id})`);
    }
  });

  test(`${name}: visible text stays under 1,500 words`, () => {
    const total = blocks.reduce(
      (sum, block) => sum + words(visible(block, project)),
      0,
    );
    assert.ok(total <= 1500, `${total} visible words`);
  });

  test(`${name}: opening fields stay scannable`, () => {
    const copy = project.locale.en;
    assert.ok(words(copy.summary) <= 30, "summary");
    assert.ok(words(copy.description) <= 60, "description");
    assert.ok(words(copy.overview?.distinction) <= 35, "distinction");
    assert.ok(words(copy.overview?.currentState) <= 35, "current state");
    assert.ok(project.roles.length >= 3 && project.roles.length <= 5, "roles");
    assert.ok(project.technologyIds.length <= 10, "technologies");
    const links = project.links;
    assert.ok(
      links?.live || links?.repository || links?.repositoryVisibility,
      "a live link, public repository or source visibility",
    );
  });

  test(`${name}: published copy has no commit hashes or audit language`, () => {
    const copy = texts([
      project.locale.en,
      project.contribution,
      project.media.map((media) => [media.alt, media.caption]),
    ]).join("\n");
    const hash = copy.match(
      /\b(?=[0-9a-f]*[a-f])(?=[0-9a-f]*\d)[0-9a-f]{7,40}\b/,
    );
    assert.equal(hash, null, `commit hash: ${hash?.[0]}`);
    const audit = copy.match(
      /source-project|inspected checkout|at revision|discovery report|supplied source evidence/i,
    );
    assert.equal(audit, null, `audit language: ${audit?.[0]}`);
  });
}
