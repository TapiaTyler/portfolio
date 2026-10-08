import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";

test("Chronicle reading images retain source or screen-density resolution", async ({
  browser,
  baseURL,
}) => {
  test.setTimeout(90_000);
  for (const viewport of [
    { width: 390, height: 844 },
    { width: 844, height: 390 },
    { width: 1440, height: 900 },
  ]) {
    for (const project of ["portfolio", "japan-travel-planner", "nihonest"]) {
      const context = await browser.newContext({
        viewport,
        deviceScaleFactor: 2,
        javaScriptEnabled: false,
      });
      try {
        await context.addCookies([
          { name: "portfolio-mode", value: "chronicle", url: baseURL! },
        ]);
        const page = await context.newPage();
        await page.goto(`/en/work/${project}`);
        await page.evaluate(() => document.fonts.ready);
        const images = page.locator(".case-study-body img");
        await expect(images.first()).toHaveAttribute("loading", "eager");
        expect(await images.first().getAttribute("sizes")).toContain("42vw");
        for (const image of await images.all()) {
          if (!(await image.isVisible())) continue;
          await image.evaluate((element) =>
            element.scrollIntoView({ behavior: "instant", block: "center" }),
          );
          const dimensions = await image.evaluate(async (element) => {
            const image = element as HTMLImageElement;
            await image.decode();
            return {
              source: Number(image.getAttribute("width")),
              displayed: image.getBoundingClientRect().width,
              requested: Number(
                new URL(image.currentSrc).searchParams.get("w"),
              ),
              density: window.devicePixelRatio,
            };
          });
          expect(dimensions.displayed).toBeLessThanOrEqual(
            dimensions.source + 1,
          );
          expect(dimensions.requested).toBeGreaterThanOrEqual(
            Math.min(
              dimensions.source,
              dimensions.displayed * dimensions.density,
            ),
          );
        }
      } finally {
        await context.close();
      }
    }
  }
});

test("Chronicle decorations load at low priority while the scenic hero stays high", async ({
  page,
  context,
  baseURL,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await context.addCookies([
    { name: "portfolio-mode", value: "chronicle", url: baseURL! },
  ]);
  const session = await context.newCDPSession(page);
  await session.send("Network.enable");
  const requests: { url: string; initialPriority: string }[] = [];
  session.on("Network.requestWillBeSent", ({ request }) =>
    requests.push(request),
  );
  await page.goto("/en");
  for (const file of [
    "crystal-corner-mobile.avif",
    "project-frame-active-compact.avif",
    "project-frame-compact.avif",
    "scenic-portrait.avif",
  ]) {
    const matches = requests.filter(({ url }) =>
      url.endsWith(`/chronicle/${file}`),
    );
    expect(matches, file).toHaveLength(1);
    expect(matches[0].initialPriority, file).toBe(
      file === "scenic-portrait.avif" ? "High" : "Low",
    );
  }
  await session.detach();
});

test("Chronicle case-study font and panel yield to scenery without duplicate requests", async ({
  browser,
  baseURL,
}) => {
  for (const reducedMotion of ["no-preference", "reduce"] as const) {
    const context = await browser.newContext({
      javaScriptEnabled: false,
      reducedMotion,
      viewport: { width: 390, height: 844 },
    });
    await context.addCookies([
      { name: "portfolio-mode", value: "chronicle", url: baseURL! },
    ]);
    const page = await context.newPage();
    const session = await context.newCDPSession(page);
    await session.send("Network.enable");
    const requests: { url: string; initialPriority: string }[] = [];
    session.on("Network.requestWillBeSent", ({ request }) =>
      requests.push(request),
    );
    await page.goto("/en/work/portfolio");
    await page.evaluate(() => document.fonts.ready);
    for (const [file, priority] of [
      ["panel-frame-compact.avif", "Low"],
      ["cormorant-garamond-latin-600-normal.woff2", "Low"],
      ["scenic-portrait.avif", "High"],
    ]) {
      const matches = requests.filter(({ url }) => url.endsWith(`/${file}`));
      expect(matches, file).toHaveLength(1);
      expect(matches[0].initialPriority, file).toBe(priority);
    }
    await expect(page.locator(".case-study-body")).toHaveCSS(
      "overflow-y",
      "auto",
    );
    await session.detach();
    await context.close();
  }
});

test("every theme AVIF decodes at the retained source dimensions", async ({
  page,
}) => {
  const manifest = JSON.parse(
    await readFile("docs/IMAGE-DELIVERY-MANIFEST.json", "utf8"),
  );
  await page.goto("/en");
  for (const asset of manifest.images.filter(
    (entry: { avif?: string }) => entry.avif,
  )) {
    const dimensions = await page.evaluate(async (src) => {
      const image = new Image();
      image.src = src;
      await image.decode();
      return [image.naturalWidth, image.naturalHeight];
    }, asset.avif);
    expect(dimensions, asset.avif).toEqual([asset.width, asset.height]);
  }
});

for (const theme of [
  "editorial",
  "engineer",
  "digital",
  "chronicle",
  "product",
]) {
  test(`${theme} only preloads Chronicle fonts when needed`, async ({
    browser,
    baseURL,
  }) => {
    const context = await browser.newContext();
    await context.addCookies([
      { name: "portfolio-mode", value: theme, url: baseURL! },
    ]);
    const page = await context.newPage();
    const fonts: string[] = [];
    page.on("request", (request) => {
      if (
        request.url().includes("/fonts/chronicle/") &&
        request.url().endsWith(".woff2")
      )
        fonts.push(request.url());
    });
    await page.goto("/en");
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page
        .locator('link[rel="preload"][as="font"][href*="/fonts/chronicle/"]')
        .count(),
    ).toBe(theme === "chronicle" ? 1 : 0);
    await expect(
      page.locator('link[rel="preload"][href*="cormorant-garamond-latin-500"]'),
    ).toHaveCount(0);
    expect(fonts.length).toBe(theme === "chronicle" ? 2 : 0);
    expect(new Set(fonts).size).toBe(fonts.length);
    await context.close();
  });
}

test("project image negotiation prefers AVIF, then WebP, then original PNG", async ({
  request,
}) => {
  const url =
    "/_next/image?url=%2Fmedia%2Fprojects%2Fnihonest%2Fexplore-desktop.png&w=384&q=75";
  for (const [accept, type] of [
    ["image/avif,image/webp,image/png", "image/avif"],
    ["image/webp,image/png", "image/webp"],
    ["image/png", "image/png"],
  ]) {
    const response = await request.get(url, { headers: { Accept: accept } });
    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"]).toContain(type);
    expect((await response.body()).length).toBeGreaterThan(0);
    expect(response.headers().vary).toContain("Accept");
  }
});

for (const { theme, width, height, stems, routePath = "/en" } of [
  {
    theme: "chronicle",
    width: 390,
    height: 844,
    stems: [
      "scenic-portrait",
      "project-frame-compact",
      "project-frame-active-compact",
      "sakura-corner-mobile",
      "crystal-corner-mobile",
      "glass-button",
    ],
  },
  {
    theme: "chronicle",
    width: 1440,
    height: 900,
    stems: [
      "landscape-v2",
      "project-frame",
      "sakura-corner-compact",
      "crystal-corner-compact",
      "glass-button",
    ],
  },
  { theme: "editorial", width: 1440, height: 900, stems: ["ink-landscape"] },
  {
    theme: "chronicle",
    width: 390,
    height: 844,
    routePath: "/en/work/portfolio",
    stems: ["scenic-portrait", "panel-frame-compact", "crystal-corner-mobile"],
  },
]) {
  for (const fallback of [false, true]) {
    test(`${theme} ${width}px ${routePath} artwork uses ${fallback ? "WebP when AVIF type is unsupported" : "AVIF without duplicate WebP downloads"}`, async ({
      browser,
      baseURL,
    }) => {
      const context = await browser.newContext({
        viewport: { width, height },
        javaScriptEnabled: false,
      });
      await context.addCookies([
        { name: "portfolio-mode", value: theme, url: baseURL! },
      ]);
      const page = await context.newPage();
      // Chromium supports AVIF. Substitute an unknown MIME type to exercise its
      // native format-selection branch; this is not a network-failure simulation.
      if (fallback) {
        for (const pattern of [`**${routePath}`, "**/*.css"]) {
          await page.route(pattern, async (route) => {
            const response = await route.fetch();
            const headers = response.headers();
            // React also emits preloads as HTTP Link headers. The simulated
            // unsupported format must apply to both headers and document HTML.
            if (headers.link)
              headers.link = headers.link.replaceAll(
                "image/avif",
                "image/x-unsupported",
              );
            await route.fulfill({
              response,
              headers,
              body: (await response.text()).replaceAll(
                "image/avif",
                "image/x-unsupported",
              ),
            });
          });
        }
      }
      const artwork: string[] = [];
      page.on("request", (r) => {
        if (
          stems.some(
            (stem) =>
              r.url().endsWith(`/${stem}.avif`) ||
              r.url().endsWith(`/${stem}.webp`),
          )
        )
          artwork.push(r.url());
      });
      await page.goto(`${baseURL}${routePath}`);
      await page.waitForTimeout(500);
      const extension = fallback ? ".webp" : ".avif";
      for (const stem of stems) {
        expect(
          artwork.some((url) => url.endsWith(`/${stem}${extension}`)),
          `${stem}: ${artwork.join(", ")}`,
        ).toBeTruthy();
      }
      expect(artwork.every((url) => url.endsWith(extension))).toBeTruthy();
      // Decode the selected files, including transparent border artwork.
      for (const url of [...new Set(artwork)]) {
        expect(
          await page.evaluate(async (src) => {
            const image = new Image();
            image.src = src;
            await image.decode();
            return image.naturalWidth > 0;
          }, url),
        ).toBeTruthy();
      }
      await page.screenshot({
        path: `.cache/frame-candidates/format-${theme}-${fallback ? "webp" : "avif"}-${width}.png`,
      });
      await context.close();
    });
  }
}

test("local video posters negotiate formats without downloading playback", async ({
  page,
  request,
}) => {
  const playback: string[] = [];
  page.on("request", (r) => {
    if (r.url().endsWith(".webm")) playback.push(r.url());
  });
  await page.goto("/en/work/portfolio");
  for (const video of await page.locator("video").all()) {
    await video.scrollIntoViewIfNeeded();
    await expect(video).toHaveAttribute("poster", /\/_next\/image\?/);
  }
  const posters = await page.locator("video").evaluateAll((videos) =>
    videos
      .filter(
        (video): video is HTMLVideoElement => video instanceof HTMLVideoElement,
      )
      .map((video) => ({
        poster: video.poster,
        preload: video.preload,
        controls: video.controls,
      })),
  );
  expect(posters.length).toBeGreaterThan(0);
  for (const video of posters) {
    expect(video.poster).toContain("/_next/image?");
    expect(video.preload).toBe("none");
    expect(video.controls).toBeTruthy();
    for (const format of ["avif", "webp", "png"]) {
      const response = await request.get(video.poster, {
        headers: { Accept: `image/${format}` },
      });
      expect(response.ok()).toBeTruthy();
      expect(response.headers()["content-type"]).toContain(`image/${format}`);
    }
  }
  expect(playback).toEqual([]);
});

for (const theme of ["editorial", "engineer", "digital", "chronicle"]) {
  test(`${theme} defers offscreen posters and loads them inside its reading area`, async ({
    browser,
    baseURL,
  }) => {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: "reduce",
    });
    await context.addCookies([
      { name: "portfolio-mode", value: theme, url: baseURL! },
    ]);
    const page = await context.newPage();
    const posters: string[] = [];
    const playback: string[] = [];
    page.on("request", (r) => {
      if (
        /_(next)\/image.*(theme-morphing|chronicle-interactions|route-transitions)/.test(
          r.url(),
        )
      )
        posters.push(r.url());
      if (r.url().endsWith(".webm")) playback.push(r.url());
    });
    await page.goto("/en/work/portfolio");
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);
    expect(posters).toEqual([]);
    const video = page.locator('[data-media-id="theme-morphing"] video');
    expect(await video.getAttribute("poster")).toBeNull();
    const dimensions = await video.evaluate((el) => [
      el.getBoundingClientRect().width,
      el.getBoundingClientRect().height,
    ]);
    await video.scrollIntoViewIfNeeded();
    await expect(video).toHaveAttribute("poster", /\/_next\/image\?/);
    await expect.poll(() => posters.length).toBe(1);
    expect(
      await video.evaluate((el) => [
        el.getBoundingClientRect().width,
        el.getBoundingClientRect().height,
      ]),
    ).toEqual(dimensions);
    expect(playback).toEqual([]);
    await context.close();
  });
}

test("video controls remain available without JavaScript or IntersectionObserver", async ({
  browser,
  baseURL,
}) => {
  for (const disabled of [true, false]) {
    const context = await browser.newContext({ javaScriptEnabled: !disabled });
    if (!disabled)
      await context.addInitScript(() => {
        Object.defineProperty(window, "IntersectionObserver", {
          value: undefined,
        });
      });
    const page = await context.newPage();
    await page.goto(`${baseURL}/en/work/portfolio`);
    const video = page.locator("video").first();
    await video.scrollIntoViewIfNeeded();
    await expect(video).toHaveAttribute("controls", "");
    await expect(video).toHaveAttribute("preload", "none");
    if (disabled) expect(await video.getAttribute("poster")).toBeNull();
    else await expect(video).toHaveAttribute("poster", /\/_next\/image\?/);
    expect(await video.locator("source").getAttribute("src")).toMatch(
      /\.webm$/,
    );
    await context.close();
  }
});
