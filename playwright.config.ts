import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests',
  testMatch: /.*\.spec\.ts/,
  timeout: 30 * 1000,
  fullyParallel: true,
  retries: 1,
  workers: 1,
  reporter: [['html', { open: 'never' }]],
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://gigglefinance.com',
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
  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: 'test-results/',
};

export default config;