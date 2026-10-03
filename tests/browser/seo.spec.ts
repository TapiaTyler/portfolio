import { expect, test } from "@playwright/test";

const siteUrl = process.env.SITE_URL?.replace(/\/$/, "");
const indexable =
  process.env.SITE_INDEXABLE === "true" &&
  !!siteUrl &&
  !/localhost|127\.0\.0\.1/.test(siteUrl);

test("page metadata keeps one canonical identity across modes and locale fallback", async ({
  page,
  context,
}) => {
  for (const mode of ["editorial", "engineer", "digital"]) {
    await context.addCookies([
      { name: "portfolio-mode", value: mode, url: "http://127.0.0.1:3217" },
    ]);
    for (const locale of ["en", "ja"]) {
      await page.goto(`/${locale}/about?style=${mode}`);
      await expect(page).toHaveTitle("About | Tyler Tetsuo Tapia");
      if (siteUrl) {
        await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
          "href",
          `${siteUrl}/${locale}/about`,
        );
        await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
          "content",
          `${siteUrl}/${locale}/about`,
        );
        await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
          "content",
          `${siteUrl}/share-image`,
        );
      } else {
        await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
      }
      await expect(page.locator('link[hreflang="ja"]')).toHaveCount(0);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
        "content",
        locale === "en" && indexable ? "index, follow" : "noindex, follow",
      );
      await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute(
        "content",
        "en_US",
      );
    }
  }
});

test("robots sitemap and share image match deployment configuration", async ({
  request,
}) => {
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  const rules = await robots.text();
  expect(rules).toContain(indexable ? "Disallow: /dev/" : "Disallow: /");
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  const xml = await sitemap.text();
  expect((xml.match(/<loc>/g) ?? []).length).toBe(indexable ? 5 : 0);
  expect(xml).not.toMatch(/fixture|\/dev\/|\/ja\/|style=/);
  const image = await request.get("/share-image");
  expect(image.status()).toBe(200);
  expect(image.headers()["content-type"]).toContain("image/png");
  const png = await image.body();
  expect(png.readUInt32BE(16)).toBe(1200);
  expect(png.readUInt32BE(20)).toBe(630);
  expect(png.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
});

test("homepage structured data uses verified identity only when indexing is enabled", async ({
  page,
}) => {
  await page.goto("/en");
  const scripts = page.locator('script[type="application/ld+json"]');
  await expect(scripts).toHaveCount(indexable ? 1 : 0);
  if (indexable) {
    const data = JSON.parse((await scripts.textContent())!);
    expect(data["@graph"][0].name).toBe("Tyler Tetsuo Tapia");
    expect(data["@graph"][0].url).toBe(`${siteUrl}/`);
    expect(data["@graph"][0].jobTitle).toBeUndefined();
    expect(data["@graph"][0].sameAs).toBeUndefined();
  }
});
