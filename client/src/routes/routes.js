import Courses from '@/view/admin/courses';
import { SignIn, SignUp, ForgotPassword, ConfirmPassword } from '@/view/auth';

const routes = [
  { path: '/auth/sign-in', element: SignIn, public: true },
  { path: '/auth/sign-up', element: SignUp, public: true },
  { path: '/auth/forgot-password', element: ForgotPassword, public: true },
  { path: '/auth/confirm-password', element: ConfirmPassword, public: true },

  { path: '/', element: Courses, public: true }
];

export default routes;
