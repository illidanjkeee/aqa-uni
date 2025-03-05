import { Page } from '@playwright/test';
import { BasePage } from './basePage';

export class InventoryPage extends BasePage {
  // Selectors
  private inventoryList = '.inventory_list';
  private inventoryItems = '.inventory_item';
  private addToCartButton = (itemName: string) => `//div[contains(text(),'${itemName}')]/ancestor::div[@class='inventory_item']//button[contains(@id, 'add-to-cart')]`;
  private cartBadge = '.shopping_cart_badge';
  private sortDropdown = '.product_sort_container';

  constructor(page: Page) {
    super(page);
  }

  async isInventoryVisible() {
    return await this.page.locator(this.inventoryList).isVisible();
  }

  async addItemToCart(itemName: string) {
    await this.page.locator(this.addToCartButton(itemName)).click();
  }

  async getCartBadgeCount() {
    const badge = this.page.locator(this.cartBadge);
    if (await badge.isVisible()) {
      return await badge.textContent();
    }
    return '0';
  }

  async getItemsList() {
    return await this.page.locator(this.inventoryItems).count();
  }

  async sortItemsBy(sortOption: string) {
    await this.page.selectOption(this.sortDropdown, sortOption);
  }
}