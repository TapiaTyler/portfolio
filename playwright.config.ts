import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/browser",
  fullyParallel: true,
  // Parallel workers stall cold asset loads against one `next start` server: once a
  // page's media stalls, every later load of that page times out (seen on Windows
  // and on Linux CI). CI runs this suite beside the preview suite instead.
  workers: 1,
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
