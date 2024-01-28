import { BiSolidFile } from 'react-icons/bi';
import { BiSolidBookContent } from 'react-icons/bi';
import { BiNews } from 'react-icons/bi';
import { BiQuestionMark } from 'react-icons/bi';
import { BiSolidDashboard } from 'react-icons/bi';

export const items = [
  { label: 'Dashboard', icon: BiSolidDashboard, route: '/' },
  { label: 'Quản lý người dùng', icon: BiNews, route: '/users' },
  { label: 'Quản lý khóa học', icon: BiSolidBookContent, route: '/courses' },
  { label: 'Quản lý bài học', icon: BiSolidFile, route: '/lessons' },
  { label: 'Quản lý câu hỏi', icon: BiQuestionMark, route: '/questions' },
  { label: 'Quản lý bài viết', icon: BiNews, route: '/posts' }
];
