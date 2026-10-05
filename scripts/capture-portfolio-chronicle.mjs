import { chromium } from "@playwright/test";
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

// Chronicle before/after evidence for the portfolio case study, plus current
// homepage captures of all four modes. Runs against an already-running server
// (a second dev server cannot start beside the usual one):
//   node scripts/capture-portfolio-chronicle.mjs --base http://localhost:3000
// "Before" images are unmodified copies of the first build's public-homepage
// captures in docs/projects/portfolio/evidence/chronicle-initial (no projects were
// published then); nothing is reconstructed.
const baseFlag = process.argv.indexOf("--base");
const base =
  baseFlag > 0 ? process.argv[baseFlag + 1] : "http://localhost:3000";
const output = path.resolve("public/media/projects/portfolio");
const initial = path.resolve(
  "docs/projects/portfolio/evidence/chronicle-initial",
);
const recordings = path.resolve(".cache/chronicle-recordings");
await mkdir(recordings, { recursive: true });
const captures = [];
const now = () => new Date().toISOString();

// 1. Before: unmodified copies of the first build's public homepage.
for (const [source, file, width, height] of [
  ["header-desktop.png", "chronicle-before-home.png", 1440, 900],
  ["header-mobile.png", "chronicle-before-mobile.png", 390, 844],
]) {
  await copyFile(path.join(initial, source), path.join(output, file));
  captures.push({
    file,
    provenance: "initial capture",
    source: `docs/projects/portfolio/evidence/chronicle-initial/${source}`,
    capturedAt: "2026-10-03T19:40:16.998Z",
    route: "/en",
    width,
    height,
    note: "First Chronicle build on the public homepage; no projects were published yet. Unmodified copy of the original capture.",
  });
}

const browser = await chromium.launch();
async function settle(page) {
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({
    content:
      "nextjs-portal { display: none !important; } html { scroll-behavior: auto; }",
  });
  await page.waitForTimeout(1200);
}

// 2. After: stable frames use reduced motion, like the initial archive.
const stills = [
  ["editorial", "/en", 1440, 1000, "editorial-home.png"],
  ["engineer", "/en", 1440, 1000, "engineer-home.png"],
  ["digital", "/en", 1440, 1000, "digital-home.png"],
  ["chronicle", "/en", 1440, 1000, "chronicle-home.png"],
  ["chronicle", "/en", 844, 390, "chronicle-landscape-home.png"],
  ["chronicle", "/en", 390, 844, "chronicle-portrait-home.png"],
  ["chronicle", "/en/work/portfolio", 1440, 1000, "chronicle-case-study.png"],
  [
    "chronicle",
    "/en/work/portfolio",
    844,
    390,
    "chronicle-case-study-landscape.png",
  ],
];
for (const [mode, route, width, height, file] of stills) {
  const context = await browser.newContext({
    viewport: { width, height },
    reducedMotion: "reduce",
  });
  await context.addCookies([
    { name: "portfolio-mode", value: mode, url: base },
  ]);
  const page = await context.newPage();
  await page.goto(base + route);
  await settle(page);
  await page.screenshot({ path: path.join(output, file) });
  captures.push({
    file,
    provenance: "live",
    capturedAt: now(),
    route,
    mode,
    width,
    height,
    motion: "reduced for stable capture",
    contentState: "published portfolio and Japan Travel Planner records",
  });
  await context.close();
  process.stdout.write(`Captured ${file}\n`);
}

// 3. One unedited recording of Chronicle's signature interactions.
async function label(page, text) {
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
        color: "#fff",
        font: "12px monospace",
        pointerEvents: "none",
        border: "1px solid #8993a5",
      });
      document.body.append(label);
    }
    label.textContent = text;
  }, text);
}
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  recordVideo: { dir: recordings, size: { width: 1440, height: 1000 } },
});
await context.addCookies([
  { name: "portfolio-mode", value: "editorial", url: base },
]);
const page = await context.newPage();
const video = page.video();
await page.goto(`${base}/en`);
await settle(page);
await label(page, "LIVE LOCAL / Editorial → Chronicle · theme morph");
await page.waitForTimeout(800);
await page.evaluate(() => {
  const picker = document.querySelector(".mode-picker");
  picker.open = true;
  picker.querySelector('[data-theme-option="chronicle"]').click();
});
await page.waitForFunction(
  () => document.documentElement.dataset.theme === "chronicle",
);
await page.waitForFunction(
  () => !document.documentElement.dataset.themeTransition,
);
await page.waitForTimeout(1600);
await page.screenshot({
  path: path.join(output, "chronicle-interactions.png"),
});
await label(page, "LIVE LOCAL / Chronicle · first tap selects and arms a card");
const card = page.locator(".chronicle-selection__card-target").nth(1);
await card.click({ position: { x: 40, y: 40 } });
await page.waitForTimeout(1600);
await label(page, "LIVE LOCAL / Chronicle · second tap opens the case study");
await card.click({ position: { x: 40, y: 40 } });
await page.waitForURL("**/en/work/**");
await page.waitForTimeout(2000);
await label(
  page,
  "LIVE LOCAL / Chronicle · chapter rail lit to the current chapter",
);
await page.locator(".case-study-navigation__desktop a").nth(3).click();
await page.waitForTimeout(1800);
await label(page, "LIVE LOCAL / Chronicle · image opens through a crystal");
const trigger = page
  .locator(".case-study .media-view-trigger:not([hidden])")
  .first();
await trigger.scrollIntoViewIfNeeded();
await page.waitForTimeout(600);
await trigger.click();
await page.waitForTimeout(1500);
await page.keyboard.press("Escape");
await page.waitForTimeout(1200);
await label(
  page,
  "LIVE LOCAL / Chronicle · Back furls the banner into its card",
);
// Chapter links add #anchors to history; step back past them to the homepage.
for (let step = 0; step < 4 && !/\/en$/.test(page.url()); step++) {
  await page.goBack();
  await page.waitForTimeout(400);
}
await page.waitForURL(/\/en$/);
await page.waitForTimeout(2000);
await context.close();
await copyFile(
  await video.path(),
  path.join(output, "chronicle-interactions.webm"),
);
for (const file of [
  "chronicle-interactions.webm",
  "chronicle-interactions.png",
])
  captures.push({
    file,
    provenance: file.endsWith("webm") ? "live recording" : "live",
    capturedAt: now(),
    route: "/en → /en/work/japan-travel-planner → /en",
    width: 1440,
    height: 1000,
    sequence: [
      "Editorial to Chronicle theme morph",
      "card select and arm",
      "second tap opens case study (card-to-banner)",
      "chapter rail navigation",
      "crystal image gallery open and close",
      "browser Back (banner furls into card)",
    ],
    note: "Unedited local recording with capture-only phase labels and no audio; not a benchmark.",
  });
await browser.close();

// 4. Merge into the media manifest, replacing entries for re-captured files.
const manifestPath = path.join(output, "capture-manifest.json");
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
const replaced = new Set(captures.map((capture) => capture.file));
manifest.captures = [
  ...manifest.captures.filter((capture) => !replaced.has(capture.file)),
  ...captures,
];
await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
process.stdout.write(`Updated manifest with ${captures.length} entries\n`);
