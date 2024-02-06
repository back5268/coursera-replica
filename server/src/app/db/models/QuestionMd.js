import mongoose from 'mongoose';
import {ModelBase} from '@config';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class QuestionMd extends ModelBase {
    by
    lessonId
    updateBy
    content
    answers
    status
    deletedAt
}

QuestionMd.init('Question', {
    by: {type: ObjectId, ref: 'User', required: true},
    lessonId: { type: ObjectId, ref: 'lesson', required: true },
    updateBy: {type: ObjectId, ref: 'User'},
    content: {type: String, required: true},
    answers: [{label: {type: String, required: true}, isAnswer: {type: Boolean, default: false}}],
    status: {type: Number, enum: [0, 1], default: 1},
    deletedAt: {type: Date}
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
