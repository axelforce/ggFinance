import { test } from '../fixtures/baseFixture';
import { expect } from '@playwright/test';

test('Homepage should load with main title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Giggle Finance/i);
});