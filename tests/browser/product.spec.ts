import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";

async function settled(page: Page) {
  await page.evaluate(() => document.fonts.ready);
  await expect
    .poll(() => page.locator("html").getAttribute("data-theme-transition"))
    .toBeNull();
}

async function noOverflow(page: Page) {
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth - innerWidth,
    ),
  ).toBeLessThanOrEqual(1);
}

test.beforeEach(async ({ context, baseURL }) => {
  await context.addCookies([
    { name: "portfolio-mode", value: "product", url: baseURL! },
  ]);
});

test("desktop selection changes a stable preview while project links navigate normally", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/en");
  await settled(page);
  await mkdir(".cache/product-review", { recursive: true });
  await expect(page.locator(".product-project h3 a")).toHaveCount(3);
  const panel = page.locator(".product-preview__panel:visible");
  await expect(panel.locator("h3")).toHaveText("Nihonest");
  const origin = await page.locator(".product-preview").boundingBox();
  const selection = page.locator(".product-preview-control").nth(2);
  await selection.focus();
  await page.keyboard.press("Enter");
  await expect(selection).toHaveAttribute("aria-pressed", "true");
  await expect(panel.locator("h3")).toHaveText("Japan Travel Planner");
  await expect(page).toHaveURL(/\/en$/);
  expect((await page.locator(".product-preview").boundingBox())?.x).toBe(
    origin?.x,
  );
  await expect(selection).toBeFocused();
  await selection.click();
  await page.locator(".product-preview-control").first().click();
  await expect(panel.locator("h3")).toHaveText("Nihonest");
  await noOverflow(page);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.screenshot({
    path: ".cache/product-review/home-desktop.png",
    fullPage: true,
  });
  await page.locator(".product-project h3 a").nth(2).click();
  await expect(page).toHaveURL(/\/en\/work\/japan-travel-planner$/);
  await expect(page.locator("html")).not.toHaveAttribute(
    "data-route-transition",
  );
  await page.goBack();
  await expect(page).toHaveURL(/\/en$/);
  expect(errors).toEqual([]);
});

test("Product pages and case-study evidence fit desktop, tablet and narrow phones", async ({
  page,
}) => {
  test.setTimeout(90_000);
  await mkdir(".cache/product-review", { recursive: true });
  for (const width of [1440, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of [
      "",
      "/work",
      "/about",
      "/lab",
      "/contact",
      "/work/japan-travel-planner",
      "/work/portfolio",
      "/work/nihonest",
    ]) {
      await page.goto(`/en${path}`, { waitUntil: "domcontentloaded" });
      await settled(page);
      await expect(page.locator("main h1")).toHaveCount(1);
      await noOverflow(page);
      if (width === 1440 || width === 390) {
        expect(
          (await new AxeBuilder({ page }).analyze()).violations,
          `${width}: ${path}`,
        ).toEqual([]);
        await page.screenshot({
          path: `.cache/product-review/${path.replaceAll("/", "-").slice(1) || "home"}-${width}.png`,
          fullPage: true,
        });
      }
      if (path.startsWith("/work/")) {
        await expect(page.locator(".product-case-study")).toBeVisible();
        await expect(
          page.locator("details:has(.technical-detail__content)"),
        ).toHaveCount(1);
        await expect(page.locator(".product-case-decisions > h2")).toHaveText(
          "Key decisions",
        );
        await expect(
          page.locator(".product-case-decisions h3").first(),
        ).toBeVisible();
      }
    }
  }
});

test("Product morphs on Work, supporting pages and a populated case study", async ({
  page,
}) => {
  test.setTimeout(60_000);
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.setViewportSize({ width: 1440, height: 900 });
  for (const path of [
    "/en/work",
    "/en/about",
    "/en/contact",
    "/en/work/portfolio",
  ]) {
    await page.goto(path, { waitUntil: "domcontentloaded" });
    for (const mode of ["digital", "product"]) {
      const picker = page.locator(".mode-picker:visible");
      if (
        !(await picker.evaluate((element: HTMLDetailsElement) => element.open))
      )
        await picker.locator("summary").click();
      await picker.locator(`button[value="${mode}"]`).click();
      await expect(page.locator("html")).toHaveAttribute("data-theme", mode);
      await settled(page);
      await expect(page.locator('[style*="view-transition-name"]')).toHaveCount(
        0,
      );
      await expect(page).toHaveURL(path);
      await expect(page.locator("main h1")).toBeVisible();
    }
  }
  expect(errors).toEqual([]);
});

test("mobile menu, reduced motion and native links preserve Product behavior", async ({
  page,
  browser,
  baseURL,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/ja", { waitUntil: "domcontentloaded" });
  await settled(page);
  await expect(page.locator(".product-preview")).toBeHidden();
  await expect(page.locator(".product-preview-control").first()).toBeHidden();
  await expect(page.locator(".product-project h3 a").first()).toHaveAttribute(
    "lang",
    "en",
  );
  await page.locator(".mobile-navigation > summary").click();
  const language = await page
    .locator(".site-controls--mobile .locale-switcher")
    .boundingBox();
  const presentation = await page.locator(".mode-picker:visible").boundingBox();
  expect(language!.y).toBeLessThan(presentation!.y);
  await page.screenshot({
    path: ".cache/product-review/menu-mobile.png",
    fullPage: true,
  });
  await page.locator(".mode-picker:visible > summary").click();
  await expect(
    page.locator('.mode-picker:visible button[value="product"]'),
  ).toHaveAttribute("aria-pressed", "true");
  await noOverflow(page);
  const native = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  try {
    await native.addCookies([
      { name: "portfolio-mode", value: "product", url: baseURL! },
    ]);
    const nativePage = await native.newPage();
    await nativePage.goto(`${baseURL}/en`);
    await expect(nativePage.locator("html")).toHaveAttribute(
      "data-theme",
      "product",
    );
    await expect(
      nativePage.locator(".product-preview-control").first(),
    ).toBeHidden();
    await nativePage.locator(".product-project h3 a").nth(2).click();
    await expect(nativePage).toHaveURL(/\/en\/work\/japan-travel-planner$/);
    const details = nativePage.locator(
      "details:has(.technical-detail__content)",
    );
    await details.locator("summary").click();
    await expect(details).toHaveAttribute("open");
    await noOverflow(nativePage);
  } finally {
    await native.close();
  }
});
