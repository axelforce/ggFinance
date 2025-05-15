import { Page, Locator, expect } from '@playwright/test';

export class PlaidLinkPage {
  readonly page: Page;
  readonly continueButton: Locator;
  readonly institutionSearch: Locator;

  constructor(page: Page) {
    this.page = page;
    this.continueButton = page.locator('button', { hasText: 'Continue' });
    this.institutionSearch = page.locator('input[placeholder="Search for your bank"]');
  }

  async connectBank(institution: string) {
    await this.institutionSearch.fill(institution);
    await this.page.locator(`text=${institution}`).click();
    await this.page.locator('button', { hasText: 'Connect' }).click();
  }

  async verifyLinkSuccess() {
    await expect(this.page.locator('text=Bank linked successfully')).toBeVisible();
  }
}
