import { Hr } from '@components/uiCore';
import React, { useState } from 'react';
import Post from './Post';
import { Pagination } from '@components/base';
import { useGetApi } from '@lib/react-query';
import { getListPostWebApi } from '@api';
import { useGetParams } from '@hook';
import Search from './Search';

const WebPosts = () => {
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const { data, isLoading } = useGetApi(getListPostWebApi, params, 'posts');

  return (
    <div className="mt-24 flex">
      <div className="w-8/12 ">
        <div className="flex justify-between items-center mb-2">
          <h2 className="uppercase font-semibold text-left p-2">Danh sách bài viết</h2>
          <Search setParams={setParams} />
        </div>
        <Hr />
        {data?.documents?.length > 0 && data.documents.map((item, index) => <Post key={index} item={item} />)}
        <Hr />
        <div className="flex justify-center my-4">
          <Pagination totalRecord={data?.total} params={params} setParams={setParams} />
        </div>
      </div>
      <div className="w-4/12"></div>
    </div>
  );
};

export default WebPosts;
