export const listQuestionValid = {
  page: 'number',
  limit: 'number',
  keySearch: { type: 'string', allowNull: true },
  courseId: { type: 'string', allowNull: true },
  lessonId: { type: 'string', allowNull: true },
  status: { type: 'number', allowNull: true },
};

export const detailQuestionValid = {
  _id: 'string'
};

export const addQuestionValid = {
  lessonId: 'string',
  content: 'string',
  answers: 'array',
  status: { type: 'number', allowNull: true }
};

export const updateQuestionValid = {
  _id: 'string',
  lessonId: { type: 'string', allowNull: true },
  content: { type: 'string', allowNull: true },
  answers: { type: 'array', allowNull: true },
  status: { type: 'number', allowNull: true }
};
