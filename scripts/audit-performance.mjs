import { createServer } from "node:http";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import lighthouse from "lighthouse";
import { chromium } from "@playwright/test";

async function main() {
  process.env.NODE_ENV = "production";
  const { default: next } = await import("next");
  const label =
    process.argv
      .find((argument) => argument.startsWith("--label="))
      ?.slice(8) ?? "current";
  if (!/^[a-z0-9-]{1,64}$/.test(label))
    throw new Error(
      "Use a simple audit label containing lowercase letters, numbers and hyphens.",
    );
  const output = path.resolve(".cache/performance", label);
  await mkdir(output, { recursive: true });
  const app = next({ dev: false, hostname: "127.0.0.1", port: 3219 });
  const server = createServer(app.getRequestHandler());
  const origin = "http://127.0.0.1:3219";
  const modes = ["editorial", "engineer", "digital"];
  const summary = {
    timestamp: new Date().toISOString(),
    label,
    route: "/en",
    node: process.version,
    platform: process.platform,
    lighthouse: "13.5.0",
    conditions:
      "Lighthouse default mobile simulated throttling; local production server; placeholder content; indexing disabled unless configured",
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
        args: [`--remote-debugging-port=${debuggingPort}`],
      });
      try {
        summary.browser = chrome.version();
        const result = await lighthouse(`${origin}/en`, {
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
        });
        if (!result || result.lhr.runtimeError)
          throw new Error(
            JSON.stringify(result?.lhr.runtimeError ?? "No Lighthouse result"),
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
        const transfer = Object.fromEntries(
          ["Script", "Stylesheet", "Font", "Image"].map((type) => [
            type,
            resources
              .filter((resource) => resource.resourceType === type)
              .reduce((sum, resource) => sum + resource.transferSize, 0),
          ]),
        );
        summary.modes[mode] = {
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
    const browser = await chromium.launch();
    try {
      const context = await browser.newContext({
        viewport: { width: 390, height: 844 },
      });
      const page = await context.newPage();
      await page.goto(`${origin}/en`);
      await page.evaluate(() => document.fonts.ready);
      for (const [mode, label] of [
        ["engineer", "Engineer"],
        ["digital", "Digital"],
        ["editorial", "Editorial"],
      ]) {
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
