import { authMiddleware } from '@middleware';
import express from 'express';
import { userRouter } from './user';
import { courseRouter } from './course';
import { lessonRouter } from './lesson';
import { questionRouter } from './question';
import { postRouter } from './post';

export const adminRouter = express.Router();

adminRouter.use(authMiddleware);
adminRouter.use('/user', userRouter);
adminRouter.use('/course', courseRouter);
adminRouter.use('/lesson', lessonRouter);
adminRouter.use('/question', questionRouter);
adminRouter.use('/post', postRouter);
