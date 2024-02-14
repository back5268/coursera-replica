import { deleteCourseReviewApi } from '@api';
import { Hr, Rating } from '@components/uiCore';
import { multiFormatDateString } from '@utils';
import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import AddReview from './AddReview';
import { useConfirmState, useToastState } from '@store';

const Reviews = ({ data, courseId, rating, show, setShow, userInfo, setRender }) => {
  const { showConfirm } = useConfirmState();
  const { showToast } = useToastState();
  const [value, setValue] = useState();

  const onDelete = async (_id) => {
    showConfirm({
      title: 'Bạn có chắc chắn muốn xóa đánh giá này!',
      action: async () => {
        const response = await deleteCourseReviewApi({ _id });
        if (response) {
          showToast({ title: 'Xóa đánh giá thành công!', severity: 'success' });
          setRender((pre) => !pre);
        }
      }
    });
  };

  return (
    <div className="text-left flex flex-col gap-4">
      <AddReview show={show} setShow={setShow} setRender={setRender} courseId={courseId} />
      <h2 className="uppercase font-semibold">Đánh giá khóa học</h2>
      <Hr />
      <div className="card flex justify-between items-center">
        <Rating value={rating || 5} />
        <span>{rating || 5}/5</span>
      </div>
      <Hr />
      {data?.length > 0 && (
        <div className="card">
          {data.map((d, index) => {
            let fileType;
            if (d?.file) {
              if (d?.file.endsWith('.png') || d?.file.endsWith('.jpg')) fileType = 'image';
              else if (d?.file.endsWith('.mp4') || d?.file.endsWith('.gif')) fileType = 'video';
            }
            return (
              <div key={index}>
                <div className="flex gap-4 mb-2">
                  <div className="h-8 w-8">
                    <div
                      className="h-8 w-8 rounded-full bg-black bg-cover"
                      style={{ backgroundImage: `url('${d?.by?.avatar || '/images/avatar.jpg'}')` }}
                    ></div>
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <div className="flex flex-col gap-1 p-2 bg-primary-100 rounded-md">
                      <span className="font-semibold">{d?.by?.fullName}</span>
                      <Rating value={d.rating} />
                      <span>{d.content}</span>
                      {d?.file && (
                        <Link to={d.file} target="_blank" className="h-[160px]">
                          {fileType === 'image' ? (
                            <img src={d.file} className="h-[160px] rounded-md" />
                          ) : fileType === 'video' ? (
                            <ReactPlayer url={d.file} controls={true} height="300" />
                          ) : (
                            <span>{d.file}</span>
                          )}
                        </Link>
                      )}
                    </div>
                    <div className="flex gap-3 text-xs mt-1">
                      <Link>{multiFormatDateString(d.createdAt)}</Link>
                      {(d?.by === userInfo?._id || userInfo?.role === 'admin') && <Link onClick={() => onDelete(d._id)}>Xóa</Link>}
                    </div>
                  </div>
                </div>
                <Hr />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Reviews;
