import { expect, test } from "@playwright/test";

for (const mode of ["editorial", "engineer", "digital"] as const) {
  test(`${mode} navigation marker tracks hover/focus, returns to the current page and respects reduced motion`, async ({
    page,
    context,
  }) => {
    await context.addCookies([
      { name: "portfolio-mode", value: mode, url: "http://127.0.0.1:3217" },
    ]);
    await page.goto("/en/work");
    const nav = page.locator(".site-nav--desktop");
    const marker = nav.locator(".navigation-marker");
    await expect(marker).toBeVisible();
    await expect(marker).toHaveAttribute("aria-hidden", "true");
    const work = nav.getByRole("link", { name: "Work", exact: true });
    const about = nav.getByRole("link", { name: "About", exact: true });
    const position = (link: typeof work) =>
      link.evaluate((element) => {
        const engineer =
          element.closest("[data-theme]")?.getAttribute("data-theme") ===
          "engineer";
        // Every marker measures the label; Engineer's square sits 11px to its left.
        const rect = element
          .querySelector(".site-nav__label")!
          .getBoundingClientRect();
        return (
          rect.left -
          element.parentElement!.getBoundingClientRect().left -
          (engineer ? 11 : 0)
        );
      });
    await about.hover();
    if (mode !== "engineer") {
      await expect(about).toHaveCSS("text-decoration-line", "none");
      await expect(work).toHaveCSS("text-decoration-line", "none");
      expect((await about.boundingBox())!.height).toBeGreaterThanOrEqual(44);
      const label = await about.locator(".site-nav__label").boundingBox();
      await expect
        .poll(async () => {
          const box = (await marker.boundingBox())!;
          return box.y - (label!.y + label!.height);
        })
        .toBeCloseTo(2, 0);
    }
    if (mode === "engineer") {
      await expect(about).toHaveCSS("text-decoration-line", "none");
      const original = await about.boundingBox();
      await expect
        .poll(async () => {
          const box = (await marker.boundingBox())!;
          return box.y + box.height / 2 - (original!.y + original!.height / 2);
        })
        .toBeCloseTo(0, 0);
      await about.focus();
      expect(await about.boundingBox()).toEqual(original);
      await about.evaluate((element) => (element as HTMLElement).blur());
    }
    await expect
      .poll(() =>
        marker.evaluate((element) =>
          parseFloat(getComputedStyle(element).left),
        ),
      )
      .toBeCloseTo(await position(about), 0);
    await page.mouse.move(0, 0);
    await expect
      .poll(() =>
        marker.evaluate((element) =>
          parseFloat(getComputedStyle(element).left),
        ),
      )
      .toBeCloseTo(await position(work), 0);
    await about.focus();
    await expect
      .poll(() =>
        marker.evaluate((element) =>
          parseFloat(getComputedStyle(element).left),
        ),
      )
      .toBeCloseTo(await position(about), 0);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect(marker).toHaveCSS("transition-duration", "0s");
    await page.setViewportSize({ width: 390, height: 844 });
    await page.locator(".mobile-navigation > summary").click();
    const mobile = page.locator(".mobile-navigation .site-nav");
    await mobile.getByRole("link", { name: "About", exact: true }).focus();
    await expect(mobile.locator(".navigation-marker")).toBeVisible();
    expect(await page.locator(".navigation-marker").count()).toBe(2);
    await page.keyboard.press("Escape");
    await expect(page.locator(".mobile-navigation > summary")).toBeFocused();
  });
}
