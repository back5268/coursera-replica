import * as yup from 'yup';

export const UserValidation = yup.object({
  email: yup.string().email('Email không đúng định dạng!').required('Email không được bỏ trống!'),
  username: yup.string().min(3, 'Tài khoản cần dài ít nhất 3 ký tự!').required(),
  fullname: yup.string().min(3, 'Họ tên cần dài ít nhất 3 ký tự!').required(),
  password: yup
    .string()
    .min(6, 'Mật khẩu cần dài ít nhất 6 ký tự!')
    .matches(/^(?=.*\d)(?=.*[a-zA-Z])/, 'Mật khẩu cần chứa cả số và chữ số!')
    .required(),
  bio: yup.string(),
  address: yup.string()
});
