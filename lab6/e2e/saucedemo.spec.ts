import { test, expect } from '@playwright/test';

test.describe('Sauce Demo E2E Tests', () => {
  const standardUser = {
    username: 'standard_user',
    password: 'secret_sauce'
  };

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
  });

  test('should successfully login with standard user', async ({ page }) => {
    await page.fill('#user-name', standardUser.username);
    await page.waitForTimeout(500);
    await page.fill('#password', standardUser.password);
    await page.waitForTimeout(500);
    await page.click('#login-button');
    await page.waitForTimeout(1000);

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('should display error with invalid credentials', async ({ page }) => {
    await page.fill('#user-name', 'invalid_user');
    await page.waitForTimeout(500);
    await page.fill('#password', 'invalid_password');
    await page.waitForTimeout(500);
    await page.click('#login-button');
    await page.waitForTimeout(1000);

    const errorMessage = await page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Username and password do not match');
  });

  test('should add items to cart and checkout', async ({ page }) => {
    // Login first
    await page.fill('#user-name', standardUser.username);
    await page.fill('#password', standardUser.password);
    await page.click('#login-button');
    await page.waitForTimeout(1000);

    // Add items to cart
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.waitForTimeout(500);
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
    await page.waitForTimeout(500);

    // Verify cart badge
    const cartBadge = await page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('2');

    // Go to cart
    await page.click('.shopping_cart_link');
    await page.waitForTimeout(1000);

    // Verify items in cart
    const cartItems = await page.locator('.cart_item');
    await expect(cartItems).toHaveCount(2);

    // Proceed to checkout
    await page.click('[data-test="checkout"]');
    await page.waitForTimeout(1000);

    // Fill checkout information
    await page.fill('[data-test="firstName"]', 'John');
    await page.waitForTimeout(500);
    await page.fill('[data-test="lastName"]', 'Doe');
    await page.waitForTimeout(500);
    await page.fill('[data-test="postalCode"]', '12345');
    await page.waitForTimeout(500);
    await page.click('[data-test="continue"]');
    await page.waitForTimeout(1000);

    // Complete checkout
    await page.click('[data-test="finish"]');
    await page.waitForTimeout(1000);

    // Verify successful checkout
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  });

  test('should sort products', async ({ page }) => {
    // Login
    await page.fill('#user-name', standardUser.username);
    await page.fill('#password', standardUser.password);
    await page.click('#login-button');
    await page.waitForTimeout(1000);

    // Sort by price high to low
    await page.selectOption('.product_sort_container', 'hilo');
    await page.waitForTimeout(1000);

    // Get all prices
    const prices = await page.locator('.inventory_item_price').allTextContents();
    const numericPrices = prices.map(price => parseFloat(price.replace('$', '')));

    // Verify prices are sorted correctly
    const isSorted = numericPrices.every((price, index) => {
      if (index === 0) return true;
      return price <= numericPrices[index - 1];
    });

    expect(isSorted).toBeTruthy();
  });

  test('should successfully logout', async ({ page }) => {
    // Login
    await page.fill('#user-name', standardUser.username);
    await page.fill('#password', standardUser.password);
    await page.click('#login-button');
    await page.waitForTimeout(1000);

    // Open burger menu
    await page.click('#react-burger-menu-btn');
    await page.waitForTimeout(1000);

    // Click logout
    await page.click('#logout_sidebar_link');
    await page.waitForTimeout(1000);

    // Verify return to login page
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.locator('#login-button')).toBeVisible();
  });
});