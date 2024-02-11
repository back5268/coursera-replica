import { INITIAL_USER_INFO, useAuthContext } from '@context/AuthContext';
import React from 'react';
import SearchSection from './SearchSection';
import AvatarSection from '@layout/admin-layout/top-bar/AvatarSection';
import NotifySection from '@layout/admin-layout/top-bar/NotifySection';
import { Button, Link } from '@components/uiCore';
import { useNavigate } from 'react-router-dom';
import { useToastState } from '@store';
import Footer from './Footer';

const WebLayout = ({ children }) => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo, setIsAuthenticated } = useAuthContext();
  const { showToast } = useToastState();

  const onSignOut = () => {
    setUserInfo(INITIAL_USER_INFO);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    showToast({ title: 'Đăng xuất thành công', severity: 'success' });
    navigate('/');
  };

  return (
    <div className="m-0 antialiased font-normal dark:bg-slate-900 text-base leading-default text-slate-500">
      <div
        className={`fixed left-0 right-0 top-0 z-20 h-16 bg-white flex justify-between
        shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] dark:bg-zinc-800 
        transition-all duration-500 ease-in-out px-4 items-center`}
      >
        <div className="flex gap-8 items-center">
          <h2 className="text-xl font-bold uppercase leading-normal">Coursera replica</h2>
          <div className="flex gap-4 text-sm font-bold uppercase leading-normal">
            <Link to="/">
              <h2 className="text-slate-500">Trang chủ</h2>
            </Link>
            <Link to="/courses">
              <h2 className="text-slate-500">Khóa học</h2>
            </Link>
            <Link to="/posts">
              <h2 className="text-slate-500">Bài viết</h2>
            </Link>
          </div>
        </div>
        <SearchSection />
        {userInfo?._id ? (
          <div className="flex gap-4 items-center">
            <NotifySection />
            <AvatarSection mode="web" onSignOut={onSignOut} />
          </div>
        ) : (
          <Button className="w-full" onClick={() => navigate('/auth/signin')}>
            Đăng nhập
          </Button>
        )}
      </div>
      <div className="relative text-center z-0 mx-auto">
        <div className="container mt-16 items-center mx-auto">{children}</div>
      </div>
      <div className="mt-24">
        <Footer />
      </div>
    </div>
  );
};

export default WebLayout;
