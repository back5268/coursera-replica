import { addUser, deleteUser, detailUser, getListUser, updateUser } from '@controller';
import { adminMiddleware } from '@middleware';
import express from 'express';

export const userRouter = express.Router();

// userRouter.use(adminMiddleware);
userRouter.use('/getListUser', getListUser);
userRouter.use('/detailUser', detailUser);
userRouter.use('/deleteUser', deleteUser);
userRouter.use('/addUser', addUser);
userRouter.use('/updateUser', updateUser);
