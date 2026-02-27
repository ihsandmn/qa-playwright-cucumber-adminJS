# QA Playwright Cucumber AdminJS

End-to-end (E2E) test automation for **AdminJS** using **Playwright** and **Cucumber** (BDD). Tests are written in Gherkin and executed via Playwright with multi-environment support.

## Tech Stack

| Tool | Purpose |
|------|---------|
| **Playwright** | Browser automation and test runner |
| **playwright-bdd** | BDD integration (Gherkin → Playwright) |
| **@cucumber/cucumber** | Gherkin parsing and step definitions |
| **dotenv** | Environment variables per env (dev/staging/qa) |
| **cross-env** | Cross-platform `ENV` for npm scripts |

## Prerequisites

- **Node.js** (v18+ recommended)
- **npm** or **yarn**

## Installation

```bash
npm install
npx playwright install
```

`npx playwright install` installs browser binaries (Chromium, etc.) required by Playwright.

## Project Structure

```
qa-playwright-cucumber-adminJS/
├── env/                    # Environment configs (not committed)
│   ├── .env.dev
│   ├── .env.staging
│   └── .env.qa
├── fixtures/
│   └── fixtures.ts         # Playwright fixtures (e.g. loginPage)
├── pages/
│   └── loginPages.ts       # Page Object for login
├── tests/
│   ├── features/           # Gherkin .feature files
│   │   └── login.feature
│   └── steps/              # Step definitions
│       └── login.steps.ts
├── utils/
│   ├── general.ts          # URL patterns, error messages, retry config
│   └── constants.ts        # Wait times (SHORT, MEDIUM, LONG)
├── playwright.config.ts    # Playwright + BDD config
└── package.json
```

## Environment Configuration

Tests use the `ENV` variable to load the right `.env` file from `env/`:

- **dev** (default): `env/.env.dev`
- **staging**: `env/.env.staging`
- **qa**: `env/.env.qa`

Each env file can define:

| Variable | Description | Example |
|----------|-------------|---------|
| `URL` | Base URL of AdminJS | `https://adminjs-demo.herokuapp.com` |
| `EMAIL` | Valid login email | `example@adminjs.co` |
| `PASSWORD` | Valid login password | `password` |

Create `env/.env.dev`, `env/.env.staging`, and `env/.env.qa` (e.g. by copying a sample). The `env/` folder is in `.gitignore` so credentials stay local.

## Running Tests

| Command | Description |
|---------|-------------|
| `npm run test` | Run all tests (default env: dev) |
| `npm run test-env-dev` | Run with `ENV=dev` |
| `npm run test-env-staging` | Run with `ENV=staging` |
| `npm run test-env-qa` | Run with `ENV=qa` |
| `npm run bddgen` | Generate Playwright specs from `.feature` files only |

Before each run, `bddgen` is executed so Gherkin features are converted to Playwright tests. You can run `npm run bddgen` alone to only regenerate.

## Test Scenarios (Login Feature)

The **Login** feature covers:

1. **Valid credentials** – User can log in and reaches dashboard.
2. **Invalid email and password** – Error message shown.
3. **Invalid email only** – Error message shown.
4. **Invalid password only** – Error message shown.
5. **Blank email** – Error when email is empty.
6. **Blank password** – Error when password is empty.
7. **Blank email and password** – Error when both are empty.

Assertions use URL redirect for success and visible error text for failure cases. Expected messages and URL patterns are in `utils/general.ts`.

## Playwright Configuration

- **Test directory**: BDD-generated tests from `tests/features/**/*.feature`.
- **Step definitions**: `tests/steps/**/*.steps.ts`.
- **Fixtures**: Defined in `fixtures/fixtures.ts` (e.g. `loginPage`).
- **Browser**: Desktop Chrome (1280×720); headless in CI, headed locally.
- **Reporters**: HTML report + list; trace/screenshot/video on failure.
- **Workers**: 3; retries: 2 in CI, 0 locally.

To run in headed mode locally, the config uses `headless: process.env.CI ? true : false`.

## Adding New Tests

1. **Feature**: Add or edit a `.feature` in `tests/features/` (Gherkin).
2. **Steps**: Implement steps in `tests/steps/*.steps.ts` using `createBdd(test)` and fixtures.
3. **Pages**: Add or extend Page Objects in `pages/` and expose them via `fixtures/fixtures.ts` if needed.
4. **Run**: `npm run test` or `npm run test-env-<env>`.

## Reports and Artifacts

- **HTML report**: `playwright-report/` (open with `npx playwright show-report`).
- **Test results**: `test-results/`.
- **Generated specs**: `.features-gen/` (from playwright-bdd; often gitignored).

## Scripts Reference

```json
"bddgen": "npx bddgen",
"test": "npm run bddgen && npx playwright test",
"test-env-dev": "npm run bddgen && cross-env ENV=dev npx playwright test",
"test-env-staging": "npm run bddgen && cross-env ENV=staging npx playwright test",
"test-env-qa": "npm run bddgen && cross-env ENV=qa npx playwright test"
```

## License

See repository license file.
