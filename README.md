# TodoMVC Playwright

Playwright + TypeScript tests for [TodoMVC](https://demo.playwright.dev/todomvc/#/).

## Stack

- **Playwright** 1.52 — E2E testing
- **TypeScript** 5.8 — type-safe code
- **ESLint** 8 + **Prettier** 3 — lint & format
- **Husky** 9 — pre-push lint hook
- **GitHub Actions** — CI pipeline

## Setup

```bash
npm install
npx playwright install
```

## Run tests

```bash
npm test              # headless
npm run test:headed   # with browser UI
npm run test:ci       # generates HTML report
```

## Lint & format

```bash
npm run lint
npm run format
```

## .env

```env
BASE_URL=https://demo.playwright.dev/todomvc
```

## CI

GitHub Actions runs lint + tests on push/PR. Report uploaded as artifact.

## Results

All 6 CRUD tests pass: create, read, update, delete, complete, clear.
