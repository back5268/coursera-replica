import { authMiddleware } from '@middleware';
import { authRouter } from './auth';
import { adminRouter } from './admin';

export const routes = (app) => {
  app.use('/auth', authRouter);
  app.use('/admin', adminRouter);
  app.get('/', authMiddleware, (req, res) => {
    res.json(`${req.user}`);
  });
};
