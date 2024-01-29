import { addLesson, deleteLesson, detailLesson, getListLesson, updateLesson } from '@controller';
import { staffMiddleware } from '@middleware';
import express from 'express';

export const lessonRouter = express.Router();

lessonRouter.use(staffMiddleware);
lessonRouter.use('/getListLesson', getListLesson);
lessonRouter.use('/detailLesson', detailLesson);
lessonRouter.use('/deleteLesson', deleteLesson);
lessonRouter.use('/addLesson', addLesson);
lessonRouter.use('/updateLesson', updateLesson);
