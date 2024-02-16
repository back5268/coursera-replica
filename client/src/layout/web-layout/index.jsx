import { INITIAL_USER_INFO, useAuthContext } from '@context/AuthContext';
import React, { useEffect, useState } from 'react';
import SearchSection from './SearchSection';
import AvatarSection from '@layout/admin-layout/top-bar/AvatarSection';
import { Button, Link } from '@components/uiCore';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToastState } from '@store';
import Footer from './Footer';
import { items } from './items';
import NotifySection from '@layout/admin-layout/top-bar/notify-section';

const WebLayout = ({ children }) => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo, setIsAuthenticated } = useAuthContext();
  const { showToast } = useToastState();
  const { pathname } = useLocation();
  const [select, setSelect] = useState(null);

  const onSignOut = () => {
    setUserInfo(INITIAL_USER_INFO);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    showToast({ title: 'Đăng xuất thành công', severity: 'success' });
    navigate('/');
  };

  useEffect(() => {
    const item = pathname !== '/' ? items.find((i) => i.route !== '/' && pathname.includes(i.route)) : { route: '/', label: 'Trang chủ' };
    if (item) {
      setSelect(item.route);
      document.title = item.label;
    }
  }, [pathname]);

  return (
    <div className="m-0 antialiased font-normal dark:bg-slate-900 text-base leading-default text-slate-500">
      <div
        className={`fixed left-0 right-0 top-0 z-20 h-16 bg-white flex justify-between
        shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] dark:bg-zinc-800 
        transition-all duration-500 ease-in-out px-4 items-center`}
      >
        <div className="flex gap-8 items-center">
          <Link to="/">
            <h2 className="text-xl font-bold uppercase leading-normal">Coursera replica</h2>
          </Link>
          <div className="flex gap-4 text-sm font-bold uppercase leading-normal">
            {items.map((item, index) => (
              <Link to={item.route} key={index}>
                <h2 className={select === item.route ? 'underline' : 'text-slate-500 underline'}>{item.label}</h2>
              </Link>
            ))}
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
      <div className="text-center z-10 mx-auto">
        <div className="container mt-16 items-center mx-auto">
          <div className="w-10/12 mx-auto min-h-screen">{children}</div>
        </div>
      </div>
      <div className="mt-24">
        <Footer />
      </div>
    </div>
  );
};

export default WebLayout;
