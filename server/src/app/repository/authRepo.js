const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import dotenv from 'dotenv';
import { addlUserMd, getDetailUserMd } from '../models';
dotenv.config();

export const createUserRp = async ({ fullname, username, email, password }) => {
  const checkEmail = await getDetailUserMd({ email });
  if (checkEmail) return { mess: 'Email đã tồn tại!' };
  const checkUsername = await getDetailUserMd({ username });
  if (checkUsername) return { mess: 'Username đã tồn tại!' };
  const salt = await bcrypt.genSalt(10);
  const newPassword = await bcrypt.hash(password, salt);
  const data = await addlUserMd({ fullname, username, email, password: newPassword });
  return { data };
};

export const signinRp = async ({ username, password }) => {
  const checkUsername = await getDetailUserMd({ username });
  if (!checkUsername) return { mess: 'Không tìm thấy người dùng!' };
  const passLogin = await bcrypt.compare(password, checkUsername.password);
  if (!passLogin) return { mess: 'Mật khẩu không hợp lệ!' };
  const token = jwt.sign({ _id: checkUsername._id }, process.env.SECRET_TOKEN);
  return { data: { token } };
};
