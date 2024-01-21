import React, { useState } from 'react';
import TopBar from './top-bar';
import Sidebar from './side-bar';

const AdminLayout = (props) => {
  const [isShow, setIsShow] = useState(true);

  return (
    <div className="m-0 antialiased font-normal dark:bg-slate-900 text-base leading-default text-slate-500">
      <TopBar isShow={isShow} setIsShow={setIsShow} />
      <div className="-z-10 fixed min-h-48 w-full top-0 bg-y-50 bg-[url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/profile-layout-header.jpg')]">
        <span className="fixed top-0 left-0 w-full min-h-48 bg-blue-500 opacity-40"></span>
      </div>
      <Sidebar isShow={isShow} setIsShow={setIsShow} />
      <div className={`transition-all duration-500 ease-in-out p-8 mt-20 z-10 ${isShow ? 'ml-64' : 'ml-20'}`}>
        {props.children}
      </div>
    </div>
  );
};

export default AdminLayout;
