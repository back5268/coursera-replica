import {
  addLessonValid,
  listLessonValid,
  updateLessonValid,
  detailLessonValid
} from '@lib/validation';
import {
  addLessonMd,
  countListLessonMd,
  deleteLessonMd,
  getDetailCourseMd,
  getDetailLessonMd,
  getListLessonMd, getListQuestionMd,
  updateCourseMd,
  updateLessonMd
} from '@models';
import { validateData } from '@utils';
import {uploadFileToFirebase} from "@lib/firebase";

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

export const getListLessonInfo = async (req, res) => {
  try {
    const data = await getListLessonMd();
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const detailLesson = async (req, res) => {
  try {
    const error = validateData(detailLessonValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = req.query;
    const data = await getDetailLessonMd({ _id }, ['Question']);
    if (!data) return res.status(400).json({ status: false, mess: 'Bài giảng không tồn tại!' });
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const deleteLesson = async (req, res) => {
  try {
    const error = validateData(detailLessonValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = req.body;

    const lesson = await getDetailLessonMd({ _id });
    if (!lesson) return res.status(400).json({ status: false, mess: 'Bài giảng không tồn tại!' });

    const checkQuestion = await getListQuestionMd({ lessonId: _id })
    if (checkQuestion.length > 0) return res.status(400).json({ status: false, mess: 'Bài giảng đã có câu hỏi, vui lòng xóa hết câu hỏi trước khi xóa bài giảng!' });

    const data = await deleteLessonMd({ _id });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const addLesson = async (req, res) => {
  try {
    if (req.files) {
      const files = []
      for (let file of req.files) {
        files.push(await uploadFileToFirebase(file))
      }
      req.files = files
    }
    const error = validateData(addLessonValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { title, content, author, courseId, time, description, status, files } = req.body;

    const checkTitle = await getDetailLessonMd({ title });
    if (checkTitle) return res.status(400).json({ status: false, mess: 'Tiêu đề đã tồn tại!' });

    const checkCourse = await getDetailCourseMd({ _id: courseId, status: 1 });
    if (!checkCourse) return res.status(400).json({ status: false, mess: 'Khóa học không tồn tại!' });

    const data = await addLessonMd({
      by: req.userInfo._id,
      title,
      content,
      author,
      courseId,
      time,
      description,
      status,
      files
    });

    await updateCourseMd({ _id: checkCourse._id }, { $addToSet: { lessons: data._id } })
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const updateLesson = async (req, res) => {
  try {
    const error = validateData(updateLessonValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id, title, content, author, courseId, time, description, status, files =  [] } = req.body;

    const lesson = await getDetailLessonMd({ _id });
    if (!lesson) return res.status(400).json({ status: false, mess: 'Bài giảng không tồn tại!' });

    if (title) {
      const checkTitle = await getDetailLessonMd({ title });
      if (checkTitle) return res.status(400).json({ status: false, mess: 'Tiêu đề đã tồn tại!' });
    }

    if (courseId) {
      const checkCourse = await getDetailCourseMd({ id: courseId, status: 1 });
      if (!checkCourse) return res.status(400).json({ status: false, mess: 'Khóa học không tồn tại!' });
      await updateCourseMd({ _id: checkCourse._id }, { $addToSet: { lessons: _id } })
      await updateCourseMd({ _id: lesson.courseId }, { $pull: { lessons: _id } })
    }

    if (req.files) {
      for (let file of req.files) {
        files.push(await uploadFileToFirebase(file))
      }
    }

    const data = await updateLessonMd({ _id }, { updateBy: req.userInfo._id, title, content, author, courseId, time, description, status });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
