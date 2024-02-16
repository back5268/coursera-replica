import React, { useEffect, useState } from 'react';
import { getRoleTitle, multiFormatDateString } from '@utils';
import { Link, useNavigate } from 'react-router-dom';
import { getListNotifyApi, updateStatusNotifyApi } from '@api';
import { TERipple } from 'tw-elements-react';
import { Button, Hr } from '@components/uiCore';
import { useInfinityApi } from '@lib/react-query';

const Notify = ({ status, render }) => {
  const navigate = useNavigate();
  const [notify, setNotify] = useState([]);
  const { data, fetchNextPage, hasNextPage, refetch } = useInfinityApi(
    (params) => getListNotifyApi({ ...params, status }),
    `notify${status}`
  );

  const onClickNoti = async (item) => {
    const response = await updateStatusNotifyApi({ status: 2, _id: item._id });
    if (response) {
      switch (item.type) {
        case 1:
          return navigate(`/posts/detail/${item?.data?.slug}`);
        case (2, 3):
          return navigate(`/posts/detail/${item?.data?.slug}#${item?.data?._id}`);
      }
    }
  };

  useEffect(() => {
    if (data?.pages) {
      let newData = [];
      data.pages.forEach((d) => {
        const documents = d?.documents;
        if (Array.isArray(documents)) newData = [...newData, ...documents];
      });
      setNotify(newData);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [render]);

  return notify?.length > 0 ? (
    <>
      <div className="overflow-y-auto max-h-[60vh] text-gray-600">
        <ul className="relative list-none">
          <Hr />
          {notify?.map((item, index) => (
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
      <div className="h-8 items-center flex justify-center mt-2">
        <Button label="Xem thêm" severity="secondary" className="!px-4 !py-2" disabled={!hasNextPage} onClick={() => fetchNextPage()} />
      </div>
    </>
  ) : (
    <>
      <Hr />
      <div className="h-16 text-gray-600 flex justify-center items-center mt-2">
        <h5 className="font-medium">Bạn không có thông báo nào.</h5>
      </div>
    </>
  );
};

export default Notify;
