import React, { useState } from 'react';

const PostCard = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className='my-2'>
      <div
        className="relative h-40 px-2 cursor-pointer overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="bg-slate-100 h-full flex justify-center items-center">
          <div className="relative h-full w-full rounded-md bg-cover" style={{ backgroundImage: `url('${item.image}')` }}>
            <span className="absolute top-0 left-0 w-full h-full bg-primary-500 opacity-15"></span>
          </div>
        </div>
        <div className={`absolute rounded-md mx-2 inset-0 justify-center items-center group-hover:flex flex`}>
          {isHovered && <div className="absolute rounded-md inset-0 bg-black bg-opacity-10 opacity-30"></div>}
          <div
            className={`rounded-md relative py-2 px-4 bg-primary-100 font-medium z-10
          duration-300 ease-in-out transform ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
          >
            <span>Xem bài viết</span>
          </div>
        </div>
      </div>
      <div className="mt-2 px-2">
        <h4 className="font-medium">{item.title}</h4>
        <div className="flex gap-2 p-2 items-center">
          <div className="h-6 w-6 rounded-full bg-black bg-cover" style={{ backgroundImage: `url('${item.avatar}')` }}></div>
          <span className='text-sm'>{item.fullName}</span>
          <span className='text-sm'>-</span>
          <span className='text-xs'>{item.time || 0} phút đọc</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
