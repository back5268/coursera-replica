import { Comments } from '@components/extend';
import { Button, Hr, Rating } from '@components/uiCore';
import React from 'react';

const DetailPostWeb = () => {
  const item = {
    title: '[Phần 1] Tạo dự án ReactJS với Webpack và Babel',
    fullName: 'Sơn đặng',
    createdAt: 'sdaasd',
    time: 12,
    likes: ['', '', ''],
    description: 'Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học lập trình online và các kỹ thuật lập trình web.',
    content: `Chào mọi người 🤗🤗

    Hôm nay mình có quay một video trong khóa học ReactJS là "Tạo dự án ReactJS với Webpack và Babel". Mình làm video này với mong muốn chia sẻ cho các bạn có thể hình dung ra dự án được tạo bởi "create-react-app" được xây dựng như thế nào. Các bạn có thể xem thêm video hướng dẫn ở đây nhé.
    
    Click vào hình ảnh này để mở video nhé anh em!`
  };

  return (
    <div className="mt-24 flex">
      <div className="w-7/12 text-left p-6">
        <div className="flex flex-col gap-6">
          <h1 className="text-xl uppercase font-semibold">{item?.title}</h1>
          <p>{item?.description}</p>
          <Hr />
          <div className="flex gap-4 mb-2 items-center">
            <div className="h-12 w-12 rounded-full bg-black bg-cover" style={{ backgroundImage: `url('${item.avatar}')` }}></div>
            <div className="flex flex-col gap-1 text-sm">
              <span className="font-semibold">okokok</span>
              <div className="flex gap-2">
                <span>12/02/2024 07:00:00</span>
                <span>•</span>
                <span>{item.time} phút đọc</span>
              </div>
            </div>
          </div>

          <Hr />
          <h2 className="uppercase font-semibold">Nội dung bài viết</h2>
          <div className="card">
            <div dangerouslySetInnerHTML={{ __html: item.content }} />
          </div>
        </div>
      </div>
      <div className="w-5/12 p-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center justify-center my-8">
            <div className="relative h-48 w-10/12 rounded-lg bg-cover" style={{ backgroundImage: `url('${item.image}')` }}>
              <span className="absolute top-0 left-0 w-full rounded-lg h-full bg-primary-500 opacity-15"></span>
            </div>
          </div>
        </div>
        <Comments />
      </div>
    </div>
  );
};

export default DetailPostWeb;
