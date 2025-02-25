import { lastIndexOf, replace, split } from './sample.js';

describe('lastIndexOf function', () => {
    test('should return -1 when search string is not found', () => {
        expect(lastIndexOf('hello', 'x')).toBe(-1);
    });

    test('should return correct last index for single character', () => {
        expect(lastIndexOf('hello', 'l')).toBe(3);
    });

    test('should return correct last index for multiple character string', () => {
        expect(lastIndexOf('hello hello', 'hello')).toBe(6);
    });

    test('should be case sensitive', () => {
        expect(lastIndexOf('Hello', 'h')).toBe(-1);
    });

    test('should work with empty string', () => {
        expect(lastIndexOf('', 'x')).toBe(-1);
    });
});

describe('replace function', () => {
    test('should replace first occurrence of search string', () => {
        expect(replace('hello world', 'world', 'there')).toBe('hello there');
    });

    test('should return same string if search string not found', () => {
        expect(replace('hello world', 'xyz', 'abc')).toBe('hello world');
    });

    test('should handle empty replacement string', () => {
        expect(replace('hello world', 'world', '')).toBe('hello ');
    });

    test('should be case sensitive', () => {
        expect(replace('Hello World', 'world', 'there')).toBe('Hello World');
    });

    test('should handle special characters', () => {
        expect(replace('test$test', '$', '.')).toBe('test.test');
    });
});

describe('split function', () => {
    test('should split string by space', () => {
        expect(split('hello world', ' ')).toEqual(['hello', 'world']);
    });

    test('should return array with one element when separator not found', () => {
        expect(split('hello', ',')).toEqual(['hello']);
    });

    test('should handle empty string', () => {
        expect(split('', ' ')).toEqual(['']);
    });

    test('should handle multiple consecutive separators', () => {
        expect(split('a,,b,,c', ',')).toEqual(['a', '', 'b', '', 'c']);
    });

    test('should split by empty string', () => {
        expect(split('hello', '')).toEqual(['h', 'e', 'l', 'l', 'o']);
    });
});