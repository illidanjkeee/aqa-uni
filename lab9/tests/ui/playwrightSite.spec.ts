import { test, expect } from '@playwright/test';

test.describe('Playwright Website UI', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/');
  });

  test('page has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('navigation menu has expected links', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Docs' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'API' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Community' })).toBeVisible();
  });

  test('get started button works correctly', async ({ page }) => {
    await page.getByRole('link', { name: 'Get started' }).click();
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  });

  test('search functionality works', async ({ page }) => {
    await page.getByRole('button', { name: 'Search' }).click();
    await page.getByPlaceholder('Search docs').fill('assertions');
    await expect(page.getByText('Assertions')).toBeVisible({ timeout: 5000 });
  });

test('theme toggle changes page appearance', async ({ page }) => {
    // Find and click the theme toggle button 
    const themeToggle = page.getByRole('button', { name: 'Switch between dark and light' });
    await themeToggle.click();
    
    // Verify the theme has changed by checking for dark mode class or attribute
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    
    // Toggle back to light theme
    await themeToggle.click();
    
    // Verify it returned to light theme
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});
});