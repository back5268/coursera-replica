export const listUserValid = {
  page: 'number',
  limit: 'number',
  keySearch: { type: 'string', allowNull: true },
  email: { type: 'string', allowNull: true },
  status: { type: 'number', allowNull: true }
};

export const addUserValid = {
  fullname: 'string',
  username: 'string',
  email: 'email',
  password: 'string',
  bio: { type: 'string', allowNull: true },
  address: { type: 'string', allowNull: true },
  status: { type: 'number', allowNull: true },
  role: { type: 'string', allowNull: true }
};

export const updateUserValid = {
  id: 'string',
  username: { type: 'string', allowNull: true },
  fullname: { type: 'string', allowNull: true },
  email: { type: 'string', allowNull: true },
  password: { type: 'string', allowNull: true },
  bio: { type: 'string', allowNull: true },
  address: { type: 'string', allowNull: true },
  status: { type: 'number', allowNull: true },
  role: { type: 'string', allowNull: true }
};
