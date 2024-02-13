import { Link } from '@components/uiCore';
import { BiBookmark } from 'react-icons/bi';
import { BiHeart } from 'react-icons/bi';
import React from 'react';
import { multiFormatDateString } from '@utils';

const Post = ({ item }) => {
  return (
    <div className="card my-2 flex gap-2">
      <div className="w-full p-2 text-left flex flex-col gap-2">
        <div className="flex gap-2 mb-2">
          <div className="h-6 w-6">
            <div
              className="h-6 w-6 rounded-full bg-black bg-cover"
              style={{ backgroundImage: `url('${item?.by?.avatar || '/images/avatar.jpg'}')` }}
            ></div>
          </div>
          <span className="text-sm">{item?.by?.fullName}</span>
        </div>
        <Link to={`/posts/detail/${item.slug}`}>
          <p className="text-md font-semibold">{item.title}</p>
        </Link>
        <p className="text-sm">{item.description}</p>
        <div className="flex gap-2 items-center">
          {item?.hashtag?.length > 0 &&
            item.hashtag.map((h, index) => (
              <p key={index} className="text-sm py-1 px-2 rounded-md bg-slate-100">
                {h}
              </p>
            ))}
          <p className="text-sm">{multiFormatDateString(item.createdAt)}</p>
          <p className="text-sm">•</p>
          <p className="text-sm">{item.time} phút đọc</p>
        </div>
      </div>
      <div className="w-[300px] p-2">
        <div className="flex gap-2 justify-end px-2 pb-2">
          <BiHeart size={20} className="cursor-pointer" />
          <BiBookmark size={20} className="cursor-pointer" />
        </div>
        <Link to={`/posts/detail/${item.slug}`}>
          <div className="relative h-[120px] w-full rounded-md bg-cover" style={{ backgroundImage: `url('${item.image}')` }}>
            <span className="absolute top-0 left-0 w-full h-full bg-primary-500 opacity-15"></span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Post;
