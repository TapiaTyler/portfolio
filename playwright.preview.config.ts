import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/preview",
  // Separate artifacts from production checks so concurrent runs cannot delete traces.
  outputDir: ".cache/preview-test-results",
  workers: 1,
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
