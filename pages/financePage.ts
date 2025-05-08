import {WebPage} from "./webPage";
import { Locator, Page, BrowserContext } from '@playwright/test';

export class FinancePage extends WebPage {
  readonly contactForm: Locator;

  
    static clickContactUs() {
      throw new Error('Method not implemented.');
    }
    constructor(page: Page, context?: BrowserContext) {
        super(page, context ?? {} as BrowserContext);
        this.contactForm = page.locator('[id="zoho-contact-form"]');
      }
  
    async navigateToHomePage() {
      await this.page.goto('https://gigglefinance.com');
    }
  
    async clickContactUs() {
      await this.page.click('text=Contact Us');
    }
  
    async getHeaderText() {
      return this.page.locator('h1').textContent();
    }
  
    async isContactFormVisible() {
      return this.page.locator('form').isVisible();
    }
  
    async getFooterLinks() {
      return this.page.locator('footer a');
    }
  
    async clickFooterLink(index: number) {
      await this.page.locator('footer a').nth(index).click();
    }
  
    async isLoanCalculatorVisible() {
      return this.page.locator('#loan-calculator').isVisible();
    }
  
    async fillLoanAmount(amount: string) {
      await this.page.locator('#loan-calculator input[name="amount"]').fill(amount);
    }
  
    async clickCalculateButton() {
      await this.page.locator('#loan-calculator button:has-text("Calculate")').click();
    }
  
    async getLoanCalculatorResult() {
      return this.page.locator('#loan-calculator .result').textContent();
    }
  }