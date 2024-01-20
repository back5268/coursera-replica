import { SignIn, SignUp, ForgotPassword, ConfirmPassword } from '@/view/auth';
import { Home } from '@/view/web';
import { Courses, Lessons, Questions, Posts, Users, Dashboard } from '@/view/admin';

const routes = [
  { path: '/auth/sign-in', element: SignIn, public: true },
  { path: '/auth/sign-up', element: SignUp, public: true },
  { path: '/auth/forgot-password', element: ForgotPassword, public: true },
  { path: '/auth/confirm-password', element: ConfirmPassword, public: true },

  { path: '/', element: Home, layout: 'web', public: true },

  { path: '/admin/dashboard', element: Dashboard, layout: 'admin' },
  { path: '/admin/courses', element: Courses, layout: 'admin' },
  { path: '/admin/lessons', element: Lessons, layout: 'admin' },
  { path: '/admin/questions', element: Questions, layout: 'admin' },
  { path: '/admin/posts', element: Posts, layout: 'admin' },
  { path: '/admin/users', element: Users, layout: 'admin' }
];

export default routes;
