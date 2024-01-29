import { addLessonValid, listLessonValid, updateLessonValid, dedtailLessonValid } from '@lib/validation';
import { addLessonMd, countListLessonMd, deleteLessonMd, getDetailLessonMd, getListLessonMd, updateLessonMd } from '@models';
import { validateData } from '@utils';

export const getListLesson = async (req, res) => {
  try {
    const error = validateData(listLessonValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { page, limit, keySearch, courseId, status } = req.query;
    const where = {};
    if (keySearch) where.$or = [{ title: { $regex: keySearch, $options: 'i' } }, { author: { $regex: keySearch, $options: 'i' } }];
    if (status || status === 0) where.status = status;
    if (courseId) where.courseId = courseId;
    const documents = await getListLessonMd(where, page, limit);
    const total = await countListLessonMd(where);
    res.json({ status: true, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const detailLesson = async (req, res) => {
  try {
    const error = validateData(dedtailLessonValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = req.query;
    const data = await getDetailLessonMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Bài học không tồn tại!' });
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const deleteLesson = async (req, res) => {
  try {
    const error = validateData(dedtailLessonValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = req.body;
    const data = await deleteLessonMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Bài học không tồn tại!' });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const addLesson = async (req, res) => {
  try {
    const error = validateData(addLessonValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { title, content, author, courseId, time, description, status } = req.body;

    const checkTitle = await getDetailLessonMd({ title });
    if (checkTitle) return res.status(400).json({ status: false, mess: 'Tiêu đề đã tồn tại!' });

    const checkCourse = await getDetailLessonMd({ courseId, status: 1 });
    if (!checkCourse) return res.status(400).json({ status: false, mess: 'Không tìm thấy khóa học!' });

    const data = await addLessonMd({
      by: req.userInfo._id,
      title,
      content,
      author,
      courseId,
      time,
      description,
      status
    });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const updateLesson = async (req, res) => {
  try {
    const error = validateData(updateLessonValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id, title, content, author, courseId, time, description, status } = req.body;

    if (title) {
      const checkTitle = await getDetailLessonMd({ title });
      if (checkTitle) return res.status(400).json({ status: false, mess: 'Tiêu đề đã tồn tại!' });
    }

    if (courseId) {
      const checkCourse = await getDetailLessonMd({ courseId, status: 1 });
      if (!checkCourse) return res.status(400).json({ status: false, mess: 'Không tìm thấy khóa học!' });
    }

    const data = await updateLessonMd({ _id }, { updateBy: req.userInfo._id, title, content, author, courseId, time, description, status });
    if (!data) return res.status(400).json({ status: false, mess: 'Không tìm thấy bài học!' });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
