import { test, expect } from '@playwright/test';
import { initAPIContext, postRequest } from '../helpers/apiHelper';

test.describe('Plaid API Integration', () => {
  let api;

  test.beforeAll(async () => {
    api = await initAPIContext();
  });

  test('should simulate account link via Plaid', async () => {
    const mockPublicToken = 'public-sandbox-12345678';
    const exchangeRes = await postRequest('/plaid/exchange_token', {
      public_token: mockPublicToken,
    });

    expect(exchangeRes).toHaveProperty('access_token');
    expect(exchangeRes).toHaveProperty('item_id');
  });

  test('should retrieve linked accounts', async () => {
    const accountsRes = await postRequest('/plaid/accounts', {});
    expect(accountsRes.accounts.length).toBeGreaterThan(0);
    expect(accountsRes.accounts[0]).toHaveProperty('name');
  });
});
