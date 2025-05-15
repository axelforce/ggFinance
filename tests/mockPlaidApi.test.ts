import { test, expect } from '@playwright/test';

test.describe('Plaid API Mocking', () => {
  test('should mock Plaid link_token, exchange_token, accounts, and transactions endpoints', async ({ page }) => {
    // Mock link_token/create
    await page.route('**/plaid/link_token/create', async route => {
      const mockResponse = {
        link_token: 'mock-link-token',
        expiration: '2025-01-01T00:00:00Z',
        request_id: 'mock-request-id'
      };
      await route.fulfill({ json: mockResponse, status: 200 });
    });

    // Mock exchange_token
    await page.route('**/plaid/exchange_token', async route => {
      const mockResponse = {
        access_token: 'mock-access-token',
        item_id: 'mock-item-id',
      };
      await route.fulfill({ json: mockResponse, status: 200 });
    });

    // Mock accounts
    await page.route('**/plaid/accounts', async route => {
      const mockResponse = {
        accounts: [
          {
            account_id: 'acc123',
            name: 'Checking Account',
            type: 'depository',
            subtype: 'checking',
            balances: {
              available: 1200,
              current: 1250,
              limit: null,
            },
          },
        ],
      };
      await route.fulfill({ json: mockResponse, status: 200 });
    });

    // Mock transactions
    await page.route('**/plaid/transactions', async route => {
      const mockResponse = {
        transactions: [
          {
            transaction_id: 'txn_001',
            name: 'Coffee Shop',
            amount: 4.5,
            date: '2024-05-01',
            category: ['Food and Drink', 'Coffee Shop'],
          },
          {
            transaction_id: 'txn_002',
            name: 'Grocery Store',
            amount: 54.25,
            date: '2024-05-03',
            category: ['Shops', 'Groceries'],
          },
        ],
      };
      await route.fulfill({ json: mockResponse, status: 200 });
    });

    await page.goto('https://gigglefinance.com/start');

    // Simulate triggering Plaid Link flow if implemented

    await expect(page).toHaveURL(/.*start/);
  });
});
