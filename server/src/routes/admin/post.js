import { addPost, deletePost, detailPost, getListPost, updatePost } from '@controller';
import { staffMiddleware } from '@middleware';
import express from 'express';
import { upload } from '@lib/multer';

export const postRouter = express.Router();

postRouter.use(staffMiddleware);
postRouter.get('/getListPost', getListPost);
postRouter.get('/detailPost', detailPost);
postRouter.delete('/deletePost', deletePost);
postRouter.post('/addPost', upload.single('image'), addPost);
postRouter.post('/updatePost', upload.single('image'), updatePost);
