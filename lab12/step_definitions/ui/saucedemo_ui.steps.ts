import { Given, When, Then } from '@cucumber/cucumber';
const { Before, After } = require('@cucumber/cucumber');
import { Browser, BrowserContext, Page, chromium, expect } from '@playwright/test';
import { LoginPage } from '../../page_objects/loginPage';
import { InventoryPage } from '../../page_objects/inventoryPage';

let browser: Browser;
let context: BrowserContext;
let page: Page;
let loginPage: LoginPage;
let inventoryPage: InventoryPage;

// Hooks
Before(async function() {
  browser = await chromium.launch({ headless: false });
  context = await browser.newContext();
  page = await context.newPage();
  loginPage = new LoginPage(page);
  inventoryPage = new InventoryPage(page);
});

After(async function() {
  await browser.close();
});

// Step definitions
Given('I am on the login page', async function() {
  await loginPage.navigateToLoginPage();
});

When('I enter {string} as username', async function(username) {
  await page.fill('#user-name', username);
});

When('I enter {string} as password', async function(password) {
  await page.fill('#password', password);
});

When('I click the login button', async function() {
  await page.click('#login-button');
});

Then('I should be logged in successfully', async function() {
  await expect(page.locator('.inventory_list')).toBeVisible();
});

Given('I am logged in as {string}', async function(username) {
  await loginPage.navigateToLoginPage();
  await loginPage.login(username, 'secret_sauce');
  await expect(page.locator('.inventory_list')).toBeVisible();
});

When('I add {string} to cart', async function(itemName) {
  await inventoryPage.addItemToCart(itemName);
});

Then('I should see {string} item\\(s) in the cart badge', async function(count) {
  const badgeText = await inventoryPage.getCartBadgeCount();
  expect(badgeText).toBe(count);
});

Then('I should see an error message {string}', async function(errorMessage) {
  const actualError = await loginPage.getErrorMessage();
  expect(actualError).toContain(errorMessage);
});