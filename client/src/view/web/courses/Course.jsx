import React, { useEffect, useState } from 'react';
import { FaCrown } from 'react-icons/fa';
import { Button, Hr, Link, Modal } from '@components/uiCore';
import { multiFormatDateString } from '@utils';

const Course = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [show, setShow] = useState(false);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (item?.lessons?.length > 0) {
      const listCompleted = item.lessons.filter((l) => l.isCompleted);
      setValue(listCompleted.length / item.lessons.length);
    }
  }, [item?.lessons]);

  return (
    <div className="w-3/12 p-2">
      {item?.status === 0 && (
        <Modal show={show} setShow={setShow} title={'Thanh toán khóa học'}>
          <div className="flex m-4">
            <div className="w-6/12 card m-4 flex flex-col gap-4 text-left">
              <h2 className='text-xl uppercase font-semibold'>Lưu ý:</h2>
              <Hr/>
              <p>* Sau khi thanh toán vui lòng chờ một thời gian để hệ thống xử lý</p>
            </div>
            <div className="w-6/12 card m-4 flex justify-center">
              <img src={item?.qr} className="h-[500px]" />
            </div>
          </div>
        </Modal>
      )}
      <div className="relative h-40 px-2 overflow-hidden" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <div className="bg-slate-100 h-full flex justify-center items-center">
          <div className="relative h-full w-full rounded-md bg-cover" style={{ backgroundImage: `url('${item?.courseInfo?.image}')` }}>
            <span className="absolute top-0 left-0 w-full h-full bg-primary-500 opacity-15"></span>
            {item?.price && (
              <div className="absolute top-2 left-2 p-1 rounded-sm">
                <FaCrown className="relative text-yellow-500 z-10" />
                <div className="absolute h-full w-full top-0 left-0 bg-slate-50 opacity-70 rounded-sm z-0"></div>
              </div>
            )}
          </div>
        </div>
        <div className={`absolute rounded-md mx-2 inset-0 justify-center items-center group-hover:flex flex`}>
          {isHovered && <div className="absolute rounded-md inset-0 bg-black bg-opacity-10 opacity-30"></div>}
          {item?.status === 1 ? (
            <Link
              to={`/learning/${item?.courseInfo?.slug}`}
              className={`font-medium z-10 duration-300 ease-in-out transform 
            ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
            >
              <Button severity="secondary" label="Tiếp tục học" />
            </Link>
          ) : (
            <Link
              onClick={() => setShow(true)}
              className={`font-medium z-10 duration-300 ease-in-out transform 
            ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
            >
              <Button severity="secondary" label="Thanh toán" />
            </Link>
          )}
        </div>
      </div>
      <div className="mt-2 px-2 flex flex-col gap-1">
        <h4 className="font-medium m-0">{item?.courseInfo?.name}</h4>
        <p className="text-xs">Đã đăng ký cách đây {multiFormatDateString(item.createdAt)}</p>
        <div className="h-2 w-full rounded-md bg-neutral-200 dark:bg-neutral-600">
          <div className="h-2 rounded-md bg-primary" style={{ width: `${value}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default Course;
