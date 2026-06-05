import { describe, expect, test } from 'vitest';
import calculate13 from '../src/calculate13.ts';

describe('calculates the check digit for a 13-digit ISBN', () => {
  test.each([
    ['0000000000000', '0'],
    ['0123456789012', '2'],
    ['2109876543210', '0'],
    ['9780110002224', '4'], // From ISO 2108:2005.
    ['9780393040029', '9'], // From ISO 2108:2005.
    ['9780777777770', '0'], // From ISO 2108:2005.
    ['9786000000004', '4'], // From ISO 2108:2005.
    ['9789070002343', '3'], // From ISO 2108:2005, ISO 2108:2017.
    ['9789295055124', '4'], // From ISO 2108:2017.
    ['9789521099816', '6'], // From ISO 2108:2017.
    ['9789528988885', '5'], // From ISO 2108:2005.
    ['9999999999994', '4'],
  ])('%s', (isbn, expectedCheckDigit) => {
    const actualCheckDigit = calculate13(isbn);
    expect(actualCheckDigit).toStrictEqual(expectedCheckDigit);
  });
});
