import { chromium } from "@playwright/test";
import { spawn } from "node:child_process";
import { createWriteStream } from "node:fs";
import { mkdir, copyFile, writeFile } from "node:fs/promises";
import path from "node:path";

// Capture live states, not design mockups. The two earlier-state images below
// deliberately use browser-only overrides and are labelled as reconstructions.
const root = process.cwd();
const output = path.join(root, "public/media/projects/portfolio");
await mkdir(output, { recursive: true });
await mkdir(".cache/pilot-recordings", { recursive: true });
const base = "http://127.0.0.1:3218";
const log = createWriteStream(".cache/pilot-capture-server.log");
const server = spawn(process.execPath, ["scripts/preview-server.mjs"], {
  windowsHide: true,
  stdio: ["ignore", "pipe", "pipe"],
});
server.stdout.pipe(log);
server.stderr.pipe(log);
let browser;
const captures = [];
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function ready() {
  const deadline = Date.now() + 60_000;
  while (Date.now() < deadline) {
    if (server.exitCode !== null)
      throw new Error(
        "Capture server exited; inspect .cache/pilot-capture-server.log",
      );
    try {
      if ((await fetch(`${base}/en`)).ok) return;
    } catch {
      /* Cold server. */
    }
    await pause(250);
  }
  throw new Error("Capture server did not become ready");
}
async function contextFor(mode, record = false) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    ...(record
      ? {
          recordVideo: {
            dir: ".cache/pilot-recordings",
            size: { width: 1440, height: 1000 },
          },
        }
      : {}),
  });
  await context.addCookies([
    { name: "portfolio-mode", value: mode, url: base },
  ]);
  return context;
}
async function settle(page) {
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({
    content:
      "nextjs-portal { display: none !important; } html { scroll-behavior: auto; }",
  });
  await page.waitForTimeout(800);
}
try {
  await ready();
  browser = await chromium.launch();
  for (const mode of ["editorial", "engineer", "digital"]) {
    const context = await contextFor(mode);
    const page = await context.newPage();
    await page.goto(`${base}/en`);
    await settle(page);
    const file = `${mode}-home.png`;
    await page.screenshot({ path: path.join(output, file) });
    captures.push({
      file,
      provenance: "live",
      route: "/en",
      mode,
      width: 1440,
      height: 1000,
      contentState: "placeholder homepage; no published project records",
    });
    await context.close();
  }
  const context = await contextFor("editorial", true);
  const page = await context.newPage();
  const video = page.video();
  await page.goto(`${base}/en`);
  await settle(page);
  for (const mode of ["Engineer", "Digital", "Editorial"]) {
    const picker = page.locator(".site-controls--desktop .mode-picker");
    if (!(await picker.evaluate((element) => element.open)))
      await picker.locator("summary").click();
    await page
      .locator(".site-controls--desktop .theme-switcher")
      .getByRole("button", { name: mode, exact: true })
      .click();
    await page.waitForFunction(
      (theme) => document.documentElement.dataset.theme === theme,
      mode.toLowerCase(),
    );
    await page.waitForFunction(
      () => !document.documentElement.dataset.themeTransition,
    );
    await page.waitForTimeout(700);
  }
  await context.close();
  await copyFile(await video.path(), path.join(output, "theme-morphing.webm"));
  captures.push({
    file: "theme-morphing.webm",
    provenance: "live recording",
    route: "/en",
    sequence: ["editorial", "engineer", "digital", "editorial"],
    width: 1440,
    height: 1000,
    note: "Unedited browser recording including loading and control activation, not a latency measurement.",
  });
  const digital = await contextFor("digital");
  const navPage = await digital.newPage();
  await navPage.goto(`${base}/en/work`);
  await settle(navPage);
  await navPage.screenshot({
    path: path.join(output, "digital-navigation.png"),
    clip: { x: 0, y: 0, width: 1440, height: 150 },
  });
  captures.push({
    file: "digital-navigation.png",
    provenance: "live",
    route: "/en/work",
    mode: "digital",
    width: 1440,
    height: 150,
  });
  await navPage.addStyleTag({
    content:
      ".site-header .site-nav a[aria-current] { text-decoration: underline !important; text-underline-offset: .4em; }",
  });
  await navPage.evaluate(() => {
    const nav = document.querySelector(".site-nav--desktop");
    const link = nav.querySelector("a[aria-current]");
    const rect = link.getBoundingClientRect();
    const parent = nav.getBoundingClientRect();
    const marker = nav.querySelector(".navigation-marker");
    Object.assign(marker.style, {
      left: `${rect.left - parent.left}px`,
      top: `${rect.bottom - parent.top - 2}px`,
      width: `${rect.width}px`,
      transition: "none",
    });
    const label = document.createElement("p");
    label.textContent = "RECONSTRUCTION / EARLIER DOUBLE-UNDERLINE BEHAVIOR";
    Object.assign(label.style, {
      position: "fixed",
      top: "105px",
      right: "20px",
      zIndex: "9999",
      font: "11px monospace",
      color: "#00f0ff",
    });
    document.body.append(label);
  });
  await navPage.screenshot({
    path: path.join(output, "reconstruction-digital-navigation.png"),
    clip: { x: 0, y: 0, width: 1440, height: 150 },
  });
  captures.push({
    file: "reconstruction-digital-navigation.png",
    provenance: "reconstruction",
    route: "/en/work",
    mode: "digital",
    width: 1440,
    height: 150,
    overrides:
      "Restore active anchor underline and place moving marker under the full 44px link box, including the slash prefix. Current typography and geometry retained; not an exact historical build.",
  });
  await navPage.goto(
    `${base}/dev/compositions?surface=project&project=fixture-visual`,
  );
  await settle(navPage);
  const gallery = navPage.locator(".media-gallery");
  for (const image of await gallery.locator("img").all()) {
    await image.scrollIntoViewIfNeeded();
    await image.evaluate((element) => element.decode());
  }
  async function galleryCapture(file, provenance, overrides) {
    const png = await gallery.screenshot({ path: path.join(output, file) });
    captures.push({
      file,
      provenance,
      route: "/dev/compositions?surface=project&project=fixture-visual",
      mode: "digital",
      width: png.readUInt32BE(16),
      height: png.readUInt32BE(20),
      contentState: "Synthetic image-ratio fixtures, not project screenshots",
      ...(overrides ? { overrides } : {}),
    });
  }
  await galleryCapture("digital-gallery.png", "live fixture capture");
  const comparisonHeight = captures.at(-1).height;
  await navPage.addStyleTag({
    content:
      ".case-study .media-gallery { grid-template-columns: minmax(0, 1fr) !important; } .case-study .media-gallery > .media-frame { grid-column: 1 !important; width: 100% !important; padding: 0 !important; border: 0 !important; background: transparent !important; }",
  });
  await gallery.evaluate((element, height) => {
    element.style.maxHeight = `${height}px`;
    element.style.overflow = "hidden";
    element.querySelectorAll(".media-view-trigger").forEach((button) => {
      button.textContent = "Enlarge image";
    });
    const label = document.createElement("p");
    label.textContent = "RECONSTRUCTION / EARLIER FULL-WIDTH FIXTURE GALLERY";
    Object.assign(label.style, { color: "#00f0ff", font: "12px monospace" });
    element.prepend(label);
  }, comparisonHeight);
  await galleryCapture(
    "reconstruction-digital-gallery.png",
    "reconstruction",
    "Single-column full-width media, no frame surface/padding, earlier Enlarge image label. Cropped to the current gallery panel height to compare initial image sizing; further images lie below the capture. Current fixture images/markup retained; not an exact historical build.",
  );
  await digital.close();
  await writeFile(
    path.join(output, "capture-manifest.json"),
    JSON.stringify(
      {
        capturedAt: new Date().toISOString(),
        source:
          "Current local working tree; initial Git history contains documentation, not recoverable prior application versions.",
        captures,
      },
      null,
      2,
    ) + "\n",
  );
  console.log(`Captured ${captures.length} pilot assets in ${output}`);
} finally {
  await browser?.close();
  if (server.exitCode === null) {
    if (process.platform === "win32")
      await new Promise((resolve) =>
        spawn("taskkill", ["/pid", String(server.pid), "/T", "/F"], {
          windowsHide: true,
          stdio: "ignore",
        }).once("close", resolve),
      );
    else server.kill("SIGTERM");
  }
  log.end();
}
