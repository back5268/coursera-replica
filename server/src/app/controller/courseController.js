import { addCourseValid, listCourseValid, updateCourseValid, dedtailCourseValid } from '@lib/validation';
import { addCourseMd, countListCourseMd, deleteCourseMd, getDetailCourseMd, getListCourseMd, updateCourseMd } from '@models';
import { removeSpecialCharacter, validateData } from '@utils';

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
    const data = await getListCourseMd({ status: 1 });
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const detailCourse = async (req, res) => {
  try {
    const error = validateData(dedtailCourseValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = req.query;
    const data = await getDetailCourseMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Khóa học không tồn tại!' });
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const error = validateData(dedtailCourseValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = req.body;
    const data = await deleteCourseMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Khóa học không tồn tại!' });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const addCourse = async (req, res) => {
  try {
    const error = validateData(addCourseValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { name, code, description, skills, price, sale, type, status, isHot, isNew } = req.body;

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
      isNew
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
    const { _id, name, code, description, skills, price, sale, type, status, isHot, isNew } = req.body;

    if (name) {
      const checkName = await getDetailCourseMd({ name });
      if (checkName) return res.status(400).json({ status: false, mess: 'Tên khóa học đã tồn tại!' });
    }

    if (code) {
      const checkCode = await getDetailCourseMd({ code });
      if (checkCode) return res.status(400).json({ status: false, mess: 'Mã khóa học đã tồn tại!' });
    }

    const data = await updateCourseMd(
      { _id },
      { updateBy: req.userInfo._id, name, code, description, skills, price, sale, type, status, isHot, isNew }
    );
    if (!data) return res.status(400).json({ status: false, mess: 'Khóa học không tồn tại!' });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
