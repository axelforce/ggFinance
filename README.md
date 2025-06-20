# 🧪 Playwright Testing Framework — README

This framework is a robust test automation setup built using **Playwright + TypeScript**, designed for running tests in multiple environments with support for CI pipelines, environment tagging, Allure reporting, and Slack notifications.

---

## 📦 Project Structure

```
/qa-tests-repo
│
├── tests/                   # All .spec.ts test files
├── helpers/                 # Utility modules (API, DB, mail, SMS, etc.)
├── fixtures/                # Reusable fixtures and test setup
├── env/                     # Optional env-based setup (future)
├── test-results/            # Output folder for traces, screenshots
├── playwright-report/       # HTML report
├── allure-report/           # Allure report
├── playwright.config.ts     # Playwright main config
├── .env.sandbox             # Example env (if used)
├── .env.staging             # Optional
├── .env.prod                # Optional
└── .github/workflows/       # GitHub Actions CI YAML
```

---

## ⚙️ Features

* ✅ Built with **Playwright** and **TypeScript**
* ✅ Supports multiple environments: `sandbox`, `staging`, `prod`
* ✅ Environment-specific `baseURL` handled via `TEST_ENV`
* ✅ Tags for test scopes: `@smoke`, `@critical`, `@full`
* ✅ Allure + HTML reports
* ✅ GitHub Actions CI/CD pipeline
* ✅ Slack notifications
* ✅ Supports `.env` secrets (optional, for production use)

---

## 🚀 How to Run Tests

### 🔁 1. Choose Environment

Set `TEST_ENV` to one of:

* `sandbox`
* `staging`
* `prod`

### 🧪 2. Run Test Locally

```bash
TEST_ENV=sandbox npx playwright test
```

Or with a tag:

```bash
TEST_ENV=staging npx playwright test --grep @smoke
```

### 🧪 Available Tags

* `@smoke` — critical UI flows
* `@critical` — deep validation for staging
* `@full` — nightly regression for sandbox

### 🔁 Example

```bash
TEST_ENV=prod npx playwright test --grep @smoke
```

---

## 🧩 Environment Configuration Logic

* No `.env` is required unless real secrets are needed.
* `TEST_ENV` maps to URLs in `playwright.config.ts`:

```ts
const baseURLs = {
  sandbox: 'https://sandbox.gigglefinance.com',
  staging: 'https://staging.gigglefinance.com',
  prod: 'https://app.gigglefinance.com',
};
```

If you use `.env` in the future:

* Create `.env.sandbox`, `.env.staging`, etc.
* Add secrets (API keys, DB, etc.)
* GitHub Actions will create `.env` dynamically from secrets

---

## 🤖 CI/CD Pipeline Behavior

GitHub Actions are configured with matrix strategy:

```yaml
matrix:
  test-env: [sandbox, staging, prod]
```

### Trigger Logic

| Event         | ENV run        | Tests run             |
| ------------- | -------------- | --------------------- |
| `push`/`PR`   | `sandbox only` | `@smoke`              |
| `main` branch | staging, prod  | `@critical`, `@smoke` |
| `schedule`    | `sandbox`      | `@full`               |

---

## 📊 Reports

* 🟢 **HTML**: `playwright-report/`
* 🟣 **Allure**: `allure-report/`

Artifacts are uploaded in CI.

---

## 🔔 Slack Notifications

* ✅ Always for `push`, `PR`, `main`
* ❌ Only on failure for `schedule`
* Uses `SLACK_WEBHOOK_URL` and `SLACK_CHANNEL_ID`

---

## 🧰 Helpers Included

* `apiHelper.ts` — make REST API calls
* `sqlHelper.ts` — run SQL queries
* `mailHelper.ts` — check mailboxes
* `smsHelper.ts` — check SMS content
* `db.ts` — reusable DB connection (PostgreSQL, MySQL supported)

---

## 🧪 Sample Test Command

```bash
TEST_ENV=sandbox npx playwright test --grep @smoke
```

## ⚙️ Sample Config Debug

```bash
node -v
npm -v
TEST_ENV=staging npx playwright test --list
```

---

## 📌 Notes

* `testMatch: /\.spec\.ts$/` used to detect test files
* `baseURL` is dynamically selected via `TEST_ENV`
* No secrets are hardcoded
* `.env` support is ready but not required

