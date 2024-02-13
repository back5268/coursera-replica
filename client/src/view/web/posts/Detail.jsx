import { detailPostWebApi, getListCommentApi } from '@api';
import { Comments } from '@components/extend';
import { Hr } from '@components/uiCore';
import { useGetApi } from '@lib/react-query';
import moment from 'moment';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { BiBookmark } from 'react-icons/bi';
import { BiHeart } from 'react-icons/bi';

const DetailPostWeb = () => {
  const { slug } = useParams();
  const { data, isLoading } = useGetApi(detailPostWebApi, { slug }, 'post');
  const [render, setRender] = useState(false);
  const { data: comments } = useGetApi(getListCommentApi, { objectId: data?._id, type: 1, render }, 'comments', Boolean(data?._id));

  return (
    <div className="mt-24 flex">
      <div className="w-7/12 text-left p-6">
        <div className="flex flex-col gap-6">
          <h1 className="text-xl uppercase font-semibold">{data?.title}</h1>
          <p>{data?.description}</p>
          <Hr />
          <div className="flex gap-4 mb-2 items-center">
            <div className="w-12 h-12">
              <div
                className="h-12 w-12 rounded-full bg-black bg-cover"
                style={{ backgroundImage: `url('${data?.by?.avatar || '/images/avatar.jpg'}')` }}
              ></div>
            </div>
            <div className="flex justify-between items-center w-full">
              <div className="flex flex-col gap-1 text-sm">
                <span className="font-semibold">{data?.by?.fullName}</span>
                <div className="flex gap-2">
                  <span>{data?.createdAt ? moment(data.createdAt).format('DD/MM/YYYY HH:mm:ss') : ''}</span>
                  <span>•</span>
                  <span>{data?.time} phút đọc</span>
                </div>
              </div>
              <div className="flex gap-2">
                <BiHeart size={20} className="cursor-pointer" />
                <BiBookmark size={20} className="cursor-pointer" />
              </div>
            </div>
          </div>

          <Hr />
          <h2 className="uppercase font-semibold">Nội dung bài viết</h2>
          <div className="card">
            <div dangerouslySetInnerHTML={{ __html: data?.content }} />
          </div>
        </div>
      </div>
      <div className="w-5/12 p-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center justify-center my-8">
            <div className="relative h-48 w-10/12 rounded-lg bg-cover" style={{ backgroundImage: `url('${data?.image}')` }}>
              <span className="absolute top-0 left-0 w-full rounded-lg h-full bg-primary-500 opacity-15"></span>
            </div>
          </div>
        </div>
        <Comments objectId={data?._id} comments={comments} setRender={setRender} type={1} />
      </div>
    </div>
  );
};

export default DetailPostWeb;
