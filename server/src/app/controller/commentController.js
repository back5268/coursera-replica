import {listCommentLessonValid} from '@lib/validation';
import {countListCommentMd, getListCommentMd} from '@models';
import { validateData } from '@utils';

export const getListCommentLesson = async (req, res) => {
    try {
        const error = validateData(listCommentLessonValid, req.query);
        if (error) return res.status(400).json({ status: false, mess: error });
        const { page, limit, fromDate, toDate, status } = req.query;
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
