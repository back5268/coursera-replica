import {
  addCourseValid,
  listCourseValid,
  updateCourseValid,
  detailCourseValid,
  listCourseWebValid,
  listSearchValid,
  detailCourseWebValid,
  registerCourseValid
} from '@lib/validation';
import {
  addCourseMd,
  addCourseRegisterMd,
  countListCourseMd,
  deleteCourseMd,
  getDetailCourseMd,
  getDetailCourseRegisterMd,
  getListCourseMd,
  getListLessonMd,
  getListPostMd,
  updateCourseMd,
  updateUserMd
} from '@models';
import { removeSpecialCharacter, validateData } from '@utils';
import { uploadFileToFirebase } from '@lib/firebase';
import { generateVietQrLink } from '@lib/viet-qr';

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

export const getListSearch = async (req, res) => {
  try {
    const { error, value } = validateData(listSearchValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { keySearch } = value;
    const posts = await getListPostMd({ title: { $regex: keySearch, $options: 'i' } }, 1, 5, false, false, '_id image title slug');
    const courses = await getListCourseMd({ name: { $regex: keySearch, $options: 'i' } }, 1, 5, false, false, '_id image name slug');
    res.json({ status: true, data: { posts, courses } });
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

export const detailCourseWeb = async (req, res) => {
  try {
    const { error, value } = validateData(detailCourseWebValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { slug } = value;
    const data = await getDetailCourseMd({ slug }, [
      { path: 'lessons', select: 'title time' },
      {
        path: 'reviews',
        model: 'CourseReview',
        populate: {
          path: 'by',
          model: 'User',
          select: 'fullName avatar'
        }
      }
    ]);
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
    let { _id, name, code, description, skills, requirements, price, sale, type, status, isHot, isNew, image, slug } = value;
    const course = await getDetailCourseMd({ _id });
    if (!course) return res.status(400).json({ status: false, mess: 'Khóa học không tồn tại!' });

    if (name) {
      const checkName = await getDetailCourseMd({ name });
      if (checkName) return res.status(400).json({ status: false, mess: 'Tên khóa học đã tồn tại!' });
      slug = removeSpecialCharacter(name);
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
      { updateBy: req.userInfo._id, name, code, slug, description, skills, requirements, price, sale, type, status, isHot, isNew, image }
    );
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const registerCourse = async (req, res) => {
  try {
    const { error, value } = validateData(registerCourseValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { courseId } = value;

    const course = await getDetailCourseMd({ _id: courseId });
    if (!course) return res.status(400).json({ status: false, mess: 'Khóa học không tồn tại!' });

    const checkCourseRegister = req.userInfo.courses.find((c) => String(c.courseId) === String(course._id));
    if (checkCourseRegister) return res.status(400).json({ status: false, mess: 'Bạn đã đăng ký khóa học này!' });

    const attr = { courseId, userId: req.userInfo._id, courseInfo: { name: course.name, image: course.image, slug: course.slug } };
    if (course.price - course.sale > 0) {
      attr.status = 0;
      attr.price = course.price - course.sale;
      attr.qr = generateVietQrLink(course.price - course.sale, 'Đăng ký khóa học Coursera Replica');
    } else attr.status = 1;

    if (course.lessons.length > 0) {
      attr.lessons = course.lessons.map((less) => ({ lessonId: less, isCompleted: false }));
    }

    const data = await addCourseRegisterMd(attr);
    await updateUserMd({ _id: req.userInfo._id }, { $addToSet: { courses: data._id } });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
