import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/preview",
  // Separate artifacts from production checks so concurrent runs cannot delete traces.
  outputDir: ".cache/preview-test-results",
  // Two workers on Linux CI; Windows keeps one (cold dev-server compiles stall).
  workers: process.platform === "win32" ? 1 : 2,
  // One CI retry; Playwright reports retried passes as "flaky" so they stay visible.
  retries: process.env.CI ? 1 : 0,
  timeout: 60_000,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:3218",
    browserName: "chromium",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "node scripts/preview-server.mjs",
    url: "http://127.0.0.1:3218/dev/compositions",
    reuseExistingServer: false,
    timeout: 60_000,
  },
});
