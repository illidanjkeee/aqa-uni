import { test, expect } from '@playwright/test';

test('Playwright homepage navigation and title verification', async ({ page }) => {
  // Navigate to the playwright website
  await page.goto('https://playwright.dev/');
  
  // Verify the title contains "Playwright"
  await expect(page).toHaveTitle(/Playwright/);
  
  // Check that the header is visible
  const header = page.locator('.navbar__inner .navbar__title');
  await expect(header).toBeVisible();
  await expect(header).toHaveText('Playwright');
});

test('Search functionality works correctly', async ({ page }) => {
  // Navigate to the playwright website
  await page.goto('https://playwright.dev/');
  
  // Click on the search button
  await page.click('.DocSearch-Button');
  
  // Type a search query
  await page.fill('.DocSearch-Input', 'assertions');
  
  // Wait for search results
  await page.waitForSelector('.DocSearch-Hit');
  
  // Verify search results contain the expected content
  const searchResults = page.locator('.DocSearch-Hit-title');
  await expect(searchResults.first()).toBeVisible();
  
  // Check that at least one result contains our search term (case insensitive)
  const hasMatchingResult = await searchResults.evaluateAll(
    (elements, term) => elements.some(el => (el.textContent || '').toLowerCase().includes(term)),
    'assertion'
  );
  expect(hasMatchingResult).toBeTruthy();
});

test('Form submission on demoqa.com', async ({ page }) => {
    // Navigate to the form demo page
    await page.goto('https://demoqa.com/text-box');
    
    // Fill in the form fields
    await page.fill('#userName', 'John Smith');
    await page.fill('#userEmail', 'john.smith@example.com');
    await page.fill('#currentAddress', '123 Main Street, Anytown');
    await page.fill('#permanentAddress', '456 Second Avenue, Somewhere');
    
    // Submit the form
    await page.click('#submit');
    
    // Wait for the results to appear
    await page.waitForSelector('.border');
    
    // Verify the submitted data appears in the results
    const output = page.locator('.border');
    await expect(output).toBeVisible();
    await expect(output).toContainText('John Smith');
    await expect(output).toContainText('john.smith@example.com');
    await expect(output).toContainText('123 Main Street, Anytown');
    await expect(output).toContainText('456 Second Avenue, Somewhere');
    
    // Take a screenshot of the results for reference
    await page.screenshot({ path: 'form-submission-result.png' });
  });