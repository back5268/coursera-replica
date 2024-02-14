import { uploadFileToFirebase } from '@lib/firebase';
import { addCommentValid, deleteCommentValid, listCommentLessonValid, listCommentValid } from '@lib/validation';
import { addCommentMd, countListCommentMd, deleteCommentMd, getDetailCommentMd, getListCommentMd, updateCommentMd } from '@models';
import { validateData } from '@utils';

export const getListCommentLesson = async (req, res) => {
  try {
    const { error, value } = validateData(listCommentLessonValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { page, limit, fromDate, toDate, status } = value;
    const where = { type: 3, parentId: null };
    if (fromDate) where.createdAt = { $gte: fromDate };
    if (toDate) {
      if (!where.createdAt) where.createdAt.$lte = toDate;
    }
    if (status || status === 0) where.status = status;
    const documents = await getListCommentMd(where, page, limit);
    const total = await countListCommentMd(where);
    res.json({ status: true, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const getListComment = async (req, res) => {
  try {
    const { error, value } = validateData(listCommentValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { type, objectId, parentId, status } = value;
    const where = { objectId, type };
    if (!parentId) where.parentId = null;
    else if (parentId) where.parentId = parentId;
    if (status || status === 0) where.status = status;
    const data = await getListCommentMd(where, false, false, [{ path: 'by', select: 'avatar fullName' }]);
    if (data && data.length > 0) {
      for (const datum of data) {
        if (!datum.parentId)
          datum._doc.comments = await getListCommentMd({ objectId, type, parentId: datum._id }, false, false, [
            { path: 'by', select: 'avatar fullName' }
          ]);
      }
    }
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const addComment = async (req, res) => {
  try {
    const { error, value } = validateData(addCommentValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { type, objectId, parentId, content } = value;
    let file;
    if (req.file) {
      file = await uploadFileToFirebase(req.file);
    }
    const data = await addCommentMd({ by: req.userInfo._id, type, objectId, parentId, content, file, status: 0 });
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { error, value } = validateData(deleteCommentValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = value;

    const comment = await getDetailCommentMd({ _id });
    if (!comment) return res.status(400).json({ status: false, mess: 'Bình luận không tồn tại!' });

    if (req.userInfo.role !== 'admin' && comment.by !== req.userInfo._id)
      return res.status(400).json({
        status: false,
        mess: 'Bạn không có quyền xóa bình luận này!'
      });

    const data = await deleteCommentMd({ _id });
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
