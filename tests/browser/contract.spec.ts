import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { themeIds } from "../../src/lib/theme/ids";

/*
 * The presentation contract (AGENTS.md §4): every mode may change layout and
 * motion, but never content, routes, accessibility or the no-JavaScript path.
 * These checks deliberately assert nothing about appearance or animation, so
 * design adjustments do not require test changes. Visual polish is reviewed by
 * eye; see docs/12-TESTING-AND-QUALITY.md.
 */

const pages = ["", "/work", "/about", "/lab", "/contact"];
const locales = ["en", "ja"] as const;

// Visiting each page only after DOMContentLoaded keeps checks independent of
// slow media; nothing here needs every image to finish.
const ready = { waitUntil: "domcontentloaded" } as const;

async function projectPaths(page: Page, locale: string) {
  await page.goto(`/${locale}/work`, ready);
  const hrefs = await page
    .locator("main a[href]")
    .evaluateAll(
      (links, prefix) =>
        links
          .map((link) => new URL((link as HTMLAnchorElement).href).pathname)
          .filter((path) => path.startsWith(prefix)),
      `/${locale}/work/`,
    );
  return [...new Set(hrefs)].sort();
}

test.use({ reducedMotion: "reduce" });

test("every mode lists the same published projects", async ({
  page,
  context,
  baseURL,
}) => {
  const lists: string[][] = [];
  for (const mode of themeIds) {
    await context.addCookies([
      { name: "portfolio-mode", value: mode, url: baseURL! },
    ]);
    lists.push(await projectPaths(page, "en"));
  }
  expect(lists[0].length).toBeGreaterThan(0);
  for (const list of lists) expect(list).toEqual(lists[0]);
});

for (const mode of themeIds) {
  test(`${mode} serves every page accessibly in both locales`, async ({
    page,
    context,
    baseURL,
  }) => {
    test.setTimeout(180_000);
    await context.addCookies([
      { name: "portfolio-mode", value: mode, url: baseURL! },
    ]);
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    for (const locale of locales) {
      const routes = [
        ...pages.map((path) => `/${locale}${path}`),
        ...(await projectPaths(page, locale)),
      ];
      for (const route of routes) {
        const response = await page.goto(route, ready);
        expect(response?.status(), route).toBe(200);
        await expect(page.locator("html")).toHaveAttribute("data-theme", mode);
        await expect(page.locator("html")).toHaveAttribute("lang", locale);
        await expect(page.locator("h1:visible"), route).toHaveCount(1);
        const scan = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
          .analyze();
        expect(scan.violations, route).toEqual([]);
      }
    }
    expect(errors).toEqual([]);
  });

  test(`${mode} keeps content and navigation usable without JavaScript`, async ({
    browser,
    baseURL,
  }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    try {
      await context.addCookies([
        { name: "portfolio-mode", value: mode, url: baseURL! },
      ]);
      const page = await context.newPage();
      for (const path of pages) {
        await page.goto(`/en${path}`, ready);
        await expect(page.locator("h1:visible")).toHaveCount(1);
      }
      const [project] = await projectPaths(page, "en");
      await page.goto(project, ready);
      await expect(page.locator("h1:visible")).toHaveCount(1);
      // Every primary destination stays a real link.
      for (const path of pages.slice(1))
        await expect(
          page.locator(`a[href="/en${path}"]`).first(),
        ).toBeAttached();
    } finally {
      await context.close();
    }
  });
}
