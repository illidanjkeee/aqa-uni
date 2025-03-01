import { test, expect } from '@playwright/test';
import { factorial } from '../src/factorial';

// Крок 1: Перевірка факторіалу для 0
test('factorial of 0 should return 1', async () => {
    expect(factorial(0)).toBe(1);
});

// Крок 2: Перевірка факторіалу для додатніх цілих чисел
test('factorial of positive integers', async () => {
    expect(factorial(1)).toBe(1);
    expect(factorial(2)).toBe(2);
    expect(factorial(3)).toBe(6);
    expect(factorial(5)).toBe(120);
    expect(factorial(10)).toBe(3628800);
});

// Крок 3: Перевірка обробки від'ємних чисел
test('factorial should throw error for negative numbers', async () => {
    expect(() => factorial(-1)).toThrow('Input must be a non-negative integer');
    expect(() => factorial(-5)).toThrow('Input must be a non-negative integer');
});

// Крок 4: Перевірка обробки не цілих чисел
test('factorial should throw error for non-integers', async () => {
    expect(() => factorial(2.5)).toThrow('Input must be a non-negative integer');
    expect(() => factorial(0.1)).toThrow('Input must be a non-negative integer');
});

// Крок 5: Перевірка обробки нечислових вхідних даних
test('factorial should throw error for non-numeric inputs', async () => {
    // @ts-ignore - Тестування недійсних типів, які зазвичай виявив би TypeScript
    expect(() => factorial('5')).toThrow('Input must be a non-negative integer');
    // @ts-ignore
    expect(() => factorial(null)).toThrow('Input must be a non-negative integer');
    // @ts-ignore
    expect(() => factorial(undefined)).toThrow('Input must be a non-negative integer');
    // @ts-ignore
    expect(() => factorial({})).toThrow('Input must be a non-negative integer');
});

// Крок 6: Перевірка для більших вхідних даних
test('factorial of larger numbers', async () => {
    expect(factorial(12)).toBe(479001600);
});