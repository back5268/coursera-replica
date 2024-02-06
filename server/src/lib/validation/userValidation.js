export const listUserValid = {
  page: 'number',
  limit: 'number',
  keySearch: { type: 'string', allowNull: true },
  email: { type: 'string', allowNull: true },
  role: { type: 'string', allowNull: true },
  status: { type: 'number', allowNull: true }
};

export const detailUserValid = {
  _id: 'string'
};

export const addUserValid = {
  fullName: 'string',
  username: 'string',
  email: 'email',
  password: 'string',
  bio: { type: 'string', allowNull: true },
  address: { type: 'string', allowNull: true },
  role: { type: 'string', allowNull: true },
  status: { type: 'number', allowNull: true },
};

export const updateUserValid = {
  _id: 'string',
  username: { type: 'string', allowNull: true },
  fullName: { type: 'string', allowNull: true },
  email: { type: 'string', allowNull: true },
  password: { type: 'string', allowNull: true },
  bio: { type: 'string', allowNull: true },
  address: { type: 'string', allowNull: true },
  role: { type: 'string', allowNull: true },
  status: { type: 'number', allowNull: true },
};
