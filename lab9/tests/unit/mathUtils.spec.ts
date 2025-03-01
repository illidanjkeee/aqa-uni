import { test, expect } from '@playwright/test';
import { sum, multiply } from '../../src/utils/mathUtils';

test.describe('Math Utility Functions', () => {
  test('sum should add two numbers correctly', () => {
    expect(sum(2, 3)).toBe(5);
    expect(sum(-1, 1)).toBe(0);
    expect(sum(0, 0)).toBe(0);
  });

  test('multiply should multiply two numbers correctly', () => {
    expect(multiply(2, 3)).toBe(6);
    expect(multiply(-1, 4)).toBe(-4);
    expect(multiply(0, 5)).toBe(0);
  });
});