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

test("mobile header keeps readable controls and stable menu artwork", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/preview/chronicle?project=japan-travel-planner");
  await expect(page.locator(".site-brand__role")).toHaveCount(0);
  await expect(page.locator(".mobile-navigation__label")).toBeHidden();
  const menu = page.locator(".mobile-navigation");
  await menu.locator(":scope > summary").click();
  const panel = menu.locator(".mobile-navigation__panel");
  const artwork = () =>
    panel.evaluate((el) => {
      const css = getComputedStyle(el);
      return [css.backgroundSize, css.backgroundPosition];
    });
  const before = await artwork();
  const picker = menu.locator(".mode-picker");
  expect(
    await picker
      .locator("summary")
      .evaluate((el) => getComputedStyle(el).backgroundImage),
  ).toContain("linear-gradient");
  await picker.locator("summary").click();
  await expect(
    picker.getByRole("button", { name: "Engineer", exact: true }),
  ).toBeVisible();
  expect(await artwork()).toEqual(before);
  expect(
    await page
      .locator("#architecture-system .architecture-display")
      .evaluate((el) => getComputedStyle(el).borderTopWidth),
  ).toBe("0px");
  await page.goto("/preview/chronicle?surface=work");
  const track = page.locator(".chronicle-selection__track");
  expect(
    await track.evaluate((el) => getComputedStyle(el).scrollSnapType),
  ).not.toContain("mandatory");
  await page.getByRole("button", { name: "Next project", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Previous project", exact: true }),
  ).toBeEnabled();
});

test("full-shell review selects homepage tabs and preserves project navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1672, height: 941 });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/preview/chronicle");
  await expect(page.locator(".chronicle-home-chapters")).toHaveCount(0);
  expect(
    await page
      .locator(".site-brand")
      .evaluate((el) => getComputedStyle(el, "::before").content),
  ).toBe("none");
  const picker = page.locator(".site-controls--desktop .mode-picker");
  await expect(picker).not.toHaveAttribute("open", "");
  await picker.locator("summary").click();
  await expect(picker.locator(".theme-switcher")).toBeVisible();
  await page.keyboard.press("Escape");
  const overview = page.getByRole("region", { name: "Portfolio overview" });
  for (const [label, href] of [
    ["About", "/en/about"],
    ["Areas of Practice", null],
    ["Lab & Explorations", "/en/lab"],
    ["Start a Conversation", "/en/contact"],
  ] as const) {
    await overview.getByRole("tab", { name: label, exact: true }).click();
    const panel = overview.getByRole("tabpanel");
    await expect(panel).toHaveCount(1);
    if (href)
      await expect(
        panel.locator(".chronicle-home-tabs__action"),
      ).toHaveAttribute("href", href);
    else
      await expect(panel.locator(".chronicle-home-tabs__action")).toHaveCount(
        0,
      );
  }
  await overview.getByRole("tab", { name: "About", exact: true }).focus();
  await page.keyboard.press("ArrowDown");
  await expect(
    overview.getByRole("tab", { name: "Areas of Practice", exact: true }),
  ).toBeFocused();
  await expect(
    overview.getByRole("tab", { name: "Areas of Practice", exact: true }),
  ).toHaveAttribute("aria-selected", "true");
  const track = page.locator(".chronicle-selection__track");
  await track.focus();
  await page.keyboard.press("ArrowRight");
  const card = page.locator(".chronicle-selection__item[data-selected=true]");
  await expect(card).toContainText("Japan Travel Planner");
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  // Project cards open into their case study (the card-to-banner transition).
  const opening = page.waitForFunction(
    () =>
      document.documentElement.dataset.routeTransition?.startsWith("project") &&
      document.documentElement.dataset.routeProjectDirection === "open",
  );
  await card
    .getByRole("link", { name: "Japan Travel Planner", exact: true })
    .click();
  await opening;
  await expect(page.locator(".chronicle-dossier")).toBeVisible();
  await expect
    .poll(() => page.locator("html").getAttribute("data-route-transition"))
    .toBeNull();
  await page.goBack();
  await expect(overview).toBeVisible();
  expect(errors).toEqual([]);
});

test("public empty discovery and Japanese shell fit the viewport without overlap", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of ["/en", "/ja"]) {
    await page.setViewportSize({ width: 1672, height: 941 });
    await page.goto(route);
    const header = await page
      .locator(".selected-work .home-section-header")
      .boundingBox();
    const empty = await page
      .locator(".selected-work .empty-content")
      .boundingBox();
    expect(empty!.y).toBeGreaterThanOrEqual(header!.y + header!.height);
    for (const viewport of [
      { width: 320, height: 800 },
      { width: 844, height: 390 },
      { width: 640, height: 480 },
    ]) {
      await page.setViewportSize(viewport);
      const dimensions = await page.evaluate(() => ({
        width: document.documentElement.scrollWidth,
        height: document.documentElement.scrollHeight,
      }));
      expect(dimensions.width).toBeLessThanOrEqual(viewport.width);
      expect(dimensions.height).toBeLessThanOrEqual(viewport.height);
    }
  }
});

test("a deep chapter remains reachable after switching out of the contained reading composition", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/preview/chronicle?project=portfolio");
  const destination = page.locator(
    '.case-study-navigation__desktop a[href="#navigation-motion"]',
  );
  await destination.click();
  await expect(destination).toHaveAttribute("aria-current", "location");
  await page.locator(".site-controls--desktop .mode-picker summary").click();
  await page
    .locator('.site-controls--desktop [data-theme-option="engineer"]')
    .click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "engineer");
  await expect
    .poll(() => page.locator("html").getAttribute("data-theme-transition"))
    .toBeNull();
  const mode = page.locator(
    '.site-controls--desktop [data-theme-option="chronicle"]',
  );
  if (!(await mode.isVisible()))
    await page.locator(".site-controls--desktop .mode-picker summary").click();
  await mode.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "chronicle");
  await expect
    .poll(() => page.locator("html").getAttribute("data-theme-transition"))
    .toBeNull();
  await expect(page.locator("#navigation-motion")).toBeInViewport();
  await expect(
    page.getByRole("region", { name: "Case study reading panel" }),
  ).toBeVisible();
});

test("without JavaScript homepage information and conventional project links remain usable", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  await context.addCookies([
    {
      name: "portfolio-mode",
      value: "chronicle",
      url: "http://127.0.0.1:3218",
    },
  ]);
  const page = await context.newPage();
  await page.goto("/preview/chronicle");
  const preview = page.getByRole("region", {
    name: "Portfolio overview",
  });
  await expect(
    preview.getByRole("tabpanel", { name: "About", exact: true }),
  ).toBeVisible();
  await expect(preview.getByRole("tablist")).toBeHidden();
  await page.locator(".chronicle-project h3 a").first().click();
  await expect(page).toHaveURL(/project=portfolio/);
  await expect(
    page.getByRole("region", { name: "Case study reading panel" }),
  ).toBeVisible();
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(390);
  await page.goto("/preview/chronicle?surface=work");
  await page
    .getByRole("link", { name: "Japan Travel Planner", exact: true })
    .click();
  await expect(page).toHaveURL(/project=japan-travel-planner/);
  await context.close();
});

test("project controls sit above cards and lower panels protect their content", async ({
  page,
}) => {
  for (const surface of ["home", "work"]) {
    await page.goto(
      `/preview/chronicle${surface === "work" ? "?surface=work" : ""}`,
    );
    for (const viewport of [
      { width: 1672, height: 941 },
      { width: 390, height: 844 },
      { width: 320, height: 800 },
    ]) {
      await page.setViewportSize(viewport);
      await page.evaluate(() => document.fonts.ready);
      const controls = await page
        .locator(".chronicle-selection__controls")
        .boundingBox();
      const track = await page
        .locator(".chronicle-selection__track")
        .boundingBox();
      expect(controls!.y + controls!.height).toBeLessThanOrEqual(track!.y);
      expect(controls!.x + controls!.width).toBeGreaterThan(
        viewport.width - 40,
      );
      const panel = page.locator(
        surface === "home" ? ".chronicle-home-tabs" : ".chronicle-preview",
      );
      const bounds = await panel.boundingBox();
      expect(bounds!.x).toBe(0);
      expect(bounds!.width).toBe(viewport.width);
      if (surface === "work") {
        const action = await panel
          .locator(
            ".chronicle-preview__panel:not([hidden]) .chronicle-preview__action",
          )
          .boundingBox();
        expect(action!.y + action!.height).toBeLessThanOrEqual(
          bounds!.y + bounds!.height,
        );
      }
      expect(
        await panel.evaluate((el) => getComputedStyle(el).borderTopWidth),
      ).toBe("1px");
      expect(
        await panel.evaluate((el) => getComputedStyle(el).borderLeftWidth),
      ).toBe("0px");
      expect(
        await page
          .locator(".chronicle-selection__track")
          .evaluate((el) => getComputedStyle(el).scrollbarWidth),
      ).toBe("none");
      const sizes = await page
        .locator(".chronicle-project")
        .evaluateAll((elements) =>
          elements.map((el) => ({
            width: el.clientWidth,
            scrollWidth: el.scrollWidth,
            height: el.getBoundingClientRect().height,
            trackHeight: el
              .closest(".chronicle-selection__track")!
              .getBoundingClientRect().height,
          })),
        );
      for (const size of sizes) {
        expect(size.scrollWidth).toBeLessThanOrEqual(size.width);
        expect(size.height).toBeLessThan(size.trackHeight);
      }
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBe(viewport.width);
    }
    if (surface === "work") {
      await expect(
        page.locator(".chronicle-selection__card-target"),
      ).toHaveCount(2);
      await page.locator(".chronicle-selection__dots button").nth(1).click();
      await expect(
        page.locator(".chronicle-preview__panel:not([hidden])"),
      ).toContainText("Japan Travel Planner");
    }
  }
  await page.goto("/preview/chronicle");
  const action = page.locator(
    ".chronicle-home-tabs__panel:not([hidden]) .chronicle-action",
  );
  await action.scrollIntoViewIfNeeded();
  await action.hover();
  await expect(action.locator(".chronicle-glitter__spark")).toHaveCount(18);
  expect(
    await action.evaluate(
      (el) =>
        getComputedStyle(el.querySelector(".chronicle-glitter__spark")!)
          .animationName,
    ),
  ).toBe("chronicle-sparkle");
  const durations = await action
    .locator(".chronicle-glitter__spark")
    .evaluateAll((elements) =>
      elements.map((el) => getComputedStyle(el).animationDuration),
    );
  expect(new Set(durations).size).toBeGreaterThan(1);
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(
    await action.evaluate(
      (el) =>
        getComputedStyle(el.querySelector(".chronicle-glitter__spark")!)
          .animationName,
    ),
  ).toBe("none");
  expect(
    await page
      .locator(
        ".chronicle-home-tabs__panel:not([hidden]) .chronicle-home-tabs__content",
      )
      .evaluate((el) => getComputedStyle(el).borderBottomWidth),
  ).toBe("0px");
});

test("home selectors animate between measured tabs with a complete connector", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1672, height: 941 });
  await page.goto("/preview/chronicle");
  await page.evaluate(() => document.fonts.ready);
  expect(
    await page
      .locator("body")
      .evaluate((el) => getComputedStyle(el).fontFamily),
  ).not.toContain("Times New Roman");
  const rail = page.locator(".chronicle-home-tabs__rail");
  const marker = rail.locator(".chronicle-home-tabs__selector");
  for (const viewport of [
    { width: 1672, height: 941 },
    { width: 320, height: 800 },
  ]) {
    await page.setViewportSize(viewport);
    await rail.getByRole("tab").last().click();
    const last = rail.getByRole("tab").last();
    await expect
      .poll(async () => {
        const selected = await last.boundingBox();
        const highlight = await marker.boundingBox();
        return Math.abs(selected!.y - highlight!.y);
      })
      .toBeLessThan(1);
    // The rail extends past the first/last tab by the finial length.
    const connector = await rail.evaluate((el) => ({
      cap: parseFloat(
        getComputedStyle(el).getPropertyValue("--chronicle-rail-cap"),
      ),
      top: parseFloat(getComputedStyle(el, "::before").top),
      height: parseFloat(getComputedStyle(el, "::before").height),
      last:
        el.querySelectorAll<HTMLElement>("button")[3].offsetTop +
        el.querySelectorAll<HTMLElement>("button")[3].offsetHeight / 2,
    }));
    expect(
      Math.abs(
        connector.top + connector.height - connector.cap - connector.last,
      ),
    ).toBeLessThan(1);
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(
    await marker.evaluate((el) => getComputedStyle(el).transitionDuration),
  ).toBe("0s");
});

test("cards without preview media use the full reading width", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/dev/compositions?surface=work");
  const cards = page.locator('.chronicle-project[data-has-media="false"]');
  expect(await cards.count()).toBeGreaterThan(0);
  for (const card of await cards.all()) {
    await expect(card.locator(":scope > .media-frame")).toHaveCount(0);
    const bounds = await card.boundingBox();
    const record = await card
      .locator(".chronicle-project__record")
      .boundingBox();
    expect(record!.width).toBeGreaterThan(bounds!.width * 0.8);
    expect(await card.evaluate((el) => el.scrollWidth <= el.clientWidth)).toBe(
      true,
    );
  }
});

test("Work cards select previews by click, keyboard and touch", async ({
  page,
  browser,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1672, height: 941 });
  await page.goto("/preview/chronicle?surface=work");
  const targets = page.locator(".chronicle-selection__card-target");
  await expect(targets).toHaveCount(2);
  const card = await page
    .locator(".chronicle-selection__item")
    .nth(1)
    .boundingBox();
  const button = await targets.nth(1).boundingBox();
  expect(button!.width).toBeGreaterThan(card!.width - 4);
  expect(button!.height).toBeGreaterThan(card!.height - 4);
  await targets.nth(1).click({ position: { x: 25, y: 30 } });
  await expect(targets.nth(1)).toHaveAttribute("aria-pressed", "true");
  await expect(
    page.locator(".chronicle-preview__panel:not([hidden])"),
  ).toContainText("Japan Travel Planner");
  await expect(page).toHaveURL(/surface=work/);
  await targets.first().focus();
  await page.keyboard.press("Space");
  await expect(targets.first()).toHaveAttribute("aria-pressed", "true");
  await targets.nth(1).focus();
  await page.keyboard.press("Enter");
  await expect(targets.nth(1)).toHaveAttribute("aria-pressed", "true");
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  const touch = await browser.newContext({
    hasTouch: true,
    isMobile: true,
    viewport: { width: 390, height: 844 },
    reducedMotion: "reduce",
  });
  await touch.addCookies([
    {
      name: "portfolio-mode",
      value: "chronicle",
      url: "http://127.0.0.1:3218",
    },
  ]);
  const mobile = await touch.newPage();
  await mobile.goto("/preview/chronicle?surface=work");
  await mobile.locator(".chronicle-selection__card-target").nth(1).tap();
  await expect(
    mobile.locator(".chronicle-preview__panel:not([hidden])"),
  ).toContainText("Japan Travel Planner");
  await expect(mobile).toHaveURL(/surface=work/);
  await touch.close();
});

test("Work chapter selectors slide vertically and horizontally with hover feedback", async ({
  page,
}) => {
  await page.goto("/preview/chronicle?surface=work");
  for (const viewport of [
    { width: 1672, height: 941 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport);
    const panel = page.locator(".chronicle-preview__panel:not([hidden])");
    const navigation = panel.getByRole("navigation", {
      name: "Project preview chapters",
    });
    const button = navigation.getByRole("button", {
      name: "Topics",
      exact: true,
    });
    await button.click();
    await expect(button).toHaveAttribute("aria-pressed", "true");
    await expect(
      panel.getByRole("region", { name: "Topics preview" }),
    ).toBeVisible();
    await expect
      .poll(async () => {
        const target = await button.boundingBox();
        const marker = await navigation
          .locator(".chronicle-preview__selector")
          .boundingBox();
        return Math.max(
          Math.abs(target!.x - marker!.x),
          Math.abs(target!.y - marker!.y),
          Math.abs(target!.width - marker!.width),
        );
      })
      .toBeLessThan(1);
    await navigation
      .getByRole("button", { name: "Overview", exact: true })
      .hover();
    expect(
      await navigation
        .getByRole("button", { name: "Overview", exact: true })
        .evaluate((el) => getComputedStyle(el).backgroundImage),
    ).toContain("linear-gradient");
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(
    await page
      .locator(
        ".chronicle-preview__panel:not([hidden]) .chronicle-preview__selector",
      )
      .evaluate((el) => getComputedStyle(el).transitionDuration),
  ).toBe("0s");
  await page.locator(".chronicle-selection__card-target").nth(1).click();
  await page
    .locator(".chronicle-preview__panel:not([hidden])")
    .getByRole("button", { name: "Approach", exact: true })
    .click();
  await expect(
    page
      .locator(".chronicle-preview__panel:not([hidden])")
      .getByRole("region", { name: "Approach preview" }),
  ).toBeVisible();
});

test("Chronicle case-study navigation shares sliding selection and hides scrollbar chrome", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/preview/chronicle?project=portfolio");
  const navigation = page.locator(".case-study-navigation__desktop");
  const chapter = navigation.locator('a[href="#navigation-motion"]');
  await chapter.click();
  await expect(chapter).toHaveAttribute("aria-current", "location");
  await expect
    .poll(async () => {
      const target = await chapter.boundingBox();
      const marker = await navigation
        .locator(".chronicle-navigation__selector")
        .boundingBox();
      return Math.max(
        Math.abs(target!.x - marker!.x),
        Math.abs(target!.y - marker!.y),
        Math.abs(target!.width - marker!.width),
      );
    })
    .toBeLessThan(1);
  const scrollbars = await page.evaluate(() =>
    Array.from(document.querySelectorAll("body *"))
      .filter((el) => /(auto|scroll)/.test(getComputedStyle(el).overflow))
      .map((el) => getComputedStyle(el).scrollbarWidth),
  );
  expect(scrollbars.every((value) => value === "none")).toBe(true);
  const body = page.locator(".case-study-body");
  const previous = await body.evaluate((el) => el.scrollTop);
  await body.focus();
  await page.keyboard.press("Home");
  await expect
    .poll(() => body.evaluate((el) => el.scrollTop))
    .toBeLessThan(previous);
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
});

for (const mode of ["editorial", "engineer", "digital", "chronicle"]) {
  test(`${mode} header links adjoin while their marker follows the label`, async ({
    page,
    context,
  }) => {
    await context.addCookies([
      { name: "portfolio-mode", value: mode, url: "http://127.0.0.1:3218" },
    ]);
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/en");
    await page.evaluate(() => document.fonts.ready);
    const nav = page.locator(".site-nav--desktop");
    const links = await nav.locator("a").all();
    for (let index = 0; index < links.length - 1; index++) {
      const left = await links[index].boundingBox();
      const right = await links[index + 1].boundingBox();
      expect(Math.abs(left!.x + left!.width - right!.x)).toBeLessThan(1);
      await page.mouse.move(
        left!.x + left!.width - 2,
        left!.y + left!.height / 2,
      );
      await expect(nav.locator(".navigation-marker")).toBeVisible();
      const marker = await nav.locator(".navigation-marker").boundingBox();
      const label = await links[index]
        .locator(".site-nav__label")
        .boundingBox();
      expect(
        Math.abs(marker!.width - (mode === "engineer" ? 5 : label!.width)),
      ).toBeLessThan(1);
      expect(
        Math.abs(marker!.x - (mode === "engineer" ? label!.x - 11 : label!.x)),
      ).toBeLessThan(1);
    }
  });
}

test("glass buttons swap to authored hover, focus and pressed art", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/preview/chronicle");
  const action = page.locator(
    ".chronicle-home-tabs__panel:not([hidden]) .chronicle-action",
  );
  const art = () =>
    action.evaluate((element) =>
      getComputedStyle(element).backgroundImage.split("/").pop(),
    );
  expect(await art()).toContain("glass-button.webp");
  await action.hover();
  expect(await art()).toContain("glass-button-hover.webp");
  await page.mouse.down();
  expect(await art()).toContain("glass-button-active.webp");
  await page.mouse.move(0, 0);
  await page.mouse.up();
  await action.focus();
  await page.keyboard.press("Shift");
  expect(
    await action.evaluate((element) => element.matches(":focus-visible")),
  ).toBe(true);
  expect(await art()).toContain("glass-button-hover.webp");
});
