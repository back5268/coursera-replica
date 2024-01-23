import { authMiddleware } from '@middleware';
import express from 'express';

export const adminRouter = express.Router();

adminRouter.use('/admin', authMiddleware);
