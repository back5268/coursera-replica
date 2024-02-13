export * from './validate';

export const removeSpecialCharacter = (string) => {
  if (string) {
    string = string.toLowerCase();
    string = string.replace(/["',]/g, '');
    string = string.replace(/[\/]/g, '-');
    console.log(string);
    const normalizedString = string.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const replacedString = normalizedString.replace(/đ/g, 'd').replace(/Đ/g, 'D');
    const resultString = replacedString.replace(/\s+/g, '-');
    return resultString;
  }
};
