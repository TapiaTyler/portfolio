import { expect, test } from "@playwright/test";

test("Digital opens the selected fixture by expanding its card into the project intro", async ({
  page,
  context,
}) => {
  await context.addCookies([
    { name: "portfolio-mode", value: "digital", url: "http://127.0.0.1:3218" },
  ]);
  await page.addInitScript(() => {
    const start = document.startViewTransition.bind(document);
    document.startViewTransition = (update) => {
      const view = start(update);
      void view.ready.then(() => {
        for (const animation of document.getAnimations()) {
          if (animation.effect?.getComputedTiming().iterations !== Infinity)
            animation.pause();
        }
      });
      return view;
    };
  });
  await page.goto("/dev/compositions?surface=homepage");
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto";
  });
  await page.evaluate(() => document.fonts.ready);
  const card = page
    .locator(".digital-project")
    .filter({ has: page.locator("img") });
  const slug = await card.getAttribute("data-project-slug");
  await card.scrollIntoViewIfNeeded();
  await expect(card).toHaveAttribute("data-motion-state", "settled");
  await expect
    .poll(() =>
      card
        .locator("img")
        .evaluate((image) => (image as HTMLImageElement).naturalWidth),
    )
    .toBeGreaterThan(0);
  await card.getByRole("link", { name: "Explore the project" }).click();
  await expect(page).toHaveURL(new RegExp(`project=${slug}&surface=project`));
  await expect(page.locator("html")).toHaveAttribute(
    "data-route-transition",
    "project-animating",
  );
  await expect(page.locator(".case-study")).toHaveCount(1);
  await expect(page.locator(".digital-case-study-intro")).toHaveAttribute(
    "data-project-slug",
    slug!,
  );
  await expect(page.locator(".digital-case-study-intro")).toHaveCSS(
    "view-transition-name",
    "route-project",
  );
  await expect(page.locator("h1")).toBeFocused();
  await page.evaluate(() => {
    for (const animation of document.getAnimations()) {
      if (animation.effect?.getComputedTiming().iterations !== Infinity)
        animation.currentTime = 300;
    }
  });
  await page.screenshot({ path: ".cache/project-opening.png" });
  await page.evaluate(() => {
    for (const animation of document.getAnimations()) {
      if (animation.effect?.getComputedTiming().iterations !== Infinity)
        animation.finish();
    }
  });
  await expect(page.locator("html")).not.toHaveAttribute(
    "data-route-transition",
  );
  await expect(page.locator('[style*="view-transition-name"]')).toHaveCount(0);
  await expect
    .poll(() =>
      page
        .locator(".digital-case-study-intro img")
        .evaluate((image) => (image as HTMLImageElement).naturalWidth),
    )
    .toBeGreaterThan(0);
  await page.screenshot({ path: ".cache/project-open-final.png" });
  await page.goBack();
  await expect(page.locator("html")).toHaveAttribute(
    "data-route-transition",
    "project-animating",
  );
  await expect(page.locator("html")).toHaveAttribute(
    "data-route-project-direction",
    "close",
  );
  await expect(page.locator(".digital-project")).toHaveCount(3);
  await expect(
    page.locator(`.digital-project[data-project-slug="${slug}"]`),
  ).toHaveCSS("view-transition-name", "route-project");
  await page.evaluate(() => {
    for (const animation of document.getAnimations())
      if (animation.effect?.getComputedTiming().iterations !== Infinity)
        animation.finish();
  });
  await expect(page.locator("html")).not.toHaveAttribute(
    "data-route-transition",
  );
  await page.goForward();
  await expect(page.locator("html")).toHaveAttribute(
    "data-route-transition",
    "project-animating",
  );
  await expect(page.locator("html")).toHaveAttribute(
    "data-route-project-direction",
    "open",
  );
  await expect(page.locator(".digital-case-study-intro")).toHaveAttribute(
    "data-project-slug",
    slug!,
  );
  await page.evaluate(() => {
    for (const animation of document.getAnimations())
      if (animation.effect?.getComputedTiming().iterations !== Infinity)
        animation.finish();
  });
});

test("Digital selected-project preview stays usable with reduced motion", async ({
  page,
  context,
}) => {
  await context.addCookies([
    { name: "portfolio-mode", value: "digital", url: "http://127.0.0.1:3218" },
  ]);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/dev/compositions?surface=homepage");
  await page
    .locator(".digital-project")
    .first()
    .getByRole("link", { name: "Explore the project" })
    .click();
  await expect(page.locator(".case-study")).toHaveCount(1);
  await expect(page.locator("html")).not.toHaveAttribute(
    "data-route-transition",
  );
});

test("Editorial uses staggered sheets without replaying content when opening a deeper project", async ({
  page,
}) => {
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
  await page.goto("/dev/compositions?surface=homepage");
  await page
    .locator(".project-feature")
    .first()
    .getByRole("link", { name: "Explore the project" })
    .click();
  await expect(page.locator("html")).toHaveAttribute(
    "data-route-transition",
    "book-animating",
  );
  expect(
    await page
      .locator("html")
      .evaluate((element) =>
        getComputedStyle(element).getPropertyValue("--route-turns"),
      ),
  ).toBe("2");
  expect(
    await page.evaluate(
      () =>
        getComputedStyle(
          document.documentElement,
          "::view-transition-old(route-sheet-1)",
        ).animationDelay,
    ),
  ).toBe("0.1s");
  expect(
    await page.evaluate(
      () =>
        getComputedStyle(
          document.documentElement,
          "::view-transition-old(route-page)",
        ).animationDuration,
    ),
  ).toBe("0.6s");
  expect(
    await page.evaluate(
      () =>
        getComputedStyle(
          document.documentElement,
          "::view-transition-old(route-page)",
        ).animationIterationCount,
    ),
  ).toBe("1");
  expect(
    await page.evaluate(
      () =>
        document
          .getAnimations()
          .filter(
            (animation) =>
              (animation as CSSAnimation).animationName ===
              "route-page-forward",
          ).length,
    ),
  ).toBe(2);
  await page.evaluate(() =>
    document.getAnimations().forEach((animation) => {
      animation.currentTime = 180;
    }),
  );
  await page.screenshot({ path: ".cache/book-sheets.png" });
  await page.evaluate(() =>
    document.getAnimations().forEach((animation) => animation.finish()),
  );
  await expect(page.locator("html")).not.toHaveAttribute(
    "data-route-transition",
  );
  await page.getByRole("link", { name: "Return to project cards" }).click();
  await expect(page.locator("html")).toHaveAttribute(
    "data-route-transition",
    "book-animating",
  );
  await expect(page.locator("html")).toHaveAttribute(
    "data-route-direction",
    "backward",
  );
  expect(
    await page.evaluate(
      () =>
        getComputedStyle(
          document.documentElement,
          "::view-transition-old(route-page)",
        ).animationDuration,
    ),
  ).toBe("0.6s");
  expect(
    await page
      .locator("html")
      .evaluate((element) =>
        getComputedStyle(element).getPropertyValue("--route-turns"),
      ),
  ).toBe("2");
  await page.evaluate(() =>
    document.getAnimations().forEach((animation) => animation.finish()),
  );
  await expect(page.locator(".project-feature")).toHaveCount(3);
});
