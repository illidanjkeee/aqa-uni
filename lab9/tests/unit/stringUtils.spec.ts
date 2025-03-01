import { test, expect } from '@playwright/test';
import { capitalize, reverse } from '../../src/utils/stringUtils';

test.describe('String Utility Functions', () => {
  test('capitalize should uppercase the first letter', () => {
    expect(capitalize('playwright')).toBe('Playwright');
    expect(capitalize('test')).toBe('Test');
    expect(capitalize('')).toBe('');
  });

  test('reverse should reverse the string', () => {
    expect(reverse('hello')).toBe('olleh');
    expect(reverse('12345')).toBe('54321');
    expect(reverse('')).toBe('');
  });
});