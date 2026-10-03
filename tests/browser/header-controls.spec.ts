import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const mode of ["editorial", "engineer", "digital"] as const) {
  test(`${mode} language slider preserves destinations, dimensions and mobile keyboard operation`, async ({
    page,
    context,
  }) => {
    await context.addCookies([
      { name: "portfolio-mode", value: mode, url: "http://127.0.0.1:3217" },
    ]);
    await page.addInitScript(() => {
      const animate = Element.prototype.animate;
      Element.prototype.animate = function (frames, options) {
        if (this.classList.contains("locale-switcher__indicator")) {
          document.documentElement.dataset.testLanguageFrames =
            JSON.stringify(frames);
        }
        return animate.call(this, frames, options);
      };
    });
    await page.goto("/en/about");
    await page.evaluate(() => document.fonts.ready);
    const slider = page.locator(".site-controls--desktop .locale-switcher");
    const indicator = slider.locator(".locale-switcher__indicator");
    const initial = (await slider.boundingBox())!;
    expect(initial.height).toBe(50);
    await expect(indicator).toHaveAttribute("aria-hidden", "true");
    await expect(indicator).toHaveCSS(
      "transition-duration",
      mode === "engineer" ? "0.14s" : "0.28s",
    );
    if (mode === "engineer") {
      await expect(indicator).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
      expect(
        await indicator.evaluate(
          (element) => getComputedStyle(element, "::before").width,
        ),
      ).toBe("5px");
    } else await expect(indicator).toHaveCSS("border-radius", "999px");
    await slider.getByRole("link", { name: "JA", exact: true }).click();
    await expect(page).toHaveURL(/\/ja\/about$/);
    await expect(page.locator("html")).toHaveAttribute(
      "data-test-language-frames",
      JSON.stringify([{ translate: "0 0" }, { translate: "100% 0" }]),
    );
    await expect(
      slider.getByRole("link", { name: "JA", exact: true }),
    ).toHaveAttribute("aria-current", "page");
    await expect(indicator).toHaveCSS("translate", "100%");
    expect((await slider.boundingBox())!.width).toBe(initial.width);
    await expect(
      slider.getByRole("link", { name: "JA", exact: true }),
    ).toHaveCSS("text-decoration-line", "none");
    await page.screenshot({ path: `.cache/header-${mode}.png` });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect(indicator).toHaveCSS("transition-duration", "0s");
    await page.setViewportSize({ width: 390, height: 844 });
    await page.locator(".mobile-navigation > summary").click();
    const mobile = page.locator(".site-controls--mobile .locale-switcher");
    expect((await mobile.boundingBox())!.height).toBe(50);
    await mobile.getByRole("link", { name: "EN", exact: true }).focus();
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations).toEqual([]);
    await page.screenshot({ path: `.cache/header-${mode}-mobile.png` });
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/en\/about$/);
    await page.locator(".mobile-navigation > summary").click();
    await expect(
      mobile.getByRole("link", { name: "EN", exact: true }),
    ).toHaveAttribute("aria-current", "page");
  });
}
