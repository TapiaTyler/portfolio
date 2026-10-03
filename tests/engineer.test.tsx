import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { fixtureProjects } from "../src/content/fixtures/projects";
import { projectSchema } from "../src/lib/content/schema";
import { selectProjectContent } from "../src/lib/i18n/project-content";
import { EngineerCaseStudy } from "../src/compositions/engineer/case-study";
import { EngineerProjectFeature } from "../src/compositions/engineer/project-feature";
import { EngineerHomepage } from "../src/compositions/engineer/homepage";
import { homepageContent } from "../src/content/placeholder";

test("Engineer exposes architecture summaries early without reordering the canonical blocks", () => {
  const project = projectSchema.parse(fixtureProjects[1]);
  const html = renderToStaticMarkup(
    <EngineerCaseStudy
      content={selectProjectContent(project, "ja")}
      anchorPrefix="preview-"
    />,
  );
  assert.ok(
    html.indexOf("engineer-system-overview") <
      html.indexOf('id="preview-context"'),
  );
  assert.ok(
    html.indexOf('href="#preview-architecture"') <
      html.indexOf('href="#preview-decision"'),
  );
  assert.match(html, /lang="en">Fixture data flow/);
  assert.match(html, /Input flows through validation to output/);
  assert.match(html, /data-record-type="decision"/);
  const positions = project.locale.en.blocks.map((block) =>
    html.indexOf(`id="preview-${block.id}"`),
  );
  assert.ok(
    positions.every(
      (position, index) =>
        position >= 0 && (index === 0 || position > positions[index - 1]),
    ),
  );
});

test("Engineer omits unsupported system overview and evidence while retaining actual project metadata", () => {
  const project = projectSchema.parse(fixtureProjects[0]);
  const content = selectProjectContent(project, "en");
  const html = renderToStaticMarkup(<EngineerCaseStudy content={content} />);
  assert.doesNotMatch(html, /engineer-system-overview|<img|<details/);
  assert.match(html, /prototype/);
  const feature = renderToStaticMarkup(
    <EngineerProjectFeature
      content={content}
      href="/en/work/fixture-minimal"
    />,
  );
  assert.doesNotMatch(feature, /engineer-project__evidence|<img/);
  assert.match(feature, /href="\/en\/work\/fixture-minimal"/);
});

test("Engineer shares homepage facts but groups Lab and About as technical secondary records", () => {
  const html = renderToStaticMarkup(
    <EngineerHomepage content={homepageContent} projects={[]} locale="en" />,
  );
  assert.match(html, /engineer-hero-grid/);
  assert.match(html, /0 selected projects/);
  assert.ok(
    html.indexOf('id="lab-heading"') < html.indexOf('id="about-heading"'),
  );
  assert.doesNotMatch(
    html,
    /all systems operational|available for work|Recent Activity|Tokyo|AWS/,
  );
});
