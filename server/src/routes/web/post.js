import { addPost, deletePost, detailPost, getListPostWeb, likePost, savePost, updatePost } from '@controller';
import express from 'express';
import { upload } from '@lib/multer';
import { authMiddleware } from '@middleware';

export const postRouter = express.Router();

postRouter.get('/getListPostWeb', getListPostWeb);
postRouter.get('/detailPost', detailPost);

postRouter.delete('/deletePost', authMiddleware, deletePost);
postRouter.post('/addPost', authMiddleware, upload.single('image'), addPost);
postRouter.post('/updatePost', authMiddleware, upload.single('image'), updatePost);
postRouter.post('/likePost', authMiddleware, likePost);
postRouter.post('/savePost', authMiddleware, savePost);
