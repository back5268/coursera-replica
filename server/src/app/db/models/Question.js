import mongoose from 'mongoose';
import { ModelBase } from '@config';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class QuestionMd extends ModelBase {
  by;
  updateBy;
  content;
  answers;
  note;
  status;
  courseId;
  createAt;
  updateAt;
  deleteAt;
}

QuestionMd.init('Question', {
  by: { type: ObjectId, ref: 'User', required: true },
  updateBy: { type: ObjectId, ref: 'User' },
  content: { type: String, required: true },
  answers: { type: Array, required: true },
  note: { type: String },
  status: { type: Number, default: 1 },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
  deleteAt: { type: Date }
});

export const getListQuestionMd = (where, page, limit, sort, attr) => {
  return QuestionMd.find(where, page, limit, sort, attr);
};

export const countListQuestionMd = (where) => {
  return QuestionMd.count(where);
};

export const getDetailQuestionMd = (where, attr) => {
  return QuestionMd.findOne(where, attr);
};

export const addQuestionMd = (attr) => {
  return QuestionMd.create(attr);
};

export const updateQuestionMd = (where, attr) => {
  return QuestionMd.update(where, attr);
};

export const deleteQuestionMd = (where) => {
  return QuestionMd.delete(where);
};
