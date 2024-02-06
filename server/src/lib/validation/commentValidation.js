export const listCommentLessonValid = {
    page: 'number',
    limit: 'number',
    fromDate: { type: 'date', allowNull: true },
    toDate: { type: 'date', allowNull: true },
    status: { type: 'number', allowNull: true },
};
