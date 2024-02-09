import { addQuestion, deleteQuestion, detailQuestion, getListQuestion, updateQuestion } from '@controller';
import { staffMiddleware } from '@middleware';
import express from 'express';

export const questionRouter = express.Router();

questionRouter.use(staffMiddleware);
questionRouter.get('/getListQuestion', getListQuestion);
questionRouter.get('/detailQuestion', detailQuestion);
questionRouter.delete('/deleteQuestion', deleteQuestion);
questionRouter.post('/addQuestion', addQuestion);
questionRouter.post('/updateQuestion', updateQuestion);
