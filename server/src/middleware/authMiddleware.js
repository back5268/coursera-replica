import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { getDetailUserMd } from '@models';
dotenv.config();

export const authMiddleware = async (req, res, next) => {
  const token = req.header('Bearer');
  if (!token) return res.status(401).json({ status: false, mess: 'Token không hợp lệ!' });
  try {
    const checkToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    const userInfo = await getDetailUserMd({ _id: checkToken._id });
    if (!userInfo) return res.status(401).json({ status: false, mess: 'Token không hợp lệ!' });
    req.userInfo = userInfo;
    next();
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
