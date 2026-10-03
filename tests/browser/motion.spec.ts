import { expect, test } from "@playwright/test";

interface MotionRecord {
  id: string | null;
  duration: number;
  translate?: string;
}
declare global {
  interface Window {
    motionRecords: MotionRecord[];
  }
}

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.motionRecords = [];
    const animate = Element.prototype.animate;
    Element.prototype.animate = function (frames, options) {
      const first = Array.isArray(frames) ? frames[0] : null;
      window.motionRecords.push({
        id: this.getAttribute("data-motion-id"),
        duration: Number(
          typeof options === "number" ? options : options?.duration,
        ),
        translate:
          typeof first?.translate === "string" ? first.translate : undefined,
      });
      return animate.call(this, frames, options);
    };
  });
});

test("entry motion uses distinct profiles and each section reveals only once", async ({
  page,
  context,
}) => {
  for (const [mode, duration, translate] of [
    ["editorial", 600, "0 12px"],
    ["engineer", 240, "0 6px"],
    ["digital", 700, "0 22px"],
  ] as const) {
    await context.addCookies([
      { name: "portfolio-mode", value: mode, url: "http://127.0.0.1:3217" },
    ]);
    await page.goto("/en");
    await expect
      .poll(() =>
        page.evaluate(() =>
          window.motionRecords.find((record) => record.id === "hero-narrative"),
        ),
      )
      .toMatchObject({ duration, translate });
    const lab = page.locator('[data-motion-id="lab"]');
    await lab.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        page.evaluate(
          () =>
            window.motionRecords.filter((record) => record.id === "lab").length,
        ),
      )
      .toBe(1);
    await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
    await lab.scrollIntoViewIfNeeded();
    expect(
      await page.evaluate(
        () =>
          window.motionRecords.filter((record) => record.id === "lab").length,
      ),
    ).toBe(1);
    expect(
      await lab.evaluate((element) => getComputedStyle(element).opacity),
    ).toBe("1");
  }
});

test("Digital portal responds to a mouse, resets, and stops when reduced motion is enabled", async ({
  page,
  context,
}) => {
  await context.addCookies([
    { name: "portfolio-mode", value: "digital", url: "http://127.0.0.1:3217" },
  ]);
  await page.goto("/en");
  const portal = page.locator(".digital-visual--portal");
  await expect(portal).toHaveAttribute("data-motion-state", "settled");
  const box = (await portal.boundingBox())!;
  await page.mouse.move(box.x + box.width * 0.8, box.y + box.height * 0.3);
  await expect
    .poll(() =>
      portal.evaluate((element: HTMLElement) =>
        element.style.getPropertyValue("--portal-y"),
      ),
    )
    .not.toBe("");
  await page.mouse.move(1, 1);
  await expect
    .poll(() =>
      portal.evaluate((element: HTMLElement) =>
        element.style.getPropertyValue("--portal-y"),
      ),
    )
    .toBe("");
  await page.mouse.move(box.x + box.width * 0.8, box.y + box.height * 0.3);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect
    .poll(() =>
      portal.evaluate((element: HTMLElement) =>
        element.style.getPropertyValue("--portal-y"),
      ),
    )
    .toBe("");
  expect(
    await portal.evaluate((element) => getComputedStyle(element).transform),
  ).toBe("none");
  expect(
    await page.evaluate(
      () =>
        document
          .getAnimations()
          .filter((animation) => animation.playState === "running").length,
    ),
  ).toBe(0);
});

test("keyboard feedback and native menu micro-interactions preserve focus and control dimensions", async ({
  page,
}) => {
  await page.goto("/en");
  const link = page.locator(".editorial-hero .text-link");
  await link.focus();
  await expect
    .poll(() => link.evaluate((element) => getComputedStyle(element).transform))
    .toContain("3, 0");
  expect(
    await link.evaluate(
      (element) => getComputedStyle(element).textDecorationLine,
    ),
  ).toBe("none");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator(".mobile-navigation > summary").click();
  await page.locator(".mode-picker:visible > summary").click();
  await expect
    .poll(() =>
      page
        .locator(".mode-picker:visible .mode-picker__chevron")
        .evaluate((element) => getComputedStyle(element).rotate),
    )
    .toBe("180deg");
  const heights = await page
    .locator(".site-controls--mobile")
    .evaluate((element) => [
      element.querySelector(".locale-switcher")!.getBoundingClientRect().height,
      element.querySelector(".mode-picker > summary")!.getBoundingClientRect()
        .height,
    ]);
  expect(heights).toEqual([50, 50]);
  await page.keyboard.press("Escape");
  await expect(page.locator(".mode-picker:visible > summary")).toBeFocused();
});

test("reduced-motion and touch visitors keep static content without pointer choreography", async ({
  browser,
}) => {
  for (const reducedMotion of ["reduce", "no-preference"] as const) {
    const context = await browser.newContext({
      hasTouch: true,
      isMobile: true,
      viewport: { width: 390, height: 844 },
      reducedMotion,
      baseURL: "http://127.0.0.1:3217",
    });
    await context.addCookies([
      {
        name: "portfolio-mode",
        value: "digital",
        url: "http://127.0.0.1:3217",
      },
    ]);
    const page = await context.newPage();
    await page.goto("/en");
    const portal = page.locator(".digital-visual--portal");
    await portal.scrollIntoViewIfNeeded();
    await portal.tap();
    expect(
      await portal.evaluate((element: HTMLElement) =>
        element.style.getPropertyValue("--portal-y"),
      ),
    ).toBe("");
    if (reducedMotion === "reduce") {
      expect(
        await page.evaluate(
          () =>
            document
              .getAnimations()
              .filter((animation) => animation.playState === "running").length,
        ),
      ).toBe(0);
    }
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await context.close();
  }
});

test("theme choreography cancels entry motion instead of stacking another entrance", async ({
  page,
}) => {
  await page.goto("/en");
  await page.locator(".mode-picker:visible > summary").click();
  await page.getByRole("button", { name: "Digital", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "digital");
  await expect(page.locator("html")).not.toHaveAttribute(
    "data-theme-transition",
  );
  const records = await page.evaluate(() =>
    window.motionRecords.filter((record) => record.id === "hero-narrative"),
  );
  expect(records.every((record) => record.duration === 600)).toBe(true);
  await page
    .getByRole("navigation", { name: "Primary", exact: true })
    .getByRole("link", { name: "About", exact: true })
    .click();
  await expect(page).toHaveURL(/\/en\/about$/);
  await expect(page.locator("html")).not.toHaveAttribute(
    "data-route-transition",
  );
  await expect(page.locator("main h1")).toBeVisible();
  // The new Digital panel transition replaces entry replay on enhanced links.
  expect(
    await page.evaluate(() =>
      window.motionRecords.find((record) => record.id === "page-intro"),
    ),
  ).toBeUndefined();
});
