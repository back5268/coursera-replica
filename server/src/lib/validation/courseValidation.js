export const listCourseValid = {
  page: 'number',
  limit: 'number',
  keySearch: { type: 'string', allowNull: true },
  fromPrice: { type: 'number', allowNull: true },
  toPrice: { type: 'number', allowNull: true },
  type: { type: 'number', allowNull: true },
  status: { type: 'number', allowNull: true },
};

export const detailCourseValid = {
  _id: 'string'
};

export const addCourseValid = {
  name: 'string',
  code: 'string',
  description: { type: 'string', allowNull: true },
  skills: { type: 'array', allowNull: true },
  price: { type: 'number', allowNull: true },
  sale: { type: 'number', allowNull: true },
  type: { type: 'number', allowNull: true },
  isHot: { type: 'boolean', allowNull: true },
  isNew: { type: 'boolean', allowNull: true },
  status: { type: 'number', allowNull: true },
};

export const updateCourseValid = {
  _id: 'string',
  name: { type: 'string', allowNull: true },
  code: { type: 'string', allowNull: true },
  description: { type: 'string', allowNull: true },
  skills: { type: 'array', allowNull: true },
  price: { type: 'number', allowNull: true },
  sale: { type: 'number', allowNull: true },
  type: { type: 'number', allowNull: true },
  isHot: { type: 'boolean', allowNull: true },
  isNew: { type: 'boolean', allowNull: true },
  status: { type: 'number', allowNull: true },
};
