import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.beforeEach(async ({ context }) => {
  await context.addCookies([
    {
      name: "portfolio-mode",
      value: "chronicle",
      url: "http://127.0.0.1:3218",
    },
  ]);
});

test("Chronicle selects reviewed drafts without publishing them and preserves theme preference", async ({
  page,
}) => {
  await page.goto("/dev/compositions?surface=homepage&inventory=projects");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "chronicle");
  await expect(page.locator(".chronicle-selection__item")).toHaveCount(2);
  await expect(page.locator(".chronicle-selection__item")).toContainText([
    "One Portfolio, Several Ways of Reading It",
    "Japan Travel Planner",
  ]);
  await page.getByRole("button", { name: "Next project", exact: true }).click();
  await expect(page.locator(".chronicle-selection__dots button")).toHaveCount(
    2,
  );
  await expect(
    page.locator('.chronicle-selection__item[data-selected="true"]'),
  ).toContainText("Japan Travel Planner");
  await page.screenshot({
    path: ".cache/chronicle-home-desktop.png",
    fullPage: true,
  });
  expect(
    await page.evaluate(() => document.documentElement.scrollHeight),
  ).toBeLessThanOrEqual(720);
  await page.setViewportSize({ width: 390, height: 844 });
  for (const card of await page.locator(".chronicle-project").all()) {
    const bounds = await card.evaluate((element) => ({
      cardBottom: element.getBoundingClientRect().bottom,
      topicsBottom: element
        .querySelector(".project-meta")!
        .getBoundingClientRect().bottom,
    }));
    expect(bounds.topicsBottom).toBeLessThanOrEqual(bounds.cardBottom);
  }
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(390);
  await page.screenshot({
    path: ".cache/chronicle-home-mobile.png",
    fullPage: true,
  });
  await page.goto("/en");
  await expect(page.locator(".chronicle-selection__item")).toHaveCount(0);
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "chronicle");
});

for (const slug of ["portfolio", "japan-travel-planner"]) {
  test(`Chronicle reads ${slug} with accessible chapters and responsive evidence`, async ({
    page,
  }) => {
    await page.goto(`/dev/projects/${slug}`);
    await expect(page.locator(".chronicle-dossier")).toBeVisible();
    const reading = page.getByRole("region", {
      name: "Case study reading panel",
    });
    await expect(reading).toBeVisible();
    await page.evaluate(async () => {
      for (const image of document.querySelectorAll<HTMLImageElement>(
        ".case-study img",
      )) {
        image.loading = "eager";
        await image.decode().catch(() => {});
      }
      await document.fonts.ready;
    });
    const sections = page.locator(".case-study-navigation__desktop a");
    expect(await sections.count()).toBeGreaterThan(2);
    await sections.last().click();
    await expect
      .poll(() => sections.last().getAttribute("aria-current"))
      .toBe("location");
    expect(
      await reading.evaluate((element) => element.scrollTop),
    ).toBeGreaterThan(0);
    expect(await page.evaluate(() => scrollY)).toBe(0);
    expect(
      await page.evaluate(() => document.documentElement.scrollHeight),
    ).toBeLessThanOrEqual(720);
    await reading.evaluate((element) =>
      element.scrollTo({ top: 0, behavior: "instant" }),
    );
    const scan = await new AxeBuilder({ page })
      .include(".case-study")
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(scan.violations).toEqual([]);
    await page.locator(".case-study-intro").scrollIntoViewIfNeeded();
    await page.screenshot({
      path: `.cache/chronicle-${slug}-desktop.png`,
      fullPage: true,
    });
    const imageTrigger = page
      .locator(".case-study .media-view-trigger")
      .first();
    await imageTrigger.click();
    const gallery = page.getByRole("dialog", { name: "Project image gallery" });
    await expect(gallery).toHaveAttribute("data-theme", "chronicle");
    await gallery.getByRole("button", { name: "Close Gallery" }).click();
    await page.setViewportSize({ width: 320, height: 800 });
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(320);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`/dev/projects/${slug}?locale=ja`);
    await expect(page.locator(".case-study")).toContainText("English");
    const identity = await page
      .locator(".chronicle-dossier-banner")
      .evaluate((element) => ({
        visible: element.clientHeight,
        content: element.scrollHeight,
      }));
    expect(identity.content).toBeLessThanOrEqual(identity.visible);
    await page.screenshot({
      path: `.cache/chronicle-${slug}-mobile.png`,
      fullPage: true,
    });
  });
}

test("Chronicle morphs on secondary pages and keeps mobile controls accessible", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/en/work");
  await page.locator(".site-controls--desktop .mode-picker summary").click();
  await page
    .locator('.site-controls--desktop [data-theme-option="engineer"]')
    .click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "engineer");
  await expect
    .poll(() => page.locator("html").getAttribute("data-theme-transition"))
    .toBeNull();
  if (
    !(await page
      .locator('.site-controls--desktop [data-theme-option="chronicle"]')
      .isVisible())
  )
    await page.locator(".site-controls--desktop .mode-picker summary").click();
  await page
    .locator('.site-controls--desktop [data-theme-option="chronicle"]')
    .click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "chronicle");
  await expect
    .poll(() => page.locator("html").getAttribute("data-theme-transition"))
    .toBeNull();
  for (const surface of ["about", "lab", "contact"]) {
    await page.goto(`/en/${surface}`);
    await expect(page.locator(".chronicle-secondary-page")).toBeVisible();
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(1440);
  }
  await page.goto("/en");
  await expect(
    page.locator(".site-controls--desktop .mode-picker summary"),
  ).toContainText("Chronicle");
  await page
    .locator(".site-controls--desktop .theme-switcher")
    .evaluate((element) =>
      Promise.all(
        element
          .getAnimations({ subtree: true })
          .map((animation) => animation.finished.catch(() => {})),
      ),
    );
  await page.screenshot({ path: ".cache/chronicle-header-desktop.png" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator(".mobile-navigation > summary").click();
  await expect(
    page.locator(".site-controls--mobile .mode-picker > summary"),
  ).toBeVisible();
  await page
    .locator(".mobile-navigation__panel")
    .evaluate((element) =>
      Promise.all(
        element
          .getAnimations({ subtree: true })
          .map((animation) => animation.finished.catch(() => {})),
      ),
    );
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(390);
  await page.screenshot({ path: ".cache/chronicle-header-mobile.png" });
});

test("Chronicle keeps discovery inside short and landscape viewports", async ({
  page,
}) => {
  for (const viewport of [
    { width: 844, height: 390 },
    { width: 640, height: 480 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/dev/compositions?surface=homepage&inventory=projects");
    await page.locator(".chronicle-selection__dots button").last().click();
    await expect(
      page.locator('.chronicle-selection__item[data-selected="true"]'),
    ).toContainText("Japan Travel Planner");
    expect(
      await page.evaluate(() => document.documentElement.scrollHeight),
    ).toBeLessThanOrEqual(viewport.height);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(viewport.width);
  }
});
