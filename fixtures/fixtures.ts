import { test as base } from "playwright-bdd";
import { LoginPage } from "../pages/loginPages";

/**
 * Fixtures for the test suite
 */
export const test = base.extend<{
	loginPage: LoginPage;
}>({
	loginPage: async ({ page }, use) => {
		const loginPage = new LoginPage(page);
		await use(loginPage);
	},
});
