import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { fixtureProjects } from "../src/content/fixtures/projects";
import { projectSchema } from "../src/lib/content/schema";
import type { RichText as RichTextData } from "../src/lib/content/text";
import { selectProjectContent } from "../src/lib/i18n/project-content";
import { CaseStudy } from "../src/components/semantic/case-study";
import { ProjectFeature } from "../src/components/semantic/project-feature";
import { RichText } from "../src/components/semantic/rich-text";
import { MediaAsset } from "../src/components/semantic/media-asset";

const system = projectSchema.parse(fixtureProjects[1]);
const paragraph = (text: string): RichTextData => [
  { type: "paragraph", content: [{ type: "text", text }] },
];

test("locale selection preserves English sections and resolves partial fields independently", () => {
  // Synthetic English strings test translation selection without authoring Japanese copy.
  const project = projectSchema.parse({
    ...system,
    translationStatus: { ja: "partial" },
    locale: {
      en: {
        ...system.locale.en,
        blocks: system.locale.en.blocks.map((block) =>
          block.type === "decision"
            ? { ...block, rationale: paragraph("English rationale retained") }
            : block,
        ),
      },
      ja: {
        title: "Synthetic translated title",
        blocks: [
          {
            type: "decision",
            id: "decision",
            title: "Synthetic decision title",
            decision: paragraph("Synthetic translated decision"),
          },
        ],
      },
    },
  });
  const selected = selectProjectContent(project, "ja");
  assert.equal(selected.title.lang, "ja");
  assert.equal(selected.summary?.lang, "en");
  assert.equal(selected.summary?.isFallback, true);
  assert.deepEqual(
    selected.blocks.map(({ block }) => block.id),
    system.locale.en.blocks.map((block) => block.id),
  );
  const html = renderToStaticMarkup(<CaseStudy content={selected} />);
  assert.match(html, /lang="ja">Synthetic translated title/);
  assert.match(html, /lang="ja"><p><span>Synthetic translated decision/);
  assert.match(html, /lang="en"><p><span>English rationale retained/);
  assert.match(html, /translation is incomplete/i);
  assert.equal(
    selectProjectContent(project, "en").title.value,
    system.locale.en.title,
  );
});

test("none, summary and complete translation states have intentional fallbacks", () => {
  const none = selectProjectContent(system, "ja");
  assert.equal(none.title.lang, "en");
  assert.equal(none.translationDepth, "none");
  assert.match(renderToStaticMarkup(<CaseStudy content={none} />), /English/);
  const summary = projectSchema.parse({
    ...system,
    translationStatus: { ja: "summary" },
    locale: {
      en: system.locale.en,
      ja: { title: "Synthetic title", summary: "Synthetic summary" },
    },
  });
  assert.equal(selectProjectContent(summary, "ja").summary?.lang, "ja");
  assert.equal(
    selectProjectContent(summary, "ja").blocks.length,
    system.locale.en.blocks.length,
  );
  const minimal = projectSchema.parse({
    ...fixtureProjects[0],
    translationStatus: { ja: "complete" },
    locale: { en: { title: "Source title" }, ja: { title: "Synthetic title" } },
  });
  const html = renderToStaticMarkup(
    <CaseStudy content={selectProjectContent(minimal, "ja")} />,
  );
  assert.doesNotMatch(html, /content-notice/);
});

test("every block renders with semantic headings, native details and accessible diagram text", () => {
  const blocks = new Set<string>();
  for (const record of fixtureProjects.slice(0, 3)) {
    const project = projectSchema.parse(record);
    for (const block of project.locale.en.blocks) blocks.add(block.type);
    const html = renderToStaticMarkup(
      <CaseStudy
        content={selectProjectContent(project, "en")}
        anchorPrefix="preview-"
        assetUrl={(src) => src.replace("/media/fixtures/", "/dev/fixtures/")}
      />,
    );
    for (const block of project.locale.en.blocks)
      assert.ok(html.includes(`id="preview-${block.id}"`));
    if (project.slug === "fixture-system") {
      assert.match(html, /<h1/);
      assert.match(html, /<h2 id="preview-decision-heading"/);
      assert.match(html, /<h3><span lang="en">Decision/);
      assert.match(
        html,
        /A multiline synthetic code sample for disclosure and layout review\.<\/p><details>/,
      );
      assert.match(
        html,
        /<summary lang="en">.*Read Implementation Details.*<\/summary>/,
      );
      assert.match(html, /connects to/);
      assert.match(html, /Input flows through validation to output/);
    }
  }
  assert.equal(blocks.size, 11);
});

test("sparse projects omit unsupported media, links and detail controls", () => {
  const content = selectProjectContent(
    projectSchema.parse(fixtureProjects[0]),
    "en",
  );
  const html = renderToStaticMarkup(
    <ProjectFeature content={content} href="/en/work/fixture-minimal" />,
  );
  assert.doesNotMatch(
    html,
    /<img|<video|<details|Repository|Technologies|Year/,
  );
  assert.match(html, /href="\/en\/work\/fixture-minimal"/);
  assert.match(html, /Prototype/i);
});

test("rich text and code are escaped, with fixture anchors kept in their own narrative", () => {
  const text: RichTextData = [
    {
      type: "paragraph",
      content: [
        { type: "text", text: "<script>alert(1)</script>", marks: ["strong"] },
        { type: "link", label: "Decision", href: "#decision" },
      ],
    },
  ];
  const html = renderToStaticMarkup(
    <RichText
      content={{ value: text, lang: "en", isFallback: false }}
      anchorPrefix="fixture-"
    />,
  );
  assert.match(html, /&lt;script&gt;/);
  assert.doesNotMatch(html, /<script>/);
  assert.match(html, /href="#fixture-decision"/);
  const project = projectSchema.parse({
    ...system,
    codeSnippets: [
      { ...system.codeSnippets[0], source: "<script>unsafe</script>" },
    ],
  });
  assert.match(
    renderToStaticMarkup(
      <CaseStudy content={selectProjectContent(project, "en")} />,
    ),
    /<code>&lt;script&gt;unsafe&lt;\/script&gt;<\/code>/,
  );
});

test("video retains native controls, a poster and no automatic playback", () => {
  const html = renderToStaticMarkup(
    <MediaAsset
      type="video"
      src="/video.mp4"
      poster="/poster.svg"
      alt="English video description"
      lang="en"
      width={800}
      height={500}
    />,
  );
  assert.match(html, /controls=""/);
  assert.match(html, /preload="none"/);
  assert.match(html, /poster="\/poster.svg"/);
  assert.match(html, /aria-label="English video description"/);
  assert.doesNotMatch(html, /autoPlay|autoplay/);
});
