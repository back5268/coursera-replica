import { Button, Hr } from '@components/uiCore';
import { FaCrown } from 'react-icons/fa';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { detailCourseWebApi, getInfoApi, registerCourseApi } from '@api';
import { useGetApi } from '@lib/react-query';
import { BiCheck } from 'react-icons/bi';
import Reviews from './Reviews';
import { useConfirmState, useToastState } from '@store';
import { useAuthContext } from '@context/AuthContext';
import { formatNumber } from '@utils';

const DetailCourseWeb = () => {
  const { slug } = useParams();
  const [show, setShow] = useState(false);
  const [render, setRender] = useState(false);
  const { data, isLoading } = useGetApi(detailCourseWebApi, { slug, render }, 'course');

  const navigate = useNavigate();
  const { showConfirm } = useConfirmState();
  const { showToast } = useToastState();
  const { userInfo, setUserInfo } = useAuthContext();

  const onWarning = async () => {
    showConfirm({
      title: 'Vui lòng đăng nhập để có thể tiếp tục!',
      action: () => navigate('/auth/signin')
    });
  };

  const onRegister = async () => {
    if (!userInfo?._id) onWarning();
    const price = data.price - data.sale;
    const title =
      price > 0
        ? `Khóa học "${data?.name}" sẽ cần phải thanh toán ${formatNumber(price)} VNĐ, bạn có muốn tiếp tục đăng ký?`
        : `Bạn có chắc chắn muốn đăng ký khóa học "${data?.name}"`;
    const title2 = price > 0 ? 'Để xác nhận đăng ký khóa học, vui lòng thanh toán và chờ hệ thống xử lý!' : 'Đăng ký khóa học thành công!';
    showConfirm({
      title,
      action: async () => {
        const response = await registerCourseApi({ courseId: data?._id });
        if (response) {
          const response = await getInfoApi();
          if (response) {
            setUserInfo(response);
            navigate('/courses/my-courses');
          } else localStorage.removeItem('token');
          showToast({ title: title2, severity: 'success' });
        }
      }
    });
  };

  const reviews = data?.reviews;
  const check = reviews && Array.isArray(reviews) ? !Boolean(reviews.find((r) => r.by._id === userInfo._id)) : true;

  return (
    <div className="mt-24 flex">
      <div className="w-7/12 text-left p-6">
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
      <div className="w-5/12 p-6">
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
              {Boolean(userInfo?.courses?.find((c) => c.courseId === data?._id)) ? (
                <Button onClick={() => navigate(`/learning/${data?.slug}`)} label="Tiếp tục học" />
              ) : (
                <Button onClick={onRegister} label="Đăng ký học" />
              )}
              {check && (
                <Button
                  onClick={() => {
                    if (!userInfo?._id) onWarning();
                    else setShow(true);
                  }}
                  severity="danger"
                  label="Đánh giá"
                />
              )}
            </div>
          </div>

          <Reviews
            data={data?.reviews}
            courseId={data?._id}
            rating={data?.rating}
            show={show}
            setShow={setShow}
            userInfo={userInfo}
            setRender={setRender}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailCourseWeb;