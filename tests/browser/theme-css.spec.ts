import { expect, test, type Page } from "@playwright/test";

async function styleSignature(page: Page) {
  return page.evaluate(() => ({
    mainWidth: Math.round(
      document.querySelector("main")!.getBoundingClientRect().width,
    ),
    overflow: getComputedStyle(document.body).overflow,
    brandFont: getComputedStyle(document.querySelector(".site-brand")!)
      .fontFamily,
    headerBackground: getComputedStyle(document.querySelector(".site-header")!)
      .backgroundImage,
  }));
}

for (const target of ["editorial", "engineer", "digital", "chronicle"]) {
  test(`cold ${target} styles are ready before the morph snapshot`, async ({
    page,
    context,
    browser,
    baseURL,
  }) => {
    const reference = await browser.newContext({
      javaScriptEnabled: false,
      viewport: { width: 1440, height: 900 },
    });
    await reference.addCookies([
      { name: "portfolio-mode", value: target, url: baseURL! },
    ]);
    const referencePage = await reference.newPage();
    await referencePage.goto(`${baseURL}/en`);
    const expected = await styleSignature(referencePage);
    await reference.close();

    await page.setViewportSize({ width: 1440, height: 900 });
    await context.addCookies([
      {
        name: "portfolio-mode",
        value: target === "editorial" ? "chronicle" : "editorial",
        url: baseURL!,
      },
    ]);
    await page.goto("/en");
    await page.evaluate(() => {
      const records: unknown[] = [];
      Object.assign(window, { cssReadySnapshots: records });
      const start = document.startViewTransition.bind(document);
      document.startViewTransition = (update) => {
        const view = start(update);
        void view.ready.then(
          () =>
            records.push({
              mainWidth: Math.round(
                document.querySelector("main")!.getBoundingClientRect().width,
              ),
              overflow: getComputedStyle(document.body).overflow,
              brandFont: getComputedStyle(
                document.querySelector(".site-brand")!,
              ).fontFamily,
              headerBackground: getComputedStyle(
                document.querySelector(".site-header")!,
              ).backgroundImage,
            }),
          () => {},
        );
        return view;
      };
    });
    let delayed = 0;
    await page.route("**/*.css", async (route) => {
      delayed++;
      await new Promise((resolve) => setTimeout(resolve, 700));
      await route.continue();
    });
    await page.locator(".mode-picker:visible > summary").click();
    await page
      .locator(`.mode-picker:visible button[value="${target}"]`)
      .click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", target);
    await expect
      .poll(() =>
        page.evaluate(
          () =>
            (window as unknown as { cssReadySnapshots: unknown[] })
              .cssReadySnapshots.length,
        ),
      )
      .toBe(1);
    expect(
      await page.evaluate(
        () =>
          (window as unknown as { cssReadySnapshots: unknown[] })
            .cssReadySnapshots[0],
      ),
    ).toEqual(expected);
    expect(delayed).toBeGreaterThan(0);
    await expect
      .poll(() => page.locator("html").getAttribute("data-theme-transition"))
      .toBeNull();
    expect(await styleSignature(page)).toEqual(expected);
  });
}
