import { detailCourseWeb, getListCourseWeb, getListSearch } from '@controller';
import express from 'express';

export const courseRouter = express.Router();

courseRouter.get('/getListCourseWeb', getListCourseWeb);
courseRouter.get('/detailCourseWeb', detailCourseWeb);
courseRouter.get('/getListSearch', getListSearch);
