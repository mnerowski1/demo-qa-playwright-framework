import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30000,
  expect: {
    timeout: 10000,
  },
  retries: 2,
  reporter: [["html"], ["list"], ["junit", { outputFile: "test-results.xml" }]],
  use: {
    baseURL: "https://demoqa.com",
    headless: true,
    viewport: { width: 1280, height: 720 },
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
});
