import React, { useState } from 'react';
import { FaCrown } from 'react-icons/fa';
import { Button, Link } from '@components/uiCore';

const Course = ({ item, type }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="w-3/12 p-2">
      <div className="relative h-40 px-2 overflow-hidden" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <div className="bg-slate-100 h-full flex justify-center items-center">
          <div className="relative h-full w-full rounded-md bg-cover" style={{ backgroundImage: `url('${item.image}')` }}>
            <span className="absolute top-0 left-0 w-full h-full bg-primary-500 opacity-15"></span>
            {type === 'pro' && (
              <div className="absolute top-2 left-2 p-1 rounded-sm">
                <FaCrown className="relative text-yellow-500 z-10" />
                <div className="absolute h-full w-full top-0 left-0 bg-slate-50 opacity-70 rounded-sm z-0"></div>
              </div>
            )}
          </div>
        </div>
        <div className={`absolute rounded-md mx-2 inset-0 justify-center items-center group-hover:flex flex`}>
          {isHovered && <div className="absolute rounded-md inset-0 bg-black bg-opacity-10 opacity-30"></div>}
          <Link
            to={`/courses/detail/${item.slug}`}
            className={`font-medium z-10 duration-300 ease-in-out transform 
            ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
          >
            <Button severity="secondary" label="Tiếp tục học" />
          </Link>
        </div>
      </div>
      <div className="mt-2 px-2 flex flex-col gap-1">
        <h4 className="font-medium m-0">{item.title}</h4>
        <p className="text-xs">Học cách đây 7 ngày trước</p>
        <div className="h-2 w-full rounded-md bg-neutral-200 dark:bg-neutral-600">
          <div className="h-2 rounded-md bg-primary" style={{ width: '45%' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Course;
