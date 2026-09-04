import { defineConfig, devices } from "@playwright/test";

const baseURL = "http://localhost:4321";
const isCI = Boolean(process.env.CI);

export default defineConfig({
  forbidOnly: isCI,
  fullyParallel: true,
  outputDir: "test-results",
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
  reporter: isCI ? [["line"], ["html", { open: "never" }]] : "html",
  retries: isCI ? 2 : 0,
  testDir: "./tests/e2e",
  tsconfig: "./tests/tsconfig.json",
  use: {
    baseURL,
    screenshot: "only-on-failure",
    trace: "on-first-retry",
    video: "retain-on-failure",
  },
  webServer: {
    command: "bun run preview",
    env: {
      ASTRO_PREVIEW_BACKGROUND: "0",
    },
    reuseExistingServer: !isCI,
    timeout: 120_000,
    url: `${baseURL}/`,
  },
  workers: isCI ? 1 : undefined,
});
