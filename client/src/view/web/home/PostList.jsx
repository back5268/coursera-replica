import { Hr, Link } from '@components/uiCore';
import React from 'react';
import PostCard from './PostCard';

const PostList = ({ items = [] }) => {
  return (
    <div className="rounded-md px-2 pb-6 pt-2 border-neutral-300 dark:border-neutral-600 border-[1px] text-left mt-12">
      <div className="flex justify-between items-center m-2">
        <h2 className="font-semibold uppercase">Bài viết nổi bật</h2>
        <Link to="/courses" className="!text-sm font-medium">
          Xem tất cả bài viết
        </Link>
      </div>
      <Hr />
      <div className="flex flex-wrap mt-4">
        {items.length > 0 &&
          items.slice(0, 10).map((item, index) => {
            return (
              <div  key={index} className="xs:w-6/12 sm:w-4/12 md:w-3/12">
                <PostCard item={item} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PostList;
