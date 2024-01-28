import mongoose from 'mongoose';
import { ModelBase } from '@config';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class CourseMd extends ModelBase {
  by;
  updateBy;
  name;
  code;
  slug;
  description;
  skills;
  price;
  sale;
  type;
  image;
  lessons;
  questions;
  reviews;
  status;
  createAt;
  updateAt;
  deleteAt;
}

CourseMd.init('Course', {
  by: { type: ObjectId, ref: 'User', required: true },
  updateBy: { type: ObjectId, ref: 'User' },
  name: { type: String, required: true },
  code: { type: String, required: true },
  slug: { type: String, required: true },
  description: { type: String },
  skills: { type: Array, default: [] },
  price: { type: Number, default: 0 },
  sale: { type: Number, default: 0 },
  type: { type: Number, default: 1, required: true },
  isHot: { type: Boolean, default: false },
  isNew: { type: Boolean, default: false },
  image: { type: String },
  lessons: [{ type: ObjectId, ref: 'Lesson' }],
  questions: [{ type: ObjectId, ref: 'Question' }],
  reviews: [{ type: ObjectId, ref: 'Review' }],
  status: { type: Number, default: 1 },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
  deleteAt: { type: Date }
});

export const getListCourseMd = (where, page, limit, sort, attr) => {
  return CourseMd.find(where, page, limit, sort, attr);
};

export const countListCourseMd = (where) => {
  return CourseMd.count(where);
};

export const getDetailCourseMd = (where, attr) => {
  return CourseMd.findOne(where, attr);
};

export const addCourseMd = (attr) => {
  return CourseMd.create(attr);
};

export const updateCourseMd = (where, attr) => {
  return CourseMd.update(where, attr);
};

export const deleteCourseMd = (where) => {
  return CourseMd.delete(where);
};
