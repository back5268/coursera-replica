import * as yup from 'yup';

export const UserValidation = yup.object({
  email: yup.string().email('Email không đúng định dạng!').required('Email không được bỏ trống!'),
  username: yup.string().required('Tài khoản không được bỏ trống!'),
  fullName: yup.string().required('Họ tên không được bỏ trống!'),
  password: yup
    .string()
    .min(6, 'Mật khẩu cần dài ít nhất 6 ký tự!')
    .matches(/^(?=.*\d)(?=.*[a-zA-Z])/, 'Mật khẩu cần chứa cả số và chữ số!')
    .required('Mật khẩu không được bỏ trống!'),
});

export const CourseValidation = yup.object({
  name: yup.string().required('Tên khóa học không được bỏ trống!'),
  code: yup.string().required('Mã khóa học không được bỏ trống!'),
});

export const LessonValidation = yup.object({
  courseId: yup.string().required('Khóa học không được bỏ trống!'),
  title: yup.string().required('Tiêu đề không được bỏ trống!'),
  content: yup.string().required('Nội dung không được bỏ trống!'),
  author: yup.string().required('Tác giả không được bỏ trống!'),
});

export const QuestionValidation = yup.object({
  lessonId: yup.string().required('Bài giảng không được bỏ trống!'),
  content: yup.string().required('Câu hỏi không được bỏ trống!'),
  answer: yup.string().required('Câu trả lời không được bỏ trống!'),
});

export const PostValidation = yup.object({
  title: yup.string().required('Tiêu đề không được bỏ trống!'),
  content: yup.string().required('Nội dung không được bỏ trống!'),
});
