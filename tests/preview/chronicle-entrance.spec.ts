import { expect, test, type Page } from "@playwright/test";

const origin = "http://127.0.0.1:3218";

/** Decorative entrance animations Chronicle is running right now. */
function chronicleAnimations(page: Page) {
  return page.evaluate(() =>
    document
      .getAnimations()
      // Only animations still playing; finished CSS fills linger in the list.
      .filter((animation) => animation.playState === "running")
      .filter(
        (animation) =>
          animation.effect?.getComputedTiming().iterations !== Infinity,
      )
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
