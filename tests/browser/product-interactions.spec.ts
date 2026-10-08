import { expect, test } from "@playwright/test";
import { mkdir } from "node:fs/promises";

test("copy confirmation resets without moving the address in every theme", async ({
  page,
  context,
  baseURL,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const mode of [
    "editorial",
    "engineer",
    "digital",
    "chronicle",
    "product",
  ]) {
    await context.addCookies([
      { name: "portfolio-mode", value: mode, url: baseURL! },
    ]);
    await page.goto("/en/contact");
    await page.evaluate(() =>
      Object.defineProperty(navigator, "clipboard", {
        configurable: true,
        value: { writeText: async () => {} },
      }),
    );
    const button = page.getByRole("button", { name: "Copy email address" });
    await button.scrollIntoViewIfNeeded();
    const before = await button.boundingBox();
    await button.click();
    await expect(button).toHaveAttribute("data-copied", "true");
    await expect(button.locator("rect")).toHaveCount(0);
    await expect(page.getByRole("tooltip")).toHaveText("Copied");
    await expect(page.locator(".contact-copy [role=status]")).toHaveText(
      "Email address copied.",
    );
    expect(await button.boundingBox()).toEqual(before);
    await expect(button).toHaveAttribute("data-copied", "false", {
      timeout: 3000,
    });
    await expect(page.getByRole("tooltip")).toHaveText("Copy");
    await expect(button.locator("rect")).toHaveCount(1);
    await page.evaluate(() =>
      Object.defineProperty(navigator, "clipboard", { value: undefined }),
    );
    await button.click();
    await expect(button).toHaveAttribute("data-copied", "false");
    await expect(page.locator(".contact-copy [role=status]")).toHaveText(
      "Copy unavailable. Select the email address to copy it.",
    );
  }
});

test("Product disclosures and mobile menu reverse native transitions and respect reduced motion", async ({
  page,
  context,
  baseURL,
}) => {
  await context.addCookies([
    { name: "portfolio-mode", value: "product", url: baseURL! },
  ]);
  for (const motion of ["no-preference", "reduce"] as const) {
    await page.emulateMedia({ reducedMotion: motion });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/en/work/japan-travel-planner");
    const details = page.locator("details:has(.technical-detail__content)");
    const summary = details.locator("summary");
    await summary.scrollIntoViewIfNeeded();
    await summary.focus();
    await page.keyboard.press("Enter");
    await expect(details).toHaveAttribute("open", "");
    await expect(details.locator(".technical-detail__content")).toBeVisible();
    expect(
      await details.evaluate(
        (el) => getComputedStyle(el, "::details-content").transitionDuration,
      ),
    ).toBe(motion === "reduce" ? "0s" : "0.2s, 0.16s, 0.2s");
    await page.waitForFunction(
      () => !document.getAnimations().some((a) => a.playState === "running"),
    );
    // The old generic entrance must not run alongside Product's expansion.
    expect(
      await details.evaluate((el) =>
        el
          .getAnimations({ subtree: true })
          .some((a) => a instanceof CSSAnimation),
      ),
    ).toBe(false);
    await page.keyboard.press("Enter");
    await expect(details).not.toHaveAttribute("open", "");
    await expect
      .poll(() =>
        details.evaluate(
          (el) => getComputedStyle(el, "::details-content").contentVisibility,
        ),
      )
      .toBe("hidden");
    // Rapid input must finish in the newest native state, not queue an animation.
    await summary.evaluate((el) => {
      (el as HTMLElement).click();
      (el as HTMLElement).click();
      (el as HTMLElement).click();
    });
    await expect(details).toHaveAttribute("open", "");
    await expect(summary).toBeFocused();

    await page.evaluate(() => window.scrollTo(0, 0));
    const menu = page.locator(".mobile-navigation");
    await menu.locator("summary").first().click();
    await expect(menu).toHaveAttribute("open", "");
    await expect(menu.locator(".site-controls--mobile")).toBeVisible();
    expect(
      await menu.evaluate(
        (el) => getComputedStyle(el, "::details-content").transitionDuration,
      ),
    ).toBe(motion === "reduce" ? "0s" : "0.18s, 0.18s, 0.18s");
    await page.keyboard.press("Escape");
    await expect(menu).not.toHaveAttribute("open", "");
    await expect(menu.locator("summary").first()).toBeFocused();
  }
});

test("Product landscape uses responsive sources and stays clear of mobile copy", async ({
  page,
  context,
  baseURL,
}) => {
  await context.addCookies([
    { name: "portfolio-mode", value: "product", url: baseURL! },
  ]);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await mkdir(".cache/product-review", { recursive: true });
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/en");
    await page.evaluate(() => document.fonts.ready);
    const image = page.locator(".product-hero__landscape img");
    await expect
      .poll(() => image.evaluate((el) => (el as HTMLImageElement).naturalWidth))
      .toBeGreaterThan(0);
    await expect(
      page.locator('.product-hero source[type="image/avif"]'),
    ).toHaveCount(1);
    await expect(
      page.locator('.product-hero source[type="image/webp"]'),
    ).toHaveCount(1);
    expect(
      await image.evaluate((el) => (el as HTMLImageElement).currentSrc),
    ).toMatch(/\.avif$/);
    if (width === 390) {
      const copy = (await page.locator(".product-hero__copy").boundingBox())!;
      const picture = (await image.boundingBox())!;
      expect(picture.y).toBeGreaterThan(copy.y + copy.height);
    }
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width + 1);
    await page.screenshot({
      path: `.cache/product-review/product-landscape-${width}.png`,
      fullPage: true,
    });
  }
});
