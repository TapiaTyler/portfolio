import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.beforeEach(async ({ context, baseURL }) => {
  await context.addCookies([
    { name: "portfolio-mode", value: "editorial", url: baseURL! },
  ]);
});

test("Editorial keeps its hierarchy and locally served fonts across viewport sizes", async ({
  page,
}, testInfo) => {
  const fonts: string[] = [];
  page.on("request", (request) => {
    if (request.resourceType() === "font") fonts.push(request.url());
  });
  await page.goto("/en");
  await page.evaluate(() => document.fonts.ready);
  expect(
    await page
      .locator(".editorial-hero h1")
      .evaluate((element) => getComputedStyle(element).fontFamily),
  ).toContain("editorialDisplay");
  expect(fonts.length).toBeGreaterThan(0);
  expect(fonts.every((url) => new URL(url).hostname === "127.0.0.1")).toBe(
    true,
  );
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    for (const name of [
      "Selected Work",
      "Areas of Practice",
      "Lab & Explorations",
      "Open to software engineering and web development roles in Japan.",
    ]) {
      await expect(
        page.getByRole("heading", { name, exact: true }),
      ).toBeVisible();
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `overflow at ${width}px`,
    ).toBe(true);
    if (width >= 1440) {
      // A type-only cover keeps the hero compact so Selected Work follows it.
      const hero = await page
        .locator(".editorial-hero")
        .evaluate((element) => ({
          height: element.getBoundingClientRect().height,
          visuals: element.querySelectorAll("svg, img").length,
        }));
      expect(hero.visuals).toBe(0);
      expect(hero.height).toBeLessThan(700);
    }
    await page.screenshot({
      path: testInfo.outputPath(`editorial-${width}.png`),
      fullPage: true,
    });
  }
});

test("mobile navigation and presentation controls work with keyboard and preserve destinations", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en");
  const menu = page.locator(".mobile-navigation > summary");
  await expect(page.locator(".site-controls--desktop")).toBeHidden();
  await expect(page.locator(".site-controls--mobile")).toBeHidden();
  const languageTypography = () =>
    page.locator(".locale-switcher a").evaluateAll((links) =>
      links.map((link) => {
        const style = getComputedStyle(link);
        return [
          style.fontFamily,
          style.fontSize,
          style.fontWeight,
          style.fontStyle,
        ];
      }),
    );
  const initialTypography = await languageTypography();
  expect(initialTypography[0]).toEqual(initialTypography[1]);
  expect(initialTypography[0][0]).toContain("interfaceFont");
  await menu.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".site-controls--mobile")).toBeVisible();
  await expect(
    page.getByRole("navigation", { name: "Primary", exact: true }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  await expect(page.locator(".mobile-navigation")).not.toHaveAttribute(
    "open",
    "",
  );
  await menu.click();
  await page
    .getByRole("navigation", { name: "Primary", exact: true })
    .getByRole("link", { name: "About", exact: true })
    .click();
  await expect(page).toHaveURL(/\/en\/about$/);
  await expect(page.locator(".mobile-navigation")).not.toHaveAttribute(
    "open",
    "",
  );
  await menu.click();
  const picker = page.locator(".mode-picker:visible > summary");
  await picker.focus();
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("button", { name: "Engineer", exact: true }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(picker).toBeFocused();
  await expect(page.locator(".mobile-navigation")).toHaveAttribute("open", "");
  await page
    .getByRole("navigation", { name: "Language", exact: true })
    .getByRole("link", { name: "JP" })
    .click();
  await expect(page).toHaveURL(/\/ja\/about$/);
  await expect(page.locator("html")).toHaveAttribute("data-theme", "editorial");
  expect(await languageTypography()).toEqual(initialTypography);
});

test("Editorial pages have no detected WCAG AA accessibility violations", async ({
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
