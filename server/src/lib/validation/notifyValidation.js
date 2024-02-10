export const listNotifyValid = {
  page: 'number',
  limit: 'number',
  status: { type: 'number', allowNull: true }
};

export const updateNotifyValid = {
  status: 'number'
};
