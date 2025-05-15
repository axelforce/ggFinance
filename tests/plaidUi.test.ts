import { test } from '@playwright/test';
import { PlaidLinkPage } from '../pages/plaidLinkPage';

test.describe('Plaid UI Flow', () => {
  test('user should be able to link a bank account via Plaid', async ({ page }) => {
    const plaid = new PlaidLinkPage(page);

    await page.goto('https://gigglefinance.com/start');

    await plaid.connectBank('Chase');
    await plaid.verifyLinkSuccess();
  });
});
