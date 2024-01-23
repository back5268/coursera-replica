import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const UserSchema = new Schema({
  fullname: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  bio: { type: String },
  address: { type: String },
  status: { type: Boolean, default: false },
  role: { type: String, default: 'user' },
  courses: [{ type: ObjectId, ref: 'Course' }],
  posts: [{ type: ObjectId, ref: 'Post' }],
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
  deleteAt: { type: Date }
});

const UserMd = mongoose.model('User', UserSchema);

export const getListUserMd = (where = {}, page, limit, sort = {}, attr = {}) => {
  if (!where.deleteAt) where.deleteAt = null;
  const query = UserMd.find(where, attr);
  if (sort) query.sort(sort);
  if (page && limit) {
    const skip = limit * (page - 1);
    query.skip(skip).limit(limit);
  }
  return query.exec();
};

export const countListUserMd = (where = {}) => {
  if (!where.deleteAt) where.deleteAt = null;
  return UserMd.countDocuments(where);
};

export const getDetailUserMd = (where = {}) => {
  if (!where.deleteAt) where.deleteAt = null;
  return UserMd.findOne(where);
};

export const addlUserMd = (attr = {}) => {
  return UserMd.create(attr);
};

export const updateUserMd = (where = {}, attr = {}) => {
  return UserMd.findOneAndUpdate(where, attr);
};

export const deleteUserMd = (where = {}) => {
  return UserMd.findOneAndUpdate(where, { deleteAt: Date.new });
};
