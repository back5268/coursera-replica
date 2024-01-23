import mongoose from 'mongoose';
import { ModelBase } from '@config';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class UserMd extends ModelBase {
  fullname;
  username;
  email;
  password;
  bio;
  address;
  status;
  role;
  courses;
  posts;
  createAt;
  updateAt;
  deleteAt;
}

UserMd.init('User', {
  fullname: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  bio: { type: String },
  address: { type: String },
  status: { type: Number, default: 0 },
  role: { type: String, default: 'user' },
  courses: [{ type: ObjectId, ref: 'Course' }],
  posts: [{ type: ObjectId, ref: 'Post' }],
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
  deleteAt: { type: Date }
});

export const getListUserMd = (where, page, limit, sort, attr) => {
  return UserMd.find(where, page, limit, sort, attr);
};

export const countListUserMd = (where) => {
  return UserMd.count(where);
};

export const getDetailUserMd = (where, attr) => {
  return UserMd.findOne(where, attr);
};

export const addUserMd = (attr) => {
  return UserMd.create(attr);
};

export const updateUserMd = (where, attr) => {
  return UserMd.update(where, attr);
};

export const deleteUserMd = (where) => {
  return UserMd.delete(where);
};
