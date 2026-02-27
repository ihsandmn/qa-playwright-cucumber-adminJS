export const base = {
	general: {
		retryConfig: {
			maxRetries: 3,
			messages: {
				retryLoading: "Retry loading attempt {count} of {max}",
				failedRedirect: "Failed to redirect after {max} attempts",
				failedLogin: "Failed login attempt {count}. Retrying...",
			},
		},
		urlPatterns: {
			loginPage: "",
			dashboardPage: "/app",
		},
		errorMessages: {
			invalidEmail: "Wrong email and/or password",
			invalidPassword: "Wrong email and/or password",
			invalidEmailAndPassword: "Wrong email and/or password",
			blankEmail: "Wrong email and/or password",
			blankPassword: "Wrong email and/or password",
			blankEmailAndPassword: "Wrong email and/or password",
		},
	},
};
