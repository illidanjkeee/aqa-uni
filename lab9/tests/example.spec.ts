import { test, expect } from '@playwright/test';

// UI Tests
test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'Get started' }).click();
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

// More UI Tests
test('navigation menu works', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'Docs' }).click();
  await expect(page.url()).toContain('/docs/');
});

test('search functionality works', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('button', { name: 'Search' }).click();
  await page.getByPlaceholder('Search docs').fill('assertions');
  await expect(page.getByText('Assertions')).toBeVisible({ timeout: 5000 });
});

// API Tests
test('API response structure is correct', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(body).toHaveProperty('id');
  expect(body).toHaveProperty('title');
  expect(body).toHaveProperty('body');
});

test('API can create a new resource', async ({ request }) => {
  const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
    data: {
      title: 'foo',
      body: 'bar',
      userId: 1
    }
  });
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(body.title).toBe('foo');
});

// Unit Tests
test('string utility function works', async () => {
  const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);
  expect(capitalize('playwright')).toBe('Playwright');
  expect(capitalize('')).toBe('');
});

test('math utility function works', async () => {
  const sum = (a: number, b: number): number => a + b;
  expect(sum(2, 3)).toBe(5);
  expect(sum(-1, 1)).toBe(0);
});

// E2E Tests
test('complete user journey', async ({ page }) => {
  // Visit the homepage
  await page.goto('https://demo.playwright.dev/todomvc');
  
  // Create a new todo item
  await page.getByPlaceholder('What needs to be done?').fill('Buy milk');
  await page.getByPlaceholder('What needs to be done?').press('Enter');
  
  // Create another todo item
  await page.getByPlaceholder('What needs to be done?').fill('Clean house');
  await page.getByPlaceholder('What needs to be done?').press('Enter');
  
  // Check that both items are in the list
  await expect(page.getByTestId('todo-title')).toHaveCount(2);
  
  // Mark the first item as completed
  await page.getByRole('checkbox').first().check();
  
  // Filter for completed items
  await page.getByRole('link', { name: 'Completed' }).click();
  
  // Verify only the completed item is shown
  await expect(page.getByTestId('todo-title')).toHaveCount(1);
  await expect(page.getByTestId('todo-title')).toHaveText(['Buy milk']);
});

test('e-commerce checkout flow', async ({ page }) => {
  // Visit an e-commerce site
  await page.goto('https://playwright.dev/');
  
  // Simulating navigation to products (as real e-commerce flow would have)
  // For demonstration purposes, we'll continue with the Playwright site
  
  await page.getByRole('link', { name: 'Docs' }).click();
  await expect(page.url()).toContain('/docs/');
  
  // Simulate adding a product to cart and proceeding to checkout
  // In a real test, you would interact with actual e-commerce elements
  
  // Verify some aspect of the page to confirm successful navigation
  await expect(page.getByRole('heading')).toBeVisible();
});
