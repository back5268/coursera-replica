import mongoose from 'mongoose';
import { ModelBase } from '@config';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class PostMd extends ModelBase {
  by;
  title;
  slug;
  content;
  time;
  hashtag;
  likes;
  image;
  description;
  deletedAt;
}

PostMd.init('Post', {
  by: { type: ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  slug: { type: String, slug: 'title', unique: true },
  content: { type: String, required: true },
  time: { type: Number, default: 0, min: 0 },
  hashtag: [{ type: String }],
  likes: [{ type: ObjectId, ref: 'User' }],
  image: { type: String },
  description: { type: String },
  deletedAt: { type: Date }
});

export const getListPostMd = (where, page, limit, populates, sort, attr) => {
  return PostMd.find({ where, page, limit, sort, attr, populates });
};

export const countListPostMd = (where) => {
  return PostMd.count({ where });
};

export const getDetailPostMd = (where, populates, attr) => {
  return PostMd.findOne({ where, attr, populates });
};

export const addPostMd = (attr) => {
  return PostMd.create({ attr });
};

export const updatePostMd = (where, attr) => {
  return PostMd.update({ where, attr });
};

export const deletePostMd = (where) => {
  return PostMd.delete({ where });
};
