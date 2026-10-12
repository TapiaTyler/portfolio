import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/browser",
  fullyParallel: true,
  // One worker against one `next start` server keeps cold asset loads predictable;
  // the suite is small enough that parallelism buys little.
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
