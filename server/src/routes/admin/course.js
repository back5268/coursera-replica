import { addCourse, deleteCourse, detailCourse, getListCourse, updateCourse } from '@controller';
import { staffMiddleware } from '@middleware';
import express from 'express';

export const courseRouter = express.Router();

courseRouter.use(staffMiddleware);
courseRouter.use('/getListCourse', getListCourse);
courseRouter.use('/detailCourse', detailCourse);
courseRouter.use('/deleteCourse', deleteCourse);
courseRouter.use('/addCourse', addCourse);
courseRouter.use('/updateCourse', updateCourse);
