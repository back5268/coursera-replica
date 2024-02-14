import { Hr } from '@components/uiCore';
import React from 'react';
import Course from './Course';
import { Link } from 'react-router-dom';
import { IoAddCircleSharp } from 'react-icons/io5';
import { useAuthContext } from '@context/AuthContext';

const MyCourses = () => {
  const { userInfo } = useAuthContext();
  const listCompleted = userInfo?.courses?.filter((c) => c.status === 2);

  return (
    <div className="mt-24 flex flex-col gap-2 text-left">
      <h2 className="uppercase font-semibold p-2">Khóa học của tôi</h2>
      <Hr />
      <p className="p-2">
        Bạn đã hoàn thành{' '}
        <span className="font-semibold">
          {listCompleted?.length}/{userInfo?.courses?.length}
        </span>{' '}
        khóa học của bạn.
      </p>
      <div className="card flex flex-wrap m-4">
        {userInfo?.courses?.length > 0 && userInfo.courses.map((item, index) => <Course key={index} item={item} />)}
        <div className="w-3/12 p-2">
          <Link to="/courses">
            <div
              className="w-full h-40 border-2 border-dashed rounded-md flex flex-col items-center justify-center gap-6
             hover:text-primary-600 hover:border-primary-400"
            >
              <IoAddCircleSharp size={36} />
              <div className="px-4 py-2 border-2 border-primary-400 rounded-lg text-primary-600 text-sm font-medium">Thêm khóa học</div>
            </div>
          </Link>
        </div>
      </div>
      <Hr />
    </div>
  );
};

export default MyCourses;
