import { expect } from '@playwright/test';
import { test } from '../fixtures/baseFixture'

test.beforeEach(async ({ page, financePage }) => {;
  await financePage.navigateToHomePage();
});

test('@smoke Navigation to Contact Us page', async ({ page, financePage }) => {
  await financePage.clickContactUs();

  expect(await financePage.getHeaderText()).toBe('Contact us');
  // Check if the contact form is visible
  await expect(financePage.contactForm).toBeVisible();
});

test('Footer links are visible and functional', async ({ page, financePage }) => {
  const footerLinks = await financePage.getFooterLinks();

  const footerTexts = await footerLinks.allTextContents();

  // Check for partial matches in the footer text
  expect(footerTexts.some(text => text.includes('Privacy Policy'))).toBeTruthy();
  expect(footerTexts.some(text => text.includes('Partnerships'))).toBeTruthy();
  expect(footerTexts.some(text => text.includes('Knowledge Base'))).toBeTruthy();

  await financePage.clickFooterLink(0);
  await expect(page).toHaveURL(/about-us/);
});