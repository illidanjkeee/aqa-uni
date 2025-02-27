import { test, expect } from '@playwright/test';

/**
 * Utility class for data validation and formatting
 */
class DataValidator {
  /**
   * Validates if the provided string is a correctly formatted email address
   * @param email - The email string to validate
   * @returns boolean indicating if the email format is valid
   */
  static isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /**
   * Validates if the username meets length requirements (3-20 characters)
   * @param username - The username string to validate
   * @returns boolean indicating if the username length is valid
   */
  static isValidUsername(username: string): boolean {
    return username.length >= 3 && username.length <= 20;
  }

  /**
   * Formats a number as a price string with $ symbol and 2 decimal places
   * @param price - The number to format as price
   * @returns formatted price string (e.g., "$10.50")
   */
  static formatPrice(price: number): string {
    return `$${price.toFixed(2)}`;
  }
}

// Test suite for utility functions
test.describe('Unit Tests - Utilities', () => {
  // Test email validation
  test('should validate correct email format', () => {
    expect(DataValidator.isValidEmail('test@example.com')).toBeTruthy();
    expect(DataValidator.isValidEmail('invalid-email')).toBeFalsy();
  });

  // Test username validation
  test('should validate username length', () => {
    expect(DataValidator.isValidUsername('john')).toBeTruthy();
    expect(DataValidator.isValidUsername('a')).toBeFalsy();
  });

  // Test price formatting
  test('should format price correctly', () => {
    expect(DataValidator.formatPrice(10.5)).toBe('$10.50');
    expect(DataValidator.formatPrice(99.99)).toBe('$99.99');
  });

  // Test handling of empty inputs
  test('should handle empty values', () => {
    expect(DataValidator.isValidEmail('')).toBeFalsy();
    expect(DataValidator.isValidUsername('')).toBeFalsy();
  });

  // Test edge cases
  test('should handle edge cases', () => {
    expect(DataValidator.formatPrice(0)).toBe('$0.00');
    expect(DataValidator.isValidUsername('a'.repeat(21))).toBeFalsy();
  });
});