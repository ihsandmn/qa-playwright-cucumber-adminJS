import type { Locator, Page } from "@playwright/test";

export class LoginElements {
	readonly email: Locator;
	readonly password: Locator;
	readonly loginButton: Locator;
	readonly errorMessage: (message: string) => Locator;

	constructor(page: Page) {
		this.email = page.getByRole("textbox", { name: "Email" });
		this.password = page.getByRole("textbox", { name: "Password" });
		this.loginButton = page.getByRole("button", { name: "Login" });
		this.errorMessage = (message: string) => page.getByText(message);
	}
}
