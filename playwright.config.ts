import { defineConfig, devices } from "playwright/test";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();
const baseURL = process.env.DEV_URL;
console.log(`Running tests in ${baseURL}`);

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
	testDir: "./features",
	timeout: 120000, // Increase global timeout from 60s to 120s
	expect: {
		timeout: 10000, // Increase expect timeout from 5s to 10s
	},
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Configure parallel mode for all test files */
	testMatch: "**/*.spec.ts",
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: process.env.CI ? 2 : 0,
	/* Parallel workers configuration */
	workers: 3, // Force single worker for all test runs
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: [["html"], ["list"]],
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Base URL to use in actions like `await page.goto('/')`. */
		baseURL,
		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: "on-first-retry",
		// Screenshot only on failure
		screenshot: "only-on-failure",
		// Video only on failure
		video: "retain-on-failure",
		navigationTimeout: 90000, // Increase navigation timeout from 60s to 90s
		actionTimeout: 60000, // Increase action timeout from 30s to 60s
	},

	/* Configure projects for major browsers */
	projects: [
		{
			name: "AdminJS In Chrome",
			use: {
				...devices["Desktop Chrome"],
				viewport: { width: 1280, height: 720 },
				headless: process.env.CI ? true : false,
				screenshot: "on",
				trace: "retain-on-failure",
				launchOptions: {
					slowMo: 1000, // Slow down execution for debugging
				},
			},
		},
		{
			name: "AdminJS In Firefox",
			use: {
				...devices["Desktop Firefox"],
				viewport: { width: 1280, height: 720 },
				headless: true,
				screenshot: "on",
				trace: "retain-on-failure",
				launchOptions: {
					slowMo: 1000,
				},
			},
		},
		{
			name: "AdminJS In Safari",
			use: {
				...devices["Desktop Safari"],
				viewport: { width: 1280, height: 720 },
				headless: true,
				screenshot: "on",
				trace: "retain-on-failure",
				launchOptions: {
					slowMo: 1000,
				},
			},
		},
	],
});
