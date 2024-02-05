import { addPostValid, listPostValid, updatePostValid, dedtailPostValid } from '@lib/validation';
import { addPostMd, countListPostMd, deletePostMd, getDetailPostMd, getListPostMd, updatePostMd } from '@models';
import { validateData } from '@utils';

export const getListPost = async (req, res) => {
  try {
    const error = validateData(listPostValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { page, limit, keySearch } = req.query;
    const where = {};
    if (keySearch) where.$or = [{ title: { $regex: keySearch, $options: 'i' } }];
    const documents = await getListPostMd(where, page, limit);
    const total = await countListPostMd(where);
    res.json({ status: true, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const detailPost = async (req, res) => {
  try {
    const error = validateData(dedtailPostValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = req.query;
    const data = await getDetailPostMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Bài viết không tồn tại!' });
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const deletePost = async (req, res) => {
  try {
    const error = validateData(dedtailPostValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = req.body;
    const data = await deletePostMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Bài viết không tồn tại!' });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const addPost = async (req, res) => {
  try {
    const error = validateData(addPostValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { title, content, time, hashtag } = req.body;

    const data = await addPostMd({
      by: req.userInfo._id,
      title,
      content,
      time,
      hashtag
    });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const updatePost = async (req, res) => {
  try {
    const error = validateData(updatePostValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id, title, content, time, hashtag } = req.body;

    const checkPost = await getDetailPostMd({ _id });
    if (!checkPost) res.status(400).json({ status: false, mess: 'Không tìm thấy bài viết!' });
    if (JSON.stringify(checkPost.by) !== JSON.stringify(req.userInfo._id)) return res.status(400).json({ status: false, mess: 'Không thể cập nhật bài viết bài viết!' });

    const data = await updatePostMd({ _id }, { title, content, time, hashtag });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
