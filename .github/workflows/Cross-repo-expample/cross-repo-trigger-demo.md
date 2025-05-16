# 🔁 Cross-Repository Test Trigger — Demo Setup Guide

This guide demonstrates how to trigger automated tests in a **separate QA repository** (`qa-tests-repo`) when changes occur in your **main application repository** (`product-repo`).

> ✅ This setup is for **demo purposes only** — it will not trigger anything unless activated with a valid `repository_dispatch` event and secrets.

---

## 📦 Repositories Overview

| Repository        | Purpose                      |
|-------------------|------------------------------|
| `product-repo`    | Main application (e.g., frontend/backend code) |
| `qa-tests-repo`   | Dedicated for Playwright tests & automation |

---

## 🧩 1. `product-repo`: Dispatch Trigger YAML

Path: `.github/workflows/trigger-playwright-tests.yml`

```yaml
name: 🔁 Trigger QA Tests (demo only)

on:
  push:
    branches: [main]

jobs:
  trigger-qa-tests:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger CI in qa-tests-repo (demo)
        uses: peter-evans/repository-dispatch@v3
        with:
          token: ${{ secrets.QA_REPO_TOKEN }}
          repository: your-org/qa-tests-repo
          event-type: run-playwright-tests
          client-payload: '{"env": "sandbox"}'
```

### 🔐 GitHub Secret Required:
- `QA_REPO_TOKEN` → Personal Access Token with `repo` and `workflow` permissions

---

## 🧪 2. `qa-tests-repo`: Listener YAML

Path: `.github/workflows/playwright-dispatch.yml`

```yaml
name: 🚀 Playwright Tests on Dispatch (demo only)

on:
  repository_dispatch:
    types: [run-playwright-tests]

jobs:
  test-dispatched:
    runs-on: ubuntu-latest
    env:
      TEST_ENV: ${{ github.event.client_payload.env }}
    steps:
      - uses: actions/checkout@v3

      - run: npm ci

      - name: Install Playwright Browsers
        run: npx playwright install --with-deps

      - name: Run demo test on ${{ env.TEST_ENV }}
        run: |
          echo "🔥 Triggered externally!"
          echo "Running tests for ENV: $TEST_ENV"
          npx playwright test --grep @smoke --reporter=html
```

---

## ✅ Benefits
- Clear separation of codebase and test logic
- Easy to scale & reuse tests across projects
- Independent CI pipelines per concern

---

## 🚫 What This Demo Does NOT Do
- No real PAT or token is active
- Will not auto-trigger unless `repository_dispatch` is invoked by GitHub Actions
- You must replace `your-org/qa-tests-repo` and configure secrets to activate

---

## 🧭 Next Steps
1. Create GitHub PAT with `repo` + `workflow` scope
2. Add `QA_REPO_TOKEN` to `product-repo` secrets
3. Replace `your-org/qa-tests-repo` with actual repo name
4. Commit both YAML files
5. Watch the magic when you push to `main` in `product-repo`
