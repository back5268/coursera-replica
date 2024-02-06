import mongoose from 'mongoose';
import {ModelBase} from '@config';
const Schema = mongoose.Schema;

class LogMd extends ModelBase {
    to
    title
    content
    type
    status
    deletedAt
}

LogMd.init('Log', {
    to: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    type: {
        type: Number,
        enum: [1, 2, 3, 4],
        required: true,
        description: '1: Đăng ký tài khoản, 2: Quên mật khẩu, 3: Thanh toán thành công, 4: Hoàn thành khóa học'
    },
    status: {
        type: Number,
        enum: [0, 1, 2],
        required: true,
        description: '0: Đang gửi, 1: Đã gửi, 2: Có lỗi'
    },
    deletedAt: {type: Date}
});

export const getListLogMd = (where, page, limit, sort, attr) => {
    return LogMd.find(where, page, limit, sort, attr);
};

export const countListLogMd = (where) => {
    return LogMd.count(where);
};

export const getDetailLogMd = (where, attr) => {
    return LogMd.findOne(where, attr);
};

export const addLogMd = (attr) => {
    return LogMd.create(attr);
};

export const updateLogMd = (where, attr) => {
    return LogMd.update(where, attr);
};

export const deleteLogMd = (where) => {
    return LogMd.delete(where);
};
