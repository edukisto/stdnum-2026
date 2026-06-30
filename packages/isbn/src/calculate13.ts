function calculate13(isbn: string): string {
  let sum = 0;
  for (let i = 0; i < 12; i += 2) {
    sum += (isbn.charCodeAt(i) - 48) + (isbn.charCodeAt(i + 1) - 48) * 3;
  }
  const mod = sum % 10;
  return mod === 0 ? '0' : '0123456789'.charAt(10 - mod);
}

export {
  calculate13,
};
