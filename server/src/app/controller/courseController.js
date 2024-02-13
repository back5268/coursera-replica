import { addCourseValid, listCourseValid, updateCourseValid, detailCourseValid, listCourseWebValid } from '@lib/validation';
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
import { uploadFileToFirebase } from '@lib/firebase';

export const getListCourse = async (req, res) => {
  try {
    const { error, value } = validateData(listCourseValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { page, limit, keySearch, fromPrice = 0, toPrice = Number.MAX_SAFE_INTEGER, status, type } = value;
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
    const data = await getListCourseMd({}, false, false, false, false, '_id name');
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const getListCourseWeb = async (req, res) => {
  try {
    const { error, value } = validateData(listCourseWebValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { page, limit, keySearch, fromPrice = 0, toPrice = Number.MAX_SAFE_INTEGER, rating, characteristic, type, sort } = value;
    const where = {};
    where.$and = [{ price: { $gte: fromPrice } }, { price: { $lte: toPrice } }];
    if (keySearch) where.$or = [{ name: { $regex: keySearch, $options: 'i' } }, { code: { $regex: keySearch, $options: 'i' } }];
    if (rating) where.rating = { $gte: rating };
    if (typeof isNew === 'boolean') where.isNew = isNew;
    if (typeof isHot === 'boolean') where.isHot = isHot;
    if (characteristic && Array.isArray(characteristic)) {
      if (characteristic.includes('isNew')) where.isNew = true;
      if (characteristic.includes('isHot')) where.isHot = true;
    }
    if (type && type[0]) where.type = { $in: type };
    const documents = await getListCourseMd(where, page, limit, false, sort, '_id price sale rating reviews name image slug');
    const total = await countListCourseMd(where);
    res.json({ status: true, data: { total, documents } });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const detailCourse = async (req, res) => {
  try {
    const { error, value } = validateData(detailCourseValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = value;
    const data = await getDetailCourseMd({ _id }, ['lessons']);
    if (!data) return res.status(400).json({ status: false, mess: 'Khóa học không tồn tại!' });
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { error, value } = validateData(detailCourseValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = value;

    const course = await getDetailCourseMd({ _id });
    if (!course) return res.status(400).json({ status: false, mess: 'Khóa học không tồn tại!' });

    const checkLesson = await getListLessonMd({ courseId: _id });
    if (checkLesson.length > 0)
      return res.status(400).json({ status: false, mess: 'Khóa học đã có bài giảng, vui lòng xóa hết bài giảng trước khi xóa khóa học!' });

    const data = await deleteCourseMd({ _id });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const addCourse = async (req, res) => {
  try {
    const { error, value } = validateData(addCourseValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { name, code, description, skills, requirements, price, sale, type, status, isHot, isNew } = value;

    const checkName = await getDetailCourseMd({ name });
    if (checkName) return res.status(400).json({ status: false, mess: 'Tên khóa học đã tồn tại!' });

    const checkCode = await getDetailCourseMd({ code });
    if (checkCode) return res.status(400).json({ status: false, mess: 'Mã khóa học đã tồn tại!' });

    let image;
    if (req.file) {
      image = await uploadFileToFirebase(req.file);
    }

    const slug = removeSpecialCharacter(name);
    const data = await addCourseMd({
      by: req.userInfo._id,
      name,
      code,
      slug,
      description,
      skills,
      requirements,
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
    const { error, value } = validateData(updateCourseValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    let { _id, name, code, description, skills, requirements, price, sale, type, status, isHot, isNew, image } = value;
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
      image = await uploadFileToFirebase(req.file);
    }

    const data = await updateCourseMd(
      { _id },
      { updateBy: req.userInfo._id, name, code, description, skills, requirements, price, sale, type, status, isHot, isNew, image }
    );
    if (!data) return res.status(400).json({ status: false, mess: 'Khóa học không tồn tại!' });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
