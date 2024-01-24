import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { getDetailUserMd } from '@models';
dotenv.config();

export const authMiddleware = async (req, res, next) => {
  const token = req.header('Bearer');
  if (!token) return res.status(400).json({ status: false, mess: 'Token không hợp lệ!' });
  try {
    const checkToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const user = await getDetailUserMd({ _id: checkToken._id });
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
