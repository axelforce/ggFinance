import {BrowserContext, expect, Locator, Page} from '@playwright/test';

export class WebPage {
  readonly page: Page;
  readonly context: BrowserContext;

  constructor(page: Page, context: BrowserContext) {
    this.page = page;
    this.context = context;
  }
}