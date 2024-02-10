import { listCourseReviewValid } from '@lib/validation';
import { countListCourseReviewMd, getListCourseReviewMd } from '@models';
import { validateData } from '@utils';

export const getListCourseReview = async (req, res) => {
  try {
    const { error, value } = validateData(listCourseReviewValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { page, limit, courseId, rating } = value;
    const where = {};
    if (courseId) where.courseId = courseId;
    if (rating) where.rating = rating;
    const documents = await getListCourseReviewMd(where, page, limit);
    const total = await countListCourseReviewMd(where);
    res.json({ status: true, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
