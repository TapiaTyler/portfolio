import { expect, test } from "@playwright/test";

test("Portfolio keeps Editorial as its opening and compares five modes in one stage", async ({
  page,
  context,
  baseURL,
}) => {
  test.setTimeout(60_000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const mode of [
    "product",
    "editorial",
    "engineer",
    "digital",
    "chronicle",
  ]) {
    await context.addCookies([
      { name: "portfolio-mode", value: mode, url: baseURL! },
    ]);
    await page.goto("/en/work/portfolio");
    await expect(
      page.locator('[data-media-id="editorial-home"]').first(),
    ).toBeVisible();
    const comparison = page.locator("#compositions .media-comparison");
    await expect(comparison).toHaveAttribute("data-enhanced", "true");
    await expect(
      comparison.locator(".media-comparison__view:visible"),
    ).toHaveCount(1);
    for (const label of [
      "Product",
      "Editorial",
      "Engineer",
      "Digital",
      "Chronicle",
    ]) {
      const button = comparison.getByRole("button", {
        name: label,
        exact: true,
      });
      await button.click();
      await expect(button).toHaveAttribute("aria-pressed", "true");
      await expect(
        comparison.locator(".media-comparison__view:visible"),
      ).toHaveCount(1);
      await expect(
        comparison.locator(`[data-media-id="${label.toLowerCase()}-home"]`),
      ).toBeVisible();
    }
    await comparison
      .getByRole("button", { name: "Next view", exact: true })
      .click();
    await expect(
      comparison.getByRole("button", { name: "Product", exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
    await comparison
      .getByRole("button", { name: "Product", exact: true })
      .press("ArrowRight");
    await expect(
      comparison.getByRole("button", { name: "Editorial", exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator("#chronicle-iteration figure")).toHaveCount(2);
    await expect(page.locator("#chronicle-evidence video")).toHaveCount(1);
  }
});

test("Comparison remains usable on phones and without JavaScript", async ({
  browser,
  baseURL,
}) => {
  for (const javaScriptEnabled of [true, false]) {
    const context = await browser.newContext({
      javaScriptEnabled,
      viewport: { width: 390, height: 844 },
    });
    const page = await context.newPage();
    await page.goto(`${baseURL}/ja/work/portfolio`);
    const comparison = page.locator("#compositions .media-comparison");
    if (javaScriptEnabled) {
      await comparison
        .getByRole("button", { name: "Chronicle", exact: true })
        .click();
      await expect(
        comparison.locator('[data-media-id="chronicle-home"]'),
      ).toBeVisible();
    } else {
      await expect(
        comparison.locator(".media-comparison__controls"),
      ).toBeHidden();
      await expect(comparison.locator("figure")).toHaveCount(5);
      const stage = comparison.locator(".media-comparison__stage");
      await stage.evaluate((element) =>
        element.scrollTo({ left: element.scrollWidth, behavior: "instant" }),
      );
      expect(
        await stage.evaluate((element) => element.scrollLeft),
      ).toBeGreaterThan(0);
    }
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(391);
    await context.close();
  }
});

test("Chronicle landscape collection controls leave the heading clear", async ({
  page,
  context,
  baseURL,
}) => {
  await context.addCookies([
    { name: "portfolio-mode", value: "chronicle", url: baseURL! },
  ]);
  for (const width of [844, 667, 568]) {
    await page.setViewportSize({ width, height: 390 });
    await page.goto("/en");
    await page.evaluate(() => document.fonts.ready);
    const heading = await page.locator("#selected-work-heading").boundingBox();
    const controls = await page
      .locator(".chronicle-selection__controls")
      .boundingBox();
    expect(heading).not.toBeNull();
    expect(controls).not.toBeNull();
    expect(heading!.x + heading!.width).toBeLessThanOrEqual(controls!.x);
    const dots = page.locator(".chronicle-selection__dots button");
    expect((await dots.first().boundingBox())!.width).toBeGreaterThanOrEqual(
      24,
    );
    await page
      .getByRole("button", { name: "Next project", exact: true })
      .click();
    await expect(dots.nth(1)).toHaveAttribute("aria-pressed", "true");
  }
});

test("Image viewer returns to the comparison view last inspected", async ({
  page,
  context,
  baseURL,
}) => {
  for (const mode of ["digital", "chronicle"]) {
    await context.addCookies([
      { name: "portfolio-mode", value: mode, url: baseURL! },
    ]);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/en/work/portfolio");
    const comparison = page.locator("#compositions .media-comparison");
    await comparison
      .getByRole("button", { name: "Product", exact: true })
      .click();
    await comparison
      .locator('[data-media-id="product-home"] .media-view-trigger')
      .click();
    const viewer = page.getByRole("dialog", {
      name: "Project image gallery",
      exact: true,
    });
    await expect(viewer).toBeVisible();
    await viewer
      .getByRole("button", { name: "Next Image", exact: true })
      .click();
    await expect(viewer.locator("img")).toHaveAttribute(
      "alt",
      /Engineer homepage/,
    );
    await viewer
      .getByRole("button", { name: "Close Gallery", exact: true })
      .click();
    await expect(viewer).toHaveCount(0);
    await expect(
      comparison.getByRole("button", { name: "Engineer", exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
    await expect(
      comparison.locator('[data-media-id="engineer-home"] .media-view-trigger'),
    ).toBeFocused();
  }
});
