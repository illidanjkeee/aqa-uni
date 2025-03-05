import { Page } from '@playwright/test';
import { BasePage } from './basePage';

export class LoginPage extends BasePage {
  // Selectors
  private usernameInput = '#user-name';
  private passwordInput = '#password';
  private loginButton = '#login-button';
  private errorMessage = '.error-message-container';

  constructor(page: Page) {
    super(page);
  }

  async navigateToLoginPage() {
    await this.navigateTo('https://www.saucedemo.com/');
  }

  async login(username: string, password: string) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async getErrorMessage() {
    const errorElement = this.page.locator(this.errorMessage);
    if (await errorElement.isVisible()) {
      return await errorElement.textContent();
    }
    return '';
  }
}