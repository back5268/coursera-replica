import { getListCourseWeb } from '@controller';
import express from 'express';

export const courseRouter = express.Router();

courseRouter.get('/getListCourseWeb', getListCourseWeb);
