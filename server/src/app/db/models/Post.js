import mongoose from 'mongoose';
import { ModelBase } from '@config';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class PostMd extends ModelBase {
  by;
  title;
  content;
  time;
  hashtag;
  votes;
  comments;
  image;
  createAt;
  updateAt;
  deleteAt;
}

PostMd.init('Post', {
  by: { type: ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  time: { type: Number, default: 0, min: 0 },
  hashtag: { type: Array, required: true },
  votes: { type: Array, default: [] },
  comments: { type: Array, default: [] },
  image: { type: String },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
  deleteAt: { type: Date }
});

export const getListPostMd = (where, page, limit, sort, attr) => {
  return PostMd.find(where, page, limit, sort, attr);
};

export const countListPostMd = (where) => {
  return PostMd.count(where);
};

export const getDetailPostMd = (where, attr) => {
  return PostMd.findOne(where, attr);
};

export const addPostMd = (attr) => {
  return PostMd.create(attr);
};

export const updatePostMd = (where, attr) => {
  return PostMd.update(where, attr);
};

export const deletePostMd = (where) => {
  return PostMd.delete(where);
};
