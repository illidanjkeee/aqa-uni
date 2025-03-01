/**
 * Обчислює факторіал заданого числа
 * @param n - Невід'ємне ціле число, для якого обчислюється факторіал
 * @returns Факторіал числа n
 * @throws Error якщо вхідні дані не є невід'ємним цілим числом
 */
export function factorial(n: number): number {
    // Перевірка чи вхідне значення є невід'ємним цілим числом
    if (typeof n !== 'number' || !Number.isInteger(n) || n < 0) {
      throw new Error('Input must be a non-negative integer');
    }
    
    // Базовий випадок
    if (n === 0) {
      return 1;
    }
    
    // Рекурсивний виклик функції
    return n * factorial(n - 1);
    
    // Альтернативна реалізація з використанням циклу
    /*
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
    */
  }