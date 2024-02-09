import {
  addCourseValid,
  listCourseValid,
  updateCourseValid,
  detailCourseValid
} from '@lib/validation';
import {
  addCourseMd,
  countListCourseMd,
  deleteCourseMd,
  getDetailCourseMd,
  getListCourseMd,
  getListLessonMd,
  updateCourseMd
} from '@models';
import { removeSpecialCharacter, validateData } from '@utils';
import {uploadFileToFirebase} from "@lib/firebase";

export const getListCourse = async (req, res) => {
  try {
    const error = validateData(listCourseValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { page, limit, keySearch, fromPrice = 0, toPrice = Number.MAX_SAFE_INTEGER, status, type } = req.query;
    const where = {};
    where.$and = [{ price: { $gte: fromPrice } }, { price: { $lte: toPrice } }];
    if (keySearch) where.$or = [{ name: { $regex: keySearch, $options: 'i' } }, { code: { $regex: keySearch, $options: 'i' } }];
    if (status || status === 0) where.status = status;
    if (type) where.type = type;
    const documents = await getListCourseMd(where, page, limit);
    const total = await countListCourseMd(where);
    res.json({ status: true, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const getListCourseInfo = async (req, res) => {
  try {
    const data = await getListCourseMd();
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const detailCourse = async (req, res) => {
  try {
    const error = validateData(detailCourseValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = req.query;
    const data = await getDetailCourseMd({ _id }, ['Lesson']);
    if (!data) return res.status(400).json({ status: false, mess: 'Khóa học không tồn tại!' });
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const error = validateData(detailCourseValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = req.body;

    const course = await getDetailCourseMd({ _id });
    if (!course) return res.status(400).json({ status: false, mess: 'Khóa học không tồn tại!' });

    const checkLesson = await getListLessonMd({ courseId: _id })
    if (checkLesson.length > 0) return res.status(400).json({ status: false, mess: 'Khóa học đã có bài giảng, vui lòng xóa hết bài giảng trước khi xóa khóa học!' });

    const data = await deleteCourseMd({ _id });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const addCourse = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = await uploadFileToFirebase(req.file)
    }
    const error = validateData(addCourseValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { name, code, description, skills, price, sale, type, status, isHot, isNew, image } = req.body;

    const checkName = await getDetailCourseMd({ name });
    if (checkName) return res.status(400).json({ status: false, mess: 'Tên khóa học đã tồn tại!' });

    const checkCode = await getDetailCourseMd({ code });
    if (checkCode) return res.status(400).json({ status: false, mess: 'Mã khóa học đã tồn tại!' });

    const slug = removeSpecialCharacter(name);
    const data = await addCourseMd({
      by: req.userInfo._id,
      name,
      code,
      slug,
      description,
      skills,
      price,
      sale,
      type,
      status,
      isHot,
      isNew,
      image
    });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const error = validateData(updateCourseValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    let { _id, name, code, description, skills, price, sale, type, status, isHot, isNew, image } = req.body;

    const course = await getDetailCourseMd({ _id });
    if (!course) return res.status(400).json({ status: false, mess: 'Khóa học không tồn tại!' });

    if (name) {
      const checkName = await getDetailCourseMd({ name });
      if (checkName) return res.status(400).json({ status: false, mess: 'Tên khóa học đã tồn tại!' });
    }

    if (code) {
      const checkCode = await getDetailCourseMd({ code });
      if (checkCode) return res.status(400).json({ status: false, mess: 'Mã khóa học đã tồn tại!' });
    }

    if (req.file) {
      image = await uploadFileToFirebase(req.file)
    }

    const data = await updateCourseMd(
      { _id },
      { updateBy: req.userInfo._id, name, code, description, skills, price, sale, type, status, isHot, isNew, image }
    );
    if (!data) return res.status(400).json({ status: false, mess: 'Khóa học không tồn tại!' });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
