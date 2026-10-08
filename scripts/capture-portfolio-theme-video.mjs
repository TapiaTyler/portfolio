import { chromium } from "@playwright/test";
import { mkdir, access, copyFile, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { themeIds } from "../src/lib/theme/ids.ts";

const base =
  process.argv.find((arg) => /^http/.test(arg)) ?? "http://localhost:3000";
const stamp =
  process.argv.find((arg) => arg.startsWith("--stamp="))?.slice(8) ??
  "2026-10-08";
if (!/^\d{4}-\d{2}-\d{2}(?:-[a-z]+)?$/.test(stamp))
  throw new Error("Use a dated capture stamp");
const directory = path.resolve("public/media/projects/portfolio");
const stage = path.resolve(".cache/portfolio-theme-video");
const routes = process.argv.includes("--routes");
const name = `${routes ? "route-transitions" : "theme-morphing"}-${stamp}`;
await mkdir(stage, { recursive: true });
for (const extension of ["webm", "png", "capture.json"]) {
  try {
    await access(path.join(directory, `${name}.${extension}`));
  } catch (error) {
    if (error.code === "ENOENT") continue;
    throw error;
  }
  throw new Error(
    `Capture already exists: ${name}.${extension}; choose a new --stamp`,
  );
}
const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "no-preference",
  recordVideo: { dir: stage, size: { width: 1440, height: 1000 } },
});
await context.addCookies([
  { name: "portfolio-mode", value: themeIds[0], url: base },
]);
await context.addInitScript(() =>
  localStorage.setItem("chronicle-hints-dismissed", "1"),
);
const sequence = routes ? [...themeIds] : [...themeIds, themeIds[0]];
const observations = [];
try {
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const video = page.video();
  await page.goto(`${base}/en`);
  await page.addStyleTag({ content: "nextjs-portal{display:none!important}" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(() =>
    document.documentElement.hasAttribute("data-motion-enhanced"),
  );
  const phase = async (mode) => {
    await page.evaluate(
      ({ mode, routes }) => {
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
            border: "1px solid #8993a5",
            pointerEvents: "none",
          });
          document.body.append(label);
        }
        label.textContent = `LIVE LOCAL / ${mode.charAt(0).toUpperCase() + mode.slice(1)} · ${routes ? "About navigation and browser Back" : "same content, different composition"}`;
      },
      { mode, routes },
    );
  };
  const settle = async () => {
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(async () =>
      Promise.all(
        [...document.images]
          .filter((image) => {
            const bounds = image.getBoundingClientRect();
            return bounds.bottom > 0 && bounds.top < innerHeight;
          })
          .map((image) => image.decode().catch(() => {})),
      ),
    );
  };
  await phase(sequence[0]);
  await settle();
  await page.waitForTimeout(1200);
  await page.screenshot({ path: path.join(directory, `${name}.png`) });
  const recordRoutes = async (mode) => {
    await phase(mode);
    await page.locator('.site-nav a[href="/en/about"]:visible').click();
    await page.waitForURL("**/en/about");
    await settle();
    await page.waitForTimeout(1400);
    observations.push({
      mode,
      action: "Header navigation",
      route: "/en/about",
      observedAt: new Date().toISOString(),
    });
    await page.goBack();
    await page.waitForURL(/\/en$/);
    await settle();
    await page.waitForTimeout(1400);
    observations.push({
      mode,
      action: "Browser Back",
      route: "/en",
      observedAt: new Date().toISOString(),
    });
  };
  if (routes) await recordRoutes(sequence[0]);
  for (const mode of sequence.slice(1)) {
    const picker = page.locator(".site-controls--desktop .mode-picker");
    await picker.locator("summary").click();
    await page.waitForTimeout(400);
    await phase(mode);
    await picker.locator(`[data-theme-option="${mode}"]`).click();
    await page.waitForFunction(
      (mode) => document.documentElement.dataset.theme === mode,
      mode,
    );
    await page.waitForFunction(
      () => !document.documentElement.dataset.themeTransition,
    );
    await page.keyboard.press("Escape");
    await settle();
    if (routes) await recordRoutes(mode);
    else {
      observations.push({ mode, observedAt: new Date().toISOString() });
      await page.waitForTimeout(1800);
    }
  }
  if (errors.length) throw new Error(errors.join("\n"));
  await context.close();
  await copyFile(await video.path(), path.join(directory, `${name}.webm`));
  const files = [];
  for (const extension of ["webm", "png"]) {
    const file = `${name}.${extension}`;
    const bytes = await readFile(path.join(directory, file));
    files.push({
      file,
      bytes: bytes.length,
      sha256: createHash("sha256").update(bytes).digest("hex"),
    });
  }
  await writeFile(
    path.join(directory, `${name}.capture.json`),
    JSON.stringify(
      {
        capturedAt: new Date().toISOString(),
        route: "/en",
        width: 1440,
        height: 1000,
        sequence,
        observations,
        files,
        motion: "normal",
        note: "Unedited silent local recording with native theme controls and capture-only phase labels; coach mark dismissed and development badge hidden. Includes server response time and deliberate viewing pauses; not a benchmark.",
      },
      null,
      2,
    ) + "\n",
  );
  console.log(`Recorded ${name}: ${sequence.join(" → ")}`);
} finally {
  await context.close();
  await browser.close();
}
