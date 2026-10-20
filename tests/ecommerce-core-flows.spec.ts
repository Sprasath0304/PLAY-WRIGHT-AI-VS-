// spec: E-commerce Core Flows
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('E-commerce Core Flows', () => {
  test('Browse Products', async ({ page }) => {
    await page.goto('https://sauce-demo.myshopify.com/');
    await expect(page).toHaveTitle(/Sauce Demo/);

    const productLink = page.locator('a[href*="/collections/frontpage/products/"]').first();
    await expect(productLink).toBeVisible();
    await expect(productLink).toContainText(/£/);

    await productLink.click();

    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('input#add')).toBeVisible();
    await expect(page.locator('.price').first()).toContainText(/£/);
    await expect(page.locator('img')).toBeVisible();
  });

  test('Search & Filter', async ({ page }) => {
    await page.goto('https://sauce-demo.myshopify.com/');

    const search = page.locator('input#search-field');
    await search.fill('jacket');
    await search.press('Enter');

    const productLinks = page.locator('a[href*="/collections/frontpage/products/"]');
    await expect(productLinks.first()).toBeVisible();
    await expect(productLinks).toHaveCountGreaterThan(0);

    const matchingResults = productLinks.filter({ hasText: /jacket/i });
    if (await matchingResults.count()) {
      await expect(matchingResults.first()).toBeVisible();
    }

    const filter = page.locator('select, [data-filter], button:has-text("Filter")').first();
    if (await filter.count()) {
      await filter.click();
    }
  });

  test('Add to Cart & Update Quantity', async ({ page }) => {
    await page.goto('https://sauce-demo.myshopify.com/collections/frontpage/products/grey-jacket');
    await page.locator('input#add').click();

    const cartLink = page.locator('a:has-text("My Cart")').first();
    await expect(cartLink).toContainText(/My Cart \(\d+\)/);

    await page.goto('https://sauce-demo.myshopify.com/cart');
    await expect(page.locator('a[href*="/products/grey-jacket"]').first()).toBeVisible();
    const quantityInput = page.locator('input[name="updates[]"]');
    await expect(quantityInput).toHaveValue('1');

    await quantityInput.fill('2');
    await page.locator('input[name="update"]').click();
    await expect(quantityInput).toHaveValue('2');
    await expect(page.getByText('£110.00')).toBeVisible();

    await page.locator('a:has-text("Remove")').click();
    await expect(page.getByText('It appears that your cart is currently empty!')).toBeVisible();
  });

  test('Checkout (Guest flow)', async ({ page }) => {
    await page.goto('https://sauce-demo.myshopify.com/collections/frontpage/products/grey-jacket');
    await page.locator('input#add').click();
    await page.getByRole('link', { name: /My Cart/ }).first().click();
    await page.locator('input#checkout').click();

    await expect(page.locator('input#email')).toBeVisible();
    await expect(page.locator('input[placeholder*="Last name"]').first()).toBeVisible();
    await expect(page.locator('input[placeholder*="Address"]').first()).toBeVisible();
    await expect(page.locator('input[placeholder*="City"]').first()).toBeVisible();
    await expect(page.locator('input[placeholder*="Postal"]').first()).toBeVisible();

    await page.locator('input#email').fill('guest@example.com');
    await page.locator('input[placeholder*="Last name"]').fill('Tester');
    await page.locator('input[placeholder*="Address"]').fill('123 Test Street');
    await page.locator('input[placeholder*="City"]').fill('Bengaluru');
    await page.locator('input[placeholder*="Postal"]').fill('560001');

    const continueButton = page.getByRole('button', { name: /continue|shipping/i }).first();
    if (await continueButton.count()) {
      await continueButton.click();
      await expect(page.getByText(/Contact|Shipping|Payment/i).first()).toBeVisible();
    }
  });

  test('Account Signup & Login', async ({ page }) => {
    const email = `tester-${Date.now()}@example.com`;
    const password = 'Password123!';

    await page.goto('https://sauce-demo.myshopify.com/account/register');
    await expect(page.locator('h1')).toContainText(/Create Account/i);
    await expect(page.locator('input[type="email"]').first()).toBeVisible();
    await expect(page.locator('input[type="password"]').first()).toBeVisible();

    await page.locator('input[type="email"]').fill(email);
    await page.locator('input[type="password"]').fill(password);

    const createButton = page.locator('input[type="submit"], button:has-text("Create")').first();
    if (await createButton.count()) {
      await createButton.click();
      await expect(page).toHaveURL(/\/account|\/login|\/register/);
    }

    await page.goto('https://sauce-demo.myshopify.com/account/login');
    await expect(page.locator('h1')).toContainText(/Customer Login/i);
    await page.locator('input[type="email"]').fill(email);
    await page.locator('input[type="password"]').fill(password);
    await page.locator('input[type="submit"]').first().click();

    await expect(page).toHaveURL(/\/account/);
  });
});
