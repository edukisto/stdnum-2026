function calculate10(isbn: string): string {
  let sum = 0;
  for (let i = 0; i < 9; i += 1) {
    sum += (isbn.charCodeAt(i) - 48) * (10 - i);
  }
  const mod = sum % 11;
  return mod === 0 ? '0' : mod === 1 ? 'X' : '0123456789'[11 - mod]!;
}

export {
  calculate10 as default,
};
