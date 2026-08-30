import { defineConfig, devices } from "@playwright/test";

const baseURL = "http://localhost:4321";
const isCI = Boolean(process.env.CI);

export default defineConfig({
  testDir: "./tests/e2e",
  tsconfig: "./tests/tsconfig.json",
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: isCI ? [["line"], ["html", { open: "never" }]] : "html",
  outputDir: "test-results",

  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

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

  webServer: {
    command: "bun run preview",
    env: {
      ASTRO_PREVIEW_BACKGROUND: "0",
    },
    url: `${baseURL}/`,
    timeout: 120_000,
    reuseExistingServer: !isCI,
  },
});
