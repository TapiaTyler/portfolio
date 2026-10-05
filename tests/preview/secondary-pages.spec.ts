import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const theme of ["editorial", "engineer", "digital"] as const) {
  test(`${theme} secondary screens share content and support mobile, locale fallback and accessible navigation`, async ({
    page,
    context,
  }) => {
    await context.addCookies([
      { name: "portfolio-mode", value: theme, url: "http://127.0.0.1:3218" },
    ]);
    for (const route of ["work", "about", "lab", "contact"]) {
      await page.setViewportSize({ width: 1440, height: 1000 });
      await page.goto(`/en/${route}`);
      const article = page.locator(".secondary-page");
      await expect(article).toHaveAttribute("lang", "en");
      await expect(article.locator("h1")).toHaveText(
        route[0].toUpperCase() + route.slice(1),
      );
      await expect(article.locator(".secondary-page-related a")).toHaveCount(2);
      // Only Work lists projects; other pages never embed project cards.
      if (route !== "work")
        await expect(article.locator("[data-project-slug]")).toHaveCount(0);
      if (route === "about")
        await expect(article).toContainText("Western Governors University");
      if (route === "contact") {
        await expect(article).toContainText(
          "Verified contact links will be added here.",
        );
        await expect(article.locator('form, a[href^="mailto:"]')).toHaveCount(
          0,
        );
      }
      if (theme === "engineer" && route === "about") {
        const link = article.locator(".secondary-page-index a").last();
        await link.focus();
        await page.keyboard.press("Enter");
        await expect(page).toHaveURL(/#page-.*-heading$/);
      }
      const scan = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(scan.violations).toEqual([]);
      for (const width of [1440, 390, 320]) {
        await page.setViewportSize({ width, height: 1000 });
        await page.evaluate(() => {
          window.scrollTo(0, 0);
          return document.fonts.ready;
        });
        await page.waitForTimeout(400);
        expect(
          await page.evaluate(() => document.documentElement.scrollWidth),
        ).toBeLessThanOrEqual(width + 1);
        if (width === 1440 || width === 390)
          await page.screenshot({
            path: `.cache/secondary-${theme}-${route}-${width}.png`,
            fullPage: true,
          });
      }
      await page.goto(`/ja/${route}`);
      await expect(page.locator(".translation-notice")).toBeVisible();
      await expect(article).toHaveAttribute("lang", "en");
      await expect(
        article.locator(".secondary-page-related a").first(),
      ).toHaveAttribute("href", /^\/ja\//);
    }
    await page.goto("/dev/compositions?surface=work");
    await expect(
      page.locator(".secondary-page .project-index > article"),
    ).toHaveCount(3);
    await expect(
      page.locator('.secondary-page a[href*="surface=project"]').first(),
    ).toHaveAttribute("href", /project=fixture-/);
    await page.setViewportSize({ width: 1440, height: 1000 });
    for (const image of await page
      .locator(".secondary-page .project-index img")
      .all()) {
      await image.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          image.evaluate(
            (element) => (element as HTMLImageElement).naturalWidth,
          ),
        )
        .toBeGreaterThan(0);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(600);
    await page.screenshot({
      path: `.cache/secondary-${theme}-work-populated.png`,
      fullPage: true,
    });
    await page.setViewportSize({ width: 320, height: 844 });
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(321);
    if (theme === "digital") {
      await page.setViewportSize({ width: 1440, height: 1000 });
      await page
        .locator(
          '.digital-project[data-project-slug="fixture-system"] .text-link',
        )
        .click();
      await expect(page).toHaveURL(/surface=project/);
      await expect(page.locator("html")).not.toHaveAttribute(
        "data-route-transition",
      );
      await page.goBack();
      await expect(page).toHaveURL(/surface=work/);
      await expect(page.locator("html")).not.toHaveAttribute(
        "data-route-transition",
      );
      await page.goto("/en/about");
      const panel = page.locator(".secondary-page-opening");
      await panel.hover();
      await expect
        .poll(() =>
          panel.evaluate((element) =>
            (element as HTMLElement).style.getPropertyValue("--card-light-x"),
          ),
        )
        .not.toBe("");
      expect(
        await panel.evaluate((element) =>
          getComputedStyle(element)
            .getPropertyValue("--card-light-strength")
            .trim(),
        ),
      ).toBe("5%");
      await page.emulateMedia({ reducedMotion: "reduce" });
      await expect
        .poll(() =>
          panel.evaluate((element) =>
            (element as HTMLElement).style.getPropertyValue("--card-light-x"),
          ),
        )
        .toBe("");
    }
  });
}
