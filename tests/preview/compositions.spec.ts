import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const modes = ["editorial", "engineer", "digital"] as const;

test("project preview responses match each theme and simulated reduction cancels image motion", async ({
  page,
  context,
}) => {
  for (const mode of modes) {
    await context.addCookies([
      { name: "portfolio-mode", value: mode, url: "http://127.0.0.1:3218" },
    ]);
    await page.goto("/dev/compositions?surface=homepage");
    // Native smooth focus scrolling can move the hit target after an automated hover.
    await page.evaluate(() => {
      document.documentElement.style.scrollBehavior = "auto";
    });
    await page.evaluate(() => document.fonts.ready);
    const project = page
      .locator(".project-feature")
      .filter({ has: page.locator("img") });
    await project.getByRole("heading").getByRole("link").focus();
    await expect(project).toHaveAttribute("data-motion-state", "settled");
    if (mode === "engineer") {
      await expect
        .poll(() =>
          project.evaluate((element) => getComputedStyle(element).boxShadow),
        )
        .toBe("none");
      await project.hover();
      await expect(project).toHaveCSS("box-shadow", "none");
      const capability = page.locator(".capability").first();
      const border = await capability.evaluate(
        (element) => getComputedStyle(element).borderColor,
      );
      await capability.hover();
      await expect(capability).toHaveCSS("border-color", border);
    } else {
      const expected = mode === "editorial" ? "1.015" : "1.025";
      await expect
        .poll(() =>
          project
            .locator("img")
            .evaluate((element) => getComputedStyle(element).scale),
        )
        .toBe(expected);
    }
    if (mode === "digital") {
      for (const panel of [
        project,
        page.locator(".capability").first(),
        page.locator(".digital-visual--portal"),
      ]) {
        await panel.hover();
        await expect
          .poll(() =>
            panel.evaluate(
              (element) => getComputedStyle(element, "::after").opacity,
            ),
          )
          .toBe("1");
        const angle = await panel.evaluate((element) =>
          getComputedStyle(element, "::after").getPropertyValue(
            "--digital-border-angle",
          ),
        );
        await expect
          .poll(() =>
            panel.evaluate((element) =>
              getComputedStyle(element, "::after").getPropertyValue(
                "--digital-border-angle",
              ),
            ),
          )
          .not.toBe(angle);
      }
      // Leaving the portal stops its loop; project keyboard focus still responds.
      await page.mouse.move(0, 0);
      await expect
        .poll(() =>
          page
            .locator(".digital-visual--portal")
            .evaluate(
              (element) => getComputedStyle(element, "::after").animationName,
            ),
        )
        .toBe("none");
      await project.getByRole("heading").getByRole("link").focus();
      await expect
        .poll(() =>
          project.evaluate(
            (element) => getComputedStyle(element, "::after").animationName,
          ),
        )
        .toContain("digital-border-trace");
      await page.screenshot({ path: ".cache/digital-border-fixtures.png" });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await expect
        .poll(() =>
          project.evaluate(
            (element) => getComputedStyle(element, "::after").animationName,
          ),
        )
        .toBe("none");
      await page.emulateMedia({ reducedMotion: "no-preference" });
    }
    await page
      .getByRole("navigation", { name: "Preview motion" })
      .getByRole("link", { name: "Reduced motion", exact: true })
      .click();
    await expect(page.locator(".motion-preview--reduced")).toBeVisible();
    await project.getByRole("heading").getByRole("link").focus();
    await expect
      .poll(() =>
        project
          .locator("img")
          .evaluate((element) => getComputedStyle(element).scale),
      )
      .toBe("1");
    if (mode === "digital") {
      await expect
        .poll(() =>
          project.evaluate(
            (element) => getComputedStyle(element, "::after").animationName,
          ),
        )
        .toBe("none");
    }
  }
});

test("populated project modules participate in transitions without duplicate identities", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("/dev/compositions?surface=homepage");
  await page.evaluate(() => document.fonts.ready);
  // Keep the development control reachable while reviewing project movement.
  await page.locator(".mode-picker").evaluate((element) => {
    (element as HTMLElement).style.cssText =
      "position:fixed;top:0;right:0;z-index:100";
  });
  await page.locator('[data-motion-id="work"]').evaluate((element) => {
    scrollTo({
      top: scrollY + element.getBoundingClientRect().top - 120,
      behavior: "instant",
    });
  });
  await page.locator(".mode-picker > summary").click();
  await page.getByRole("button", { name: "Digital", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute(
    "data-theme-transition",
    "animating",
  );
  const modules = await page
    .locator(".project-feature")
    .evaluateAll((elements) =>
      elements
        .filter((element) => (element as HTMLElement).style.viewTransitionName)
        .map((element) => (element as HTMLElement).dataset.motionId),
    );
  expect(modules.length).toBeGreaterThan(0);
  expect(new Set(modules).size).toBe(modules.length);
  await expect(page.locator("html")).not.toHaveAttribute(
    "data-theme-transition",
  );
  await expect(page.locator(".project-feature")).toHaveCount(3);
  expect(errors).toEqual([]);
  await page.goto("/dev/compositions?surface=homepage&motion=reduce");
  await page.locator(".mode-picker > summary").click();
  await page.getByRole("button", { name: "Engineer", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "engineer");
  await expect(page.locator("html")).not.toHaveAttribute(
    "data-theme-transition",
  );
});

for (const mode of modes) {
  test(`${mode} populated homepage preserves layout, media and locale fallbacks`, async ({
    page,
    context,
  }) => {
    await context.addCookies([
      { name: "portfolio-mode", value: mode, url: "http://127.0.0.1:3218" },
    ]);
    for (const locale of ["en", "ja"]) {
      await page.goto(`/dev/compositions?surface=homepage&locale=${locale}`);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator(".project-feature")).toHaveCount(3);
      for (const width of [320, 768, 1440]) {
        await page.setViewportSize({ width, height: 1000 });
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
          `${mode}/${locale}/${width}`,
        ).toBe(true);
      }
      const ids = await page
        .locator("[id]")
        .evaluateAll((elements) => elements.map((element) => element.id));
      expect(new Set(ids).size).toBe(ids.length);
      if (locale === "ja") {
        await expect(page.locator(".content-notice").first()).toBeVisible();
        await expect(
          page
            .locator(".project-feature")
            .first()
            .getByRole("heading")
            .locator("a"),
        ).toHaveAttribute("lang", "en");
      }
      const image = page.locator(".project-feature img");
      await image.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          image.evaluate(
            (element) => (element as HTMLImageElement).naturalWidth,
          ),
        )
        .toBe(800);
      if (locale === "en") {
        const result = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
          .analyze();
        expect(result.violations).toEqual([]);
      }
    }
    await page.goto("/dev/compositions?surface=homepage&motion=reduce");
    const link = page.locator(".homepage .text-link").first();
    await link.hover();
    expect(
      await link.evaluate((element) => ({
        transition: getComputedStyle(element).transitionDuration,
        transform: getComputedStyle(element).transform,
      })),
    ).toEqual({ transition: "0s", transform: "none" });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/dev/compositions?surface=homepage");
    await page.locator(".homepage .text-link").first().hover();
    expect(
      await page
        .locator(".homepage .text-link")
        .first()
        .evaluate((element) => getComputedStyle(element).transitionDuration),
    ).toBe("0s");
  });
}

test("comparison isolates all modes and renders wide and portrait gallery media", async ({
  page,
  context,
}) => {
  for (const outer of modes) {
    await context.addCookies([
      { name: "portfolio-mode", value: outer, url: "http://127.0.0.1:3218" },
    ]);
    await page.goto("/dev/compositions?project=fixture-visual");
    await page.evaluate(() => document.fonts.ready);
    for (const [mode, font] of [
      ["editorial", "editorialDisplay"],
      ["engineer", "engineerSans"],
      ["digital", "interfaceFont"],
    ]) {
      expect(
        await page
          .locator(`[data-composition="${mode}"] h3`)
          .first()
          .evaluate((element) => getComputedStyle(element).fontFamily),
      ).toContain(font);
    }
    for (const width of [320, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    }
  }
  for (const mode of modes) {
    const gallery = page.locator(`[data-composition="${mode}"] .media-gallery`);
    await expect(gallery.locator("img")).toHaveCount(3);
    for (const image of await gallery.locator("img").all()) {
      await image.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          image.evaluate(
            (element) => (element as HTMLImageElement).naturalWidth,
          ),
        )
        .toBeGreaterThan(0);
      const ratio = await image.evaluate((element) => {
        const image = element as HTMLImageElement;
        const rect = image.getBoundingClientRect();
        return {
          actual: rect.width / rect.height,
          intrinsic: image.naturalWidth / image.naturalHeight,
        };
      });
      expect(ratio.actual).toBeCloseTo(ratio.intrinsic, 2);
    }
  }
  const ids = await page
    .locator("[id]")
    .evaluateAll((elements) => elements.map((element) => element.id));
  expect(new Set(ids).size).toBe(ids.length);
});

test("failed media retains its accessible description in every composition", async ({
  page,
}) => {
  await page.route("**/dev/fixtures/reference.svg", (route) => route.abort());
  await page.goto("/dev/compositions?project=fixture-visual");
  for (const mode of modes) {
    const article = page.locator(
      `[data-composition="${mode}"] .project-feature`,
    );
    await article.locator(".media-frame").scrollIntoViewIfNeeded();
    await expect(article.locator(".media-unavailable")).toContainText(
      "A labeled development fixture",
    );
    await expect(
      article.getByRole("link", { name: "Explore the Project", exact: true }),
    ).toBeVisible();
  }
});
