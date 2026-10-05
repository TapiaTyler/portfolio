import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.beforeEach(async ({ context }) => {
  await context.addCookies([
    { name: "portfolio-mode", value: "digital", url: "http://127.0.0.1:3217" },
  ]);
});

test("Digital renders a responsive spatial composition with local fonts and native mobile controls", async ({
  page,
}, testInfo) => {
  await page.goto("/en");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator(".digital-hero")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Tyler Tetsuo Tapia", level: 1 }),
  ).toBeVisible();
  expect(
    await page
      .locator("h1")
      .evaluate((element) => getComputedStyle(element).fontFamily),
  ).toContain("interfaceFont");
  await expect(
    page.getByRole("link", { name: "Explore Work", exact: true }),
  ).toHaveText("Explore Work");
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `overflow at ${width}`,
    ).toBe(true);
    await page.screenshot({
      path: testInfo.outputPath(`digital-${width}.png`),
      fullPage: true,
    });
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator(".mobile-navigation > summary").click();
  await expect(
    page.getByRole("navigation", { name: "Language" }),
  ).toBeVisible();
  await page.locator(".mode-picker:visible > summary").click();
  await page.getByRole("button", { name: "Editorial", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "editorial");
});

test("Digital public shells have no detected WCAG AA accessibility violations", async ({
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
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(result.violations, route).toEqual([]);
  }
});
