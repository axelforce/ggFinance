import { test } from '../fixtures/baseFixture';
import { expect } from '@playwright/test';

// This test suite is for testing the homepage of the G Finance website.
test('Homepage should load with main title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Giggle Finance/i);
});