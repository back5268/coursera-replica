import express from 'express';
import { notifyRouter } from './notify';
import { postRouter } from './post';
import { courseRouter } from './course';

export const webRouter = express.Router();

webRouter.use('/notify', notifyRouter);
webRouter.use('/post', postRouter);
webRouter.use('/course', courseRouter);
