import { Button, Hr, Rating } from '@components/uiCore';
import { FaCrown } from 'react-icons/fa';
import React from 'react';

const DetailCourseWeb = () => {
  const item = {
    name: 'Lập trình C++ cơ bản, nâng cao',
    code: 'oaskdsda',
    description:
      'Khóa học lập trình C++ từ cơ bản tới nâng cao dành cho người mới bắt đầu. Mục tiêu của khóa học này nhằm giúp các bạn nắm được các khái niệm căn cơ của lập trình, giúp các bạn có nền tảng vững chắc để chinh phục con đường trở thành một lập trình viên.',
    lessons: [
      { title: 'Giới thiệu', time: 7 },
      { title: 'Biến và kiểu dữ liệu', time: 7 },
      { title: 'Mảng', time: 7 },
      { title: 'String', time: 7 },
      { title: 'Hàm', time: 7 }
    ],
    skills: [
      'Được học kiến thức miễn phí với nội dung chất lượng hơn mất phí',
      'Các kiến thức nâng cao của Javascript giúp code trở nên tối ưu hơn',
      'Hiểu được các khái niệm khó như từ khóa this, phương thức bind, call, apply & xử lý bất đồng bộ'
    ],
    requiments: [
      'Hoàn thành khóa học Javascript cơ bản tại F8 hoặc đã nắm chắc Javascript cơ bản',
      'Tuy duy mở để dễ dàng tiếp nhận các tư tưởng mới được chia sẻ trong các bài học'
    ],
    requiments: [
      'Hoàn thành khóa học Javascript cơ bản tại F8 hoặc đã nắm chắc Javascript cơ bản',
      'Tuy duy mở để dễ dàng tiếp nhận các tư tưởng mới được chia sẻ trong các bài học'
    ],
    reviews: [
      { by: '', rating: 1, createdAt: '12/02/2024 07:00:00' },
      { by: '', rating: 2, createdAt: '12/02/2024 07:00:00' },
      { by: '', rating: 3, createdAt: '12/02/2024 07:00:00' },
      { by: '', rating: 4, createdAt: '12/02/2024 07:00:00' },
      { by: '', rating: 5, createdAt: '12/02/2024 07:00:00' }
    ]
  };

  return (
    <div className="mt-24 flex">
      <div className="w-8/12 text-left p-6">
        <div className="flex flex-col gap-6">
          <h1 className="text-xl uppercase font-semibold">{item?.name}</h1>
          <Hr />
          <p>{item?.description}</p>
          <Hr />
          <h2 className="uppercase font-semibold">Bạn sẽ học được gì?</h2>
          <div className="card flex flex-col gap-2">
            {item?.skills?.length > 0 &&
              item.skills.map((skill, index) => (
                <div key={index} className="flex">
                  {skill}
                </div>
              ))}
          </div>
          <Hr />
          <h2 className="uppercase font-semibold">Nội dung khóa học</h2>
          <div className="card flex flex-col gap-2">
            <div className="flex gap-2 items-center mb-2">
              <span>{item?.lessons?.length} bài học</span>
              <span>•</span>
              <span>Thời lượng {item?.time}</span>
            </div>
            {item?.lessons?.length > 0 &&
              item.lessons.map((lesson, index) => (
                <div key={index} className="flex justify-between p-2 bg-slate-100 rounded-md cursor-pointer">
                  <span>
                    {index + 1}. {lesson.title}
                  </span>
                  <span>0{lesson.time}:00</span>
                </div>
              ))}
          </div>
          <Hr />
          <h2 className="uppercase font-semibold">Yêu cầu</h2>
          <div className="card flex flex-col gap-2">
            {item?.requiments?.length > 0 &&
              item.requiments.map((req, index) => (
                <div key={index} className="flex">
                  {req}
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="w-4/12 p-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center justify-center my-8">
            <div className="relative h-48 w-10/12 rounded-lg bg-cover" style={{ backgroundImage: `url('${item.image}')` }}>
              <span className="absolute top-0 left-0 w-full rounded-lg h-full bg-primary-500 opacity-15"></span>
              {item.price && (
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

          <h2 className="uppercase font-semibold text-left">Đánh giá khóa học</h2>
          <div className="card flex flex-col gap-2 text-left">
            {item?.reviews?.length > 0 &&
              item.reviews.map((rev, index) => (
                <div key={index}>
                  <div className="flex gap-4 mb-2 items-center">
                    <div className="h-12 w-12 rounded-full bg-black bg-cover" style={{ backgroundImage: `url('${item.avatar}')` }}></div>
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
        </div>
      </div>
    </div>
  );
};

export default DetailCourseWeb;
