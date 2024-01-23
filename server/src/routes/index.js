import { authMiddleware } from '@/middleware';
import { authRouter } from './auth';

export const router = (app) => {
  app.use('/auth', authRouter);
  app.get('/', authMiddleware, (req, res) => {
    console.log(req.user);
    res.json(`${req.user}`);
  });
};
