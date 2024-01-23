import mongoose from 'mongoose';
import { ModelBase } from '@config';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class ReviewMd extends ModelBase {
  by;
  rating;
  comment;
  courseId;
  createAt;
  updateAt;
  deleteAt;
}

ReviewMd.init('Review', {
  by: { type: ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true },
  comment: { type: String },
  courseId: { type: ObjectId, ref: 'Course', required: true },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
  deleteAt: { type: Date }
});

export const getListReviewMd = (where, page, limit, sort, attr) => {
  return ReviewMd.find(where, page, limit, sort, attr);
};

export const countListReviewMd = (where) => {
  return ReviewMd.count(where);
};

export const getDetailReviewMd = (where, attr) => {
  return ReviewMd.findOne(where, attr);
};

export const addReviewMd = (attr) => {
  return ReviewMd.create(attr);
};

export const updateReviewMd = (where, attr) => {
  return ReviewMd.update(where, attr);
};

export const deleteReviewMd = (where) => {
  return ReviewMd.delete(where);
};
