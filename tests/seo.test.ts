import assert from "node:assert/strict";
import test from "node:test";
import { readSiteConfig } from "../src/lib/seo/site";
import {
  pageSeo,
  projectMetadata,
  sitemapEntries,
  siteStructuredData,
  serializeStructuredData,
} from "../src/lib/seo/metadata";
import { fixtureProjects } from "../src/content/fixtures/projects";
import { projectSchema } from "../src/lib/content/schema";
import { selectProjectContent } from "../src/lib/i18n/project-content";

const live = readSiteConfig({
  SITE_URL: "https://portfolio.example/",
  SITE_INDEXABLE: "true",
  NODE_ENV: "production",
});

test("indexing requires an explicit production origin and rejects invalid canonical configuration", () => {
  assert.equal(readSiteConfig({}).indexable, false);
  assert.equal(
    readSiteConfig({
      SITE_URL: "https://portfolio.example",
      SITE_INDEXABLE: "true",
      NODE_ENV: "development",
    }).indexable,
    false,
  );
  assert.equal(
    readSiteConfig({
      SITE_URL: "http://localhost:3000",
      SITE_INDEXABLE: "true",
      NODE_ENV: "production",
    }).indexable,
    false,
  );
  assert.throws(() => readSiteConfig({ SITE_INDEXABLE: "true" }), /SITE_URL/);
  assert.throws(
    () => readSiteConfig({ SITE_INDEXABLE: "yes" }),
    /SITE_INDEXABLE/,
  );
  for (const url of [
    "http://portfolio.example",
    "https://portfolio.example/path",
    "https://user:pass@portfolio.example",
    "https://portfolio.example?style=digital",
    "https://portfolio.example/#fragment",
    "file:///tmp/site",
  ])
    assert.throws(() => readSiteConfig({ SITE_URL: url }));
});

test("Vercel preview and development environments cannot enable indexing", () => {
  for (const environment of ["preview", "development", "unexpected"]) {
    const config = readSiteConfig({
      SITE_URL: "https://portfolio.example",
      SITE_INDEXABLE: "true",
      NODE_ENV: "production",
      VERCEL_ENV: environment,
    });
    assert.equal(config.indexable, false);
    assert.equal(sitemapEntries([], config).length, 0);
  }
  assert.equal(
    readSiteConfig({
      SITE_URL: "https://portfolio.example",
      SITE_INDEXABLE: "true",
      NODE_ENV: "production",
      VERCEL_ENV: "production",
    }).indexable,
    true,
  );
});

test("canonical and share identity stay independent of mode and English fallback is not a Japanese alternate", () => {
  const en = pageSeo({
    title: "Work",
    locale: "en",
    path: "/work",
    config: live,
  });
  const ja = pageSeo({
    title: "Work",
    locale: "ja",
    path: "/work",
    config: live,
  });
  assert.equal(en.alternates?.canonical, "https://portfolio.example/en/work");
  assert.equal(ja.alternates?.canonical, "https://portfolio.example/ja/work");
  assert.deepEqual(en.alternates?.languages, {
    en: "https://portfolio.example/en/work",
    "x-default": "https://portfolio.example/en/work",
  });
  assert.deepEqual(ja.robots, { index: false, follow: true });
  assert.equal(ja.openGraph?.locale, "en_US");
  const preview = pageSeo({
    title: "Work",
    locale: "en",
    path: "/work",
    config: readSiteConfig({}),
  });
  assert.equal(preview.alternates, undefined);
  assert.deepEqual(preview.robots, { index: false, follow: true });
});

test("sitemap excludes fixtures, drafts, hidden and untranslated locale variants while preserving unfeatured projects", () => {
  const publicProject = projectSchema.parse({
    ...fixtureProjects[2],
    kind: "project",
    slug: "published",
  });
  const translated = projectSchema.parse({
    ...publicProject,
    slug: "summary",
    translationStatus: { ja: "summary" },
    locale: {
      ...publicProject.locale,
      ja: {
        title: "Synthetic translated title",
        summary: "Synthetic summary for locale selection tests.",
      },
    },
  });
  const draft = projectSchema.parse({
    ...publicProject,
    slug: "draft",
    publication: { status: "draft" },
  });
  const hidden = projectSchema.parse({
    ...publicProject,
    slug: "hidden",
    publication: { status: "hidden" },
  });
  const fixture = projectSchema.parse(fixtureProjects[2]);
  const entries = sitemapEntries(
    [publicProject, translated, draft, hidden, fixture],
    live,
  );
  assert.equal(entries.length, 8);
  assert.ok(entries.some((entry) => entry.url.endsWith("/en/work/published")));
  assert.ok(entries.some((entry) => entry.url.endsWith("/ja/work/summary")));
  assert.ok(
    !entries.some((entry) =>
      /fixture|draft|hidden|\/ja\/work\/published/.test(entry.url),
    ),
  );
  assert.deepEqual(sitemapEntries([publicProject], readSiteConfig({})), []);
  const metadata = projectMetadata(
    selectProjectContent(translated, "ja"),
    live,
  );
  assert.equal(metadata.openGraph?.locale, "ja_JP");
  assert.ok(metadata.alternates?.languages?.ja);
});

test("structured data contains only verified identity and escapes script markup", () => {
  assert.equal(siteStructuredData(readSiteConfig({})), undefined);
  const data = siteStructuredData(live)!;
  assert.equal(data["@graph"][0].name, "Tyler Tetsuo Tapia");
  assert.ok(!serializeStructuredData(data).includes("jobTitle"));
  assert.ok(!serializeStructuredData(data).includes("sameAs"));
  assert.ok(
    !serializeStructuredData({ ...data, "@context": "</script>" }).includes(
      "</script>",
    ),
  );
  assert.deepEqual(
    JSON.parse(serializeStructuredData({ ...data, "@context": "</script>" })),
    { ...data, "@context": "</script>" },
  );
});
