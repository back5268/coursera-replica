import { Button } from '@/components/uiCore';
import React, { useState, useEffect } from 'react';
import { BiMenu } from 'react-icons/bi';
import { TERipple } from 'tw-elements-react';
import { BiLogOut } from 'react-icons/bi';

import { Link, useLocation } from 'react-router-dom';
import { items } from './items';
import { IoNavigateOutline } from 'react-icons/io5';

const Sidebar = (props) => {
  const { isShow, setIsShow } = props;
  const [select, setSelect] = useState(null);
  const { pathname } = useLocation();

  useEffect(() => {
    setSelect(pathname);
  }, [pathname]);

  return (
    <div
      className={`fixed left-0 top-0 z-[1035] h-full overflow-hidden bg-primary-50
        shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] dark:bg-zinc-800 
        transition-all duration-500 ease-in-out px-2 ${isShow ? 'w-64' : 'w-20'} `}
    >
      <div className={`w-full h-12 flex items-center my-1 justify-center`}>
        <TERipple rippleColor="light">
          <button
            className={`bg-primary-200 text-primary p-1 rounded-md transition-all duration-500 ease-in-out hover:text-white hover:bg-primary ${isShow ? 'translate-x-24' : 'translate-x-0'}`}
            type="button"
            onClick={() => setIsShow(!isShow)}
          >
            <BiMenu size={24} />
          </button>
        </TERipple>
      </div>
      <hr />
      <div className="mt-4 h-[76vh]">
        <ul className="relative m-0 list-none">
          {items.map((item, index) => (
            <li key={index} className="relative">
              <TERipple className="w-full" rippleColor="light">
                <Link
                  to={'/admin' + item.route}
                  className={`flex h-12 cursor-pointer items-center truncate rounded-sm px-5 py-2 text-sm
                   outline-none transition duration-300 ease-in-out hover:bg-primary-200 hover:text-primary
                  hover:outline-none gap-4 ${select === '/admin' + item.route ? 'text-primary bg-primary-200' : 'text-gray-600'}`}
                >
                  {item.icon && <item.icon size={20} />}
                  <span className={`${isShow ? '' : 'hidden'} transition-all duration-500 ease-in-out overflow-hidden`}>{item.label}</span>
                </Link>
              </TERipple>
            </li>
          ))}
        </ul>
      </div>
      <div className="px-2 flex flex-col gap-2">
        <Button className={`w-full flex gap-2 truncate`} severity="secondary">
          <IoNavigateOutline size={16} />
          <span>Chuyển đến trang chủ</span>
        </Button>
        <Button className={`w-full flex gap-2 truncate ${isShow ? '' : 'p-0'}`}>
          <BiLogOut size={16} />
          <span className={`${isShow ? '' : 'hidden'} transition-all duration-500 ease-in-out overflow-hidden`}>Đăng xuất</span>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
