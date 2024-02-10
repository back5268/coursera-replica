import express from 'express';
import { authMiddleware } from '@middleware';
import { addComment, deleteComment } from '@controller';

export const commentRouter = express.Router();

commentRouter.use(authMiddleware);
commentRouter.get('/addComment', addComment);
commentRouter.get('/deleteComment', deleteComment);
