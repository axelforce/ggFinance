import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

// Load env file only if TEST_ENV is defined
if (process.env.TEST_ENV) {
  const envFile = `.env.${process.env.TEST_ENV}`;
  console.log(`✅ Loading env: ${envFile}`);
  dotenv.config({ path: envFile });
} else {
  console.warn('⚠️ TEST_ENV not set. No environment file loaded.');
}

console.log(`🌍 BASE_URL: ${process.env.BASE_URL || 'default (not set)'}`);

const config = defineConfig({
  testDir: './tests',
  testMatch: /.*\\.spec\\.ts/,
  timeout: 30 * 1000,
  fullyParallel: true,
  retries: 1,
  workers: 1,
  reporter: [
    ['html', { open: 'never' }],
    ['allure-playwright']
  ],
  use: {
    baseURL: process.env.BASE_URL || 'https://gigglefinance.com',
    browserName: 'chromium',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    headless: true,
    viewport: { width: 1280, height: 720 },
  },
  expect: {
    timeout: 35000,
    toMatchSnapshot: {
      maxDiffPixels: 30
    }
  },
  outputDir: 'test-results/',
});

export default config;
