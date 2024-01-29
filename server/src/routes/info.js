import express from 'express';
import { getListCourseInfo, getListUserInfo } from '@controller';

export const infoRouter = express.Router();

infoRouter.get('/getListCourse', getListCourseInfo);
infoRouter.get('/getListUser', getListUserInfo);
