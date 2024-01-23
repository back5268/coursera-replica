const jwt = require('jsonwebtoken');
import { getDetailUserMd } from '@/app/models';
import dotenv from 'dotenv';
dotenv.config();

export const authMiddleware = async (req, res, next) => {
  const token = req.header('Bearer');
  if (!token) return res.status(400).json({ status: false, mess: 'Không tìm thấy token người dùng !' });
  try {
    const checkToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const user = await getDetailUserMd({ _id: checkToken._id });
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send('Token không hợp lệ !');
  }
};
