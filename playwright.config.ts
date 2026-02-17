import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 10000,
  expect: {
    timeout: 10000,
  },
  retries: 0,
  reporter: [["html"], ["list"]],
  use: {
    baseURL: "https://demoqa.com",
    headless: true,
    viewport: { width: 1280, height: 720 },
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
});
