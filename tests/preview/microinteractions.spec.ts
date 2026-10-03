import { expect, test } from "@playwright/test";

for (const [mode, animation] of [
  ["editorial", "editorial-footnote-unfold"],
  ["engineer", "engineer-detail-open"],
] as const) {
  test(`${mode} technical disclosures retain native keyboard behavior with distinct opening motion`, async ({
    page,
    context,
  }) => {
    await context.addCookies([
      { name: "portfolio-mode", value: mode, url: "http://127.0.0.1:3218" },
    ]);
    if (mode === "editorial") {
      await page.goto("/dev/compositions?surface=homepage");
      await page
        .getByRole("link", {
          name: "Review technical disclosures in the active theme",
        })
        .click();
      await expect(page).toHaveURL(
        /surface=project&project=fixture-system.*#technical$/,
      );
      await expect(page.locator("html")).not.toHaveAttribute(
        "data-route-transition",
      );
      await expect(
        page.getByRole("heading", { name: "Fixture code", exact: true }),
      ).toBeInViewport();
    } else
      await page.goto(
        "/dev/compositions?surface=project&project=fixture-system",
      );
    const details = page
      .locator(".case-study details:has(> .technical-detail__content)")
      .first();
    const summary = details.locator("summary");
    if (mode === "editorial")
      expect(
        await summary.evaluate(
          (element) => getComputedStyle(element, "::after").display,
        ),
      ).toBe("none");
    await summary.focus();
    await details.evaluate((element) => {
      element.addEventListener("animationstart", (event) => {
        if ((element as HTMLElement).hasAttribute("data-disclosure-closing"))
          return;
        if (
          (event as AnimationEvent).animationName.endsWith("unfold") ||
          (event as AnimationEvent).animationName === "engineer-detail-open"
        ) {
          const detail = element as HTMLElement;
          detail.dataset.openingCount = String(
            Number(detail.dataset.openingCount ?? 0) + 1,
          );
        }
      });
    });
    await page.keyboard.press("Enter");
    await expect(details).toHaveAttribute("open", "");
    await expect(details.locator(".technical-detail__content")).toHaveCSS(
      "animation-name",
      animation,
    );
    if (mode === "editorial") {
      expect(
        await summary.evaluate(
          (element) => getComputedStyle(element, "::after").animationName,
        ),
      ).toBe("editorial-footnote-rule");
    } else {
      await expect(summary.locator(".technical-detail__indicator")).toHaveCSS(
        "rotate",
        "45deg",
      );
    }
    await expect(details).toHaveAttribute("data-opening-count", "1");
    if (mode === "editorial") {
      const heights = await details.evaluate((element) => {
        const panel = element.querySelector<HTMLElement>(
          ".technical-detail__content",
        )!;
        const animation = panel
          .getAnimations()
          .find(
            (animation) =>
              (animation as CSSAnimation).animationName ===
              "editorial-footnote-unfold",
          )!;
        animation.pause();
        animation.currentTime = 0;
        const closed = panel.getBoundingClientRect().height;
        animation.currentTime = 180;
        const middle = panel.getBoundingClientRect().height;
        animation.currentTime = 520;
        const open = panel.getBoundingClientRect().height;
        animation.currentTime = 180;
        return { closed, middle, open };
      });
      expect(heights.closed).toBeLessThan(2);
      expect(heights.middle).toBeGreaterThan(heights.closed + 30);
      expect(heights.middle).toBeLessThan(heights.open - 10);
      expect(heights.open).toBeGreaterThan(250);
      await page.screenshot({ path: ".cache/editorial-disclosure-unfold.png" });
      await details.evaluate((element) =>
        element
          .getAnimations({ subtree: true })
          .forEach((animation) => animation.finish()),
      );
    }
    await expect
      .poll(() =>
        details.evaluate((element) =>
          element
            .getAnimations({ subtree: true })
            .filter((animation) =>
              ["editorial-footnote-unfold", "engineer-detail-open"].includes(
                (animation as CSSAnimation).animationName,
              ),
            )
            .every((animation) => animation.playState === "finished"),
        ),
      )
      .toBe(true);
    await page.keyboard.press("Space");
    await expect(details).not.toHaveAttribute("open");
    for (const opening of [2, 3]) {
      await page.keyboard.press("Enter");
      await expect(details).toHaveAttribute("open", "");
      await expect(details).toHaveAttribute(
        "data-opening-count",
        String(opening),
      );
      await expect
        .poll(() =>
          details.evaluate((element) =>
            element
              .getAnimations({ subtree: true })
              .filter((animation) =>
                ["editorial-footnote-unfold", "engineer-detail-open"].includes(
                  (animation as CSSAnimation).animationName,
                ),
              )
              .every((animation) => animation.playState === "finished"),
          ),
        )
        .toBe(true);
      await page.keyboard.press("Space");
      await expect(details).not.toHaveAttribute("open");
    }
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.keyboard.press("Enter");
    await expect(details.locator(".technical-detail__content")).toHaveCSS(
      "animation-name",
      "none",
    );
    if (mode === "engineer") {
      await expect(summary.locator(".technical-detail__indicator")).toHaveCSS(
        "rotate",
        "45deg",
      );
      await expect(summary.locator(".technical-detail__indicator")).toHaveCSS(
        "transition-duration",
        "0s",
      );
    }
  });
}

test("Editorial reverses its fold on closing, can reopen mid-fold and settles immediately for reduced motion", async ({
  page,
  context,
}) => {
  await context.addCookies([
    {
      name: "portfolio-mode",
      value: "editorial",
      url: "http://127.0.0.1:3218",
    },
  ]);
  await page.goto("/dev/compositions?surface=project&project=fixture-system");
  const details = page
    .locator(".case-study details:has(> .technical-detail__content)")
    .first();
  const summary = details.locator("summary");
  await summary.click();
  await expect
    .poll(() =>
      details.evaluate((element) =>
        element
          .getAnimations({ subtree: true })
          .every((animation) => animation.playState === "finished"),
      ),
    )
    .toBe(true);
  const fullHeight = await details
    .locator(".technical-detail__content")
    .evaluate((element) => element.getBoundingClientRect().height);
  const foldedHeight = await details.evaluate((element) => {
    element.querySelector<HTMLElement>("summary")!.click();
    element.getAnimations({ subtree: true }).forEach((animation) => {
      animation.pause();
      animation.currentTime = 260;
    });
    return element
      .querySelector(".technical-detail__content")!
      .getBoundingClientRect().height;
  });
  await expect(details).toHaveAttribute("open", "");
  await expect(details).toHaveAttribute("data-disclosure-closing", "");
  expect(foldedHeight).toBeGreaterThan(0);
  expect(foldedHeight).toBeLessThan(fullHeight);
  await details.evaluate((element) =>
    element
      .getAnimations({ subtree: true })
      .forEach((animation) => animation.finish()),
  );
  await expect(details).not.toHaveAttribute("open");
  await summary.click();
  await expect
    .poll(() =>
      details.evaluate((element) =>
        element
          .getAnimations({ subtree: true })
          .every((animation) => animation.playState === "finished"),
      ),
    )
    .toBe(true);
  await details.evaluate((element) => {
    const summary = element.querySelector<HTMLElement>("summary")!;
    summary.click();
    element.getAnimations({ subtree: true }).forEach((animation) => {
      animation.pause();
      animation.currentTime = 260;
    });
    summary.click();
  });
  await expect(details).not.toHaveAttribute("data-disclosure-closing");
  await expect
    .poll(() =>
      details.evaluate((element) =>
        element
          .getAnimations({ subtree: true })
          .every((animation) => animation.playState === "finished"),
      ),
    )
    .toBe(true);
  await expect(details).toHaveAttribute("open", "");
  await details.evaluate((element) => {
    element.querySelector<HTMLElement>("summary")!.click();
    element
      .getAnimations({ subtree: true })
      .forEach((animation) => animation.pause());
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(details).not.toHaveAttribute("open");
  await expect(details).not.toHaveAttribute("data-disclosure-closing");
  await summary.click();
  await expect(details).toHaveAttribute("open", "");
  await summary.click();
  await expect(details).not.toHaveAttribute("open");
});

test("Digital card lighting follows the pointer, preserves position for focus, resets for reduction and releases a press into navigation", async ({
  page,
  context,
}) => {
  await context.addCookies([
    { name: "portfolio-mode", value: "digital", url: "http://127.0.0.1:3218" },
  ]);
  await page.goto("/dev/compositions?surface=homepage");
  const card = page.locator(".digital-project").first();
  await card.scrollIntoViewIfNeeded();
  const box = (await card.boundingBox())!;
  await page.mouse.move(box.x + box.width * 0.75, box.y + box.height * 0.4);
  await expect
    .poll(() =>
      card.evaluate((element) =>
        element.style.getPropertyValue("--card-light-x"),
      ),
    )
    .not.toBe("");
  await expect
    .poll(() =>
      card.evaluate((element) => getComputedStyle(element, "::before").opacity),
    )
    .toBe("1");
  const link = card.getByRole("link", { name: "Explore the project" });
  const pointerPosition = await card.evaluate((element) =>
    element.style.getPropertyValue("--card-light-x"),
  );
  await link.focus();
  // Focus keeps the glow visible; retain its position instead of flashing the
  // fallback center. Exit/reset timing is also covered by the real pilot tests.
  expect(
    await card.evaluate((element) =>
      element.style.getPropertyValue("--card-light-x"),
    ),
  ).toBe(pointerPosition);
  await link.hover();
  await page.mouse.down();
  await expect(card).toHaveAttribute("data-card-pressed", "");
  await expect(card).toHaveCSS("scale", "0.985");
  await page.mouse.up();
  await expect(page).toHaveURL(/surface=project/);
  await expect(page.locator("html")).not.toHaveAttribute(
    "data-route-transition",
  );
  await page.goBack();
  await expect(page.locator("html")).not.toHaveAttribute(
    "data-route-transition",
  );
  await expect(page.locator("[data-card-pressed]")).toHaveCount(0);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await link.hover();
  await page.mouse.down();
  await expect(card).not.toHaveAttribute("data-card-pressed");
  await expect(card).toHaveCSS("scale", "1");
  expect(
    await card.evaluate((element) =>
      element.style.getPropertyValue("--card-light-x"),
    ),
  ).toBe("");
  await page.mouse.move(0, 0);
  await page.mouse.up();
});

test("Digital touch activation compresses the card without pointer lighting", async ({
  browser,
}) => {
  const context = await browser.newContext({
    hasTouch: true,
    isMobile: true,
    viewport: { width: 390, height: 844 },
  });
  try {
    await context.addCookies([
      {
        name: "portfolio-mode",
        value: "digital",
        url: "http://127.0.0.1:3218",
      },
    ]);
    await context.addInitScript(() => {
      document.addEventListener(
        "pointerup",
        () => {
          const card = document.querySelector<HTMLElement>(
            "[data-card-pressed]",
          );
          Reflect.set(window, "touchCardResponse", {
            pressed: !!card,
            light: card?.style.getPropertyValue("--card-light-x") ?? "",
          });
        },
        true,
      );
    });
    const page = await context.newPage();
    await page.goto("http://127.0.0.1:3218/dev/compositions?surface=homepage");
    const link = page
      .locator(".digital-project")
      .first()
      .getByRole("link", { name: "Explore the project" });
    await link.tap();
    await expect(page).toHaveURL(/surface=project/);
    expect(
      await page.evaluate(() => Reflect.get(window, "touchCardResponse")),
    ).toEqual({ pressed: true, light: "" });
    await expect(page.locator("[data-card-pressed]")).toHaveCount(0);
  } finally {
    await context.close();
  }
});
