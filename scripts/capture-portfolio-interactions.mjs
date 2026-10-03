import { chromium } from "@playwright/test";
import { spawn } from "node:child_process";
import { createWriteStream } from "node:fs";
import { mkdir, copyFile, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

// These recordings supplement the original captures without replacing them.
const output = path.resolve("public/media/projects/portfolio");
const base = "http://127.0.0.1:3218";
await mkdir(".cache/pilot-interaction-recordings", { recursive: true });
const log = createWriteStream(".cache/pilot-interaction-capture-server.log");
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
      throw new Error("Capture server exited; inspect its log.");
    try {
      if ((await fetch(`${base}/en`)).ok) return;
    } catch {
      /* Cold server. */
    }
    await pause(250);
  }
  throw new Error("Capture server did not become ready");
}
async function recording() {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    recordVideo: {
      dir: ".cache/pilot-interaction-recordings",
      size: { width: 1440, height: 1000 },
    },
  });
  await context.addCookies([
    { name: "portfolio-mode", value: "editorial", url: base },
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
async function theme(page, mode) {
  // Activate the real control without scrolling the reader away from a disclosure.
  await page.evaluate((mode) => {
    const picker = document.querySelector(".mode-picker");
    picker.open = true;
    picker.querySelector(`[data-theme-option="${mode}"]`).click();
  }, mode);
  await page.waitForFunction(
    (mode) => document.documentElement.dataset.theme === mode,
    mode,
  );
  await page.waitForFunction(
    () => !document.documentElement.dataset.themeTransition,
  );
  await page.evaluate(() =>
    document.querySelectorAll(".mode-picker").forEach((picker) => {
      picker.open = false;
    }),
  );
  await page.waitForTimeout(500);
}
async function save(context, video, name, evidence) {
  await context.close();
  await copyFile(await video.path(), path.join(output, `${name}.webm`));
  for (const file of [`${name}.webm`, `${name}.png`])
    captures.push({
      file,
      provenance: file.endsWith("webm") ? "live recording" : "live",
      capturedAt: new Date().toISOString(),
      width: 1440,
      height: 1000,
      ...evidence,
    });
  process.stdout.write(`Captured ${name}\n`);
}
try {
  await ready();
  browser = await chromium.launch();
  const routes = await recording();
  const page = await routes.newPage();
  const video = page.video();
  await page.goto(`${base}/en`);
  await settle(page);
  await label(page, "LIVE LOCAL / Editorial · top-bound header page turn");
  await page.screenshot({ path: path.join(output, "route-transitions.png") });
  for (const mode of ["editorial", "engineer", "digital"]) {
    if (mode !== "editorial") await theme(page, mode);
    await label(
      page,
      `LIVE LOCAL / ${mode} · header navigation and browser Back`,
    );
    await page
      .locator(".site-nav--desktop")
      .getByRole("link", { name: "Work", exact: true })
      .click();
    await page.waitForURL("**/en/work");
    await page.waitForTimeout(1200);
    await page.goBack();
    await page.waitForURL("**/en");
    await page.waitForTimeout(1200);
  }
  await page.goto(`${base}/dev/compositions?surface=homepage`);
  await settle(page);
  const card = page.locator(
    '.digital-project[data-project-slug="fixture-system"]',
  );
  await card.scrollIntoViewIfNeeded();
  await label(
    page,
    "SYNTHETIC FIXTURE / Digital · selected card opens and contracts on Back",
  );
  await card.locator(".text-link").click();
  await page.waitForURL(
    (url) =>
      url.searchParams.get("surface") === "project" &&
      url.searchParams.get("project") === "fixture-system",
  );
  await page.waitForTimeout(1500);
  await page.goBack();
  await page.waitForTimeout(1500);
  await save(routes, video, "route-transitions", {
    routes: [
      "/en",
      "/en/work",
      "/dev/compositions?surface=homepage",
      "/dev/compositions?surface=project&project=fixture-system",
    ],
    sequence: [
      "editorial header and Back",
      "engineer header and Back",
      "digital header and Back",
      "digital synthetic selected-project card and Back",
    ],
    note: "Unedited local recording with phase labels. Public homepage copy is placeholder; selected-project segment uses a labelled synthetic fixture. Loading time is not a benchmark.",
  });
  const disclosures = await recording();
  const detail = await disclosures.newPage();
  const detailVideo = detail.video();
  await detail.goto(`${base}/dev/projects/portfolio`);
  await settle(detail);
  for (const mode of ["editorial", "engineer", "digital"]) {
    if (mode !== "editorial") await theme(detail, mode);
    await detail.locator("#microinteractions").evaluate((element) => {
      window.scrollBy(0, element.getBoundingClientRect().top - 120);
    });
    // Let nearby lazy posters and entry motion settle before framing the action.
    await detail.waitForLoadState("networkidle");
    await detail.waitForTimeout(800);
    await detail.locator("#microinteractions").evaluate((element) => {
      window.scrollBy(0, element.getBoundingClientRect().top - 120);
    });
    await label(
      detail,
      `LIVE LOCAL DRAFT / ${mode} · disclosure opening and closing`,
    );
    await detail.waitForTimeout(600);
    if (mode === "editorial")
      await detail.screenshot({
        path: path.join(output, "disclosure-interactions.png"),
      });
    const summary = detail.locator("#microinteractions summary");
    await summary.click();
    await detail.waitForFunction(
      () => document.querySelector("#microinteractions details").open,
    );
    await detail.waitForTimeout(1100);
    await summary.click();
    await detail.waitForTimeout(900);
  }
  await save(disclosures, detailVideo, "disclosure-interactions", {
    route: "/dev/projects/portfolio",
    sequence: ["editorial", "engineer", "digital"],
    note: "Unedited local recording of the real draft disclosure, opening and closing in each mode. Phase labels are capture-only; there is no audio or timing benchmark.",
  });
  const manifestPath = path.join(output, "capture-manifest.json");
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  const files = new Set(captures.map((capture) => capture.file));
  manifest.captures = [
    ...manifest.captures.filter((capture) => !files.has(capture.file)),
    ...captures,
  ];
  manifest.updatedAt = new Date().toISOString();
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
} finally {
  await browser?.close();
  if (process.platform === "win32" && server.pid) {
    await new Promise((resolve) => {
      const stop = spawn("taskkill", ["/pid", String(server.pid), "/T", "/F"], {
        windowsHide: true,
      });
      stop.on("exit", resolve);
    });
  } else server.kill("SIGTERM");
  log.end();
}
