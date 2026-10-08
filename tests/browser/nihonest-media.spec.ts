import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";

test("Nihonest opens with its live homepage in every presentation", async ({
  page,
  context,
  baseURL,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const mode of [
    "editorial",
    "engineer",
    "digital",
    "chronicle",
    "product",
  ]) {
    await context.addCookies([
      { name: "portfolio-mode", value: mode, url: baseURL! },
    ]);
    await page.goto("/en/work/nihonest", { waitUntil: "domcontentloaded" });
    const cover = page.locator(
      '.case-study figure[data-media-id="home-desktop"]',
    );
    await expect(cover).toHaveCount(1);
    await cover.scrollIntoViewIfNeeded();
    const image = cover.locator("img");
    await expect
      .poll(() => image.evaluate((el) => (el as HTMLImageElement).naturalWidth))
      .toBeGreaterThan(0);
    await expect(image).toHaveAttribute("src", /home-live-desktop-2026-10-08/);
    await expect(cover.locator("figcaption")).toContainText(
      "Captured October 8, 2026",
    );
  }
});

test("Product keeps related portrait evidence in one row without overflow", async ({
  page,
  context,
  baseURL,
}) => {
  await context.addCookies([
    { name: "portfolio-mode", value: "product", url: baseURL! },
  ]);
  await mkdir(".cache/product-review", { recursive: true });
  for (const motion of ["no-preference", "reduce"] as const) {
    await page.emulateMedia({ reducedMotion: motion });
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto("/en/work/nihonest", { waitUntil: "domcontentloaded" });
      await page.evaluate(() => document.fonts.ready);
      const pair = page.locator(
        '.product-evidence:has([data-media-id="journey-mobile"])',
      );
      await pair.scrollIntoViewIfNeeded();
      const frames = pair.locator(".media-frame");
      await expect(frames).toHaveCount(2);
      await expect(pair).toHaveAttribute("data-portrait-pair", "");
      for (const image of await frames.locator("img").all()) {
        await expect
          .poll(() =>
            image.evaluate((el) => (el as HTMLImageElement).naturalWidth),
          )
          .toBeGreaterThan(0);
        const bounds = (await image.boundingBox())!;
        expect(bounds.width).toBeLessThanOrEqual(
          Number(await image.getAttribute("width")),
        );
        expect(bounds.height).toBeLessThanOrEqual(
          Number(await image.getAttribute("height")),
        );
      }
      await page.waitForFunction(
        () =>
          document
            .getAnimations()
            .filter(
              (animation) =>
                animation.playState === "running" &&
                animation.effect?.getComputedTiming().iterations !== Infinity,
            ).length === 0,
      );
      const first = (await frames.nth(0).boundingBox())!;
      const second = (await frames.nth(1).boundingBox())!;
      expect(Math.abs(first.y - second.y)).toBeLessThan(2);
      expect(second.x).toBeGreaterThan(first.x + first.width);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width + 1);
      const scan = await new AxeBuilder({ page }).analyze();
      expect(scan.violations).toEqual([]);
      if (motion === "reduce") {
        await pair.screenshot({
          path: `.cache/product-review/nihonest-portrait-pair-${width}.png`,
        });
        await page.screenshot({
          path: `.cache/product-review/nihonest-paired-${width}.png`,
          fullPage: true,
        });
      }
    }
  }
});
