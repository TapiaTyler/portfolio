import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { themeIds, isThemeId } from "../src/lib/theme/ids";
import {
  resolveThemePreference,
  themeCookieOptions,
} from "../src/lib/theme/preference";
import {
  themeOptions,
  themeRegistry,
  themeStyleSheet,
} from "../src/registries/themes";
import { resolveComposition } from "../src/registries/compositions";
import { CaseStudy } from "../src/components/semantic/case-study";
import { CaseStudyBlock } from "../src/components/semantic/case-study-block";
import { ThemeStyles } from "../src/components/theme/theme-styles";
import { fixtureProjects } from "../src/content/fixtures/projects";
import { projectSchema } from "../src/lib/content/schema";
import { selectProjectContent } from "../src/lib/i18n/project-content";

test("only registered modes are accepted and invalid saved preferences default to Product", () => {
  for (const id of themeIds) {
    assert.equal(isThemeId(id), true);
    assert.equal(resolveThemePreference(id), id);
  }
  for (const value of [
    undefined,
    null,
    "",
    "graphic",
    "ENGINEER",
    "<script>",
    {},
    ["digital"],
  ]) {
    assert.equal(isThemeId(value), false);
    assert.equal(resolveThemePreference(value), "product");
  }
  assert.equal(themeCookieOptions.path, "/");
  assert.equal(themeCookieOptions.sameSite, "lax");
  assert.ok(themeCookieOptions.maxAge > 0);
});

test("presentation order and root token fallback match the Product default", () => {
  const order = ["product", "editorial", "engineer", "digital", "chronicle"];
  assert.deepEqual([...themeIds], order);
  assert.deepEqual(
    themeOptions.map(({ id }) => id),
    order,
  );
  const css = themeStyleSheet();
  assert.ok(css.includes(':root,[data-theme="product"]'));
  assert.ok(!css.includes(':root,[data-theme="editorial"]'));
});

test("every mode satisfies the token contract and reduced motion overrides every scope", () => {
  const expected = Object.keys(themeRegistry.editorial.tokens).sort();
  for (const id of themeIds) {
    assert.deepEqual(Object.keys(themeRegistry[id].tokens).sort(), expected);
    assert.ok(
      Object.values(themeRegistry[id].tokens).every(
        (value) => value.length > 0,
      ),
    );
  }
  const css = themeStyleSheet();
  for (const id of themeIds) assert.ok(css.includes(`[data-theme="${id}"]`));
  assert.match(
    css,
    /@media\(prefers-reduced-motion:reduce\).*--motion-fast:0ms;--motion-slow:0ms/,
  );
  assert.match(
    renderToStaticMarkup(<ThemeStyles />),
    /<style id="portfolio-theme-tokens">/,
  );
});

test("every published fixture renders in every composition without changing selected content", () => {
  for (const record of fixtureProjects.filter(
    (project) => project.publication.status === "published",
  )) {
    const project = projectSchema.parse(record);
    const before = structuredClone(project);
    for (const locale of ["en", "ja"] as const) {
      const content = selectProjectContent(project, locale);
      const baseline = renderToStaticMarkup(
        <CaseStudy
          content={content}
          assetUrl={(src) => src.replace("/media/fixtures/", "/dev/fixtures/")}
        />,
      );
      for (const theme of themeIds) {
        const composition = resolveComposition(theme);
        const Renderer = composition.CaseStudy;
        const html = renderToStaticMarkup(
          <Renderer
            content={content}
            IntroRenderer={composition.CaseStudyIntro}
            blockRenderers={composition.blockRenderers}
            assetUrl={(src) =>
              src.replace("/media/fixtures/", "/dev/fixtures/")
            }
          />,
        );
        // Each canonical section keeps its complete text and sequence even when the intro changes.
        let previousPosition = -1;
        for (const { block } of content.blocks) {
          const section = new RegExp(
            `<section id="${block.id}"[^>]*>([\\s\\S]*?)</section>`,
          );
          const actual = html.match(section)?.[1];
          const expected = baseline.match(section)?.[1];
          assert.ok(actual && expected, `${theme}: missing ${block.id}`);
          assert.equal(
            actual.replace(/<[^>]*>/g, ""),
            expected.replace(/<[^>]*>/g, ""),
          );
          const position = html.indexOf(`id="${block.id}"`);
          assert.ok(position > previousPosition);
          previousPosition = position;
        }
        for (const text of [
          content.title.value,
          content.summary?.value,
          content.description?.value,
        ].filter((text) => text !== undefined)) {
          const escaped = renderToStaticMarkup(<span>{text}</span>).slice(
            6,
            -7,
          );
          assert.ok(
            html.includes(escaped),
            `${theme}: missing localized intro field`,
          );
        }
      }
    }
    assert.deepEqual(project, before);
  }
});

test("a specialized block renderer leaves unimplemented block types on shared fallbacks", () => {
  const content = selectProjectContent(
    projectSchema.parse(fixtureProjects[1]),
    "en",
  );
  const html = renderToStaticMarkup(
    <CaseStudy
      content={content}
      blockRenderers={{
        decision: (props) => (
          <div data-specialized="decision">
            <CaseStudyBlock {...props} />
          </div>
        ),
      }}
    />,
  );
  assert.match(html, /data-specialized="decision"/);
  for (const { block } of content.blocks)
    assert.ok(html.includes(`id="${block.id}"`));
  assert.match(html, /Input flows through validation to output/);
});
