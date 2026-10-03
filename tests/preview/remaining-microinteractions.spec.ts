import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Editorial image framing responds to hover/focus and long stories show real reading progress", async ({
  page,
  context,
}) => {
  await context.addCookies([
    {
      name: "portfolio-mode",
      value: "editorial",
      url: "http://127.0.0.1:3218",
    },
  ]);
  await page.goto("/dev/compositions?surface=homepage");
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto";
  });
  const project = page
    .locator(".editorial-project")
    .filter({ has: page.locator("img") });
  await project.getByRole("heading").getByRole("link").focus();
  await expect(project.locator("img")).toHaveCSS("translate", "2px");
  await expect(project.locator("figcaption")).toHaveCSS("translate", "3px");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(project.locator("img")).toHaveCSS("translate", "0px");
  await page.goto("/dev/compositions?surface=project&project=fixture-system");
  const progress = page.locator(".reading-progress");
  await expect(progress).toHaveAttribute("aria-hidden", "true");
  await page.locator(".case-study").evaluate((element) =>
    scrollTo({
      top: scrollY + element.getBoundingClientRect().top,
      behavior: "instant",
    }),
  );
  await expect(progress).toBeVisible();
  await expect(progress).toHaveAttribute("data-reading-progress", "0");
  await page.locator("#technical").evaluate((element) =>
    scrollTo({
      top: scrollY + element.getBoundingClientRect().top - 100,
      behavior: "instant",
    }),
  );
  await expect(progress).toContainText("Fixture code");
  await expect
    .poll(() => progress.getAttribute("data-reading-progress").then(Number))
    .toBeGreaterThan(0);
  await expect(progress.locator(".reading-progress__fill")).toHaveCSS(
    "transition-duration",
    "0s",
  );
  await page.locator(".case-study").evaluate((element) =>
    scrollTo({
      top: scrollY + element.getBoundingClientRect().bottom - innerHeight,
      behavior: "instant",
    }),
  );
  await expect
    .poll(() => progress.getAttribute("data-reading-progress").then(Number))
    .toBeGreaterThanOrEqual(95);
});

test("Engineer inspects only actual connections and copies the full snippet with honest failure feedback", async ({
  page,
  context,
}) => {
  await context.addCookies([
    { name: "portfolio-mode", value: "engineer", url: "http://127.0.0.1:3218" },
  ]);
  await page.addInitScript(() =>
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async (value: string) => {
          if (Reflect.get(window, "clipboardFailure"))
            throw new Error("Unavailable");
          Reflect.set(window, "copiedSnippet", value);
        },
      },
    }),
  );
  await page.goto("/dev/compositions?surface=project&project=fixture-system");
  const diagram = page.locator(".architecture-display").first();
  const input = diagram.getByRole("button", {
    name: "Inspect connections for Input",
    exact: true,
  });
  await input.focus();
  await expect(diagram.locator('[data-node-id="validation"]')).toHaveAttribute(
    "data-connection-state",
    "related",
  );
  await expect(diagram.locator('[data-node-id="output"]')).toHaveAttribute(
    "data-connection-state",
    "muted",
  );
  await expect(
    diagram.locator('[data-connection-from="validation"]'),
  ).toHaveAttribute("data-connection-state", "muted");
  await page.keyboard.press("Enter");
  await expect(input).toHaveAttribute("aria-pressed", "true");
  await page.keyboard.press("Escape");
  await expect(input).toHaveAttribute("aria-pressed", "false");
  await expect(diagram.locator('[data-node-id="output"]')).toHaveAttribute(
    "data-connection-state",
    "idle",
  );
  await diagram
    .getByRole("button", {
      name: "Inspect connections for Validation",
      exact: true,
    })
    .focus();
  await expect(diagram.locator('[data-connection-state="muted"]')).toHaveCount(
    0,
  );
  await page.locator(".case-study summary").click();
  const copy = page.getByRole("button", { name: "Copy code sample" });
  const code = await page.locator(".code-snippet code").textContent();
  await copy.click();
  expect(await page.evaluate(() => Reflect.get(window, "copiedSnippet"))).toBe(
    code,
  );
  await expect(copy).toHaveText("Copied");
  await page.evaluate(() => Reflect.set(window, "clipboardFailure", true));
  await copy.click();
  await expect(copy).toHaveText("Copy unavailable");
  await expect(page.locator(".code-snippet [role=status]")).toContainText(
    "Select the code sample",
  );
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(results.violations).toEqual([]);
});

test("Engineer record presses brighten the surface and release without adding a rail", async ({
  page,
  context,
}) => {
  await context.addCookies([
    { name: "portfolio-mode", value: "engineer", url: "http://127.0.0.1:3218" },
  ]);
  await page.goto("/dev/compositions?surface=homepage");
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto";
  });
  const record = page.locator(".engineer-project").first();
  const link = record.getByRole("link", { name: "Explore the project" });
  await link.hover();
  await page.mouse.down();
  await expect(record).toHaveAttribute("data-record-pressed", "");
  await expect(record).toHaveCSS("filter", "brightness(1.12)");
  await expect(record).toHaveCSS("box-shadow", "none");
  await page.mouse.move(0, 0);
  await page.mouse.up();
  await expect(record).not.toHaveAttribute("data-record-pressed");
});

test("Digital image viewer expands cached media, traps focus, contracts on Escape and supports reduced motion/mobile", async ({
  page,
  context,
}) => {
  await context.addCookies([
    { name: "portfolio-mode", value: "digital", url: "http://127.0.0.1:3218" },
  ]);
  await page.goto("/dev/compositions?surface=project&project=fixture-visual");
  const frame = page.locator(".case-study .media-frame").first();
  const trigger = frame.getByRole("button", { name: /^View image:/ });
  await frame.scrollIntoViewIfNeeded();
  await expect(trigger).toBeVisible();
  const source = await frame
    .locator("img")
    .evaluate((image) => (image as HTMLImageElement).currentSrc);
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Project image gallery" });
  await expect(dialog).toBeVisible();
  await expect(
    dialog.getByRole("button", { name: "Close gallery" }),
  ).toBeFocused();
  expect(await dialog.locator("img").getAttribute("src")).toBe(source);
  await page.keyboard.press("Tab");
  await expect(
    dialog.getByRole("button", { name: "Previous image" }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(
    dialog.getByRole("button", { name: "Next image" }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(
    dialog.getByRole("button", { name: "Close gallery" }),
  ).toBeFocused();
  await dialog
    .locator("img")
    .evaluate((element) =>
      element.getAnimations().forEach((animation) => animation.finish()),
    );
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(results.violations).toEqual([]);
  await page.screenshot({ path: ".cache/digital-media-viewer.png" });
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await expect(page.locator("html")).not.toHaveCSS("overflow", "hidden");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await trigger.click();
  await expect(dialog).toBeVisible();
  expect(
    await dialog
      .locator("img")
      .evaluate((element) => element.getAnimations().length),
  ).toBe(0);
  const box = (await dialog.boundingBox())!;
  expect(box.width).toBeLessThanOrEqual(390);
  expect(box.height).toBeLessThanOrEqual(844);
  const imageBox = (await dialog.locator("img").boundingBox())!;
  expect(imageBox.x).toBeGreaterThanOrEqual(box.x);
  expect(imageBox.x + imageBox.width).toBeLessThanOrEqual(box.x + box.width);
  expect(imageBox.width / imageBox.height).toBeCloseTo(800 / 500, 1);
  await page.screenshot({ path: ".cache/digital-media-viewer-mobile.png" });
  await expect(dialog.getByRole("status")).toHaveText("Image 1 of 3");
  await page.keyboard.press("ArrowRight");
  await expect(dialog.getByRole("status")).toHaveText("Image 2 of 3");
  await dialog.getByRole("button", { name: "Next image" }).click();
  await expect(dialog.getByRole("status")).toHaveText("Image 3 of 3");
  const portrait = page
    .locator('.case-study .media-frame[data-media-aspect="portrait"]')
    .first();
  await expect(dialog.locator("img")).toHaveAttribute(
    "src",
    await portrait
      .locator("img")
      .evaluate((image) => (image as HTMLImageElement).src),
  );
  await page.screenshot({ path: ".cache/digital-gallery-portrait.png" });
  await dialog.getByRole("button", { name: "Close gallery" }).click();
  await expect(dialog).toHaveCount(0);
  await expect(
    portrait.getByRole("button", { name: /^View image:/ }),
  ).toBeFocused();
  await expect(portrait).toBeInViewport();
  await page.screenshot({
    path: ".cache/digital-media-layout-mobile.png",
    fullPage: true,
  });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.screenshot({
    path: ".cache/digital-media-layout.png",
    fullPage: true,
  });
});

test("Digital gallery contracts into the last browsed frame and varies page image widths", async ({
  page,
  context,
}) => {
  await context.addCookies([
    { name: "portfolio-mode", value: "digital", url: "http://127.0.0.1:3218" },
  ]);
  await page.goto("/dev/compositions?surface=project&project=fixture-visual");
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto";
  });
  const frames = page.locator(".case-study .media-frame");
  const intro = frames.first();
  await intro.getByRole("button", { name: /^View image:/ }).click();
  const dialog = page.getByRole("dialog", { name: "Project image gallery" });
  await dialog
    .locator("img")
    .evaluate((image) =>
      image.getAnimations().forEach((animation) => animation.finish()),
    );
  await page.keyboard.press("ArrowLeft");
  await expect(dialog.getByRole("status")).toHaveText("Image 3 of 3");
  await dialog
    .locator("img")
    .evaluate((image) =>
      image.getAnimations().forEach((animation) => animation.finish()),
    );
  await dialog.getByRole("button", { name: "Close gallery" }).click();
  const closing = await dialog.locator("img").evaluate((image) => {
    const animation = image
      .getAnimations()
      .find((animation) => animation.effect?.getTiming().duration === 360);
    animation?.pause();
    return !!animation;
  });
  expect(closing).toBe(true);
  const portrait = page
    .locator('.case-study .media-frame[data-media-aspect="portrait"]')
    .first();
  await expect(portrait).toBeInViewport();
  await dialog
    .locator("img")
    .evaluate((image) =>
      image.getAnimations().forEach((animation) => animation.finish()),
    );
  await expect(dialog).toHaveCount(0);
  await expect(
    portrait.getByRole("button", { name: /^View image:/ }),
  ).toBeFocused();
  const introWidth = (await intro.boundingBox())!.width;
  const portraitWidth = (await portrait.boundingBox())!.width;
  expect(portraitWidth).toBeLessThan(introWidth);
  expect(introWidth).toBeLessThan(
    (await page.locator(".case-study").boundingBox())!.width * 0.8,
  );
});

test("Digital contextual labels accompany the native pointer only on actionable project links", async ({
  page,
  context,
}) => {
  await context.addCookies([
    { name: "portfolio-mode", value: "digital", url: "http://127.0.0.1:3218" },
  ]);
  await page.goto("/dev/compositions?surface=homepage");
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto";
  });
  const link = page
    .locator(".digital-project")
    .first()
    .getByRole("link", { name: "Explore the project" });
  await link.hover();
  await expect(page.locator(".project-pointer-label")).toBeVisible();
  await expect(page.locator(".project-pointer-label")).toHaveCSS(
    "position",
    "fixed",
  );
  await expect(link).not.toHaveCSS("cursor", "none");
  await expect(page.locator(".project-pointer-label")).toHaveAttribute(
    "aria-hidden",
    "true",
  );
  await link.focus();
  await expect(page.locator(".project-pointer-label")).toBeHidden();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await link.hover();
  await expect(page.locator(".project-pointer-label")).toBeHidden();
});
