# TodoMVC Playwright

Playwright + TypeScript end-to-end tests for the [TodoMVC](https://demo.playwright.dev/todomvc/#/) application.

## Stack

- **Playwright** 1.52 — browser automation
- **TypeScript** 5.8 — type safety
- **ESLint** 8 + **Prettier** 3 — code quality & formatting
- **Husky** 9 — auto-runs `npm run lint` before every `git push`
- **GitHub Actions** — CI pipeline (lint + tests on every push/PR)

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or 20
- npm (comes with Node.js)

## Setup

```bash
git clone https://github.com/DfctPixel/todomvc-playwright.git
cd todomvc-playwright
npm install
npx playwright install
```

If you skip the `.env` file, the tests will use the default URL (`https://demo.playwright.dev/todomvc`).

## Running tests

```bash
# Run all tests headlessly (no browser window, default)
npm test

# Run with visible browser window — useful for debugging
npm run test:headed

# Run in CI mode — generates HTML report only (no auto-open)
npm run test:ci
```

### Run a single test file

```bash
npx playwright test tests/todo-crud.spec.ts
```

### Run a single test

```bash
npx playwright test --grep "should create a todo"
```

### View HTML report

After running `npm run test:ci`:

```bash
npx playwright show-report
```

This opens an interactive HTML report in your browser with test results, timings, and error details.

## Lint & format

```bash
npm run lint          # check for code issues
npm run format        # auto-format all files
npm run format:check  # check formatting without making changes
```

## CI (GitHub Actions)

On every push or pull request, the CI pipeline automatically:

1. Checks out the code
2. Installs Node.js 20 + npm dependencies
3. Installs Chromium
4. Runs `npm run lint`
5. Runs `npm run test:ci`
6. Uploads the HTML report as a downloadable artifact

## Husky (pre-push hook)

Husky runs `npm run lint` automatically whenever you run `git push`. If linting fails, the push is blocked until you fix the issues. This ensures only clean code is pushed to GitHub.

