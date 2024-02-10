export const listCourseReviewValid = {
  page: 'number',
  limit: 'number',
  courseId: { type: 'string', allowNull: true },
  rating: { type: 'number', allowNull: true }
};
