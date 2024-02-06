import mongoose from 'mongoose';
import { ModelBase } from '@config';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class CourseReviewMd extends ModelBase {
  userId
  courseId
  rating
  content
  deletedAt
}

CourseReviewMd.init('CourseReview', {
  userId: { type: ObjectId, ref: 'User', required: true },
  courseId: { type: ObjectId, ref: 'Course', required: true },
  rating: { type: Number, enum: [1, 2, 3, 4, 5], required: true },
  content: { type: String },
  file: { type: String },
  deletedAt: { type: Date }
});

export const getListCourseReviewMd = (where, page, limit, sort, attr) => {
  return CourseReviewMd.find(where, page, limit, sort, attr);
};

export const countListCourseReviewMd = (where) => {
  return CourseReviewMd.count(where);
};

export const getDetailCourseReviewMd = (where, attr) => {
  return CourseReviewMd.findOne(where, attr);
};

export const addCourseReviewMd = (attr) => {
  return CourseReviewMd.create(attr);
};

export const updateCourseReviewMd = (where, attr) => {
  return CourseReviewMd.update(where, attr);
};

export const deleteCourseReviewMd = (where) => {
  return CourseReviewMd.delete(where);
};
