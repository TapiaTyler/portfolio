import { expect, test } from "@playwright/test";

test("Engineer swaps records, scans its cyan rule and supports history and reduced motion", async ({
  page,
  context,
}) => {
  await context.addCookies([
    { name: "portfolio-mode", value: "engineer", url: "http://127.0.0.1:3217" },
  ]);
  await page.addInitScript(() => {
    const start = document.startViewTransition.bind(document);
    document.startViewTransition = (update) => {
      const view = start(update);
      void view.ready.then(() =>
        document.getAnimations().forEach((animation) => animation.pause()),
      );
      return view;
    };
  });
  await page.goto("/en");
  await page
    .getByRole("navigation", { name: "Primary" })
    .getByRole("link", { name: "Work" })
    .click();
  await expect(page.locator("html")).toHaveAttribute(
    "data-route-transition",
    "record-animating",
  );
  await expect(page.locator("main h1")).toBeFocused();
  expect(
    await page.evaluate(
      () =>
        getComputedStyle(
          document.documentElement,
          "::view-transition-new(route-page)",
        ).animationDuration,
    ),
  ).toBe("0.24s");
  expect(
    await page.evaluate(
      () =>
        getComputedStyle(
          document.documentElement,
          "::view-transition-old(route-record-rule)",
        ).animationName,
    ),
  ).toBe("route-record-scan");
  expect(
    await page.evaluate(
      () =>
        document
          .getAnimations()
          .filter(
            (animation) =>
              (animation as CSSAnimation).animationName === "route-record-scan",
          ).length,
    ),
  ).toBe(1);
  await page.evaluate(() =>
    document.getAnimations().forEach((animation) => {
      animation.currentTime = 120;
    }),
  );
  await page.screenshot({ path: ".cache/engineer-record-change.png" });
  await page.evaluate(() =>
    document.getAnimations().forEach((animation) => animation.finish()),
  );
  await expect(page.locator("html")).not.toHaveAttribute(
    "data-route-transition",
  );
  await page.goBack();
  await expect(page.locator("html")).toHaveAttribute(
    "data-route-transition",
    "record-animating",
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("html")).not.toHaveAttribute(
    "data-route-transition",
  );
  await expect(
    page.locator(
      ".route-record-rule, .route-paper-sheet, [style*='view-transition-name']",
    ),
  ).toHaveCount(0);
  await page
    .getByRole("navigation", { name: "Primary" })
    .getByRole("link", { name: "About" })
    .click();
  await expect(page).toHaveURL(/\/en\/about$/);
  await expect(page.locator("html")).not.toHaveAttribute(
    "data-route-transition",
  );
});

test("Editorial header flips from the top and turns backward through browser history", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const start = document.startViewTransition.bind(document);
    document.startViewTransition = (update) => {
      const view = start(update);
      void view.ready.then(() => {
        for (const animation of document.getAnimations()) animation.pause();
      });
      return view;
    };
  });
  await page.goto("/en");
  await page
    .getByRole("navigation", { name: "Primary" })
    .getByRole("link", { name: "About" })
    .click();
  await expect(page).toHaveURL(/\/en\/about$/);
  await expect(page.locator("html")).toHaveAttribute(
    "data-route-transition",
    "book-animating",
  );
  await expect(page.locator("html")).toHaveAttribute(
    "data-route-direction",
    "down",
  );
  await expect(page.locator("main h1")).toBeFocused();
  await page.evaluate(() => {
    for (const animation of document.getAnimations()) animation.finish();
  });
  await expect(page.locator("html")).not.toHaveAttribute(
    "data-route-transition",
  );
  await page.goBack();
  await expect(page).toHaveURL(/\/en$/);
  await expect(page.locator("html")).toHaveAttribute(
    "data-route-transition",
    "book-animating",
  );
  await expect(page.locator("html")).toHaveAttribute(
    "data-route-direction",
    "backward",
  );
  await page.evaluate(() => {
    for (const animation of document.getAnimations()) animation.finish();
  });
  await expect(page.locator('[style*="view-transition-name"]')).toHaveCount(0);
});

test("Editorial navigation keeps reduced-motion and unsupported-browser fallbacks", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en");
  await page
    .getByRole("navigation", { name: "Primary" })
    .getByRole("link", { name: "Work" })
    .click();
  await expect(page).toHaveURL(/\/en\/work$/);
  await expect(page.locator("html")).not.toHaveAttribute(
    "data-route-transition",
  );
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.evaluate(() => {
    Object.defineProperty(document, "startViewTransition", {
      value: undefined,
    });
  });
  await page
    .getByRole("navigation", { name: "Primary" })
    .getByRole("link", { name: "About" })
    .click();
  await expect(page).toHaveURL(/\/en\/about$/);
  await expect(page.locator("html")).not.toHaveAttribute(
    "data-route-transition",
  );
});

test("slow Editorial navigation releases snapshots and keeps the destination", async ({
  page,
}) => {
  await page.goto("/en");
  await page.route("**/en/about?*", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 1800));
    await route.continue();
  });
  await page
    .getByRole("navigation", { name: "Primary" })
    .getByRole("link", { name: "About" })
    .click();
  await expect(page.locator("html")).not.toHaveAttribute(
    "data-route-transition",
    { timeout: 3000 },
  );
  await expect(page).toHaveURL(/\/en\/about$/);
  await expect(page.locator("main h1")).toBeVisible();
  await expect(page.locator('[style*="view-transition-name"]')).toHaveCount(0);
});

test("new navigation and theme selection interrupt a page turn cleanly", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.addInitScript(() => {
    const start = document.startViewTransition.bind(document);
    document.startViewTransition = (update) => {
      const view = start(update);
      void view.ready.then(() =>
        document.getAnimations().forEach((animation) => animation.pause()),
      );
      return view;
    };
  });
  await page.goto("/en");
  const nav = page.getByRole("navigation", { name: "Primary" });
  await nav.getByRole("link", { name: "Work" }).click();
  await expect(page.locator("html")).toHaveAttribute(
    "data-route-transition",
    "book-animating",
  );
  await nav.getByRole("link", { name: "About" }).click();
  await expect(page).toHaveURL(/\/en\/about$/);
  await expect(page.locator("html")).toHaveAttribute(
    "data-route-transition",
    "book-animating",
  );
  await page.locator(".mode-picker:visible > summary").click();
  await page.getByRole("button", { name: "Engineer", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "engineer");
  await expect(page.locator("html")).not.toHaveAttribute(
    "data-route-transition",
  );
  await expect(page.locator("html")).toHaveAttribute(
    "data-theme-transition",
    "animating",
  );
  await page.evaluate(() =>
    document.getAnimations().forEach((animation) => animation.finish()),
  );
  await expect(page.locator('[style*="view-transition-name"]')).toHaveCount(0);
  expect(errors).toEqual([]);
});
