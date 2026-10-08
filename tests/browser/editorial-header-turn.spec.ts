import { expect, test } from "@playwright/test";

test.beforeEach(async ({ context, baseURL }) => {
  await context.addCookies([
    { name: "portfolio-mode", value: "editorial", url: baseURL! },
  ]);
});

test("Editorial header links and language flip from the top beneath the live header; theme selection cancels", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const start = document.startViewTransition.bind(document);
    document.startViewTransition = (update) => {
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
  await page.goto("/en");
  for (const selector of [
    ".site-nav--desktop a[href='/en/about']",
    ".site-controls--desktop .locale-switcher a[href='/ja/about']",
    ".site-brand",
  ]) {
    await page.locator(selector).click();
    await expect(page.locator("html")).toHaveAttribute(
      "data-route-transition",
      "book-animating",
    );
    await expect(page.locator("html")).toHaveAttribute(
      "data-route-direction",
      "down",
    );
    const geometry = await page.evaluate(() => ({
      clip: getComputedStyle(document.documentElement, "::view-transition")
        .clipPath,
      header: document.querySelector(".site-header")!.getBoundingClientRect()
        .bottom,
      animation: getComputedStyle(
        document.documentElement,
        "::view-transition-new(route-destination)",
      ).animationName,
      namedHeader:
        document.querySelector<HTMLElement>(".site-header")!.style
          .viewTransitionName,
    }));
    expect(geometry.animation).toBe("route-page-top-flip");
    await expect(page.locator("html")).toHaveCSS("--route-turns", "1");
    expect(
      parseFloat(geometry.clip.replace("inset(", "")),
    ).toBeGreaterThanOrEqual(geometry.header);
    expect(geometry.namedHeader).toBe("");
    await page.evaluate(() =>
      document.getAnimations().forEach((animation) => {
        animation.currentTime = 180;
      }),
    );
    const reveal = await page.evaluate(() => {
      const animation = document
        .getAnimations()
        .find(
          (animation) =>
            (animation as CSSAnimation).animationName === "route-page-top-flip",
        )!;
      animation.currentTime = 0;
      const collapsedStyle = getComputedStyle(
        document.documentElement,
        "::view-transition-new(route-destination)",
      );
      const collapsed = new DOMMatrixReadOnly(collapsedStyle.transform).m22;
      const towardReader = new DOMMatrixReadOnly(collapsedStyle.transform).m23;
      animation.currentTime = 180;
      const partialStyle = getComputedStyle(
        document.documentElement,
        "::view-transition-new(route-destination)",
      );
      const partial = new DOMMatrixReadOnly(partialStyle.transform).m22;
      return {
        collapsed,
        towardReader,
        partial,
        origin: partialStyle.transformOrigin,
        duration: animation.effect!.getTiming().duration,
      };
    });
    expect(reveal.collapsed).toBeLessThan(0.05);
    expect(reveal.towardReader).toBeGreaterThan(0.9);
    expect(reveal.partial).toBeGreaterThan(reveal.collapsed);
    expect(reveal.partial).toBeLessThan(1);
    expect(reveal.origin).toMatch(/ 0px$/);
    expect(reveal.duration).toBe(600);
    await page.screenshot({
      path: `.cache/editorial-header-top-flip-${selector === ".site-brand" ? "brand" : selector.includes("locale") ? "language" : "nav"}.png`,
    });
    await page.evaluate(() =>
      document.getAnimations().forEach((animation) => animation.finish()),
    );
    await expect(page.locator("html")).not.toHaveAttribute(
      "data-route-transition",
    );
    expect(
      await page
        .locator("html")
        .evaluate((element) =>
          element.style.getPropertyValue("--route-header-bottom"),
        ),
    ).toBe("");
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator(".mobile-navigation > summary").click();
  await page.locator(".mobile-navigation .site-nav a[href='/ja/work']").click();
  await expect(page.locator("html")).toHaveAttribute(
    "data-route-transition",
    "book-animating",
  );
  await expect(page.locator("html")).toHaveAttribute(
    "data-route-direction",
    "down",
  );
  await page.locator(".mobile-navigation > summary").click();
  await page.locator(".mode-picker:visible > summary").click();
  await page
    .locator(".theme-switcher:visible")
    .getByRole("button", { name: "Engineer", exact: true })
    .click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "engineer");
  await expect(page.locator("html")).not.toHaveAttribute(
    "data-route-transition",
  );
});
