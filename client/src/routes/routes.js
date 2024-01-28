import { SignIn, SignUp, ForgotPassword, ConfirmPassword } from '@view/auth';
import { Home } from '@view/web';
import { Courses, Lessons, Questions, Posts, Users, Dashboard } from '@view/admin';

const routes = [
  { path: '/auth/signin', element: SignIn, public: true },
  { path: '/auth/signup', element: SignUp, public: true },
  { path: '/auth/forgot-password', element: ForgotPassword, public: true },
  { path: '/auth/confirm-password', element: ConfirmPassword, public: true },

  { path: '/', element: Home, layout: 'web', public: true },

  { path: '/admin', element: Dashboard, layout: 'admin', roles: ['staff', 'admin'] },
  { path: '/admin/courses', element: Courses, layout: 'admin', roles: ['staff', 'admin'] },
  { path: '/admin/lessons', element: Lessons, layout: 'admin', roles: ['staff', 'admin'] },
  { path: '/admin/questions', element: Questions, layout: 'admin', roles: ['staff', 'admin'] },
  { path: '/admin/posts', element: Posts, layout: 'admin', roles: ['staff', 'admin'] },
  { path: '/admin/users', element: Users, layout: 'admin', roles: ['admin'] }
];

export default routes;
