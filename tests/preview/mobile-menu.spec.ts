import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const theme of ["editorial", "engineer", "digital"] as const) {
  test(`${theme} mobile menu glyph opens, closes and respects reduced motion`, async ({
    page,
    context,
  }) => {
    await context.addCookies([
      { name: "portfolio-mode", value: theme, url: "http://127.0.0.1:3218" },
    ]);
    await page.setViewportSize({ width: 320, height: 844 });
    await page.goto("/en/about");
    const menu = page.locator(".mobile-navigation");
    const summary = menu.locator("summary").first();
    const line = summary.locator(".mobile-navigation__icon > span").first();
    const closed = await line.evaluate(
      (element) => getComputedStyle(element).transform,
    );
    await expect(summary).toHaveAccessibleName("Menu");
    expect((await summary.boundingBox())!.height).toBeGreaterThanOrEqual(44);
    await summary.focus();
    await page.keyboard.press("Enter");
    await expect(menu).toHaveAttribute("open", "");
    await expect
      .poll(() =>
        line.evaluate((element) => getComputedStyle(element).transform),
      )
      .not.toBe(closed);
    await expect(menu.locator(".site-controls--mobile")).toBeVisible();
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(321);
    await page.screenshot({ path: `.cache/mobile-menu-${theme}-open.png` });
    // Scan the settled menu; mid-fade link colours blend and read as low contrast.
    await page.evaluate(() =>
      Promise.all(
        document.getAnimations().map((animation) => animation.finished),
      ).catch(() => undefined),
    );
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
    await page.keyboard.press("Escape");
    await expect(menu).not.toHaveAttribute("open", "");
    await expect(summary).toBeFocused();
    await expect
      .poll(() =>
        line.evaluate((element) => getComputedStyle(element).transform),
      )
      .toBe(closed);
    await page.screenshot({ path: `.cache/mobile-menu-${theme}-closed.png` });
    await page.emulateMedia({ reducedMotion: "reduce" });
    expect(
      await line.evaluate(
        (element) => getComputedStyle(element).transitionDuration,
      ),
    ).toBe("0s");
    await summary.click();
    await menu.getByRole("link", { name: "Work", exact: true }).click();
    await expect(page).toHaveURL(/\/en\/work$/);
    await expect(menu).not.toHaveAttribute("open", "");
  });
}

test("mobile menu remains a native disclosure without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 320, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3218/en");
  const menu = page.locator(".mobile-navigation");
  await menu.locator("summary").first().click();
  await expect(menu).toHaveAttribute("open", "");
  await menu.getByRole("link", { name: "Work", exact: true }).click();
  await expect(page).toHaveURL(/\/en\/work$/);
  await context.close();
});
