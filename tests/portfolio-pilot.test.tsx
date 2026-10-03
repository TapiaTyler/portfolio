import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { portfolioProject } from "../src/content/projects/portfolio";
import { projectSchema } from "../src/lib/content/schema";
import { validateAssetFiles } from "../src/lib/content/assets";
import { selectProjectContent } from "../src/lib/i18n/project-content";
import { resolveComposition } from "../src/registries/compositions";
import { caseStudySections } from "../src/lib/content/case-study-sections";
import {
  getProject,
  getPublishedProjects,
  getFeaturedProjects,
} from "../src/registries/projects";

test("real portfolio pilot validates its media and stays outside every public project selector", () => {
  const project = projectSchema.parse(portfolioProject);
  validateAssetFiles([project], path.resolve("public"));
  assert.equal(project.publication.status, "draft");
  assert.equal(getProject("portfolio"), undefined);
  assert.ok(
    !getPublishedProjects().some((record) => record.slug === "portfolio"),
  );
  assert.ok(
    !getFeaturedProjects().some((record) => record.slug === "portfolio"),
  );
  assert.equal(project.contribution?.implementation, "ai-assisted");
  assert.equal(project.translationStatus.ja, "none");
});

test("the pilot's complete canonical narrative renders in every composition and locale fallback", () => {
  const project = projectSchema.parse(portfolioProject);
  for (const locale of ["en", "ja"] as const) {
    const content = selectProjectContent(project, locale);
    assert.deepEqual(
      content.blocks.map(({ block }) => block.id),
      project.locale.en.blocks.map((block) => block.id),
    );
    for (const theme of ["editorial", "engineer", "digital"] as const) {
      const composition = resolveComposition(theme);
      const html = renderToStaticMarkup(
        <composition.CaseStudy
          content={content}
          IntroRenderer={composition.CaseStudyIntro}
          blockRenderers={composition.blockRenderers}
        />,
      );
      for (const block of project.locale.en.blocks)
        assert.ok(
          html.includes(`id="${block.id}"`),
          `${theme}/${locale} missing ${block.id}`,
        );
      assert.ok(
        html.includes("Morph the composition without duplicating the content"),
      );
      assert.ok(html.includes("Small responses carry the same design intent"));
      assert.ok(html.includes("not an original historical screenshot"));
      assert.ok(html.includes("<video"));
    }
  }
});

test("supporting media references preserve adjacent narrative meaning", () => {
  const project = projectSchema.parse(portfolioProject);
  const evidence = project.locale.en.blocks.find(
    (block) => block.id === "morphing-evidence",
  )!;
  assert.equal(evidence.type, "media");
  if (evidence.type !== "media") return;
  for (const id of ["missing", "morphing-evidence", "intent", "compositions"]) {
    evidence.supportsBlockId = id;
    assert.equal(projectSchema.safeParse(project).success, false, id);
  }
  delete evidence.supportsBlockId;
  assert.equal(projectSchema.safeParse(project).success, true);
  const composition = resolveComposition("digital");
  const html = renderToStaticMarkup(
    <composition.CaseStudy content={selectProjectContent(project, "en")} />,
  );
  assert.ok(!html.includes('aria-describedby="continuity-heading"'));
  assert.ok(html.includes('aria-describedby="navigation-motion-heading"'));
  assert.ok(html.includes('aria-describedby="microinteractions-heading"'));
});

test("section navigation preserves canonical narrative anchors and overview fallback", () => {
  const project = projectSchema.parse(portfolioProject);
  const content = selectProjectContent(project, "ja");
  const sections = caseStudySections(content, "pilot-");
  assert.equal(sections.length, 9);
  assert.deepEqual(
    sections.map(({ id }) => id),
    content.blocks
      .filter(({ block }) => !["media", "gallery"].includes(block.type))
      .map(({ block }) => `pilot-${block.id}`),
  );
  assert.ok(sections.every(({ title }) => title.lang === "en"));
  project.translationStatus.ja = "complete";
  project.locale.ja = structuredClone(project.locale.en);
  delete project.locale.ja.overview;
  assert.ok(
    projectSchema
      .safeParse(project)
      .error?.issues.some((issue) => issue.path.includes("overview")),
  );
});
