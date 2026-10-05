import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";
import { fixtureProjects } from "../src/content/fixtures/projects";
import { validateAssetFiles } from "../src/lib/content/assets";
import { createProjectRegistry } from "../src/lib/content/registry";
import { projectSchema, type ProjectInput } from "../src/lib/content/schema";
import { richTextSchema } from "../src/lib/content/text";
import { getPublishedProjects } from "../src/registries/projects";

const minimal = fixtureProjects[0];
const system = projectSchema.parse(fixtureProjects[1]);
const visual = projectSchema.parse(fixtureProjects[2]);
const registry = () =>
  createProjectRegistry(fixtureProjects, { allowFixtures: true });

test("sparse content remains valid without optional media, stack, summary, or blocks", () => {
  const parsed = projectSchema.parse(minimal);
  assert.deepEqual(parsed.media, []);
  assert.deepEqual(parsed.technologyIds, []);
  assert.deepEqual(parsed.locale.en.blocks, []);
  assert.equal(parsed.locale.en.summary, undefined);
  assert.equal(parsed.translationStatus.ja, "none");
  assert.ok(
    fixtureProjects.every(
      (project) => projectSchema.safeParse(project).success,
    ),
  );
});

test("all public selectors and direct lookup exclude draft and hidden records", () => {
  const catalog = registry();
  assert.deepEqual(
    catalog.getPublishedProjects().map(({ slug }) => slug),
    ["fixture-system", "fixture-visual", "fixture-minimal"],
  );
  assert.equal(catalog.getProject("fixture-draft"), undefined);
  assert.equal(catalog.getProject("fixture-hidden"), undefined);
  assert.equal(catalog.getProject("does-not-exist"), undefined);
  assert.equal(
    catalog.getProject("fixture-system")?.locale.en.title,
    system.locale.en.title,
  );
  assert.deepEqual(
    catalog.getFeaturedProjects().map(({ slug }) => slug),
    ["fixture-system"],
  );
  assert.deepEqual(
    catalog.getProjectsByTechnology("react").map(({ slug }) => slug),
    ["fixture-visual"],
  );
  assert.deepEqual(
    catalog
      .getProjectsByCapability("system-architecture")
      .map(({ slug }) => slug),
    ["fixture-system"],
  );
  const privateRecords = fixtureProjects.slice(3).map((project) => ({
    ...project,
    technologyIds: ["react"],
    capabilityIds: ["frontend-development"],
  }));
  const privateCatalog = createProjectRegistry(privateRecords, {
    allowFixtures: true,
  });
  assert.deepEqual(privateCatalog.getProjectsByTechnology("react"), []);
  assert.deepEqual(
    privateCatalog.getProjectsByCapability("frontend-development"),
    [],
  );
});

test("fixtures cannot enter production and published is independent of featured", () => {
  assert.throws(
    () => createProjectRegistry(fixtureProjects),
    /Fixture .* cannot enter/,
  );
  // The public inventory holds real published records only, never fixtures.
  assert.ok(
    getPublishedProjects().every(
      ({ slug }) => !fixtureProjects.some((fixture) => fixture.slug === slug),
    ),
  );
  const project: ProjectInput = { ...minimal, kind: "project" };
  const catalog = createProjectRegistry([project]);
  assert.equal(catalog.getPublishedProjects().length, 1);
  assert.deepEqual(catalog.getFeaturedProjects(), []);
  assert.equal(
    projectSchema.safeParse({
      ...project,
      publication: { status: "draft", featured: true },
    }).success,
    false,
  );
});

test("ordering is deterministic and returned lists do not mutate the registry", () => {
  const unordered = createProjectRegistry([...fixtureProjects].reverse(), {
    allowFixtures: true,
  });
  assert.deepEqual(
    unordered.getPublishedProjects(),
    registry().getPublishedProjects(),
  );
  unordered.getPublishedProjects().pop();
  assert.equal(unordered.getPublishedProjects().length, 3);
  const selected = unordered.getProject("fixture-system")!;
  selected.publication.status = "hidden";
  selected.locale.en.blocks.reverse();
  assert.equal(
    unordered.getProject("fixture-system")?.publication.status,
    "published",
  );
  assert.equal(
    unordered.getProject("fixture-system")?.locale.en.blocks[0].id,
    "context",
  );
});

test("duplicate slugs and malformed records fail registry initialization", () => {
  assert.throws(
    () => createProjectRegistry([minimal, minimal], { allowFixtures: true }),
    /Duplicate project slug/,
  );
  assert.throws(
    () =>
      createProjectRegistry([{ ...minimal, status: "finished" }], {
        allowFixtures: true,
      }),
    /Invalid project record/,
  );
  for (const mutation of [
    { slug: "bad/slug" },
    { technologyIds: ["unknown"] },
    { capabilityIds: ["unknown"] },
    { technologyIds: ["react", "react"] },
    { links: { live: "javascript:alert(1)" } },
    { engineerLayout: "compact" },
  ]) {
    assert.equal(
      projectSchema.safeParse({ ...minimal, ...mutation }).success,
      false,
    );
  }
});

test("blocks reject appearance instructions, unknown types, and duplicate IDs", () => {
  for (const blocks of [
    [{ id: "one", type: "neon-panel" }],
    [{ id: "one", type: "goals", items: ["Example"], className: "grid" }],
    [
      { id: "one", type: "goals", items: ["Example"] },
      { id: "one", type: "goals", items: ["Example"] },
    ],
  ]) {
    assert.equal(
      projectSchema.safeParse({
        ...minimal,
        locale: { en: { title: "Fixture", blocks } },
      }).success,
      false,
    );
  }
});

test("media references require existing IDs, accessible text, dimensions, and safe sources", () => {
  assert.equal(
    projectSchema.safeParse({ ...visual, previewMediaId: "missing" }).success,
    false,
  );
  for (const change of [
    { alt: undefined },
    { width: 0 },
    { src: "/../private.svg" },
    { src: "http://example.com/file.svg" },
  ]) {
    assert.equal(
      projectSchema.safeParse({
        ...visual,
        media: [{ ...visual.media[0], ...change }],
      }).success,
      false,
    );
  }
  for (const block of [
    { id: "image", type: "media", mediaId: "missing" },
    { id: "gallery", type: "gallery", mediaIds: ["missing"] },
    { id: "architecture", type: "architecture", diagramId: "missing" },
    {
      id: "technical",
      type: "technical",
      title: "Fixture",
      summary: "Example",
      codeSnippetIds: ["missing"],
    },
  ]) {
    assert.equal(
      projectSchema.safeParse({
        ...minimal,
        locale: { en: { title: "Fixture", blocks: [block] } },
      }).success,
      false,
    );
  }
  assert.equal(
    projectSchema.safeParse({
      ...visual,
      media: [visual.media[0], visual.media[0]],
    }).success,
    false,
  );
});

test("diagram edges and nodes cannot reference absent or duplicate identifiers", () => {
  const diagram = system.diagrams[0];
  for (const change of [
    { edges: [{ from: "input", to: "missing" }] },
    { nodes: [diagram.nodes[0], diagram.nodes[0]] },
    { accessibleSummary: undefined },
  ]) {
    assert.equal(
      projectSchema.safeParse({
        ...system,
        diagrams: [{ ...diagram, ...change }],
      }).success,
      false,
    );
  }
});

test("local asset validation accepts fixture files and rejects missing files", () => {
  const projects = fixtureProjects.map((record) => projectSchema.parse(record));
  const root = path.resolve("src/content/fixtures/assets");
  assert.doesNotThrow(() => validateAssetFiles(projects, root));
  const broken = projectSchema.parse({
    ...visual,
    media: visual.media.map((media, index) =>
      index === 0 ? { ...media, src: "/missing.svg" } : media,
    ),
  });
  assert.throws(
    () => validateAssetFiles([broken], root),
    /fixture-visual: missing asset file/,
  );
  const video = projectSchema.parse({
    ...visual,
    media: visual.media.map((media, index) =>
      index === 0
        ? { ...media, type: "video", poster: "/missing-poster.svg" }
        : media,
    ),
  });
  assert.throws(() => validateAssetFiles([video], root), /missing-poster/);
});

test("translation declarations cannot imply missing or incomplete content is complete", () => {
  // Synthetic English strings exercise the schema; no Japanese copy is authored here.
  const ja = { title: "Synthetic translation", summary: "Synthetic summary" };
  assert.equal(
    projectSchema.safeParse({
      ...minimal,
      translationStatus: { ja: "complete" },
    }).success,
    false,
  );
  assert.equal(
    projectSchema.safeParse({
      ...minimal,
      locale: { en: minimal.locale.en, ja },
    }).success,
    false,
  );
  const summary = {
    ...system,
    locale: { en: system.locale.en, ja },
    translationStatus: { ja: "summary" },
  };
  assert.equal(projectSchema.safeParse(summary).success, true);
  assert.equal(
    projectSchema.safeParse({
      ...summary,
      translationStatus: { ja: "complete" },
    }).success,
    false,
  );
  assert.equal(
    projectSchema.safeParse({
      ...summary,
      locale: {
        ...summary.locale,
        ja: {
          ...ja,
          blocks: [{ id: "unknown", type: "goals", items: ["Example"] }],
        },
      },
      translationStatus: { ja: "partial" },
    }).success,
    false,
  );
  assert.equal(
    projectSchema.safeParse({
      ...visual,
      locale: {
        en: visual.locale.en,
        ja: {
          ...ja,
          blocks: [{ id: "image", type: "media", mediaId: "other" }],
        },
      },
      translationStatus: { ja: "partial" },
      media: [...visual.media, { ...visual.media[0], id: "other" }],
    }).success,
    false,
  );
});

test("rich text preserves inline spacing and rejects executable or arbitrary markup", () => {
  const text = richTextSchema.parse([
    {
      type: "paragraph",
      content: [
        { type: "text", text: "Read " },
        { type: "link", label: "the decision", href: "#decision" },
      ],
    },
  ]);
  assert.equal(
    text[0].type === "paragraph" &&
      text[0].content[0].type === "text" &&
      text[0].content[0].text,
    "Read ",
  );
  assert.equal(
    richTextSchema.safeParse([
      {
        type: "paragraph",
        content: [
          { type: "link", label: "Unsafe", href: "javascript:alert(1)" },
        ],
      },
    ]).success,
    false,
  );
  assert.equal(
    richTextSchema.safeParse([{ type: "html", source: "<script>" }]).success,
    false,
  );
});
