import { authMiddleware } from '@middleware';
import express from 'express';
import { userRouter } from './user';
import { courseRouter } from './course';

export const adminRouter = express.Router();

adminRouter.use(authMiddleware);
adminRouter.use('/user', userRouter);
adminRouter.use('/course', courseRouter);
