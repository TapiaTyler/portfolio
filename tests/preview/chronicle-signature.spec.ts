import { expect, test, type Page } from "@playwright/test";

const origin = "http://127.0.0.1:3218";

test.beforeEach(async ({ context, page }) => {
  await context.addCookies([
    { name: "portfolio-mode", value: "chronicle", url: origin },
  ]);
  await page.setViewportSize({ width: 1440, height: 900 });
});

/** Names of running CSS/Web animations, including on pseudo-elements. */
function runningAnimations(page: Page) {
  return page.evaluate(() =>
    document
      .getAnimations()
      .filter((animation) => animation.playState === "running")
      .map((animation) => {
        const effect = animation.effect as KeyframeEffect;
        const target = effect.target as HTMLElement | null;
        return {
          name: (animation as CSSAnimation).animationName ?? "",
          pseudo: effect.pseudoElement ?? "",
          className: target?.className.toString() ?? "",
          clip: effect
            .getKeyframes()
            .some((frame) => "clipPath" in frame || "clip-path" in frame),
        };
      }),
  );
}

async function recordRouteSnapshots(page: Page) {
  await page.evaluate(() => {
    const record = window as unknown as {
      routeNames: string[][];
      routeRecording?: boolean;
    };
    record.routeNames = [];
    // Install once; wrapping twice would record every capture twice.
    if (record.routeRecording) return;
    record.routeRecording = true;
    const start = document.startViewTransition.bind(document);
    document.startViewTransition = (update) => {
      const names = (window as unknown as { routeNames: string[][] })
        .routeNames;
      const capture = () =>
        names.push(
          Array.from(document.querySelectorAll<HTMLElement>("*"))
            .filter(
              (element) => element.style.viewTransitionName === "route-project",
            )
            .map((element) => element.className.toString()),
        );
      capture();
      const view = start(async () => {
        await (update as () => Promise<void>)?.();
        capture();
      });
      return view;
    };
  });
}

test("a project card opens into its case-study banner and closes back on Back", async ({
  page,
}) => {
  await page.goto("/preview/chronicle?surface=work");
  await recordRouteSnapshots(page);
  await page
    .locator(".chronicle-preview__panel:not([hidden]) .chronicle-action")
    .click();
  await expect(page).toHaveURL(/project=portfolio/);
  await expect(page.locator(".chronicle-dossier-banner")).toBeVisible();
  let names = await page.evaluate(
    () => (window as unknown as { routeNames: string[][] }).routeNames,
  );
  expect(names[0].join()).toContain("chronicle-project");
  expect(names[1].join()).toContain("chronicle-dossier-banner");
  await expect
    .poll(() => page.locator("html").getAttribute("data-route-transition"))
    .toBeNull();

  await recordRouteSnapshots(page);
  await page.goBack();
  await expect(page).not.toHaveURL(/project=/);
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          (window as unknown as { routeNames: string[][] }).routeNames.length,
      ),
    )
    .toBeGreaterThanOrEqual(2);
  names = await page.evaluate(
    () => (window as unknown as { routeNames: string[][] }).routeNames,
  );
  expect(names[0].join()).toContain("chronicle-dossier-banner");
  expect(names[1].join()).toContain("chronicle-project");
});

test("cards are dealt in and selection locks on with a light sweep", async ({
  page,
}) => {
  // Record entrance animations as they start; they can finish before "load".
  await page.addInitScript(() => {
    const dealt: string[] = [];
    (window as unknown as { dealt: string[] }).dealt = dealt;
    const animate = Element.prototype.animate;
    Element.prototype.animate = function (frames, options) {
      if (this.matches(".chronicle-selection__track .chronicle-project"))
        dealt.push(JSON.stringify(frames));
      return animate.call(this, frames, options);
    };
  });
  await page.goto("/preview/chronicle");
  await expect
    .poll(() =>
      page.evaluate(() => (window as unknown as { dealt: string[] }).dealt),
    )
    .toHaveLength(3);
  expect(
    await page.evaluate(() => (window as unknown as { dealt: string[] }).dealt),
  ).toEqual(expect.arrayContaining([expect.stringContaining("36px 0")]));
  await page.waitForTimeout(1500);
  await page.getByRole("button", { name: "Next project", exact: true }).click();
  const running = await runningAnimations(page);
  expect(running.map((item) => item.name)).toEqual(
    expect.arrayContaining(["chronicle-lock-trace"]),
  );
  // The other card's screenshot steps back; its text keeps full contrast.
  const other = page.locator(".chronicle-selection__item").first();
  expect(
    await other
      .locator(".media-frame img")
      .evaluate((image) => getComputedStyle(image).filter),
  ).toContain("saturate");
  expect(
    await other
      .locator("h3")
      .evaluate((heading) => getComputedStyle(heading).opacity),
  ).toBe("1");
});

test("the chapter rail is lit to the current chapter and the crystal travels", async ({
  page,
}) => {
  await page.goto("/preview/chronicle?project=portfolio");
  const rail = page.locator(".case-study-navigation__desktop ol");
  const lit = () =>
    rail.evaluate((element) =>
      parseFloat(getComputedStyle(element, "::after").height),
    );
  await expect
    .poll(() =>
      page
        .locator(".chronicle-navigation__selector")
        .first()
        .evaluate((element) => getComputedStyle(element, "::before").content),
    )
    .not.toBe("none");
  const start = await lit();
  await page
    .locator('.case-study-navigation__desktop a[href="#chronicle"]')
    .click();
  await expect.poll(lit).toBeGreaterThan(start + 40);
});

test("Chronicle images open through a crystal and close back into their frame", async ({
  page,
}) => {
  await page.goto("/preview/chronicle?project=portfolio");
  const trigger = page
    .locator(".case-study .media-view-trigger:not([hidden])")
    .first();
  await trigger.scrollIntoViewIfNeeded();
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Project image gallery" });
  await expect(dialog).toBeVisible();
  expect((await runningAnimations(page)).some((item) => item.clip)).toBe(true);
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});

test("reduced motion keeps every signature interaction static", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/preview/chronicle");
  await page.getByRole("button", { name: "Next project", exact: true }).click();
  await expect(
    page.locator(".chronicle-selection__item").nth(1),
  ).toHaveAttribute("data-selected", "true");
  await page
    .getByRole("tablist", { name: "Portfolio sections" })
    .getByRole("tab")
    .nth(2)
    .click();
  await page
    .locator(".chronicle-home-tabs__panel:not([hidden]) .chronicle-action")
    .dispatchEvent("pointerdown", { button: 0 });
  expect(await runningAnimations(page)).toEqual([]);
});

/** The offset an entering panel starts from: its swipe animation at time zero. */
function swipeStart(page: Page, selector: string) {
  return page.locator(selector).evaluate((element) => {
    const swipe = element
      .getAnimations()
      .find(
        (animation) =>
          (animation as CSSAnimation).animationName === "chronicle-swipe-in",
      );
    if (!swipe) return null;
    swipe.pause();
    swipe.currentTime = 0;
    const translate = getComputedStyle(element).translate;
    swipe.finish();
    return translate;
  });
}

test("panels swipe in from the direction of travel", async ({ page }) => {
  await page.goto("/preview/chronicle");
  const tabs = page.getByRole("tablist", { name: "Portfolio sections" });
  await tabs.getByRole("tab").nth(2).click();
  expect(
    await swipeStart(page, ".chronicle-home-tabs__panel:not([hidden])"),
  ).toBe("0px 16px");
  await tabs.getByRole("tab").nth(0).click();
  expect(
    await swipeStart(page, ".chronicle-home-tabs__panel:not([hidden])"),
  ).toBe("0px -16px");

  await page.goto("/preview/chronicle?surface=work");
  await page.getByRole("button", { name: "Next project", exact: true }).click();
  expect(
    await swipeStart(page, ".chronicle-preview__panel:not([hidden])"),
  ).toBe("28px");
  await page
    .getByRole("button", { name: "Previous project", exact: true })
    .click();
  expect(
    await swipeStart(page, ".chronicle-preview__panel:not([hidden])"),
  ).toBe("-28px");

  // Route chapters run the other way when moving back.
  expect(
    await page.evaluate(() => {
      const root = document.documentElement;
      root.dataset.routeTransition = "chapter";
      root.dataset.routeDirection = "backward";
      const direction =
        getComputedStyle(root).getPropertyValue("--chapter-dir");
      delete root.dataset.routeTransition;
      delete root.dataset.routeDirection;
      return direction.trim();
    }),
  ).toBe("-1");
});

test("switching into Chronicle powers on the frames and corners after the morph", async ({
  page,
  context,
}) => {
  await context.addCookies([
    { name: "portfolio-mode", value: "editorial", url: origin },
  ]);
  await page.goto("/preview/chronicle");
  await page.evaluate(() => document.fonts.ready);
  const picker = page.locator(".mode-picker:visible").first();
  await picker.locator("summary").click();
  await picker.getByRole("button", { name: "Chronicle", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "chronicle");
  await expect
    .poll(() => page.locator("html").getAttribute("data-theme-transition"))
    .toBeNull();
  await expect
    .poll(async () => {
      const running = await runningAnimations(page);
      return {
        frames: running.some(
          (item) =>
            item.pseudo === "::after" &&
            item.className.includes("chronicle-selection__item"),
        ),
        corners: running.some((item) =>
          item.className.includes("chronicle-atmosphere__corner"),
        ),
      };
    })
    .toEqual({ frames: true, corners: true });
});

test("pressing a glass button sends a gleam across the glass", async ({
  page,
}) => {
  await page.goto("/preview/chronicle?surface=work");
  await page.waitForTimeout(1500);
  const action = page.locator(
    ".chronicle-preview__panel:not([hidden]) .chronicle-action",
  );
  await action.hover();
  await page.mouse.down();
  const running = await runningAnimations(page);
  await page.mouse.up({ button: "left" }).catch(() => undefined);
  expect(
    running.some(
      (item) =>
        item.pseudo === "::after" &&
        item.className.includes("chronicle-action"),
    ),
  ).toBe(true);
});
