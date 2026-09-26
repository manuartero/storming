import { defineConfig, devices } from "@playwright/test";

const CI = !!process.env.CI;
const baseURL = process.env.BASE_URL ?? "http://localhost:3000";

export default defineConfig({
  testDir: "./app",
  fullyParallel: true,
  forbidOnly: CI,
  retries: CI ? 2 : 0,
  workers: CI ? 2 : undefined,
  reporter: CI ? [["html", { open: "never" }], ["list"]] : "list",
  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    // framer-motion's timeline animations are off with prefers-reduced-motion
    reducedMotion: "reduce",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "npm run dev -- --host --port 3000 --strictPort",
    url: baseURL,
    cwd: "..",
    reuseExistingServer: !CI,
    timeout: 120_000,
    // vite opens a browser tab unless told not to
    env: { BROWSER: "none" },
  },
});
