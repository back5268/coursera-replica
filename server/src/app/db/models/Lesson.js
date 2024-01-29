import mongoose from 'mongoose';
import { ModelBase } from '@config';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class LessonMd extends ModelBase {
  by;
  updateBy;
  title;
  content;
  time;
  author;
  description;
  files;
  status;
  courseId;
  createAt;
  updateAt;
  deleteAt;
}

LessonMd.init('Lesson', {
  by: { type: ObjectId, ref: 'User', required: true },
  updateBy: { type: ObjectId, ref: 'User' },
  title: { type: String, required: true },
  content: { type: String, required: true },
  time: { type: Number, default: 0, min: 0 },
  author: { type: String, required: true },
  description: { type: String },
  files: { type: Array, default: [] },
  status: { type: Number, default: 1 },
  courseId: { type: ObjectId, ref: 'Course', required: true },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
  deleteAt: { type: Date }
});

export const getListLessonMd = (where, page, limit, sort, attr) => {
  return LessonMd.find(where, page, limit, sort, attr);
};

export const countListLessonMd = (where) => {
  return LessonMd.count(where);
};

export const getDetailLessonMd = (where, attr) => {
  return LessonMd.findOne(where, attr);
};

export const addLessonMd = (attr) => {
  return LessonMd.create(attr);
};

export const updateLessonMd = (where, attr) => {
  return LessonMd.update(where, attr);
};

export const deleteLessonMd = (where) => {
  return LessonMd.delete(where);
};
