import mongoose from 'mongoose';
import {ModelBase} from '@config';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class NotifyMd extends ModelBase {
    fromBy
    by
    byName
    to
    title
    content
    type
    status
    deletedAt
}

NotifyMd.init('Notify', {
    fromBy: {
        type: Number,
        enum: [1, 2],
        required: true,
        description: '1: Thông báo từ hệ thống, 2: Thông báo từ người dùng'
    },
    by: { type: String },
    byName: { type: String, required: true },
    to: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    type: {
        type: Number,
        enum: [1, 2, 3, 4],
        required: true,
        description: '1: Thêm bài viết mới, 2: Thêm bình luận, 3: Trả lời bình luận, 4: Like bài viết'
    },
    status: {
        type: Number,
        enum: [0, 1, 2],
        required: true,
        description: '0: Chưa xem, 1: Xem nhưng chưa đọc, 2: Đã đọc'
    },
    deletedAt: {type: Date}
});

export const getListNotifyMd = (where, page, limit, sort, attr) => {
    return NotifyMd.find(where, page, limit, sort, attr);
};

export const countListNotifyMd = (where) => {
    return NotifyMd.count(where);
};

export const getDetailNotifyMd = (where, attr) => {
    return NotifyMd.findOne(where, attr);
};

export const addNotifyMd = (attr) => {
    return NotifyMd.create(attr);
};

export const updateNotifyMd = (where, attr) => {
    return NotifyMd.update(where, attr);
};

export const deleteNotifyMd = (where) => {
    return NotifyMd.delete(where);
};