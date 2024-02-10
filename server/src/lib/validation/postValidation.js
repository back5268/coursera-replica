export const listPostValid = {
  page: 'number',
  limit: 'number',
  keySearch: { type: 'string', allowNull: true }
};

export const detailPostValid = {
  _id: 'string'
};

export const addPostValid = {
  title: 'string',
  content: 'string',
  time: 'number',
  hashtag: { type: 'json', allowNull: true }
};

export const updatePostValid = {
  _id: 'string',
  title: { type: 'string', allowNull: true },
  content: { type: 'string', allowNull: true },
  time: { type: 'number', allowNull: true },
  hashtag: { type: 'json', allowNull: true },
  image: { type: 'string', allowNull: true },
};
