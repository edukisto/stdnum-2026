const digits = '0987654321';

function calculate13(isbn: string): string {
  let sum = 0;
  for (let i = 0; i < 12; i += 2) {
    sum += (isbn.charCodeAt(i) - 48) + (isbn.charCodeAt(i + 1) - 48) * 3;
  }
  return digits.charAt(sum % 10);
}

export {
  calculate13,
};
