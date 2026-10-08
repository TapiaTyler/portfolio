import { chromium } from "@playwright/test";
import {
  mkdir,
  readFile,
  writeFile,
  copyFile,
  readdir,
} from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";

// Run against an already-running preview server; no server processes are stopped.
const base =
  process.argv.find((arg) => /^http/.test(arg)) ?? "http://127.0.0.1:3218";
const output = path.resolve("public/media/projects/portfolio");
const stage = path.resolve(".cache/portfolio-evidence-refresh");
const archive = path.resolve(
  "docs/projects/portfolio/evidence/pre-ink-refresh",
);
const dated = (file) => file.replace(/\.(png|webm)$/, "-2026-10-07.$1");
const stamp = () => new Date().toISOString();
await mkdir(stage, { recursive: true });
await mkdir(archive, { recursive: true });
// Preserve once, including the old manifest, before overwriting public evidence.
try {
  await readFile(path.join(archive, "archive-manifest.json"));
} catch (error) {
  if (error.code !== "ENOENT") throw error;
  const files = [];
  for (const file of await readdir(output)) {
    if (!/\.(png|webm|json)$/.test(file)) continue;
    const bytes = await readFile(path.join(output, file));
    await copyFile(path.join(output, file), path.join(archive, file));
    files.push({
      file,
      sha256: createHash("sha256").update(bytes).digest("hex"),
    });
  }
  await writeFile(
    path.join(archive, "archive-manifest.json"),
    JSON.stringify(
      {
        archivedAt: stamp(),
        sourceRevision: "d883935",
        files,
        note: "Unmodified public evidence before the ink-era refresh; original capture dates remain in capture-manifest.json.",
      },
      null,
      2,
    ) + "\n",
  );
}

const entries = [];
const browser = await chromium.launch();
const modes = ["editorial", "engineer", "digital", "chronicle"];
async function contextFor(mode, record = false, width = 1440, height = 1000) {
  const context = await browser.newContext({
    viewport: { width, height },
    reducedMotion: record ? "no-preference" : "reduce",
    ...(record ? { recordVideo: { dir: stage, size: { width, height } } } : {}),
  });
  await context.addCookies([
    { name: "portfolio-mode", value: mode, url: base },
  ]);
  // Hide a previously explained coach mark for clean stills; normal interactions remain live.
  await context.addInitScript(() =>
    localStorage.setItem("chronicle-hints-dismissed", "1"),
  );
  return context;
}
async function settle(page) {
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({ content: "nextjs-portal{display:none!important}" });
  await page.waitForTimeout(1100);
  await page.evaluate(async () => {
    const visible = [...document.images].filter((image) => {
      const r = image.getBoundingClientRect();
      return r.bottom > 0 && r.top < innerHeight;
    });
    await Promise.all(visible.map((image) => image.decode().catch(() => {})));
  });
}
async function phase(page, text) {
  await page.evaluate((text) => {
    let label = document.getElementById("capture-phase");
    if (!label) {
      label = document.createElement("div");
      label.id = "capture-phase";
      label.setAttribute("aria-hidden", "true");
      Object.assign(label.style, {
        position: "fixed",
        bottom: "12px",
        left: "12px",
        zIndex: "99999",
        padding: "8px 12px",
        background: "#10151f",
        color: "white",
        font: "12px monospace",
        pointerEvents: "none",
        border: "1px solid #8993a5",
      });
      document.body.append(label);
    }
    label.textContent = text;
  }, text);
}
async function switchMode(page, mode) {
  const picker = page.locator(".site-controls--desktop .mode-picker");
  if (!(await picker.evaluate((el) => el.open)))
    await picker.locator("summary").click();
  await picker.locator(`[data-theme-option="${mode}"]`).click();
  await page.waitForFunction(
    (mode) => document.documentElement.dataset.theme === mode,
    mode,
  );
  await page.waitForFunction(
    () => !document.documentElement.dataset.themeTransition,
  );
  await page.keyboard.press("Escape");
  await page.waitForTimeout(1400);
}
async function still(mode, route, file, width = 1440, height = 1000) {
  file = dated(file);
  const context = await contextFor(mode, false, width, height);
  try {
    const page = await context.newPage();
    await page.goto(base + route);
    await settle(page);
    await page.screenshot({ path: path.join(stage, file) });
    await copyFile(path.join(stage, file), path.join(output, file));
    entries.push({
      file,
      provenance: "live",
      capturedAt: stamp(),
      route,
      mode,
      width,
      height,
      motion: "reduced for stable capture",
      contentState:
        "published Nihonest, Portfolio and Japan Travel Planner; current About and Editorial ink treatment",
      note: "Coach mark dismissed and Next development badge hidden for capture; product layout unchanged.",
    });
    console.log(`Captured ${file}`);
  } finally {
    await context.close();
  }
}
async function record(name, mode, sequence, action) {
  const context = await contextFor(mode, true);
  const page = await context.newPage();
  const video = page.video();
  try {
    await action(page);
    await context.close();
    await copyFile(
      await video.path(),
      path.join(output, dated(`${name}.webm`)),
    );
    entries.push(
      ...["webm", "png"].map((ext) => ({
        file: dated(`${name}.${ext}`),
        provenance: ext === "webm" ? "live recording" : "live poster",
        capturedAt: stamp(),
        width: 1440,
        height: 1000,
        sequence,
        note: "Unedited silent local recording; capture-only phase labels and hidden Next badge; not a benchmark.",
      })),
    );
    console.log(`Recorded ${name}`);
  } finally {
    await context.close();
  }
}
async function poster(page, name) {
  await page.screenshot({ path: path.join(output, dated(`${name}.png`)) });
}

try {
  if (
    !process.argv.includes("--remaining") &&
    !process.argv.includes("--disclosure")
  ) {
    // Publish the new preview first so later captures display its current thumbnail.
    for (const mode of modes) await still(mode, "/en", `${mode}-home.png`);
    await still("chronicle", "/en", "chronicle-landscape-home.png", 844, 390);
    await still("chronicle", "/en", "chronicle-portrait-home.png", 390, 844);
    await still("chronicle", "/en/work/portfolio", "chronicle-case-study.png");
    await still(
      "chronicle",
      "/en/work/portfolio",
      "chronicle-case-study-landscape.png",
      844,
      390,
    );

    await record(
      "theme-morphing",
      "editorial",
      [...modes, "editorial"],
      async (page) => {
        await page.goto(base + "/en");
        await settle(page);
        await phase(
          page,
          "LIVE LOCAL / Editorial · ink landscape and published projects",
        );
        await poster(page, "theme-morphing");
        await page.waitForTimeout(1800);
        for (const mode of [...modes.slice(1), "editorial"]) {
          await phase(
            page,
            `LIVE LOCAL / Switch to ${mode} · shared modules move and resize`,
          );
          await switchMode(page, mode);
          await page.waitForTimeout(1600);
        }
      },
    );

    await record(
      "chronicle-interactions",
      "editorial",
      [
        "Editorial to Chronicle",
        "select and arm Japan Travel Planner",
        "second tap opens banner",
        "chapter navigation",
        "crystal image opening",
        "browser Back",
      ],
      async (page) => {
        await page.goto(base + "/en");
        await settle(page);
        await phase(page, "LIVE LOCAL / Editorial → Chronicle · theme morph");
        await switchMode(page, "chronicle");
        await poster(page, "chronicle-interactions");
        const item = page.locator(".chronicle-selection__item").filter({
          has: page.locator('a[href="/en/work/japan-travel-planner"]'),
        });
        const target = item.locator(".chronicle-selection__card-target");
        await phase(
          page,
          "LIVE LOCAL / First tap selects and arms Japan Travel Planner",
        );
        await target.click({ position: { x: 35, y: 35 } });
        await page.waitForTimeout(1600);
        await phase(
          page,
          "LIVE LOCAL / Second tap opens the project from its card",
        );
        await target.click({ position: { x: 35, y: 35 } });
        await page.waitForURL("**/en/work/japan-travel-planner");
        await settle(page);
        await phase(page, "LIVE LOCAL / Chapter rail selects What was built");
        await page
          .locator('.case-study-navigation__desktop a[href$="#intro-product"]')
          .click();
        await page.waitForTimeout(1600);
        await phase(
          page,
          "LIVE LOCAL / View Image · crystal opening and close",
        );
        const trigger = page.locator(".case-study .media-view-trigger").first();
        await trigger.scrollIntoViewIfNeeded();
        await trigger.click();
        await page.waitForTimeout(1800);
        await page.keyboard.press("Escape");
        await page.waitForTimeout(1000);
        await phase(
          page,
          "LIVE LOCAL / Browser Back returns the banner to its card",
        );
        for (let i = 0; i < 6 && !/\/en$/.test(page.url()); i++) {
          await page.goBack();
          await page.waitForTimeout(700);
        }
        await page.waitForURL(/\/en$/);
        await page.waitForTimeout(1800);
      },
    );
  }
  if (!process.argv.includes("--disclosure")) {
    await record(
      "route-transitions",
      "editorial",
      modes.map((mode) => `${mode} header navigation and browser Back`),
      async (page) => {
        await page.goto(base + "/en");
        await settle(page);
        await phase(
          page,
          "LIVE LOCAL / Editorial · top-bound header page turn",
        );
        await poster(page, "route-transitions");
        for (const mode of modes) {
          if (mode !== "editorial") await switchMode(page, mode);
          await phase(
            page,
            `LIVE LOCAL / ${mode} · About navigation and browser Back`,
          );
          await page.locator('.site-nav a[href="/en/about"]:visible').click();
          await page.waitForURL("**/en/about");
          await settle(page);
          await page.waitForTimeout(900);
          await page.goBack();
          await page.waitForURL(/\/en$/);
          await settle(page);
        }
      },
    );
  }
  await record(
    "disclosure-interactions",
    "editorial",
    modes.map((mode) => `${mode} Engineering details open and close`),
    async (page) => {
      for (const mode of modes) {
        // Navigate directly to the current disclosure, avoiding capture of a video inside itself.
        await contextCookie(page, mode);
        await page.goto(base + "/en/work/portfolio#engineering-details");
        await page.reload();
        await page.waitForFunction(
          (mode) => document.documentElement.dataset.theme === mode,
          mode,
        );
        await settle(page);
        const section = page.locator("#engineering-details");
        await section.scrollIntoViewIfNeeded();
        await page.waitForTimeout(800);
        await phase(
          page,
          `LIVE LOCAL / ${mode} · Engineering details opens and closes`,
        );
        if (mode === "editorial") await poster(page, "disclosure-interactions");
        await section.locator("summary").click();
        await page.waitForTimeout(2200);
        await section.locator("summary").click();
        await page.waitForTimeout(1600);
      }
    },
  );
} finally {
  await browser.close();
  // Save completed captures even if an interaction fails; reruns are safe and retain the archive.
  const file = path.join(output, "capture-manifest.json");
  const manifest = JSON.parse(await readFile(file, "utf8"));
  const replaced = new Set(entries.map((entry) => entry.file));
  manifest.captures = [
    ...manifest.captures.filter((entry) => !replaced.has(entry.file)),
    ...entries,
  ];
  manifest.updatedAt = stamp();
  await writeFile(file, JSON.stringify(manifest, null, 2) + "\n");
}
async function contextCookie(page, mode) {
  await page
    .context()
    .addCookies([{ name: "portfolio-mode", value: mode, url: base }]);
}
