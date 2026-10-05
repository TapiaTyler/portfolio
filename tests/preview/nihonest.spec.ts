import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const theme of [
  "editorial",
  "engineer",
  "digital",
  "chronicle",
] as const) {
  test(`${theme} renders the published Nihonest case study and preserves evidence limits`, async ({
    page,
    context,
  }) => {
    await context.addCookies([
      { name: "portfolio-mode", value: theme, url: "http://127.0.0.1:3218" },
    ]);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/dev/projects/nihonest");
    const study = page.locator(".case-study");
    await expect(
      study.getByRole("heading", { name: "Nihonest", exact: true }),
    ).toBeVisible();
    await expect(study.locator("#intro-product")).toContainText(
      "one content system",
    );
    await expect(
      study.locator("#architecture-system .diagram-nodes [data-node-id]"),
    ).toHaveCount(9);
    await expect(study.locator("#engineering-details")).toContainText(
      "18 targeted tests",
    );
    await expect(study.locator("#result-current")).toContainText(
      "hosted on Vercel",
    );
    await expect(study.locator("#result-current")).not.toContainText("677");
    const resolver = study.locator("#engineering-details");
    await resolver.scrollIntoViewIfNeeded();
    await resolver.locator("summary").click();
    await expect(resolver.locator("code")).toContainText("resolveJourneySteps");
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.evaluate(() => document.fonts.ready);
      for (const image of await study.locator("img").all()) {
        await image.scrollIntoViewIfNeeded();
        await expect
          .poll(() =>
            image.evaluate((el) => (el as HTMLImageElement).naturalWidth),
          )
          .toBeGreaterThan(0);
        const bounds = await image.boundingBox();
        expect(bounds!.width).toBeLessThanOrEqual(
          Number(await image.getAttribute("width")) + 1,
        );
      }
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width + 1);
    }
    const scan = await new AxeBuilder({ page })
      .include(".case-study")
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(scan.violations).toEqual([]);
    await study.locator(".case-study-intro").scrollIntoViewIfNeeded();
    await page.screenshot({ path: `.cache/nihonest-${theme}.png` });
    await page.goto("/dev/projects/nihonest?locale=ja");
    await expect(page.locator(".case-study")).toContainText("English");
    await expect(page.locator(".case-study #result-current")).toContainText(
      "hosted on Vercel",
    );
    const response = await page.goto("/en/work/nihonest");
    expect(response?.status()).toBe(200);
  });
}
