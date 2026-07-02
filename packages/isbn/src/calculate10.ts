const digits = '0X987654321';

function calculate10(isbn: string): string {
  let sum = 0;
  for (let i = 0; i < 9; i += 1) {
    sum += (isbn.charCodeAt(i) - 48) * (10 - i);
  }
  return digits.charAt(sum % 11);
}

export {
  calculate10,
};
