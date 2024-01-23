import { signIn, signUp } from '@/app/controller';
import express from 'express';
export const authRouter = express.Router();

authRouter.post('/signin', signIn);
authRouter.post('/signup', signUp);
