import {addPostValid, listPostValid, updatePostValid, detailPostValid} from '@lib/validation';
import { addPostMd, countListPostMd, deletePostMd, getDetailPostMd, getListPostMd, updatePostMd } from '@models';
import { validateData } from '@utils';
import {uploadFileToFirebase} from "@lib/firebase";

export const getListPost = async (req, res) => {
  try {
    const error = validateData(listPostValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { page, limit, keySearch } = req.query;
    const where = {};
    if (keySearch) where.title = { $regex: keySearch, $options: 'i' }
    const documents = await getListPostMd(where, page, limit);
    const total = await countListPostMd(where);
    res.json({ status: true, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const detailPost = async (req, res) => {
  try {
    const error = validateData(detailPostValid, req.query);
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
    const error = validateData(detailPostValid, req.body);
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
    if (req.file) {
      req.body.image = await uploadFileToFirebase(req.file)
    }
    const error = validateData(addPostValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { title, content, time, hashtag, image } = req.body;

    const data = await addPostMd({
      by: req.userInfo._id,
      title,
      content,
      time,
      hashtag,
      image
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
    let { _id, title, content, time, hashtag, image } = req.body;

    const post = await getDetailPostMd({ _id });
    if (!post) return res.status(400).json({ status: false, mess: 'Bài viết không tồn tại!' });

    if (req.file) {
      image = await uploadFileToFirebase(req.file)
    }

    const data = await updatePostMd({ _id }, { title, content, time, hashtag, image });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
