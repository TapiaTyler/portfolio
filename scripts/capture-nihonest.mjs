import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";

// Connect to an isolated, already-running demo; never starts services or edits source content.
const origin = process.env.NIHONEST_CAPTURE_ORIGIN ?? "http://127.0.0.1:3225";
if (!/^http:\/\/127\.0\.0\.1:\d+$/.test(origin)) {
  throw new Error("Capture requires an explicit loopback demo origin");
}
const output = "public/media/projects/nihonest";
await mkdir(output, { recursive: true });
const browser = await chromium.launch();
const assets = [];
async function prepare(page, route) {
  await page.goto(`${origin}${route}`, {
    waitUntil: "networkidle",
    timeout: 60_000,
  });
  await page.evaluate(() => document.fonts.ready);
  // Capture-only: omit the Next development badge, without changing product UI.
  await page.addStyleTag({
    content: "nextjs-portal { display: none !important; }",
  });
}
async function capture(page, file, route, state) {
  await page.screenshot({ path: `${output}/${file}`, animations: "disabled" });
  assets.push({ file, route, viewport: page.viewportSize(), state });
}
try {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await prepare(page, "/");
  await capture(
    page,
    "home-desktop.png",
    "/",
    "Anonymous English homepage; fresh browser context, no account or personal data.",
  );
  await prepare(page, "/explore");
  await page.locator("input[type=search]").fill("juminhyo");
  await page.locator("input[type=search]").press("Enter");
  await page
    .getByRole("heading", { name: "Matching guidance", exact: true })
    .waitFor();
  await page
    .locator("#knowledgebase-search-heading")
    .evaluate((el) =>
      scrollTo(0, el.getBoundingClientRect().top + scrollY - 30),
    );
  await capture(
    page,
    "explore-desktop.png",
    "/explore",
    "Neutral demo query juminhyo; default result kinds and filters. Shows source-linked discovery, not a legal determination.",
  );
  const mobile = await context.newPage();
  await mobile.setViewportSize({ width: 390, height: 844 });
  const journey =
    "/explore/journeys/student-moving-to-japan?route=student-status";
  await prepare(mobile, journey);
  await capture(
    mobile,
    "journey-mobile.png",
    journey,
    "Anonymous Student journey, selected student-status route from the URL; no saved progress.",
  );
  await mobile
    .getByRole("heading", {
      name: "Work, travel, and later transitions",
      exact: true,
    })
    .scrollIntoViewIfNeeded();
  await capture(
    mobile,
    "journey-conditions-mobile.png",
    journey,
    "Conditional steps within the same selected route; applicability labels from the captured checkout.",
  );
  const guidance = "/articles/registering-your-address-after-arrival";
  await prepare(page, guidance);
  const prefecture = page.locator("#local-guidance-prefecture");
  const tokyo = await prefecture
    .locator("option")
    .evaluateAll(
      (options) =>
        options.find((option) => /Tokyo/.test(option.textContent))?.value,
    );
  if (!tokyo) throw new Error("Tokyo demo option missing");
  await prefecture.selectOption(tokyo);
  const municipality = page.locator("#local-guidance-location");
  const ward = await municipality
    .locator("option")
    .evaluateAll(
      (options) =>
        options.find((option) => /Shinjuku/.test(option.textContent))?.value,
    );
  if (!ward) throw new Error("Shinjuku demo option missing");
  await municipality.selectOption(ward);
  await page
    .locator("#local-guidance-heading")
    .evaluate((el) =>
      scrollTo(0, el.getBoundingClientRect().top + scrollY - 30),
    );
  await capture(
    page,
    "local-guidance-desktop.png",
    guidance,
    "Tokyo / Shinjuku selected through native controls; source and review dates belong to the captured checkout, not a fresh official-source check.",
  );
  await writeFile(
    `${output}/capture-manifest.json`,
    JSON.stringify(
      {
        capturedAt: new Date().toISOString(),
        sourceRevision: "4bc3df99a38b1a97290c1b9074c3633ae792adb4",
        provenance:
          "Live local screenshots from an isolated copy of Nihonest, without copied environment credentials, account login, database setup, or source application changes. Public demo captures approved by Tyler on October 5, 2026. Only the Next development badge is hidden for capture.",
        limitations:
          "Predeployment UI evidence. No qualified guidance review, hosted verification, historical comparison, or performance metric is implied. CMS capture omitted; no inert review fixture supplied.",
        assets,
      },
      null,
      2,
    ) + "\n",
  );
} finally {
  await browser.close();
}
