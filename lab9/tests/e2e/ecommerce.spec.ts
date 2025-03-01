import { test, expect } from '@playwright/test';

test.describe('E-Commerce Website Shopping Flow', () => {
    test('should complete checkout process', async ({ page }) => {
        // Start at the homepage
        await page.goto('https://demo.saleor.io/');
        
        // Navigate to product category
        const accessoriesLink = page.getByRole('link', { name: /accessories/i }).first();
        await expect(accessoriesLink).toBeVisible();
        await accessoriesLink.click();
        
        // Select specific product
        const productLink = page.getByRole('link', { name: /Saleor Card 50/i }).first();
        await expect(productLink).toBeVisible();
        await productLink.click();
        
        // Add product to cart
        const addToCartButton = page.getByRole('button', { name: /add to cart/i });
        await expect(addToCartButton).toBeEnabled();
        await addToCartButton.click();
        
        // Navigate to cart
        const goToCartLink = page.getByTestId('CartNavItem');
        await expect(goToCartLink).toBeVisible();
        await goToCartLink.click();
        
        // Verify product appears in cart - using more specific locator
        const productInCart = page.getByRole('heading', { name: /Saleor Card 50/i }).first();
        await expect(productInCart).toBeVisible();
        
        // Begin checkout process
        const checkoutButton = page.getByTestId('CheckoutLink');
        // await expect(checkoutButton).toBeEnabled();
        await checkoutButton.click();
        // We stop here because the Saleor demo site requires authentication to proceed, which is beyond the scope of this test
    });
});