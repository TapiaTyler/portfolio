import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/browser",
  fullyParallel: true,
  // The Windows test runner intermittently stalls cold asset loads with parallel workers.
  // Keep local checks deterministic; CI still exercises parallel browsers on Linux.
  workers: process.platform === "win32" ? 1 : 2,
  // One CI retry; Playwright reports retried passes as "flaky" so they stay visible.
  retries: process.env.CI ? 1 : 0,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:3217",
    browserName: "chromium",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npm start -- --hostname 127.0.0.1 --port 3217",
    url: "http://127.0.0.1:3217/en",
    reuseExistingServer: false,
    timeout: 30_000,
  },
});
