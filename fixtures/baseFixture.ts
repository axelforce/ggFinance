import {test as base} from '@playwright/test';
import {FinancePage} from "../pages/financePage";

type ixsFixtures = {
  financePage: FinancePage;
}

export const test = base.extend<ixsFixtures>({
  page: async ({ baseURL, page }, use) => {
    if (!baseURL) {
      throw new Error("baseURL is undefined");
    }
    await page.goto(baseURL);
    await use(page);
  },

  financePage: async ({ page, context }, use) => {
    await use(new FinancePage(page, context));
  },
});
