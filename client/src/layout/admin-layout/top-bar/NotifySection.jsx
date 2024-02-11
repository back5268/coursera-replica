import { Hr, Link, Select } from '@components/uiCore';
import React, { useEffect, useRef, useState } from 'react';
import { MdOutlineNotificationsActive } from 'react-icons/md';
import { TERipple } from 'tw-elements-react';

const NotifySection = ({ data = [] }) => {
  const ref = useRef(null);
  const [isShow, setIsShow] = useState(false);

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setIsShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref} className={`relative items-center`}>
      <button
        onClick={() => setIsShow(!isShow)}
        className={`hover:bg-primary hover:text-white p-2 rounded-md hover:shadow-xl
      ${isShow ? 'bg-primary text-white shadow-xl' : 'bg-primary-200 text-primary shadow-md'}`}
      >
        <div className="relative">
          <MdOutlineNotificationsActive size={20} />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-1 ring-primary-50 bg-red-400" />
        </div>
      </button>
      <div
        className={`absolute right-0 mt-2 w-80 bg-white shadow-xl rounded-sm transition-all z-50
          duration-300 ease-in-out transform ${isShow ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'}`}
      >
        <div className="mx-4">
          <div className="flex justify-between items-center py-2 h-16">
            <h4 className="text-md font-semibold text-gray-900">All Notification</h4>
            <a className="text-xs text-blue-600 hover:text-blue-800">Mark all as read</a>
          </div>
          <Select data={['Tất cả', 'Mới', 'Chưa đọc']} search={false} />
        </div>
        <div className="overflow-y-auto h-[60vh]">
          <ul className="relative mt-4 list-none">
            <Hr />
            {data.map((d, index) => (
              <li key={index}>
                <TERipple className="w-full" rippleColor="light">
                  <Link
                    className={`flex h-24 cursor-pointer items-center truncate rounded-sm px-5 py-2 text-sm
                   outline-none transition duration-300 ease-in-out hover:bg-primary-100 hover:text-primary
                  hover:outline-none gap-4`}
                  ></Link>
                </TERipple>
                <Hr />
              </li>
            ))}
          </ul>
        </div>
        <Hr />
        <div className="h-12 items-center flex justify-center">
          <a className="text-sm font-semibold text-blue-600 hover:text-blue-800">Xem thêm</a>
        </div>
      </div>
    </div>
  );
};

export default NotifySection;
