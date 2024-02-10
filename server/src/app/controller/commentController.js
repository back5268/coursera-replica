import {addCommentValid, listCommentLessonValid} from '@lib/validation';
import {countListCommentMd, deleteCommentMd, getDetailCommentMd, getDetailPostMd, getListCommentMd} from '@models';
import { validateData } from '@utils';

export const getListCommentLesson = async (req, res) => {
    try {
        const { error, value } = validateData(listCommentLessonValid, req.query);
        if (error) return res.status(400).json({ status: false, mess: error });
        const { page, limit, fromDate, toDate, status } = value;
        const where = { type: 3, parentId: null };
        if (fromDate) where.createdAt = { $gte: fromDate }
        if (toDate) {
            if (!where.createdAt)
                where.createdAt.$lte = toDate
        }
        if (status || status === 0) where.status = status;
        const documents = await getListCommentMd(where, page, limit);
        const total = await countListCommentMd(where);
        res.json({ status: true, data: { documents, total } });
    } catch (error) {
        res.status(500).json({ status: false, mess: error.toString() });
    }
};

export const addComment = async (req, res) => {
    try {
        const { error, value } = validateData(addCommentValid, req.query);
        if (error) return res.status(400).json({ status: false, mess: error });
    } catch (error) {
        res.status(500).json({ status: false, mess: error.toString() });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const { error, value } = validateData(addCommentValid, req.query);
        if (error) return res.status(400).json({ status: false, mess: error });
        const {_id} = value;

        const comment = await getDetailCommentMd({_id});
        if (!comment) return res.status(400).json({status: false, mess: 'Bình luận không tồn tại!'});

        if (req.userInfo.role !== 'admin' && comment.by !== req.userInfo._id) return res.status(400).json({
            status: false,
            mess: 'Bạn không có quyền xóa bình luận này này!'
        });

        const data = await deleteCommentMd({ _id })
        res.json({ status: true, data })
    } catch (error) {
        res.status(500).json({ status: false, mess: error.toString() });
    }
};
