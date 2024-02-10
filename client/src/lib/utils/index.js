export const removeUndefinedProps = (obj) => {
  for (let prop in obj) {
    if (!(obj[prop] || obj[prop] === '' || obj[prop] === 0)) {
      delete obj[prop];
    }
  }
  return obj;
};

export const refreshObject = (object) => {
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      if (Array.isArray(object[key])) object[key] = [];
      else if (typeof object[key] === 'object') object[key] = {};
      else object[key] = undefined;
    }
  }
  return object;
};

export const checkEqualProp = (object1, object2) => {
  const newObject = {};
  for (const key in object1) {
    if (JSON.stringify(object1[key]) !== JSON.stringify(object2[key])) {
      newObject[key] = object1[key];
    }
  }
  return newObject;
};

export const convertFileToUrl = (file) => URL.createObjectURL(file);

export const formatNumber = (amount, round) => {
  if (amount) return new Intl.NumberFormat('en-US').format(round ? Math.round(amount) : amount);
};

export const removeSpecialCharacter = (string) => {
  if (string) {
    const normalizedString = string.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const replacedString = normalizedString.replace(/đ/g, 'd').replace(/Đ/g, 'D');
    const resultString = replacedString.replace(/\s+/g, '-');
    return resultString;
  }
};
