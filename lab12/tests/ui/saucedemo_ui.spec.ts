import { test, expect } from '@playwright/test';

// Test case to verify successful login with valid credentials
test('should log in successfully', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await expect(page.locator('.inventory_list')).toBeVisible();
});

// Test case to verify adding an item to the shopping cart
test('should add item to cart', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.click('#add-to-cart-sauce-labs-backpack');
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});

// Test case to verify error message display with invalid login credentials
test('should display error on invalid login', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'invalid_user');
    await page.fill('#password', 'wrong_password');
    await page.click('#login-button');
    await expect(page.locator('[data-test="error"]')).toBeVisible();
});

// Test case to verify product sorting functionality by price (high to low)
test('should sort products by price', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.selectOption('.product_sort_container', 'hilo');
    const firstPrice = await page.locator('.inventory_item_price').first().innerText();
    expect(firstPrice).toBe('$49.99');
});

// Test case to verify complete checkout process from cart to order confirmation
test('should complete checkout process', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.click('#add-to-cart-sauce-labs-backpack');
    await page.click('.shopping_cart_link');
    await page.click('#checkout');
    await page.fill('#first-name', 'John');
    await page.fill('#last-name', 'Doe');
    await page.fill('#postal-code', '12345');
    await page.click('#continue');
    await page.click('#finish');
    await expect(page.locator('.complete-header')).toBeVisible();
});