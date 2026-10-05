import { expect, test } from "@playwright/test";

for (const theme of ["editorial", "engineer", "digital"] as const) {
  test(`${theme} orients readers and supports desktop and mobile section navigation`, async ({
    page,
    context,
  }) => {
    await context.addCookies([
      { name: "portfolio-mode", value: theme, url: "http://127.0.0.1:3218" },
    ]);
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/dev/projects/portfolio");
    const study = page.locator(".case-study");
    const brief = study.getByRole("region", { name: "Project at a Glance" });
    await expect(brief).toContainText("AI-assisted development");
    await expect(brief).toContainText(
      "deployed performance verification remain pending",
    );
    await brief.locator("summary").click();
    await expect(brief).toContainText(
      "Product, architecture and design direction",
    );
    const nav = study.locator(".case-study-navigation__desktop");
    await expect(nav).toBeVisible();
    await expect(nav.getByRole("link")).toHaveCount(9);
    if (theme === "engineer") {
      await expect(nav.locator(".case-study-navigation__root")).toHaveText(
        "portfolio/",
      );
      await expect(nav.locator(".case-study-navigation__file")).toHaveCount(9);
      await expect(
        nav.locator(".case-study-navigation__number").first(),
      ).toBeHidden();
    }
    for (const link of await nav.getByRole("link").all()) {
      const href = await link.getAttribute("href");
      await expect(study.locator(href!)).toHaveCount(1);
    }
    await nav.locator('a[href="#continuity"]').click();
    await expect(page).toHaveURL(/#continuity$/);
    await expect(nav.locator('a[href="#continuity"]')).toHaveAttribute(
      "aria-current",
      "location",
    );
    await study
      .locator("#navigation-motion")
      .evaluate((element) =>
        element.scrollIntoView({ block: "start", behavior: "instant" }),
      );
    await expect(nav.locator('a[href="#navigation-motion"]')).toHaveAttribute(
      "aria-current",
      "location",
    );
    await page.screenshot({
      path: `.cache/pilot-reading-${theme}-desktop.png`,
    });
    await page.setViewportSize({ width: 390, height: 844 });
    const disclosure = study.locator(".case-study-navigation__mobile");
    await disclosure.locator("summary").scrollIntoViewIfNeeded();
    await expect(nav).toBeHidden();
    await disclosure.locator("summary").focus();
    await page.keyboard.press("Enter");
    await expect(disclosure).toHaveAttribute("open", "");
    const last = disclosure.locator('a[href="#state"]');
    await last.focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#state$/);
    await expect(disclosure).not.toHaveAttribute("open", "");
    await expect(study.locator("#state")).toBeFocused();
    await disclosure.locator("summary").scrollIntoViewIfNeeded();
    await disclosure.locator("summary").click();
    await page.screenshot({ path: `.cache/pilot-reading-${theme}-mobile.png` });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await disclosure.locator('a[href="#architecture"]').click();
    await expect(page).toHaveURL(/#architecture$/);
    await expect(study.locator("#architecture")).toBeFocused();
    await page.goto("/dev/projects/portfolio?locale=ja");
    await expect(
      study.locator(".case-study-orientation__approach dd"),
    ).toHaveAttribute("lang", "en");
    await expect(
      study.locator(".case-study-orientation__state p"),
    ).toHaveAttribute("lang", "en");
  });
}

test("chapter links and the brief remain usable without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
    baseURL: "http://127.0.0.1:3218",
  });
  const page = await context.newPage();
  await page.goto("/dev/projects/portfolio");
  const disclosure = page.locator(".case-study-navigation__mobile");
  await disclosure.locator("summary").click();
  await disclosure.locator('a[href="#state"]').click();
  await expect(page).toHaveURL(/#state$/);
  await expect(page.locator("#state")).toBeInViewport();
  await expect(page.locator(".case-study-orientation")).toContainText(
    "AI-assisted development",
  );
  await context.close();
});

test("theme switching preserves the narrative position rather than anchoring the sticky index", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/dev/projects/portfolio");
  const section = page.locator(".case-study #navigation-motion");
  await page.evaluate(() => document.fonts.ready);
  await section.evaluate((element) =>
    element.scrollIntoView({ block: "start", behavior: "instant" }),
  );
  await expect(section).toHaveAttribute("data-motion-state", "settled");
  await section.evaluate((element) =>
    scrollTo({
      top: scrollY + element.getBoundingClientRect().top - 120,
      behavior: "instant",
    }),
  );
  const initialTop = await section.evaluate(
    (element) => element.getBoundingClientRect().top,
  );
  for (const theme of ["engineer", "digital", "editorial"]) {
    await page.evaluate((mode) => {
      const picker =
        document.querySelector<HTMLDetailsElement>(".mode-picker")!;
      picker.open = true;
      picker
        .querySelector<HTMLButtonElement>(`[data-theme-option="${mode}"]`)!
        .click();
    }, theme);
    await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
    await expect(page.locator("html")).not.toHaveAttribute(
      "data-theme-transition",
    );
    expect(
      Math.abs(
        (await section.evaluate(
          (element) => element.getBoundingClientRect().top,
        )) - initialTop,
      ),
    ).toBeLessThan(4);
  }
});
