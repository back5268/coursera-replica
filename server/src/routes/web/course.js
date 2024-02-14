import { addCourseReview, deleteCourseReview, detailCourseWeb, getListCourseWeb, getListSearch } from '@controller';
import { upload } from '@lib/multer';
import { authMiddleware } from '@middleware';
import express from 'express';

export const courseRouter = express.Router();

courseRouter.get('/getListCourseWeb', getListCourseWeb);
courseRouter.get('/detailCourseWeb', detailCourseWeb);
courseRouter.get('/getListSearch', getListSearch);

courseRouter.post('/addCourseReview', authMiddleware, upload.single('file'), addCourseReview);
courseRouter.post('/deleteCourseReview', authMiddleware, deleteCourseReview);
