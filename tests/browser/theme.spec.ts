import { expect, test, type Page } from "@playwright/test";

async function openPresentation(page: Page) {
  const open = await page
    .locator(".mode-picker:visible")
    .evaluate((element: HTMLDetailsElement) => element.open);
  if (!open) await page.locator(".mode-picker:visible > summary").click();
}

test("switching persists across reload, routes and locales without hydration errors", async ({
  page,
  context,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("/en");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "editorial");
  for (const [id, label] of [
    ["engineer", "Engineer"],
    ["digital", "Digital"],
    ["editorial", "Editorial"],
  ]) {
    await openPresentation(page);
    await page.getByRole("button", { name: label, exact: true }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", id);
    await expect(page.locator("[data-composition]")).toHaveAttribute(
      "data-composition",
      id,
    );
    await expect(
      page.getByRole("button", { name: label, exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
    expect(
      (await context.cookies()).find(
        (cookie) => cookie.name === "portfolio-mode",
      )?.value,
    ).toBe(id);
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", id);
  }
  await openPresentation(page);
  await page.getByRole("button", { name: "Engineer", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "engineer");
  await page
    .getByRole("navigation", { name: "Primary", exact: true })
    .getByRole("link", { name: "Work" })
    .click();
  await page
    .getByRole("navigation", { name: "Language", exact: true })
    .getByRole("link", { name: "JP" })
    .click();
  await expect(page).toHaveURL(/\/ja\/work$/);
  await expect(page.locator("html")).toHaveAttribute("data-theme", "engineer");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "engineer");
  expect(errors).toEqual([]);
});

test("saved mode is present in the first HTML with JavaScript disabled", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    baseURL: "http://127.0.0.1:3217",
  });
  await context.addCookies([
    { name: "portfolio-mode", value: "digital", url: "http://127.0.0.1:3217" },
  ]);
  const page = await context.newPage();
  const response = await page.goto("/en");
  expect(await response?.text()).toContain('data-theme="digital"');
  await expect(page.locator("html")).toHaveAttribute("data-theme", "digital");
  expect(
    await page
      .locator("body")
      .evaluate((element) => getComputedStyle(element).backgroundColor),
  ).toBe("rgb(3, 7, 18)");
  await expect(page.locator("[data-composition]")).toHaveAttribute(
    "data-composition",
    "digital",
  );
  // The native server-action form remains usable without client JavaScript.
  await openPresentation(page);
  await page.getByRole("button", { name: "Engineer", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "engineer");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator(".mobile-navigation > summary").click();
  await page
    .getByRole("navigation", { name: "Primary", exact: true })
    .getByRole("link", { name: "Work", exact: true })
    .click();
  await expect(page).toHaveURL(/\/en\/work$/);
  await context.close();
});

test("invalid preference falls back and keyboard switching honors reduced motion", async ({
  page,
  context,
}) => {
  await context.addCookies([
    { name: "portfolio-mode", value: "unknown", url: "http://127.0.0.1:3217" },
  ]);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "editorial");
  await openPresentation(page);
  const engineer = page.getByRole("button", { name: "Engineer", exact: true });
  await engineer.evaluate((button: HTMLButtonElement) => {
    button.value = "unavailable";
  });
  await engineer.click();
  await expect(page.getByRole("status")).toHaveText(
    "Choose an available presentation mode.",
  );
  await expect(page.locator("html")).toHaveAttribute("data-theme", "editorial");
  await engineer.evaluate((button: HTMLButtonElement) => {
    button.value = "engineer";
  });
  await engineer.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "engineer");
  const state = await page.locator("html").evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      fast: style.getPropertyValue("--motion-fast").trim(),
      slow: style.getPropertyValue("--motion-slow").trim(),
      scroll: style.scrollBehavior,
    };
  });
  expect(state).toEqual({ fast: "0ms", slow: "0ms", scroll: "auto" });
});

test("development previews and fixture assets remain unavailable in production", async ({
  request,
}) => {
  for (const path of [
    "/dev/design-system",
    "/dev/compositions",
    "/dev/fixtures/reference.svg",
    "/dev/fixtures/wide.svg",
    "/dev/fixtures/portrait.svg",
    "/dev/compositions?surface=homepage&motion=reduce",
    "/en/work/fixture-system",
    "/dev/projects/portfolio",
  ]) {
    expect((await request.get(path)).status(), path).toBe(404);
  }
});

test("mobile nested controls retain keyboard focus and switch without JavaScript", async ({
  browser,
}) => {
  for (const javaScriptEnabled of [true, false]) {
    const context = await browser.newContext({
      javaScriptEnabled,
      viewport: { width: 320, height: 800 },
      baseURL: "http://127.0.0.1:3217",
    });
    const page = await context.newPage();
    await page.goto("/en");
    await expect(page.locator(".site-controls--desktop")).toBeHidden();
    await expect(page.locator(".site-controls--mobile")).toBeHidden();
    const menu = page.locator(".mobile-navigation > summary");
    await menu.focus();
    await page.keyboard.press("Enter");
    const picker = page.locator(".mode-picker:visible > summary");
    await picker.focus();
    await page.keyboard.press("Enter");
    if (javaScriptEnabled) {
      await page.keyboard.press("Escape");
      await expect(picker).toBeFocused();
      await expect(page.locator(".mobile-navigation")).toHaveAttribute(
        "open",
        "",
      );
      await page.keyboard.press("Enter");
    }
    for (const [mode, label] of [
      ["engineer", "Engineer"],
      ["digital", "Digital"],
    ]) {
      await page.getByRole("button", { name: label, exact: true }).click();
      await expect(page.locator("html")).toHaveAttribute("data-theme", mode);
      if (
        !(await page
          .locator(".mobile-navigation")
          .evaluate((element: HTMLDetailsElement) => element.open))
      )
        await menu.click();
      await openPresentation(page);
    }
    const heights = await page
      .locator(".site-controls--mobile")
      .evaluate((element) => ({
        locale: element
          .querySelector(".locale-switcher")!
          .getBoundingClientRect().height,
        theme: element
          .querySelector(".mode-picker > summary")!
          .getBoundingClientRect().height,
      }));
    expect(heights.locale).toBe(heights.theme);
    await context.close();
  }
});
