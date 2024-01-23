import express from 'express';
import { signIn, signUp } from '@controller';

export const authRouter = express.Router();

authRouter.post('/signin', signIn);
authRouter.post('/signup', signUp);
