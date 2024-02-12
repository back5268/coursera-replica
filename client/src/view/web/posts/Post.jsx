import { Link } from '@components/uiCore';
import React from 'react';

const Post = ({ item }) => {
  return (
    <div className="card my-2 flex gap-2">
      <div className="w-full p-2 text-left flex flex-col gap-2">
        <div className="flex gap-2 mb-2">
          <div className="h-6 w-6 rounded-full bg-black bg-cover" style={{ backgroundImage: `url('${item.avatar}')` }}></div>
          <span className="text-sm">{item.fullName}</span>
        </div>
        <Link to={`/posts/detail/${item.slug}`}>
          <p className="text-md font-semibold">{item.title}</p>
        </Link>
        <p className="text-sm">{item.title}</p>
        <div className="flex gap-2 items-center">
          <p className="text-sm py-1 px-2 rounded-md bg-slate-100">{item.title}</p>
          <p className="text-sm">một năm trước</p>
          <p className="text-sm">-</p>
          <p className="text-sm">5 phút đọc</p>
        </div>
      </div>
      <Link to={`/posts/detail/${item.slug}`}>
        <div className="w-[300px] p-2">
          <div className="relative h-[120px] w-full rounded-md bg-cover" style={{ backgroundImage: `url('${item.image}')` }}>
            <span className="absolute top-0 left-0 w-full h-full bg-primary-500 opacity-15"></span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Post;
