import { getListNotifyApi, readAllNotifyApi, updateStatusNotifyApi } from '@api';
import { Hr, Select } from '@components/uiCore';
import { useGetApi } from '@lib/react-query';
import { getRoleTitle, multiFormatDateString } from '@utils';
import React, { useEffect, useRef, useState } from 'react';
import { MdOutlineNotificationsActive } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { TERipple } from 'tw-elements-react';

const NotifySection = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const [isShow, setIsShow] = useState(false);
  const [render, setRender] = useState(false);
  const { data, isLoading } = useGetApi(getListNotifyApi, { page: 1, limit: 10, render }, 'notify');
  const isReadAll = Boolean(data?.length > 0 && data.find((d) => d.status === 0));

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

  const onReadAll = async (status) => {
    const response = await readAllNotifyApi({ status });
    if (response) setRender((pre) => !pre);
  };

  const onClickNoti = async (item) => {
    const response = await updateStatusNotifyApi({ status: 2, _id: item._id });
    if (response) {
      setRender((pre) => !pre);
      switch (item.type) {
        case 1:
          return navigate(`/posts/detail/${item?.data?.slug}`);
        case 2:
          return navigate(`/posts/detail/${item?.data?.slug}`);
        case 3:
          return navigate(`/posts/detail/${item?.data?.slug}`);
      }
    }
  };

  return (
    <div ref={ref} className={`relative items-center`}>
      <button
        onClick={() => {
          setIsShow(!isShow);
          if (isReadAll) onReadAll(1);
        }}
        className={`hover:bg-primary hover:text-white p-2 rounded-md hover:shadow-xl
      ${isShow ? 'bg-primary text-white shadow-xl' : 'bg-primary-200 text-primary shadow-md'}`}
      >
        <div className="relative">
          <MdOutlineNotificationsActive size={20} />
          {isReadAll && <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-1 ring-primary-50 bg-red-400" />}
        </div>
      </button>
      <div
        className={`absolute right-0 mt-2 w-80 bg-white shadow-xl rounded-sm transition-all z-50
          duration-300 ease-in-out transform ${isShow ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'}`}
      >
        <div className="mx-4">
          <div className="flex justify-between items-center py-2 h-16">
            <h4 className="text-md font-semibold text-gray-900">All Notification</h4>
            <span onClick={() => onReadAll(2)} className="text-xs text-blue-600 cursor-pointer hover:text-blue-800">
              Mark all as read
            </span>
          </div>
          <Select data={['Tất cả', 'Mới', 'Chưa đọc']} value="Tất cả" search={false} />
        </div>
        <div className="overflow-y-auto h-[60vh]">
          <ul className="relative mt-4 list-none">
            <Hr />
            {data?.length > 0 &&
              data.map((item, index) => (
                <li key={index}>
                  <TERipple className="w-full" rippleColor="light">
                    <Link
                      onClick={() => onClickNoti(item)}
                      className={`flex cursor-pointer rounded-sm px-4 py-2 ${[0, 1].includes(item.status) ? 'bg-primary-50' : ''}
                      text-sm hover:bg-primary-100 hover:text-primaryhover:outline-none gap-4`}
                    >
                      <div className="h-12 w-12">
                        <div
                          className="h-12 w-12 rounded-full bg-black bg-cover"
                          style={{ backgroundImage: `url('${item?.by?.avatar || '/images/avatar.jpg'}')` }}
                        ></div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span>
                          <span className="text-sm font-medium">
                            {item?.by?.fullName} {getRoleTitle(item?.by?.role)}
                          </span>{' '}
                          {item?.content}
                        </span>
                        <span className="text-xs text-primary">{multiFormatDateString(item.createdAt)}</span>
                      </div>
                    </Link>
                  </TERipple>
                  <Hr />
                </li>
              ))}
          </ul>
        </div>
        <Hr />
        <div className="h-12 items-center flex justify-center">
          <a className="text-sm font-normal cursor-pointer text-blue-600 hover:text-blue-800">Xem thêm</a>
        </div>
      </div>
    </div>
  );
};

export default NotifySection;
