import { authMiddleware } from '@middleware';
import { authRouter } from './auth';
import { adminRouter } from './admin';
import { infoRouter } from './info';

export const routes = (app) => {
  app.use('/auth', authRouter);
  app.use('/admin', adminRouter);
  app.use('/info', infoRouter);
  app.get('/', authMiddleware, (req, res) => {
    res.json(`${req.user}`);
  });
};
