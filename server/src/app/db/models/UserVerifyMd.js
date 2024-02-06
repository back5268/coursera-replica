import mongoose from 'mongoose';
import { ModelBase } from '@config';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class UserVerifyMd extends ModelBase {
    userId
    token
    type
    expiredAt
    deletedAt
}

UserVerifyMd.init('UserVerify', {
    userId: { type: ObjectId, required: true },
    token: { type: String, required: true },
    type: { type: Number, required: true, description: '1: Xác thực đăng ký, 2: Xác thực quên mật khẩu' },
    expiredAt: { type: Date, required: true },
    deletedAt: { type: Date },
});

export const getListUserVerifyMd = (where, page, limit, sort, attr) => {
    return UserVerifyMd.find(where, page, limit, sort, attr);
};

export const countListUserVerifyMd = (where) => {
    return UserVerifyMd.count(where);
};

export const getDetailUserVerifyMd = (where, attr) => {
    return UserVerifyMd.findOne(where, attr);
};

export const addUserVerifyMd = (attr) => {
    return UserVerifyMd.create(attr);
};

export const updateUserVerifyMd = (where, attr) => {
    return UserVerifyMd.update(where, attr);
};

export const deleteUserVerifyMd = (where) => {
    return UserVerifyMd.delete(where);
};
