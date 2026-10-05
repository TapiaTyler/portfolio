import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const theme of ["editorial", "engineer", "digital"] as const) {
  test(`${theme} renders the real pilot draft with media, responsive layout and honest locale fallback`, async ({
    page,
    context,
  }) => {
    await context.addCookies([
      { name: "portfolio-mode", value: theme, url: "http://127.0.0.1:3218" },
    ]);
    await page.goto("/dev/projects/portfolio");
    const study = page.locator(".case-study");
    if (theme === "engineer") {
      const record = study.locator(".engineer-block-record:has(> #continuity)");
      await expect(record.locator("#morphing-evidence video")).toHaveCount(1);
      await expect(record.locator("figcaption")).toContainText(
        "Live theme switching",
      );
      expect(
        await record.evaluate((element) => {
          const style = getComputedStyle(element);
          return (
            style.borderLeftWidth === "1px" &&
            style.borderRightWidth === "1px" &&
            style.borderLeftColor === style.borderRightColor
          );
        }),
      ).toBe(true);
      for (const id of [
        "intent",
        "architecture",
        "chronicle",
        "engineering-details",
        "state",
      ]) {
        await expect(
          study.locator(`.engineer-block-record > #${id}`),
        ).toHaveCount(1);
      }
      await expect(
        study.locator(".engineer-block-record .engineer-block-record"),
      ).toHaveCount(0);
      const cells = study.locator(".engineer-system-overview li");
      await expect(cells).toHaveCount(4);
      for (const cell of await cells.all()) {
        await expect(cell.locator("p")).not.toBeEmpty();
        expect(
          await cell.evaluate((element) => {
            const style = getComputedStyle(element);
            return [
              style.borderTopWidth,
              style.borderRightWidth,
              style.borderBottomWidth,
              style.borderLeftWidth,
            ];
          }),
        ).toEqual(["1px", "1px", "1px", "1px"]);
      }
    }
    if (theme === "digital") {
      const card = study.locator(".digital-block-layer:has(> #continuity)");
      await card.locator("#continuity-heading").scrollIntoViewIfNeeded();
      await card.locator("#continuity-heading").hover();
      await expect
        .poll(() =>
          card.evaluate(
            (element) =>
              element instanceof HTMLElement &&
              element.style.getPropertyValue("--card-light-x"),
          ),
        )
        .not.toBe("");
      expect(
        await card.evaluate((element) =>
          getComputedStyle(element)
            .getPropertyValue("--card-light-strength")
            .trim(),
        ),
      ).toBe("5%");
      await expect
        .poll(async () => {
          await card.locator("#continuity-heading").hover();
          return card.evaluate(
            (element) => getComputedStyle(element, "::before").opacity,
          );
        })
        .toBe("1");
      const lightPosition = await card.evaluate((element) =>
        (element as HTMLElement).style.getPropertyValue("--card-light-x"),
      );
      await page.mouse.move(0, 0);
      expect(
        await card.evaluate((element) =>
          (element as HTMLElement).style.getPropertyValue("--card-light-x"),
        ),
      ).toBe(lightPosition);
      await expect
        .poll(() =>
          card.evaluate((element) =>
            (element as HTMLElement).style.getPropertyValue("--card-light-x"),
          ),
        )
        .toBe("");
      await page.emulateMedia({ reducedMotion: "reduce" });
      await card.locator("#continuity-heading").hover();
      expect(
        await card.evaluate((element) =>
          (element as HTMLElement).style.getPropertyValue("--card-light-x"),
        ),
      ).toBe("");
      await page.emulateMedia({ reducedMotion: "no-preference" });
      const surface = study
        .locator(".digital-block-layer")
        .filter({ has: page.locator("#continuity") });
      await expect(surface.locator("#morphing-evidence video")).toHaveCount(1);
      await expect(surface.locator("figcaption")).toContainText(
        "Live theme switching",
      );
      expect(
        await surface
          .locator(".media-frame")
          .evaluate((element) => getComputedStyle(element).borderTopWidth),
      ).toBe("0px");
      for (const id of [
        "intent",
        "architecture",
        "chronicle",
        "engineering-details",
        "state",
      ]) {
        await expect(
          study.locator(`.digital-block-layer > #${id}`),
        ).toHaveCount(1);
      }
      await expect(
        study.locator(".digital-block-layer .digital-block-layer"),
      ).toHaveCount(0);
    }
    await expect(
      study.getByRole("heading", {
        name: "One Portfolio, Several Ways of Reading It",
        exact: true,
      }),
    ).toBeVisible();
    await expect(study.locator("#engineering-details")).toContainText(
      "Engineering details",
    );
    await study.locator("#engineering-details summary").click();
    await expect(study.locator("#engineering-details")).toContainText(
      "560ms for Editorial, 360ms for Engineer, 680ms for Digital",
    );
    await expect(study.locator("#engineering-details")).toContainText(
      "a carousel that expands from the selected image",
    );
    for (const width of [320, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width + 1);
      await study
        .locator(".case-study-intro")
        .evaluate((element) =>
          element.scrollIntoView({ block: "start", behavior: "instant" }),
        );
      await page.screenshot({
        path: `.cache/portfolio-pilot-${theme}-${width}.png`,
      });
      if (theme === "engineer") {
        if (width === 1440) {
          const comparison = study.locator("#compositions .media-frame");
          const boxes = await comparison.evaluateAll((elements) =>
            elements.map((element) => ({
              top: element.getBoundingClientRect().top,
              width: element.getBoundingClientRect().width,
            })),
          );
          expect(boxes).toHaveLength(4);
          expect(
            Math.max(...boxes.map((box) => box.top)) -
              Math.min(...boxes.map((box) => box.top)),
          ).toBeLessThan(1);
          expect(boxes.every((box) => box.width < 600)).toBe(true);
          expect(
            await study
              .locator("#morphing-evidence .media-frame")
              .evaluate((element) => element.getBoundingClientRect().width),
          ).toBeLessThanOrEqual(768);
          await study
            .locator("#compositions")
            .screenshot({ path: ".cache/pilot-engineer-comparison.png" });
        }
        await study
          .locator(".engineer-system-overview")
          .screenshot({ path: `.cache/pilot-overview-${width}.png` });
        await study
          .locator(".engineer-block-record:has(> #continuity)")
          .screenshot({ path: `.cache/pilot-engineer-evidence-${width}.png` });
      }
      if (theme === "digital") {
        await study
          .locator(".digital-block-layer")
          .filter({ has: page.locator("#continuity") })
          .screenshot({ path: `.cache/pilot-evidence-${width}.png` });
      }
    }
    const images = study.locator(".media-frame img");
    for (const image of await images.all()) {
      await image.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          image.evaluate(
            (element) => (element as HTMLImageElement).naturalWidth,
          ),
        )
        .toBeGreaterThan(0);
    }
    await expect(study.locator("video")).toHaveCount(3);
    for (const video of await study.locator("video").all()) {
      await video.scrollIntoViewIfNeeded();
      await expect(video).toHaveAttribute("controls", "");
      await expect(video).toHaveAttribute("preload", "none");
      await expect(video).not.toHaveAttribute("autoplay");
      await video.evaluate((element) => {
        const video = element as HTMLVideoElement;
        video.preload = "metadata";
        video.load();
      });
      await expect
        .poll(
          () =>
            video.evaluate(
              (element) => (element as HTMLVideoElement).videoWidth,
            ),
          { timeout: 15000 },
        )
        .toBe(1440);
      expect(
        await video.evaluate(
          (element) => (element as HTMLVideoElement).duration,
        ),
      ).toBeGreaterThan(3);
    }
    await study.locator("#chronicle-iteration").scrollIntoViewIfNeeded();
    await expect(study.locator("#chronicle-iteration")).toContainText(
      "Before: the first AI-assisted Chronicle build",
    );
    const scan = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(scan.violations).toEqual([]);
    await study
      .locator(".case-study-intro")
      .evaluate((element) =>
        element.scrollIntoView({ block: "start", behavior: "instant" }),
      );
    await page.screenshot({
      path: `.cache/portfolio-pilot-${theme}.png`,
      fullPage: true,
    });
    await page.goto("/dev/projects/portfolio?locale=ja");
    await expect(study).toContainText("English");
    await expect(
      study.locator("#continuity .rich-text").first(),
    ).toHaveAttribute("lang", "en");
  });
}

test("real draft modules participate in theme morphing without duplicate names or content", async ({
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
  await page.goto("/dev/projects/portfolio");
  await page.locator(".case-study-intro").scrollIntoViewIfNeeded();
  await page.evaluate(() => {
    const picker = document.querySelector<HTMLDetailsElement>(".mode-picker")!;
    picker.open = true;
    picker
      .querySelector<HTMLButtonElement>('[data-theme-option="digital"]')!
      .click();
  });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "digital");
  await expect(page.locator("html")).toHaveAttribute(
    "data-theme-transition",
    "animating",
  );
  const names = await page
    .locator('[style*="view-transition-name"]')
    .evaluateAll((elements) =>
      elements.map(
        (element) => (element as HTMLElement).style.viewTransitionName,
      ),
    );
  expect(names.length).toBeGreaterThan(0);
  expect(new Set(names).size).toBe(names.length);
  await expect(page.locator(".case-study #continuity")).toHaveCount(1);
  await page.evaluate(() =>
    document.getAnimations().forEach((animation) => {
      if (animation.effect?.getComputedTiming().iterations !== Infinity)
        animation.finish();
    }),
  );
  await expect(page.locator("html")).not.toHaveAttribute(
    "data-theme-transition",
  );
  await expect(page.locator('[style*="view-transition-name"]')).toHaveCount(0);
});

test("selected project and semantic development previews capture case-study modules", async ({
  page,
  context,
}) => {
  for (const route of [
    "/dev/compositions?surface=project&project=fixture-system",
    "/dev/design-system?project=fixture-system",
  ]) {
    await context.addCookies([
      {
        name: "portfolio-mode",
        value: "editorial",
        url: "http://127.0.0.1:3218",
      },
    ]);
    await page.goto(route);
    await page.locator(".case-study-intro").first().scrollIntoViewIfNeeded();
    await page.evaluate(() => {
      const start = document.startViewTransition.bind(document);
      (window as Window & { capturedModules?: string[] }).capturedModules = [];
      document.startViewTransition = (update) => {
        const view = start(update);
        void view.ready.then(() => {
          (window as Window & { capturedModules?: string[] }).capturedModules =
            Array.from(
              document.querySelectorAll<HTMLElement>(
                '[style*="view-transition-name"]',
              ),
              (element) => element.dataset.motionId!,
            );
        });
        return view;
      };
      const picker =
        document.querySelector<HTMLDetailsElement>(".mode-picker")!;
      picker.open = true;
      picker
        .querySelector<HTMLButtonElement>('[data-theme-option="engineer"]')!
        .click();
    });
    await expect
      .poll(() =>
        page.evaluate(
          () =>
            (window as Window & { capturedModules?: string[] }).capturedModules,
        ),
      )
      .toContain("case-study-intro");
    await expect(page.locator("html")).toHaveAttribute(
      "data-theme",
      "engineer",
    );
    await expect(page.locator('[style*="view-transition-name"]')).toHaveCount(
      0,
    );
  }
});
