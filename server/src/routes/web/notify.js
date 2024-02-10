import { getListNotify, readAllNotify, updateStatusNotify } from '@controller';
import express from 'express';
import { authMiddleware } from '@middleware';

export const notifyRouter = express.Router();

notifyRouter.use(authMiddleware);
notifyRouter.get('/getListNotify', getListNotify);
notifyRouter.get('/updateStatusNotify', updateStatusNotify);
notifyRouter.get('/readAllNotify', readAllNotify);
