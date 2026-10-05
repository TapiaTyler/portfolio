import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const theme of ["editorial", "engineer", "digital"] as const) {
  test(`${theme} composes the Japan Travel Planner draft with owned evidence and English fallback`, async ({
    page,
    context,
  }) => {
    await context.addCookies([
      { name: "portfolio-mode", value: theme, url: "http://127.0.0.1:3218" },
    ]);
    await page.goto("/dev/projects/japan-travel-planner");
    const study = page.locator(".case-study");
    await expect(
      study.getByRole("heading", { name: "Japan Travel Planner", exact: true }),
    ).toBeVisible();
    await expect(study.locator("#intro-product")).toContainText("without AI");
    await expect(study.locator("#intro-product")).toContainText(
      "capstone-v1.0",
    );
    await expect(study.locator("#challenge-security")).toContainText("CSRF");
    await expect(study.locator("#engineering-details")).toContainText(
      "per process",
    );
    await expect(
      study.locator("#architecture-system .diagram-nodes [data-node-id]"),
    ).toHaveCount(8);
    await expect(study.locator("#engineering-details")).toContainText(
      "25 backend tests",
    );
    // Verification detail belongs in its own section; the result describes the delivered application.
    await expect(study.locator("#result-current")).toContainText(
      "complete full-stack application",
    );
    await expect(study.locator("#result-current")).not.toContainText(
      "backend unit tests",
    );
    await expect(
      study.locator("#engineering-details .code-snippet"),
    ).toHaveCount(1);
    const mediaPairs = [
      ["intro-product", "media-itinerary-support"],
      ["intro-product", "media-mobile-support"],
      ["decision-localization", "media-localization-support"],
    ];
    for (const [owner, evidence] of mediaPairs) {
      await expect(study.locator(`#${evidence} img`)).toHaveCount(1);
      if (theme === "engineer" || theme === "digital") {
        const container =
          theme === "engineer"
            ? ".engineer-block-record"
            : ".digital-block-layer";
        await expect(
          study.locator(`${container}:has(> #${owner}) #${evidence}`),
        ).toHaveCount(1);
      }
    }
    for (const width of [320, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.evaluate(() => document.fonts.ready);
      // Load every narrative image so overflow checks include intrinsic media geometry.
      for (const image of await study.locator("img").all()) {
        await image.scrollIntoViewIfNeeded();
        await expect
          .poll(() =>
            image.evaluate(
              (element) => (element as HTMLImageElement).naturalWidth,
            ),
          )
          .toBeGreaterThan(0);
        const size = await image.evaluate((element) => {
          const image = element as HTMLImageElement;
          const bounds = image.getBoundingClientRect();
          return {
            width: bounds.width,
            height: bounds.height,
            sourceWidth: Number(image.getAttribute("width")),
            sourceHeight: Number(image.getAttribute("height")),
          };
        });
        expect(size.width).toBeLessThanOrEqual(size.sourceWidth + 1);
        expect(size.height).toBeLessThanOrEqual(size.sourceHeight + 1);
      }
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width + 1);
    }
    if (theme === "digital") {
      // A tall viewport would otherwise upscale the portrait screenshot in the gallery.
      await page.setViewportSize({ width: 1440, height: 1800 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      const mobile = study.locator("#media-mobile-support");
      await mobile.getByRole("button", { name: /^View Image:/ }).click();
      const viewer = page.getByRole("dialog", {
        name: "Project image gallery",
      });
      await expect(viewer).toBeVisible();
      const sourceWidth = await mobile.locator("img").getAttribute("width");
      const expandedWidth = await viewer
        .locator("img")
        .evaluate((image) => image.getBoundingClientRect().width);
      expect(expandedWidth).toBeLessThanOrEqual(Number(sourceWidth) + 1);
      await viewer.getByRole("button", { name: "Close Gallery" }).click();
      await expect(viewer).not.toBeVisible();
      await page.setViewportSize({ width: 1440, height: 1000 });
      await page.emulateMedia({ reducedMotion: "no-preference" });
    }
    await expect(
      study.locator("#engineering-details details > summary"),
    ).toBeVisible();
    await study.locator("#engineering-details details > summary").click();
    await expect(study.locator("#engineering-details code")).toContainText(
      "filters.transportationTypes",
    );
    const scan = await new AxeBuilder({ page })
      .include(".case-study")
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(scan.violations).toEqual([]);
    await study.locator(".case-study-intro").scrollIntoViewIfNeeded();
    await page.screenshot({ path: `.cache/japan-travel-planner-${theme}.png` });
    await page.goto("/dev/projects/japan-travel-planner?locale=ja");
    await expect(page.locator(".case-study")).toContainText(
      "Japan Travel Planner",
    );
    await expect(page.locator(".case-study")).toContainText("English");
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect(page.locator(".case-study #challenge-security")).toContainText(
      "CSRF",
    );
  });
}
