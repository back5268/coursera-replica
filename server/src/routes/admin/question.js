import { addQuestion, deleteQuestion, detailQuestion, getListQuestion, updateQuestion } from '@controller';
import { staffMiddleware } from '@middleware';
import express from 'express';

export const questionRouter = express.Router();

questionRouter.use(staffMiddleware);
questionRouter.use('/getListQuestion', getListQuestion);
questionRouter.use('/detailQuestion', detailQuestion);
questionRouter.use('/deleteQuestion', deleteQuestion);
questionRouter.use('/addQuestion', addQuestion);
questionRouter.use('/updateQuestion', updateQuestion);
