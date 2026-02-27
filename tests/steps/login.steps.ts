import { createBdd } from "playwright-bdd";
import { test } from "../../fixtures/fixtures";
import { base } from "../../utils/general";

const { Given, When, Then } = createBdd(test);

Given("I navigate to login page", async ({ loginPage }) => {
	await loginPage.navigateToUrl(process.env.URL);
	console.log("URL: ", process.env.URL);
});

When("I fill email credential", async ({ loginPage }) => {
	await loginPage.fillEmail(process.env.EMAIL);
	console.log("Email: ", process.env.EMAIL);
});

When(
	"I fill email credential with invalid email credential",
	async ({ loginPage }) => {
		await loginPage.fillEmail("invalid@example.com");
		console.log("Invalid Email: ", "invalid@example.com");
	},
);

When("I clear email credential", async ({ loginPage }) => {
	await loginPage.emailField.clear();
	console.log("Email: ", "");
});

When("I fill password credential", async ({ loginPage }) => {
	await loginPage.fillPassword(process.env.PASSWORD);
	console.log("Password: ", process.env.PASSWORD);
});

When(
	"I fill password credential with invalid password credential",
	async ({ loginPage }) => {
		await loginPage.fillPassword("invalidpassword");
		console.log("Invalid Password: ", "invalidpassword");
	},
);

When("I clear password credential", async ({ loginPage }) => {
	await loginPage.passwordField.clear();
	console.log("Password: ", "");
});

When("I click the login button", async ({ loginPage }) => {
	await loginPage.clickLoginButton();
});

Then("I should be logged in successfully", async ({ loginPage }) => {
	await loginPage.verifyLoginSuccess(
		process.env.URL + base.general.urlPatterns.dashboardPage,
	);
});

Then(
	"I should see an error message for invalid email credential",
	async ({ loginPage }) => {
		await loginPage.verifyErrorMessage(base.general.errorMessages.invalidEmail);
		console.log("Error Message: ", base.general.errorMessages.invalidEmail);
	},
);

Then(
	"I should see an error message for invalid password credential",
	async ({ loginPage }) => {
		await loginPage.verifyErrorMessage(
			base.general.errorMessages.invalidPassword,
		);
		console.log("Error Message: ", base.general.errorMessages.invalidPassword);
	},
);

Then(
	"I should see an error message for invalid email and password credential",
	async ({ loginPage }) => {
		await loginPage.verifyErrorMessage(
			base.general.errorMessages.invalidEmailAndPassword,
		);
		console.log(
			"Error Message: ",
			base.general.errorMessages.invalidEmailAndPassword,
		);
	},
);

Then(
	"I should see an error message for blank email credential",
	async ({ loginPage }) => {
		await loginPage.verifyErrorMessage(base.general.errorMessages.blankEmail);
		console.log("Error Message: ", base.general.errorMessages.blankEmail);
	},
);

Then(
	"I should see an error message for blank password credential",
	async ({ loginPage }) => {
		await loginPage.verifyErrorMessage(
			base.general.errorMessages.blankPassword,
		);
		console.log("Error Message: ", base.general.errorMessages.blankPassword);
	},
);

Then(
	"I should see an error message for blank email and password credential",
	async ({ loginPage }) => {
		await loginPage.verifyErrorMessage(
			base.general.errorMessages.blankEmailAndPassword,
		);
		console.log(
			"Error Message: ",
			base.general.errorMessages.blankEmailAndPassword,
		);
	},
);
