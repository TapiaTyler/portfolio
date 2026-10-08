import { chromium } from "@playwright/test";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";

// Capture only the owner-approved public homepage in a fresh anonymous context.
// The local discovery captures and their original provenance remain separate.
const url = "https://nihonest.vercel.app/";
const folder = "public/media/projects/nihonest";
const capturedAt = new Date().toISOString();
const file = `home-live-desktop-${capturedAt.slice(0, 10)}.png`;
await mkdir(folder, { recursive: true });
const browser = await chromium.launch();
try {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
    locale: "en-US",
  });
  const page = await context.newPage();
  const response = await page.goto(url, {
    waitUntil: "domcontentloaded",
    timeout: 60_000,
  });
  if (!response?.ok())
    throw new Error(`Homepage returned ${response?.status()}`);
  await page.evaluate(() => document.fonts.ready);
  await page.locator("main h1").waitFor({ state: "visible" });
  // Capture the actual rendered first screen once its visible images have loaded.
  await page.waitForFunction(() =>
    [...document.images]
      .filter((image) => {
        const bounds = image.getBoundingClientRect();
        return (
          bounds.width &&
          bounds.height &&
          bounds.top < innerHeight &&
          bounds.bottom > 0
        );
      })
      .every((image) => image.complete && image.naturalWidth > 0),
  );
  await page.screenshot({ path: `${folder}/${file}`, animations: "disabled" });
  const manifest = {
    capturedAt,
    sourceUrl: url,
    finalUrl: page.url(),
    file,
    viewport: page.viewportSize(),
    deviceScaleFactor: 1,
    sha256: createHash("sha256")
      .update(await readFile(`${folder}/${file}`))
      .digest("hex"),
    state:
      "Live English homepage in a fresh anonymous browser context; no account, personal data or saved preferences.",
    provenance:
      "Captured from the owner-supplied public deployment. No source code or rendered UI was altered. Reduced motion was requested for a stable still.",
    limitations:
      "A dated visual capture, not an application, content accuracy or performance audit. The deployment's source revision was not inferred.",
  };
  await writeFile(
    `${folder}/${file.replace(/\.png$/, ".capture.json")}`,
    JSON.stringify(manifest, null, 2) + "\n",
  );
  process.stdout.write(JSON.stringify(manifest, null, 2) + "\n");
} finally {
  await browser.close();
}
