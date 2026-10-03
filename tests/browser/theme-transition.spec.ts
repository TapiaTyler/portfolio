import { expect, test, type Page } from "@playwright/test";

interface TransitionRecord {
  names: string[];
  moves: boolean;
  finished: boolean;
  error?: string;
}
declare global {
  interface Window {
    transitionRecords: TransitionRecord[];
  }
}

async function observeTransitions(page: Page) {
  await page.addInitScript(() => {
    window.transitionRecords = [];
    const start = document.startViewTransition.bind(document);
    document.startViewTransition = (update) => {
      const record: TransitionRecord = {
        names: [],
        moves: false,
        finished: false,
      };
      window.transitionRecords.push(record);
      const view = start(update);
      void view.ready.then(
        () => {
          record.names = Array.from(
            document.querySelectorAll<HTMLElement>("[data-motion-id]"),
          )
            .filter((element) => element.style.viewTransitionName)
            .map((element) => element.dataset.motionId!);
          record.moves = document.getAnimations().some((animation) => {
            const frames = (animation.effect as KeyframeEffect)?.getKeyframes();
            return (
              frames?.length > 1 &&
              ["transform", "width", "height"].some(
                (key) => frames[0][key] !== frames[frames.length - 1][key],
              )
            );
          });
        },
        (error) => {
          record.error = String(error);
        },
      );
      void view.finished.then(
        () => {
          record.finished = true;
        },
        (error) => {
          record.error = String(error);
        },
      );
      return view;
    };
  });
}

async function select(page: Page, label: string) {
  const picker = page.locator(".mode-picker:visible");
  if (!(await picker.evaluate((element: HTMLDetailsElement) => element.open)))
    await picker.locator("summary").click();
  await page.getByRole("button", { name: label, exact: true }).click();
}

test("secondary pages morph their semantic modules in both locales", async ({
  page,
}) => {
  test.setTimeout(60_000);
  await observeTransitions(page);
  for (const locale of ["en", "ja"]) {
    for (const route of ["work", "about", "lab", "contact"]) {
      await page.goto(`/${locale}/${route}`);
      await page.evaluate(() => document.fonts.ready);
      const current = await page.locator("html").getAttribute("data-theme");
      const target = current === "engineer" ? "digital" : "engineer";
      await select(page, target === "digital" ? "Digital" : "Engineer");
      await expect
        .poll(() =>
          page.evaluate(() => window.transitionRecords.at(-1)?.finished),
        )
        .toBe(true);
      const record = await page.evaluate(() =>
        window.transitionRecords.at(-1)!,
      );
      expect(record.error).toBeUndefined();
      expect(record.names).toContain("page-intro");
      expect(record.names).toContain("site-navigation");
      expect(record.moves).toBe(true);
      await expect(page.locator('[style*="view-transition-name"]')).toHaveCount(
        0,
      );
      await expect(page).toHaveURL(new RegExp(`/${locale}/${route}$`));
    }
  }
});

test("theme changes animate matching geometry, retain focus and clean snapshot names", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await observeTransitions(page);
  await page.goto("/en");
  await page.evaluate(() => document.fonts.ready);
  for (const [index, mode, label] of [
    [0, "engineer", "Engineer"],
    [1, "digital", "Digital"],
    [2, "editorial", "Editorial"],
  ] as const) {
    await select(page, label);
    await expect(page.locator("html")).toHaveAttribute("data-theme", mode);
    await expect
      .poll(() =>
        page.evaluate(
          (index) => window.transitionRecords[index]?.finished,
          index,
        ),
      )
      .toBe(true);
    const record = await page.evaluate(
      (index) => window.transitionRecords[index],
      index,
    );
    expect(record.error).toBeUndefined();
    expect(record.names).toContain("hero-narrative");
    expect(record.names).toContain("hero-visual");
    expect(record.moves).toBe(true);
    await expect(
      page.getByRole("button", { name: label, exact: true }),
    ).toBeFocused();
    await expect(page.locator("html")).not.toHaveAttribute(
      "data-theme-transition",
    );
    expect(
      await page
        .locator("[data-motion-id]")
        .evaluateAll((elements) =>
          elements.every(
            (element) => !(element as HTMLElement).style.viewTransitionName,
          ),
        ),
    ).toBe(true);
  }
  expect(errors).toEqual([]);
});

test("a new selection interrupts an active animation and mobile controls stay usable", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await observeTransitions(page);
  await page.goto("/en");
  await page.locator(".mobile-navigation > summary").click();
  await select(page, "Digital");
  await expect(page.locator("html")).toHaveAttribute(
    "data-theme-transition",
    "animating",
  );
  const navigationLayer = await page
    .locator("html")
    .evaluate(
      (element) =>
        getComputedStyle(
          element,
          "::view-transition-group(module-site-navigation)",
        ).zIndex,
    );
  expect(navigationLayer).toBe("100");
  await select(page, "Engineer");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "engineer");
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          window.transitionRecords.length === 2 &&
          window.transitionRecords.every((record) => record.finished),
      ),
    )
    .toBe(true);
  await expect(page.locator("html")).not.toHaveAttribute(
    "data-theme-transition",
  );
  await page.keyboard.press("Escape");
  await expect(page.locator(".mode-picker:visible > summary")).toBeFocused();
});

test("reduced motion and unavailable transition API preserve immediate switching", async ({
  page,
}) => {
  await observeTransitions(page);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en");
  await select(page, "Engineer");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "engineer");
  expect(await page.evaluate(() => window.transitionRecords.length)).toBe(0);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.evaluate(() => {
    Object.defineProperty(document, "startViewTransition", {
      value: undefined,
      configurable: true,
    });
  });
  await select(page, "Digital");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "digital");
  await expect(page.locator("html")).not.toHaveAttribute(
    "data-theme-transition",
  );
});

test("slow server response releases snapshots without losing the requested mode", async ({
  page,
}) => {
  await page.route("**/en", async (route) => {
    if (route.request().method() === "POST")
      await new Promise((resolve) => setTimeout(resolve, 1900));
    await route.continue();
  });
  await page.goto("/en");
  await select(page, "Digital");
  await expect(page.locator("html")).toHaveAttribute(
    "data-theme-transition",
    "pending",
  );
  await expect(page.locator("html")).not.toHaveAttribute(
    "data-theme-transition",
    { timeout: 1800 },
  );
  await expect(page.locator("html")).toHaveAttribute("data-theme", "digital");
  await expect(
    page.getByRole("button", { name: "Digital", exact: true }),
  ).toBeEnabled();
});

test("switching while reading keeps the corresponding section at the same viewport position", async ({
  page,
}) => {
  await observeTransitions(page);
  await page.goto("/en");
  await page.evaluate(() => document.fonts.ready);
  await page.locator('[data-motion-id="capabilities"]').evaluate((element) => {
    scrollTo({
      top: scrollY + element.getBoundingClientRect().top - 120,
      behavior: "instant",
    });
  });
  const top = await page
    .locator('[data-motion-id="capabilities"]')
    .evaluate((element) => element.getBoundingClientRect().top);
  for (const [index, label] of [
    [0, "Engineer"],
    [1, "Digital"],
    [2, "Editorial"],
  ] as const) {
    await select(page, label);
    await expect
      .poll(() =>
        page.evaluate(
          (index) => window.transitionRecords[index]?.finished,
          index,
        ),
      )
      .toBe(true);
    const record = await page.evaluate(
      (index) => window.transitionRecords[index],
      index,
    );
    expect(record.error).toBeUndefined();
    expect(record.names).toContain("capabilities");
    const after = await page
      .locator('[data-motion-id="capabilities"]')
      .evaluate((element) => element.getBoundingClientRect().top);
    expect(Math.abs(after - top)).toBeLessThan(3);
  }
});

test("route navigation cancels an active snapshot animation", async ({
  page,
}) => {
  await page.goto("/en");
  await select(page, "Digital");
  await expect(page.locator("html")).toHaveAttribute(
    "data-theme-transition",
    "animating",
  );
  await page
    .getByRole("navigation", { name: "Primary", exact: true })
    .getByRole("link", { name: "Work", exact: true })
    .click();
  await expect(page).toHaveURL(/\/en\/work$/);
  await expect(page.locator("html")).not.toHaveAttribute(
    "data-theme-transition",
  );
  await expect(
    page.getByRole("heading", { name: "Work", exact: true }),
  ).toBeVisible();
});
