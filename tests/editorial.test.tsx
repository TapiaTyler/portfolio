import { text as copyText } from "../src/lib/i18n/copy";
import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { fixtureProjects } from "../src/content/fixtures/projects";
import { homepageContent } from "../src/content/placeholder";
import { projectSchema } from "../src/lib/content/schema";
import { selectProjectContent } from "../src/lib/i18n/project-content";
import { themeIds } from "../src/lib/theme/ids";
import { resolveComposition } from "../src/registries/compositions";
import { EditorialProjectFeature } from "../src/compositions/editorial/project-feature";

test("homepage content and navigation are available in every mode without fixture leakage", () => {
  for (const theme of themeIds) {
    const Renderer = resolveComposition(theme).Homepage;
    const html = renderToStaticMarkup(
      <Renderer content={homepageContent} projects={[]} locale="ja" />,
    );
    for (const text of [
      homepageContent.hero.title,
      homepageContent.work.emptyText,
      homepageContent.about.title,
      homepageContent.lab.emptyText,
      homepageContent.contact.title,
    ])
      assert.ok(html.includes(copyText(text, "ja")));
    for (const destination of ["work", "about", "lab", "contact"])
      assert.ok(html.includes(`href="/ja/${destination}"`));
    assert.doesNotMatch(html, /fixture-system|\/media\/fixtures\//);
    assert.doesNotMatch(html, /class="[^"]*project-feature/);
    assert.equal((html.match(/<h1/g) ?? []).length, 1);
  }
});

test("Editorial project reading order stays title, media, narrative and omits absent imagery", () => {
  for (const record of fixtureProjects.slice(0, 3)) {
    const project = projectSchema.parse(record);
    const content = selectProjectContent(project, "ja");
    const html = renderToStaticMarkup(
      <EditorialProjectFeature
        content={content}
        href={`/ja/work/${project.slug}`}
        assetUrl={(src) => src.replace("/media/fixtures/", "/dev/fixtures/")}
      />,
    );
    assert.ok(html.includes(content.title.value));
    assert.match(html, /lang="en"/);
    if (project.previewMediaId) {
      assert.ok(
        html.indexOf("editorial-project__title") <
          html.indexOf("editorial-project__media"),
      );
      assert.ok(
        html.indexOf("editorial-project__media") <
          html.indexOf("editorial-project__narrative"),
      );
    } else assert.doesNotMatch(html, /editorial-project__media|<img/);
  }
});
