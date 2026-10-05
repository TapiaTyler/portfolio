import { expect, test, type Page } from "@playwright/test";

const origin = "http://127.0.0.1:3218";

/** Decorative entrance animations Chronicle is running right now. */
function chronicleAnimations(page: Page) {
  return page.evaluate(() =>
    document
      .getAnimations()
      // Only animations still playing; finished CSS fills linger in the list.
      .filter((animation) => animation.playState === "running")
      .map((animation) => {
        const effect = animation.effect as KeyframeEffect;
        const target = effect.target as HTMLElement | null;
        return {
          pseudo: effect.pseudoElement ?? "",
          className: target?.className.toString() ?? "",
        };
      }),
  );
}

test("first load wakes the scene, assembles frames and keeps text readable", async ({
  page,
  context,
}) => {
  await context.addCookies([
    { name: "portfolio-mode", value: "chronicle", url: origin },
  ]);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/preview/chronicle");
  // Text is readable immediately; only decoration animates.
  expect(
    await page
      .locator(".chronicle-hero__narrative")
      .evaluate((element) => getComputedStyle(element).opacity),
  ).toBe("1");
  await page.screenshot({ path: ".cache/chronicle-entrance-0.png" });
  const running = await chronicleAnimations(page);
  expect(
    running.some(
      (item) =>
        item.pseudo === "::after" && item.className.includes("chronicle-hero"),
    ),
    "scene haze",
  ).toBe(true);
  expect(
    running.some(
      (item) =>
        item.pseudo === "::after" &&
        item.className.includes("chronicle-selection__item"),
    ),
    "card frames light up",
  ).toBe(true);
  expect(
    running.some((item) =>
      item.className.includes("chronicle-atmosphere__corner"),
    ),
    "corner bloom",
  ).toBe(true);
  await page.waitForTimeout(350);
  await page.screenshot({ path: ".cache/chronicle-entrance-350.png" });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: ".cache/chronicle-entrance-done.png" });
  expect(await chronicleAnimations(page)).toEqual([]);
  // The haze ends fully transparent over the scenery.
  expect(
    await page
      .locator(".chronicle-hero")
      .evaluate((element) => getComputedStyle(element, "::after").opacity),
  ).toBe("0");
});

test("lazy screenshots shimmer in their frames, then fade in", async ({
  page,
  context,
}) => {
  await context.addCookies([
    { name: "portfolio-mode", value: "chronicle", url: origin },
  ]);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/preview/chronicle?project=portfolio");
  // Lazy evidence further down the reading panel has not loaded yet. Pin it by its
  // media ID; a "still loading" locator would retarget once this one finishes.
  const mediaId = await page
    .locator(".case-study-body .media-frame[data-chronicle-loading]")
    .last()
    .getAttribute("data-media-id");
  const frame = page.locator(
    `.case-study-body .media-frame[data-media-id="${mediaId}"]`,
  );
  await expect(frame).toHaveAttribute("data-chronicle-loading");
  await page.route("**/_next/image**", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 1200));
    await route.continue();
  });
  await frame.evaluate((element) =>
    element.scrollIntoView({ block: "center", behavior: "instant" }),
  );
  await page.waitForTimeout(300);
  await expect(frame).toHaveAttribute("data-chronicle-loading");
  await page.screenshot({ path: ".cache/chronicle-image-loading.png" });
  await expect(frame).not.toHaveAttribute("data-chronicle-loading", {
    timeout: 10_000,
  });
  await expect
    .poll(() =>
      frame.locator("img").evaluate((image) => getComputedStyle(image).opacity),
    )
    .toBe("1");
});

test("reduced motion shows the finished state without hiding images", async ({
  page,
  context,
}) => {
  await context.addCookies([
    { name: "portfolio-mode", value: "chronicle", url: origin },
  ]);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.route("**/_next/image**", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    await route.continue();
  });
  await page.goto("/preview/chronicle");
  expect(await chronicleAnimations(page)).toEqual([]);
  const image = page.locator(".chronicle-project .media-frame img").first();
  await expect
    .poll(() => image.evaluate((img) => (img as HTMLImageElement).complete))
    .toBe(true);
  expect(
    await image.evaluate((element) => getComputedStyle(element).opacity),
  ).toBe("1");
});

test("switching into Chronicle does not replay the scene wake-up", async ({
  page,
  context,
}) => {
  await context.addCookies([
    { name: "portfolio-mode", value: "editorial", url: origin },
  ]);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/preview/chronicle");
  await page.evaluate(() => document.fonts.ready);
  const picker = page.locator(".mode-picker:visible").first();
  await picker.locator("summary").click();
  await picker.getByRole("button", { name: "Chronicle", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "chronicle");
  await expect
    .poll(() => page.locator("html").getAttribute("data-theme-transition"))
    .toBeNull();
  const running = await chronicleAnimations(page);
  expect(
    running.some(
      (item) =>
        item.pseudo === "::after" && item.className.includes("chronicle-hero"),
    ),
  ).toBe(false);
});
