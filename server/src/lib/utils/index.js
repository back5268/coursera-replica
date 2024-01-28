export * from './validate';

export const removeSpecialCharacter = (string) => {
  if (string) {
    const normalizedString = string.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const replacedString = normalizedString.replace(/đ/g, 'd').replace(/Đ/g, 'D');
    const resultString = replacedString.replace(/\s+/g, '-');
    return resultString;
  }
};
