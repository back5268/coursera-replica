import { addPost, deletePost, detailPost, getListPost, updatePost } from '@controller';
import { staffMiddleware } from '@middleware';
import express from 'express';

export const postRouter = express.Router();

postRouter.use(staffMiddleware);
postRouter.use('/getListPost', getListPost);
postRouter.use('/detailPost', detailPost);
postRouter.use('/deletePost', deletePost);
postRouter.use('/addPost', addPost);
postRouter.use('/updatePost', updatePost);
