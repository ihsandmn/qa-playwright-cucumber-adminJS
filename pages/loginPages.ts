import { expect, type Locator, type Page } from "@playwright/test";

export class LoginPage {
	readonly page: Page;
	readonly emailField: Locator;
	readonly passwordField: Locator;
	readonly loginButton: Locator;
	readonly errorMessage: (message: string) => Locator;

	constructor(page) {
		this.page = page;
		this.emailField = page.getByRole("textbox", { name: "Email" });
		this.passwordField = page.getByRole("textbox", { name: "Password" });
		this.loginButton = page.getByRole("button", { name: "Login" });
		this.errorMessage = (message: string) => page.getByText(message);
	}

	async navigateToUrl(url) {
		await this.page.goto(url);
	}

	async fillEmail(email) {
		await this.emailField.fill(email);
	}

	async fillPassword(password) {
		await this.passwordField.fill(password);
	}

	async clickLoginButton() {
		await this.loginButton.click();
	}

	async verifyErrorMessage(message) {
		await expect(this.errorMessage(message)).toHaveText(message);
		await expect(this.errorMessage(message)).toBeVisible();
	}

	async verifyLoginSuccess(url) {
		await expect(this.page).toHaveURL(new RegExp(url));
	}
}
