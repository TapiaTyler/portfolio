import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createWriteStream } from "node:fs";
import { access, mkdir } from "node:fs/promises";
import path from "node:path";

// Exercise the production build, including static assets and development guards.
const root = process.cwd();
await access(path.join(root, ".next/BUILD_ID"));
await mkdir(".cache", { recursive: true });
const origin = "http://127.0.0.1:3220";
try {
  await fetch(origin, { signal: AbortSignal.timeout(500) });
  throw new Error("Release smoke port 3220 is already in use.");
} catch (error) {
  if (error.message === "Release smoke port 3220 is already in use.")
    throw error;
}
const log = createWriteStream(".cache/release-smoke.log");
const server = spawn(
  process.execPath,
  [
    "node_modules/next/dist/bin/next",
    "start",
    "--hostname",
    "127.0.0.1",
    "--port",
    "3220",
  ],
  {
    cwd: root,
    windowsHide: true,
    stdio: ["ignore", "pipe", "pipe"],
    env: {
      ...process.env,
      NODE_ENV: "production",
      HOSTNAME: "127.0.0.1",
      PORT: "3220",
    },
  },
);
server.stdout.pipe(log);
server.stderr.pipe(log);
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function get(route, mode = "editorial") {
  return fetch(`${origin}${route}`, {
    headers: { Cookie: `portfolio-mode=${mode}` },
    signal: AbortSignal.timeout(10_000),
  });
}
try {
  const deadline = Date.now() + 30_000;
  let ready = false;
  while (Date.now() < deadline) {
    if (server.exitCode !== null)
      throw new Error(
        "Production server exited; inspect .cache/release-smoke.log.",
      );
    try {
      if ((await get("/en")).ok) {
        ready = true;
        break;
      }
    } catch {
      /* Starting. */
    }
    await pause(250);
  }
  assert.ok(ready, "Production server did not become ready");
  let home;
  let routeChecks = 0;
  for (const mode of ["editorial", "engineer", "digital", "chronicle"]) {
    for (const route of [
      "/en",
      "/en/work",
      "/en/about",
      "/en/lab",
      "/en/contact",
      "/ja/about",
    ]) {
      const response = await get(route, mode);
      assert.equal(response.status, 200, `${mode} ${route}`);
      const html = await response.text();
      assert.ok(
        html.includes(`data-theme="${mode}"`),
        `${route} cookie-selected theme`,
      );
      assert.ok(!html.includes("fixture-system"), `${route} excludes fixtures`);
      routeChecks++;
      if (route === "/en") home = html;
    }
  }
  const guardedRoutes = [
    "/preview/chronicle",
    "/preview/chronicle?project=portfolio",
    "/dev/design-system",
    "/dev/compositions",
    "/dev/projects/portfolio",
    "/dev/projects/japan-travel-planner",
    "/dev/projects/nihonest",
    "/dev/fixtures/reference.svg",
  ];
  for (const route of guardedRoutes) {
    assert.equal((await get(route)).status, 404, `Production guard ${route}`);
  }
  for (const mode of ["editorial", "engineer", "digital", "chronicle"]) {
    for (const slug of ["nihonest", "portfolio", "japan-travel-planner"]) {
      assert.equal(
        (await get(`/en/work/${slug}`, mode)).status,
        200,
        `${mode} published project ${slug}`,
      );
      routeChecks++;
    }
  }
  const script = home.match(/src="([^" ]*\/_next\/static\/[^" ]+\.js)"/);
  assert.ok(script, "Homepage includes a static JavaScript asset");
  const staticAsset = await get(script[1]);
  assert.equal(staticAsset.status, 200, "Production static asset");
  assert.match(staticAsset.headers.get("content-type"), /javascript/);
  const media = await get("/media/projects/portfolio/route-transitions.png");
  assert.equal(media.status, 200, "Public media");
  assert.match(media.headers.get("content-type"), /image\/png/);
  const robots = await get("/robots.txt");
  assert.equal(robots.status, 200);
  assert.ok(
    /^Disallow: \/\s*$/m.test(await robots.text()),
    "Preview indexing remains disabled",
  );
  const sitemap = await get("/sitemap.xml");
  assert.equal(sitemap.status, 200);
  assert.ok(
    !(await sitemap.text()).includes("<loc>"),
    "Preview sitemap stays empty",
  );
  process.stdout.write(
    `Release smoke passed: ${routeChecks} theme/route checks, ${guardedRoutes.length} production guards, static/public assets, noindex robots and empty preview sitemap.\n`,
  );
} finally {
  server.kill("SIGTERM");
  await new Promise((resolve) => {
    if (server.exitCode !== null) resolve();
    else server.once("exit", resolve);
  });
  log.end();
}
