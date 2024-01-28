import express from 'express';
import { getInfo, signIn, signUp } from '@controller';
import { authMiddleware } from '@middleware';

export const authRouter = express.Router();

authRouter.get('/getInfo', authMiddleware, getInfo);
authRouter.post('/signin', signIn);
authRouter.post('/signup', signUp);
