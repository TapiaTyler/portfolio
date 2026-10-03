import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.beforeEach(async ({ context }) => {
  await context.addCookies([
    { name: "portfolio-mode", value: "engineer", url: "http://127.0.0.1:3217" },
  ]);
});

test("Engineer renders a distinct responsive dossier using local fonts", async ({
  page,
}, testInfo) => {
  const fonts: string[] = [];
  page.on("request", (request) => {
    if (request.resourceType() === "font") fonts.push(request.url());
  });
  await page.goto("/en");
  await page.evaluate(() => document.fonts.ready);
  await expect(
    page.getByRole("heading", {
      name: "Tyler Tetsuo Tapia",
      exact: true,
      level: 1,
    }),
  ).toBeVisible();
  await expect(page.locator(".engineer-hero-grid")).toBeVisible();
  expect(
    await page
      .locator("body")
      .evaluate((element) => getComputedStyle(element).fontFamily),
  ).toContain("engineerMono");
  expect(
    await page
      .locator("h1")
      .evaluate((element) => getComputedStyle(element).fontFamily),
  ).toContain("engineerSans");
  expect(fonts.length).toBeGreaterThan(0);
  expect(fonts.every((url) => new URL(url).hostname === "127.0.0.1")).toBe(
    true,
  );
  await expect(page.locator(".editorial-hero")).toHaveCount(0);
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `overflow at ${width}px`,
    ).toBe(true);
    if (width === 1440) {
      const boxes = await page
        .locator(".engineer-hero-grid")
        .evaluate((element) => {
          const profile = element
            .querySelector(".engineer-profile")!
            .getBoundingClientRect();
          const overview = element
            .querySelector(".engineer-project-overview")!
            .getBoundingClientRect();
          return {
            profileRight: profile.right,
            overviewLeft: overview.left,
            ratio: profile.width / overview.width,
          };
        });
      expect(boxes.overviewLeft).toBeGreaterThanOrEqual(boxes.profileRight - 1);
      expect(boxes.ratio).toBeCloseTo(1, 1);
    }
    await page.screenshot({
      path: testInfo.outputPath(`engineer-${width}.png`),
      fullPage: true,
    });
  }
});

test("Engineer pages have no detected WCAG AA accessibility violations", async ({
  page,
}) => {
  for (const route of [
    "/en",
    "/en/work",
    "/en/about",
    "/en/lab",
    "/en/contact",
    "/ja",
  ]) {
    await page.goto(route);
    await page.evaluate(() => document.fonts.ready);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(result.violations, route).toEqual([]);
  }
});
