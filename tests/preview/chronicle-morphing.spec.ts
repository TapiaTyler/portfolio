import { expect, test, type Page } from "@playwright/test";

/**
 * Theme morphing into and out of Chronicle, held to the same contract as the
 * original modes: shared semantic modules morph, geometry moves, the transition
 * finishes without errors and snapshot names are cleaned up.
 */
interface MorphRecord {
  before: string[];
  after: string[];
  moves: boolean;
  duration: number;
  finished: boolean;
  error?: string;
}
declare global {
  interface Window {
    morphRecords: MorphRecord[];
  }
}

async function observeMorphs(page: Page) {
  await page.addInitScript(() => {
    window.morphRecords = [];
    const named = () =>
      Array.from(document.querySelectorAll<HTMLElement>("[data-motion-id]"))
        .filter((element) => element.style.viewTransitionName)
        .map((element) => element.dataset.motionId!);
    const start = document.startViewTransition.bind(document);
    document.startViewTransition = (update) => {
      const record: MorphRecord = {
        before: named(),
        after: [],
        moves: false,
        duration: 0,
        finished: false,
      };
      window.morphRecords.push(record);
      const view = start(update);
      void view.ready.then(
        () => {
          record.after = named();
          const geometry = document.getAnimations().filter((animation) => {
            const frames = (animation.effect as KeyframeEffect)?.getKeyframes();
            return (
              frames?.length > 1 &&
              ["transform", "width", "height"].some(
                (key) => frames[0][key] !== frames[frames.length - 1][key],
              )
            );
          });
          record.moves = geometry.length > 0;
          record.duration = Math.max(
            0,
            ...geometry.map(
              (animation) =>
                Number(animation.effect?.getComputedTiming().duration) || 0,
            ),
          );
        },
        (error) => (record.error = String(error)),
      );
      void view.finished.then(
        () => (record.finished = true),
        (error) => (record.error = String(error)),
      );
      return view;
    };
  });
}

const labels = {
  editorial: "Editorial",
  engineer: "Engineer",
  digital: "Digital",
  chronicle: "Chronicle",
} as const;
type Mode = keyof typeof labels;

async function switchTo(page: Page, mode: Mode) {
  const picker = page.locator(".mode-picker:visible").first();
  if (!(await picker.evaluate((element: HTMLDetailsElement) => element.open)))
    await picker.locator("summary").click();
  const option = picker.getByRole("button", {
    name: labels[mode],
    exact: true,
  });
  await option.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", mode);
  await expect
    .poll(() => page.evaluate(() => window.morphRecords.at(-1)?.finished))
    .toBe(true);
  const record = await page.evaluate(() => window.morphRecords.at(-1)!);
  // Focus stays with the presentation control rather than dropping to the body.
  expect(
    await page.evaluate(() => document.activeElement?.closest(".mode-picker")),
  ).not.toBeNull();
  await expect(page.locator('[style*="view-transition-name"]')).toHaveCount(0);
  return record;
}

const surfaces = [
  { path: "/en", shared: ["hero-narrative", "work"] },
  { path: "/en/work", shared: ["page-intro"] },
  { path: "/en/about", shared: ["page-intro", "page-body"] },
  { path: "/preview/chronicle", shared: ["hero-narrative", "work"] },
  { path: "/preview/chronicle?surface=work", shared: ["page-intro"] },
  {
    path: "/preview/chronicle?project=portfolio",
    shared: ["case-study-intro"],
  },
];

/** The section's top relative to the reading area that scrolls it (0 = top edge). */
async function readingOffset(page: Page, id: string) {
  return page.evaluate((id) => {
    const section = document.getElementById(id)!;
    let scroller: HTMLElement | null = section.parentElement;
    while (
      scroller &&
      !(
        /(auto|scroll)/.test(getComputedStyle(scroller).overflowY) &&
        scroller.scrollHeight > scroller.clientHeight + 2
      )
    )
      scroller = scroller.parentElement;
    const top = scroller ? scroller.getBoundingClientRect().top : 0;
    const height = scroller ? scroller.clientHeight : innerHeight;
    return (section.getBoundingClientRect().top - top) / height;
  }, id);
}

for (const other of ["editorial", "engineer", "digital"] as const) {
  test(`a deep case-study section keeps its place between ${other} and Chronicle`, async ({
    page,
    context,
  }) => {
    await observeMorphs(page);
    await page.setViewportSize({ width: 1440, height: 900 });
    await context.addCookies([
      { name: "portfolio-mode", value: other, url: "http://127.0.0.1:3218" },
    ]);
    await page.goto("/preview/chronicle?project=portfolio");
    await page.evaluate(() => document.fonts.ready);
    const section = "chronicle";
    // Place the section at the reading line, just below the sticky header.
    await page.evaluate((id) => {
      const top = document.getElementById(id)!.getBoundingClientRect().top;
      scrollTo({ top: scrollY + top - 120, behavior: "instant" });
    }, section);
    for (const target of ["chronicle", other] as const) {
      await switchTo(page, target);
      const offset = await readingOffset(page, section);
      expect(offset, `${other} → ${target}`).toBeGreaterThan(-0.15);
      expect(offset, `${other} → ${target}`).toBeLessThan(0.45);
    }
  });

  test(`Chronicle morphs to and from ${other} on every surface`, async ({
    page,
    context,
  }) => {
    test.setTimeout(120_000);
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await observeMorphs(page);
    await page.setViewportSize({ width: 1440, height: 900 });
    for (const { path, shared } of surfaces) {
      await context.addCookies([
        { name: "portfolio-mode", value: other, url: "http://127.0.0.1:3218" },
      ]);
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);
      for (const target of ["chronicle", other] as const) {
        const record = await switchTo(page, target);
        const morphed = record.after.filter((id) => record.before.includes(id));
        expect(record.error, `${path} → ${target}`).toBeUndefined();
        expect(record.moves, `${path} → ${target} moves`).toBe(true);
        expect(morphed, `${path} → ${target} shared modules`).toEqual(
          expect.arrayContaining(["site-navigation", ...shared]),
        );
        if (target === "chronicle")
          expect(record.duration, `${path} → chronicle timing`).toBe(620);
      }
    }
    expect(errors).toEqual([]);
  });
}
