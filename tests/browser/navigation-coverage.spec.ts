import { expect, test } from "@playwright/test";

for (const [mode, kind] of [
  ["editorial", "book"],
  ["engineer", "record"],
  ["digital", "panel"],
] as const) {
  test(`${mode} transitions content links, language changes and Back/Forward`, async ({
    page,
    context,
  }) => {
    await context.addCookies([
      { name: "portfolio-mode", value: mode, url: "http://127.0.0.1:3217" },
    ]);
    await page.addInitScript(() => {
      const start = document.startViewTransition.bind(document);
      document.startViewTransition = (update) => {
        const source = document.querySelector<HTMLElement>(
          '[style*="view-transition-name: route-page"]',
        );
        document.documentElement.dataset.testRouteSource =
          source?.dataset.motionId ?? "page";
        const view = start(update);
        void view.ready.then(() =>
          document.getAnimations().forEach((animation) => {
            if (animation.effect?.getComputedTiming().iterations !== Infinity)
              animation.pause();
          }),
        );
        return view;
      };
    });
    async function finish() {
      await expect(page.locator("html")).toHaveAttribute(
        "data-route-transition",
        `${kind}-animating`,
      );
      if (mode === "digital") {
        expect(
          await page.evaluate(
            () =>
              getComputedStyle(
                document.documentElement,
                "::view-transition-group(route-page)",
              ).animationDuration,
          ),
        ).toBe("0.72s");
      }
      await page.evaluate(() =>
        document.getAnimations().forEach((animation) => {
          if (animation.effect?.getComputedTiming().iterations !== Infinity)
            animation.finish();
        }),
      );
      await expect(page.locator("html")).not.toHaveAttribute(
        "data-route-transition",
      );
    }
    await page.goto("/en");
    await page.evaluate(() => document.fonts.ready);
    await page.locator("main .text-link").first().click();
    await expect(page).toHaveURL(/\/en\/work$/);
    if (mode === "digital")
      await expect(page.locator("html")).toHaveAttribute(
        "data-test-route-source",
        "hero-narrative",
      );
    await finish();
    await page
      .getByRole("navigation", { name: "Language" })
      .getByRole("link", { name: "JP", exact: true })
      .click();
    await expect(page).toHaveURL(/\/ja\/work$/);
    await finish();
    await page.goBack();
    await expect(page).toHaveURL(/\/en\/work$/);
    await finish();
    await page.goForward();
    await expect(page).toHaveURL(/\/ja\/work$/);
    await finish();
    await page.locator(".site-brand").click();
    await expect(page).toHaveURL(/\/ja$/);
    await finish();
    await page
      .getByRole("navigation", { name: "Primary" })
      .getByRole("link", { name: "About", exact: true })
      .click();
    await expect(page).toHaveURL(/\/ja\/about$/);
    if (mode === "digital")
      await expect(page.locator("html")).toHaveAttribute(
        "data-test-route-source",
        "page",
      );
    await finish();
  });
}

test("history remains usable without the Navigation API and same-page anchors remain native", async ({
  page,
}) => {
  await page.addInitScript(() =>
    Object.defineProperty(window, "navigation", {
      value: undefined,
      configurable: true,
    }),
  );
  await page.goto("/en");
  await page.getByRole("link", { name: "Skip to Content" }).focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("html")).not.toHaveAttribute(
    "data-route-transition",
  );
  await page
    .getByRole("navigation", { name: "Primary" })
    .getByRole("link", { name: "About" })
    .click();
  await expect(page).toHaveURL(/\/en\/about$/);
  await expect(page.locator("html")).not.toHaveAttribute(
    "data-route-transition",
  );
  await page.goBack();
  await expect(page).toHaveURL(/\/en(?:#main-content)?$/);
  await expect(page.locator("main")).toBeVisible();
  await expect(page.locator("html")).not.toHaveAttribute(
    "data-route-transition",
  );
  await expect(page.locator('[style*="view-transition-name"]')).toHaveCount(0);
});
