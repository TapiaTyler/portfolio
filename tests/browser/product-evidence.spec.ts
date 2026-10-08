import { expect, test } from "@playwright/test";

test("Product shows the opening trip screenshot once and retains mobile evidence", async ({
  page,
  context,
  baseURL,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await context.addCookies([
    { name: "portfolio-mode", value: "product", url: baseURL! },
  ]);
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/en/work/japan-travel-planner");
    await expect(
      page.locator(
        '.product-case-intro [data-media-id="media-itinerary-desktop"]',
      ),
    ).toBeVisible();
    await expect(page.locator("#media-itinerary-support")).toBeHidden();
    await expect(page.locator("#media-mobile-support")).toBeVisible();
    const evidence = page.locator(
      ".product-case-section:has(#intro-product) .product-evidence",
    );
    await expect(evidence.locator("figure:visible")).toHaveCount(1);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width + 1);
  }

  for (const mode of ["editorial", "engineer", "digital"]) {
    await context.addCookies([
      { name: "portfolio-mode", value: mode, url: baseURL! },
    ]);
    await page.goto("/en/work/japan-travel-planner");
    await expect(page.locator("#media-itinerary-support")).toBeVisible();
    await expect(page.locator("#media-mobile-support")).toBeVisible();
  }
});
