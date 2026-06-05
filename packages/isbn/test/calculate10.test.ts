import { describe, expect, test } from 'vitest';
import calculate10 from '../src/calculate10.ts';

describe('calculates the check digit for a 10-digit ISBN', () => {
  test.each([
    ['0000000000', '0'],
    ['0123456789', '9'],
    ['0306406152', '2'], // From Wikipedia.
    ['039304002X', 'X'], // From ISO 2108:2005.
    ['0571089895', '5'], // From ISO 2108-1972, ISO 2108-1978, ISO 2108:1992.
    ['123456789X', 'X'],
    ['9070002345', '5'], // From ISO 2108-1972, ISO 2108-1978, ISO 2108:1992.
    ['9876543210', '0'],
    ['9999999999', '9'],
  ])('%s', (isbn, expectedCheckDigit) => {
    const actualCheckDigit = calculate10(isbn);
    expect(actualCheckDigit).toStrictEqual(expectedCheckDigit);
  });
});
