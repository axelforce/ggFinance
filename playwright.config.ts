import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

// Load .env only if TEST_ENV is defined
if (process.env.TEST_ENV) {
  const envFile = `.env.${process.env.TEST_ENV}`;
  console.log(`✅ Loading env: ${envFile}`);
  dotenv.config({ path: envFile });
} else {
  console.warn('⚠️ TEST_ENV not set. No environment file loaded.');
}

// Optional: fallback baseURLs by ENV if you don't use .env at all
const baseURLs: Record<string, string> = {
  sandbox: 'https://gigglefinance.com',
  staging: 'https://gigglefinance.com',
  prod: 'https://gigglefinance.com',
};

const baseURL =
  process.env.BASE_URL ||
  baseURLs[process.env.TEST_ENV as keyof typeof baseURLs] ||
  'https://gigglefinance.com';

console.log(`🌍 Running ENV: ${process.env.TEST_ENV}`);
console.log(`🔗 baseURL: ${baseURL}`);

const config = defineConfig({
  testDir: './tests',
  testMatch: /\.spec\.ts$/,
  timeout: 30_000,
  fullyParallel: true,
  retries: 1,
  workers: 1,
  reporter: [
    ['html', { open: 'never' }],
    ['allure-playwright']
  ],
  use: {
    baseURL,
    browserName: 'chromium',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    headless: true,
    viewport: { width: 1280, height: 720 },
  },
  expect: {
    timeout: 35_000,
    toMatchSnapshot: {
      maxDiffPixels: 30
    }
  },
  outputDir: 'test-results/',
});

export default config;
