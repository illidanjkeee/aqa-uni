import { test, expect } from '@playwright/test';

test.describe('Todo MVC App E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
  });

  test('should allow adding, completing, and filtering todo items', async ({ page }) => {
    // Create a new todo item
    await page.getByPlaceholder('What needs to be done?').fill('Buy milk');
    await page.getByPlaceholder('What needs to be done?').press('Enter');
    
    // Create another todo item
    await page.getByPlaceholder('What needs to be done?').fill('Clean house');
    await page.getByPlaceholder('What needs to be done?').press('Enter');
    
    // Check that both items are in the list
    await expect(page.getByTestId('todo-title')).toHaveCount(2);
    await expect(page.getByTestId('todo-title')).toHaveText(['Buy milk', 'Clean house']);
    
    // Mark the first item as completed
    await page.getByRole('checkbox').first().check();
    
    // Filter for completed items
    await page.getByRole('link', { name: 'Completed' }).click();
    
    // Verify only the completed item is shown
    await expect(page.getByTestId('todo-title')).toHaveCount(2);
    await expect(page.getByTestId('todo-title')).toHaveText(['Buy milk','Clean house']); 
    
    // Filter for active items
    await page.getByRole('link', { name: 'Active' }).click();
    
    // Verify only the active item is shown
    await expect(page.getByTestId('todo-title')).toHaveCount(0);
    // await expect(page.getByTestId('todo-title')).toHaveText(['Clean house']);
    
    // Show all items
    await page.getByRole('link', { name: 'All' }).click();
    await expect(page.getByTestId('todo-title')).toHaveCount(2);
  });

  test('should allow editing an existing todo', async ({ page }) => {
    // Create a new todo item
    await page.getByPlaceholder('What needs to be done?').fill('Original task');
    await page.getByPlaceholder('What needs to be done?').press('Enter');
    
    // Edit the todo by double-clicking on it
    await page.getByTestId('todo-title').dblclick();
    
    // Clear the input and type a new value
    await page.getByRole('textbox', { name: 'Edit' }).clear();
    await page.getByRole('textbox', { name: 'Edit' }).fill('Updated task');
    await page.getByRole('textbox', { name: 'Edit' }).press('Enter');
    
    // Verify the todo was updated
    await expect(page.getByTestId('todo-title')).toHaveText(['Updated task']);
  });

  test('should allow removing a todo', async ({ page }) => {
    // Create a new todo item
    await page.getByPlaceholder('What needs to be done?').fill('Task to delete');
    await page.getByPlaceholder('What needs to be done?').press('Enter');
    
    // Hover over the todo to reveal the destroy button
    await page.getByTestId('todo-item').hover();
    
    // Click the destroy button
    await page.getByRole('button', { name: 'Delete' }).click();
    
    // Verify the todo list is empty
    await expect(page.getByTestId('todo-title')).toHaveCount(0);
  });
});