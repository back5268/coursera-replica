import { Button, Hr, Rating } from '@components/uiCore';
import { FaCrown } from 'react-icons/fa';
import React from 'react';
import { useParams } from 'react-router-dom';
import { detailCourseWebApi } from '@api';
import { useGetApi } from '@lib/react-query';
import { BiCheck } from 'react-icons/bi';

const DetailCourseWeb = () => {
  const { slug } = useParams();
  const { data, isLoading } = useGetApi(detailCourseWebApi, { slug }, 'course');

  return (
    <div className="mt-24 flex">
      <div className="w-8/12 text-left p-6">
        <div className="flex flex-col gap-6">
          <h1 className="text-xl uppercase font-semibold">{data?.name}</h1>
          <Hr />
          <p>{data?.description}</p>
          <Hr />
          {data?.skills?.length > 0 && (
            <>
              <h2 className="uppercase font-semibold">Bạn sẽ học được gì?</h2>
              <div className="card flex flex-col gap-2">
                {data.skills.map((skill, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="font-bold text-primary-600">
                      <BiCheck size={24} />
                    </div>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
              <Hr />
            </>
          )}
          {data?.lessons?.length > 0 && (
            <>
              <h2 className="uppercase font-semibold">Nội dung khóa học</h2>
              <div className="card flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <span>{data?.lessons?.length} bài học</span>
                  <span>•</span>
                  <span>
                    Thời lượng{' '}
                    {data.lessons.reduce((total, currentItem) => {
                      return total + currentItem.time;
                    }, 0)}{' '}
                    phút
                  </span>
                </div>
                <Hr />
                {data.lessons.map((lesson, index) => (
                  <div key={index} className="flex justify-between p-2 bg-slate-100 rounded-md cursor-pointer">
                    <span>
                      {index + 1}. {lesson.title}
                    </span>
                    <span className="text-sm">0{lesson.time}:00</span>
                  </div>
                ))}
              </div>
              <Hr />
            </>
          )}
          {data?.requirements?.length > 0 && (
            <>
              <h2 className="uppercase font-semibold">Yêu cầu</h2>
              <div className="card flex flex-col gap-2">
                {data.requirements.map((req, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="font-bold text-primary-600">
                      <BiCheck size={24} />
                    </div>
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="w-4/12 p-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center justify-center my-8">
            <div className="relative h-48 w-10/12 rounded-lg bg-cover" style={{ backgroundImage: `url('${data?.image}')` }}>
              <span className="absolute top-0 left-0 w-full rounded-lg h-full bg-primary-500 opacity-15"></span>
              {data?.price && (
                <div className="absolute top-2 left-2 p-1 rounded-sm">
                  <FaCrown className="relative text-yellow-500 z-10" />
                  <div className="absolute h-full w-full top-0 left-0 bg-slate-50 opacity-70 rounded-sm z-0"></div>
                </div>
              )}
            </div>
            <div className="flex gap-2 mt-4">
              <Button label="Đăng ký học" />
              <Button severity="danger" label="Đánh giá" />
            </div>
          </div>

          {data?.reviews?.length > 0 && (
            <>
              <h2 className="uppercase font-semibold text-left">Đánh giá khóa học</h2>
              <div className="card flex flex-col gap-2 text-left">
                {data.reviews.map((rev, index) => (
                  <div key={index}>
                    <div className="flex gap-4 mb-2 items-center">
                      <div className="h-12 w-12 rounded-full bg-black bg-cover" style={{ backgroundImage: `url('${rev?.avatar}')` }}></div>
                      <div className="flex flex-col gap-1 text-sm">
                        <span>okokok</span>
                        <Rating value={rev.rating} />
                        <span>12/02/2024 07:00:00</span>
                        <span>asdsdasd</span>
                      </div>
                    </div>
                    <Hr />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailCourseWeb;
