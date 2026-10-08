import { chromium } from "@playwright/test";
import { mkdir, readFile, writeFile, access } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";

// Use an existing local server; dated captures never replace earlier evidence.
const base =
  process.argv.find((arg) => /^http/.test(arg)) ?? "http://127.0.0.1:3218";
const directory = path.resolve("public/media/projects/portfolio");
const modes = ["product", "editorial", "engineer", "digital", "chronicle"];
const stamp =
  process.argv.find((arg) => arg.startsWith("--stamp="))?.slice(8) ??
  "2026-10-08-refreshed";
if (!/^\d{4}-\d{2}-\d{2}(?:-[a-z]+)?$/.test(stamp))
  throw new Error("Use a dated capture stamp");
const captures = [
  ...modes.map((mode) => ({
    mode,
    width: 1440,
    height: 1000,
    file: `${mode}-home-${stamp}.png`,
  })),
  {
    mode: "chronicle",
    width: 844,
    height: 390,
    file: `chronicle-landscape-home-${stamp}.png`,
  },
];
await mkdir(directory, { recursive: true });
// Keep old evidence and avoid stale optimized images by using a new capture URL.
for (const { file } of captures) {
  try {
    await access(path.join(directory, file));
  } catch (error) {
    if (error.code === "ENOENT") continue;
    throw error;
  }
  throw new Error(`Capture already exists: ${file}; choose a new --stamp`);
}
const browser = await chromium.launch();
const entries = [];
try {
  for (const { mode, width, height, file } of captures) {
    const context = await browser.newContext({
      viewport: { width, height },
      reducedMotion: "reduce",
    });
    await context.addCookies([
      { name: "portfolio-mode", value: mode, url: base },
    ]);
    await context.addInitScript(() =>
      localStorage.setItem("chronicle-hints-dismissed", "1"),
    );
    const page = await context.newPage();
    await page.goto(`${base}/en`, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.addStyleTag({
      content: "nextjs-portal{display:none!important}",
    });
    await page.evaluate(async () => {
      await Promise.all(
        [...document.images]
          .filter((image) => {
            const bounds = image.getBoundingClientRect();
            return bounds.bottom > 0 && bounds.top < innerHeight;
          })
          .map((image) => image.decode().catch(() => {})),
      );
    });
    if (height === 390) {
      const heading = await page
        .locator("#selected-work-heading")
        .boundingBox();
      const controls = await page
        .locator(".chronicle-selection__controls")
        .boundingBox();
      if (!heading || !controls || heading.x + heading.width > controls.x)
        throw new Error(
          "Landscape collection controls overlap the Selected Work heading",
        );
    }
    await page.screenshot({ path: path.join(directory, file) });
    const bytes = await readFile(path.join(directory, file));
    entries.push({
      file,
      mode,
      route: "/en",
      width,
      height,
      capturedAt: new Date().toISOString(),
      sha256: createHash("sha256").update(bytes).digest("hex"),
      note: "Live local homepage, three published projects, reduced motion; no reconstructed layout.",
    });
    await context.close();
  }
  await writeFile(
    path.join(directory, `presentations-${stamp}.capture.json`),
    JSON.stringify({ entries }, null, 2) + "\n",
  );
} finally {
  await browser.close();
}
console.log(`Captured ${entries.length} presentation screenshots.`);
