export const listNotifyValid = {
  page: 'number',
  limit: 'number',
  status: { type: 'number', allowNull: true }
};

export const updateNotifyValid = {
  _id: 'string',
  status: 'number'
};

export const readAllNotifyValid = {
  status: 'number'
};
