export const listQuestionValid = {
  page: 'number',
  limit: 'number',
  keySearch: { type: 'string', allowNull: true },
  courseId: { type: 'string', allowNull: true },
  status: { type: 'number', allowNull: true }
};

export const dedtailQuestionValid = {
  _id: 'string'
};

export const addQuestionValid = {
  content: 'string',
  answers: 'array',
  note: { type: 'string', allowNull: true },
  status: { type: 'number', allowNull: true }
};

export const updateQuestionValid = {
  _id: 'string',
  content: { type: 'string', allowNull: true },
  answers: { type: 'array', allowNull: true },
  note: { type: 'string', allowNull: true },
  status: { type: 'number', allowNull: true }
};
