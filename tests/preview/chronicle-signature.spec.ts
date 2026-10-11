import { expect, test, type Page } from "@playwright/test";

const origin = "http://127.0.0.1:3218";

test.beforeEach(async ({ context, page }) => {
  await context.addCookies([
    { name: "portfolio-mode", value: "chronicle", url: origin },
  ]);
  await page.setViewportSize({ width: 1440, height: 900 });
});

/** Names of running CSS/Web animations, including on pseudo-elements. */
function runningAnimations(page: Page) {
  return page.evaluate(() =>
    document
      .getAnimations()
      .filter((animation) => animation.playState === "running")
      .map((animation) => {
        const effect = animation.effect as KeyframeEffect;
        const target = effect.target as HTMLElement | null;
        return {
          name: (animation as CSSAnimation).animationName ?? "",
          pseudo: effect.pseudoElement ?? "",
          className: target?.className.toString() ?? "",
          clip: effect
            .getKeyframes()
            .some((frame) => "clipPath" in frame || "clip-path" in frame),
        };
      }),
  );
}

test("reduced motion keeps every signature interaction static", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/preview/chronicle");
  await page.getByRole("button", { name: "Next project", exact: true }).click();
  await expect(
    page.locator(".chronicle-selection__item").nth(1),
  ).toHaveAttribute("data-selected", "true");
  await page
    .getByRole("tablist", { name: "Portfolio sections" })
    .getByRole("tab")
    .nth(2)
    .click();
  await page
    .locator(".chronicle-home-tabs__panel:not([hidden]) .chronicle-action")
    .dispatchEvent("pointerdown", { button: 0 });
  expect(await runningAnimations(page)).toEqual([]);
});
