import mongoose from 'mongoose';
import { validNumberInt } from '@utils';
const Schema = mongoose.Schema;

class ModelBase {
  constructor() {}

  static init(tableName, attr) {
    this.model = mongoose.model(tableName, new Schema(attr));
  }

  static find(where = {}, page, limit, sort = { createAt: -1 }, attr) {
    if (!where.deleteAt) where.deleteAt = null;
    const query = this.model.find(where, attr);
    if (sort) query.sort(sort);
    if (validNumberInt(limit) && validNumberInt(page)) {
      const skip = Number(limit) * (Number(page) - 1);
      query.skip(skip).limit(limit);
    }
    return query.exec();
  }

  static count(where = {}) {
    if (!where.deleteAt) where.deleteAt = null;
    return this.model.countDocuments(where);
  }

  static findOne(where = {}, attr) {
    if (!where.deleteAt) where.deleteAt = null;
    return this.model.findOne(where, attr);
  }

  static async create(attr = {}) {
    if (!attr.createAt) attr.createAt = new Date();
    if (!attr.updateAt) attr.updateAt = new Date();
    return this.model.create(attr);
  }

  static update(where = {}, attr = {}) {
    if (Object.keys(where).length === 0) return;
    if (!attr.updateAt) attr.updateAt = new Date();
    return this.model.findOneAndUpdate(where, attr);
  }

  static delete(where = {}) {
    if (Object.keys(where).length === 0) return;
    return this.model.findOneAndUpdate(where, { updateAt: new Date(), deleteAt: new Date() });
  }
}

export { ModelBase };
