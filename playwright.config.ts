import { defineConfig, devices } from "@playwright/test";
import { defineBddConfig } from "playwright-bdd";
import dotenv from "dotenv";

// Playwright configuration for BDD
const testDir = defineBddConfig({
	importTestFrom: "fixtures/fixtures.ts",
	paths: ["tests/features/**/*.feature"],
	require: ["tests/steps/**/*.steps.ts"],
});

const envName = process.env.ENV || "dev";
dotenv.config({
	path: `env/.env.${envName}`,
});

/**
 * Playwright configuration for TDD
 */
export default defineConfig({
	testDir,
	/* Run tests in files in parallel */
	fullyParallel: true,
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
		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: "on-first-retry",
		// Screenshot only on failure
		screenshot: "only-on-failure",
		// Video only on failure
		video: "retain-on-failure",
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
		// {
		// 	name: "AdminJS In Firefox",
		// 	use: {
		// 		...devices["Desktop Firefox"],
		// 		viewport: { width: 1280, height: 720 },
		// 		headless: true,
		// 		screenshot: "on",
		// 		trace: "retain-on-failure",
		// 		launchOptions: {
		// 			slowMo: 1000,
		// 		},
		// 	},
		// },
		// {
		// 	name: "AdminJS In Safari",
		// 	use: {
		// 		...devices["Desktop Safari"],
		// 		viewport: { width: 1280, height: 720 },
		// 		headless: true,
		// 		screenshot: "on",
		// 		trace: "retain-on-failure",
		// 		launchOptions: {
		// 			slowMo: 1000,
		// 		},
		// 	},
		// },
	],
});
