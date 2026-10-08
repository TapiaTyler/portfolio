import { createServer } from "node:http";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import lighthouse from "lighthouse";
import { Audit } from "lighthouse/core/audits/audit.js";
import BaseGatherer from "lighthouse/core/gather/base-gatherer.js";
import { chromium } from "@playwright/test";

// Keep this registry aligned with src/lib/theme/ids.ts. It is intentionally
// local so the audit remains a plain Node script without a TypeScript loader.
const registeredModes = [
  "product",
  "editorial",
  "engineer",
  "digital",
  "chronicle",
];
const modeLabels = {
  editorial: "Editorial",
  engineer: "Engineer",
  digital: "Digital",
  chronicle: "Chronicle",
  product: "Product",
};

// Verify Lighthouse's measured document. This informational audit has zero
// weight in the Performance score and does not alter the site's behavior.
class MotionPreferenceGatherer extends BaseGatherer {
  meta = { supportedModes: ["navigation"] };

  getArtifact({ driver }) {
    return driver.executionContext.evaluate(
      () => ({
        reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
        theme: document.documentElement.dataset.theme,
      }),
      { args: [], useIsolation: true },
    );
  }
}

class MotionPreferenceAudit extends Audit {
  static get meta() {
    return {
      id: "portfolio-motion-preference",
      title: "Measured portfolio motion preference",
      description:
        "Records the media query and active theme in the audited document.",
      scoreDisplayMode: "informative",
      requiredArtifacts: ["PortfolioMotionPreference"],
    };
  }

  static audit(artifacts) {
    return {
      score: 1,
      details: { type: "debugdata", ...artifacts.PortfolioMotionPreference },
    };
  }
}

async function main() {
  process.env.NODE_ENV = "production";
  const { default: next } = await import("next");
  const labelArgument = process.argv.find((argument) =>
    argument.startsWith("--label="),
  );
  let label = labelArgument?.slice(8) ?? "current";
  if (!/^[a-z0-9-]{1,64}$/.test(label))
    throw new Error(
      "Use a simple audit label containing lowercase letters, numbers and hyphens.",
    );
  const modeArguments = process.argv.filter((argument) =>
    argument.startsWith("--modes="),
  );
  if (modeArguments.length > 1) throw new Error("Specify --modes only once.");
  const modes = modeArguments.length
    ? modeArguments[0].slice("--modes=".length).split(",")
    : registeredModes;
  if (
    modes.length === 0 ||
    modes.some((mode) => !mode || !registeredModes.includes(mode))
  )
    throw new Error(
      `Choose one or more registered modes: ${registeredModes.join(", ")}.`,
    );
  if (new Set(modes).size !== modes.length)
    throw new Error("List each mode only once in --modes.");
  const routeArguments = process.argv.filter((argument) =>
    argument.startsWith("--route="),
  );
  if (routeArguments.length > 1) throw new Error("Specify --route only once.");
  const route = routeArguments[0]?.slice("--route=".length) ?? "/en";
  if (!/^\/(en|ja)(\/work(\/[a-z0-9-]+)?)?$/.test(route))
    throw new Error(
      "Choose a locale homepage, Work index or project route without query parameters.",
    );
  const motionArguments = process.argv.filter((argument) =>
    argument.startsWith("--motion="),
  );
  if (motionArguments.length > 1)
    throw new Error("Specify --motion only once.");
  const motion =
    motionArguments[0]?.slice("--motion=".length) ?? "no-preference";
  if (!["reduce", "no-preference"].includes(motion))
    throw new Error("Choose --motion=reduce or --motion=no-preference.");
  if (!labelArgument && motion === "reduce") label = "current-reduced-motion";
  // Browser-level switches also apply to the target Lighthouse creates. Page-only
  // emulation on a separate Playwright tab would not set the audit's preference.
  const motionFlag =
    motion === "reduce"
      ? "--force-prefers-reduced-motion"
      : "--force-prefers-no-reduced-motion";
  const output = path.resolve(".cache/performance", label);
  await mkdir(output, { recursive: true });
  const app = next({ dev: false, hostname: "127.0.0.1", port: 3219 });
  const server = createServer(app.getRequestHandler());
  const origin = "http://127.0.0.1:3219";
  const summary = {
    timestamp: new Date().toISOString(),
    label,
    selectedModes: modes,
    route,
    motion,
    node: process.version,
    platform: process.platform,
    lighthouse: "13.5.0",
    conditions:
      "Lighthouse default mobile simulated throttling; local production server; current typed content and published project inventory; indexing disabled unless configured",
    modes: {},
    switches: [],
    routes: [],
  };

  try {
    await app.prepare();
    await new Promise((resolve, reject) => {
      server.once("error", reject);
      server.listen(3219, "127.0.0.1", resolve);
    });
    for (const mode of modes) {
      // Reserve an available debugging port rather than attaching to another browser.
      const reservation = createServer();
      await new Promise((resolve, reject) => {
        reservation.once("error", reject);
        reservation.listen(0, "127.0.0.1", resolve);
      });
      const debuggingPort = reservation.address().port;
      await new Promise((resolve) => reservation.close(resolve));
      const chrome = await chromium.launch({
        args: [`--remote-debugging-port=${debuggingPort}`, motionFlag],
      });
      try {
        summary.browser = chrome.version();
        const result = await lighthouse(
          `${origin}${route}`,
          {
            port: debuggingPort,
            output: ["json", "html"],
            logLevel: "error",
            onlyCategories: [
              "performance",
              "accessibility",
              "best-practices",
              "seo",
            ],
            extraHeaders: { Cookie: `portfolio-mode=${mode}` },
          },
          {
            extends: "lighthouse:default",
            artifacts: [
              {
                id: "PortfolioMotionPreference",
                gatherer: { instance: new MotionPreferenceGatherer() },
              },
            ],
            audits: [MotionPreferenceAudit],
            categories: {
              performance: {
                auditRefs: [{ id: "portfolio-motion-preference", weight: 0 }],
              },
            },
          },
        );
        if (!result || result.lhr.runtimeError)
          throw new Error(
            JSON.stringify(result?.lhr.runtimeError ?? "No Lighthouse result"),
          );
        const observed =
          result.lhr.audits["portfolio-motion-preference"].details;
        if (
          observed.reducedMotion !== (motion === "reduce") ||
          observed.theme !== mode
        )
          throw new Error(
            `Unexpected audited state: ${JSON.stringify(observed)}`,
          );
        await writeFile(path.join(output, `${mode}.json`), result.report[0]);
        await writeFile(path.join(output, `${mode}.html`), result.report[1]);
        const { audits, categories } = result.lhr;
        const scores = Object.fromEntries(
          Object.entries(categories).map(([key, value]) => [
            key,
            Math.round(value.score * 100),
          ]),
        );
        const resources = audits["network-requests"].details.items;
        const document = resources.find(
          (resource) => resource.resourceType === "Document",
        );
        if (document?.statusCode !== 200)
          throw new Error(
            `Audit route ${route} returned ${document?.statusCode ?? "no document"}.`,
          );
        const transfer = Object.fromEntries(
          ["Script", "Stylesheet", "Font", "Image"].map((type) => [
            type,
            resources
              .filter((resource) => resource.resourceType === type)
              .reduce((sum, resource) => sum + resource.transferSize, 0),
          ]),
        );
        summary.modes[mode] = {
          observed,
          scores,
          fcpMs: audits["first-contentful-paint"].numericValue,
          lcpMs: audits["largest-contentful-paint"].numericValue,
          tbtMs: audits["total-blocking-time"].numericValue,
          cls: audits["cumulative-layout-shift"].numericValue,
          transfer,
          fonts: resources
            .filter((resource) => resource.resourceType === "Font")
            .map((resource) => new URL(resource.url).pathname),
          findings: Object.values(audits)
            .filter(
              (audit) =>
                (audit.score !== null &&
                  audit.score < 1 &&
                  audit.details?.type !== "opportunity") ||
                (audit.details?.type === "opportunity" &&
                  audit.numericValue > 0),
            )
            .map((audit) => ({
              id: audit.id,
              title: audit.title,
              value: audit.displayValue,
              score: audit.score,
            })),
          warnings: result.lhr.runWarnings,
        };
        console.log(mode, JSON.stringify(summary.modes[mode]));
      } finally {
        await chrome.close();
      }
    }
    // Interaction diagnostics describe the homepage's shared header and About/Back
    // path. Secondary-route audits measure loading only, rather than mislabel it.
    if (route !== "/en") {
      await writeFile(
        path.join(output, "summary.json"),
        JSON.stringify(summary, null, 2),
      );
      console.log(`Reports saved to ${output}`);
      return;
    }
    const browser = await chromium.launch({ args: [motionFlag] });
    try {
      const context = await browser.newContext({
        viewport: { width: 390, height: 844 },
        reducedMotion: motion,
      });
      const page = await context.newPage();
      // Use a fixed diagnostic starting point independent of the first-visit default.
      await context.addCookies([
        { name: "portfolio-mode", value: "editorial", url: origin },
      ]);
      await page.goto(`${origin}/en`);
      await page.evaluate(() => document.fonts.ready);
      const switchSequence = modes.filter((mode) => mode !== "editorial");
      if (modes.length > 1 && modes.includes("editorial"))
        switchSequence.push("editorial");
      for (const mode of switchSequence) {
        const label = modeLabels[mode];
        if (
          !(await page
            .locator(".mobile-navigation")
            .evaluate((element) => element.open))
        )
          await page.locator(".mobile-navigation > summary").click();
        if (
          !(await page
            .locator(".mode-picker:visible")
            .evaluate((element) => element.open))
        )
          await page.locator(".mode-picker:visible > summary").click();
        await page
          .locator(".mode-picker:visible .theme-switcher")
          .evaluate(async (element) => {
            await Promise.all(
              element
                .getAnimations()
                .map((animation) => animation.finished.catch(() => {})),
            );
          });
        const start = performance.now();
        await page.getByRole("button", { name: label, exact: true }).click();
        await page.waitForFunction(
          (mode) => document.documentElement.dataset.theme === mode,
          mode,
        );
        await page.evaluate(() => document.fonts.ready);
        const elapsedMs = Math.round(performance.now() - start);
        await page.waitForFunction(
          () => !document.documentElement.dataset.themeTransition,
        );
        summary.switches.push({
          to: mode,
          elapsedMs,
          animationFinishedMs: Math.round(performance.now() - start),
          conditions:
            "local navigation; elapsedMs includes action, tree update and required fonts; animationFinishedMs also includes choreography; no artificial throttling",
        });
      }
      await context.close();
      // Interaction diagnostics use real production routes, outside Lighthouse's
      // simulated load audit. Frame gaps are main-thread samples, not GPU FPS or INP.
      for (const mode of modes) {
        const routeContext = await browser.newContext({
          viewport: { width: 1440, height: 900 },
          reducedMotion: motion,
        });
        await routeContext.addCookies([
          { name: "portfolio-mode", value: mode, url: origin },
        ]);
        const routePage = await routeContext.newPage();
        await routePage.goto(`${origin}/en`);
        await routePage.evaluate(() => document.fonts.ready);
        for (const action of ["about", "back"]) {
          await startInteractionSample(routePage);
          const start = performance.now();
          if (action === "about")
            await routePage
              .getByRole("navigation", { name: "Primary", exact: true })
              .getByRole("link", { name: "About", exact: true })
              .click();
          else await routePage.goBack();
          await routePage.waitForURL(
            `${origin}${action === "about" ? "/en/about" : "/en"}`,
          );
          await routePage.locator("main h1").waitFor({ state: "visible" });
          const contentReadyMs = Math.round(performance.now() - start);
          await routePage.waitForFunction(
            () => !document.documentElement.dataset.routeTransition,
          );
          summary.routes.push({
            mode,
            action,
            contentReadyMs,
            animationFinishedMs: Math.round(performance.now() - start),
            ...(await finishInteractionSample(routePage)),
            conditions:
              "1440x900; local production; no CPU/network throttling; includes automation overhead; RAF gaps are not compositor FPS or field INP",
          });
        }
        await routeContext.close();
      }
    } finally {
      await browser.close();
    }
    await writeFile(
      path.join(output, "summary.json"),
      JSON.stringify(summary, null, 2),
    );
    console.log("switches", JSON.stringify(summary.switches));
    console.log("routes", JSON.stringify(summary.routes));
    console.log(`Reports saved to ${output}`);
  } finally {
    if (server.listening) await new Promise((resolve) => server.close(resolve));
    await app.close();
  }
}

async function startInteractionSample(page) {
  await page.evaluate(() => {
    const sample = { gaps: [], tasks: [], previous: null, frame: 0 };
    sample.observer = new PerformanceObserver((list) => {
      sample.tasks.push(...list.getEntries().map((entry) => entry.duration));
    });
    sample.observer.observe({ type: "longtask" });
    const frame = (now) => {
      if (sample.previous !== null) sample.gaps.push(now - sample.previous);
      sample.previous = now;
      sample.frame = requestAnimationFrame(frame);
    };
    sample.frame = requestAnimationFrame(frame);
    window.performanceSample = sample;
  });
}

async function finishInteractionSample(page) {
  return page.evaluate(() => {
    const sample = window.performanceSample;
    sample.tasks.push(
      ...sample.observer.takeRecords().map((entry) => entry.duration),
    );
    sample.observer.disconnect();
    cancelAnimationFrame(sample.frame);
    delete window.performanceSample;
    return {
      frameSamples: sample.gaps.length,
      maxFrameGapMs: Math.round(Math.max(0, ...sample.gaps)),
      frameGapsOver50Ms: sample.gaps.filter((gap) => gap > 50).length,
      longTaskCount: sample.tasks.length,
      maxLongTaskMs: Math.round(Math.max(0, ...sample.tasks)),
    };
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
