import { Page } from '@playwright/test';
import { BasePage } from './basePage';

export class CartPage extends BasePage {
  // Selectors
  private cartItem = '.cart_item';
  private checkoutButton = '#checkout';
  private continueShoppingButton = '#continue-shopping';
  private removeButton = (itemName: string) => `//div[contains(text(),'${itemName}')]/ancestor::div[@class='cart_item']//button[contains(@id, 'remove')]`;

  constructor(page: Page) {
    super(page);
  }

  async navigateToCart() {
    await this.page.click('.shopping_cart_link');
  }

  async getCartItemsCount() {
    return await this.page.locator(this.cartItem).count();
  }

  async removeItem(itemName: string) {
    await this.page.locator(this.removeButton(itemName)).click();
  }

  async proceedToCheckout() {
    await this.page.click(this.checkoutButton);
  }

  async continueShopping() {
    await this.page.click(this.continueShoppingButton);
  }
}