import { Button, Hr, Rating } from '@components/uiCore';
import React from 'react';
import CourseCard from '../home/CourseCard';
import { InputFormV2, MultiCheckBoxV2, SelectFormV2 } from '@components/form';
import { courseCharacteristic, courseType } from '@constant';
import { Pagination } from '@components/base';

const WebCourses = () => {
  const items = [
    {
      title: 'First slide label',
      rating: '3/5',
      price: 500000,
      sale: 10000,
      image: 'https://tecdn.b-cdn.net/img/Photos/Slides/img%20(15).jpg'
    },
    {
      title: 'Second slide label',
      rating: '3/5',
      price: 500000,
      sale: 10000,
      image: 'https://tecdn.b-cdn.net/img/Photos/Slides/img%20(22).jpg'
    },
    {
      title: 'Third slide label',
      rating: '3/5',
      price: 500000,
      sale: 10000,
      image: 'https://tecdn.b-cdn.net/img/Photos/Slides/img%20(23).jpg'
    },
    {
      title: 'First slide label',
      rating: '3/5',
      price: 500000,
      sale: 10000,
      image: 'https://tecdn.b-cdn.net/img/Photos/Slides/img%20(15).jpg'
    },
    {
      title: 'Second slide label',
      rating: '3/5',
      price: 500000,
      sale: 10000,
      image: 'https://tecdn.b-cdn.net/img/Photos/Slides/img%20(22).jpg'
    },
    {
      title: 'Third slide label',
      rating: '3/5',
      price: 500000,
      sale: 10000,
      image: 'https://tecdn.b-cdn.net/img/Photos/Slides/img%20(23).jpg'
    },
    {
      title: 'First slide label',
      rating: '3/5',
      price: 500000,
      sale: 10000,
      image: 'https://tecdn.b-cdn.net/img/Photos/Slides/img%20(15).jpg'
    },
    {
      title: 'Second slide label',
      rating: '3/5',
      price: 500000,
      sale: 10000,
      image: 'https://tecdn.b-cdn.net/img/Photos/Slides/img%20(22).jpg'
    },
    {
      title: 'Third slide label',
      rating: '3/5',
      price: 500000,
      sale: 10000,
      image: 'https://tecdn.b-cdn.net/img/Photos/Slides/img%20(23).jpg'
    }
  ];

  const ratings = Array.from({ length: 5 }, (_, index) => 5 - index);

  return (
    <div className="flex mt-24">
      <div className="w-[300px] min-h-screen p-2">
        <div className="w-full h-full bg-primary-50">
          <div className="h-16 flex items-center justify-center">
            <h2 className="uppercase font-semibold">Bộ lọc tìm kiếm</h2>
          </div>
          <Hr />
          <div className="text-left p-4 flex flex-col text-sm">
            <div className="mb-4">
              <h4>Trạng thái:</h4>
              <MultiCheckBoxV2 data={courseCharacteristic} />
            </div>
            <Hr />
            <div className="my-4">
              <h4>Theo Danh Mục:</h4>
              <MultiCheckBoxV2 data={courseType} />
            </div>
            <Hr />
            <div className="my-4 flex flex-col">
              <h4>Khoảng giá:</h4>
              <div className="flex items-center my-2">
                <InputFormV2 size="md" className="!w-5/12 !p-0" label="Giá từ" />
                <div className="w-2/12 text-center">---</div>
                <InputFormV2 size="md" className="!w-5/12 !p-0" label="Giá đến" />
              </div>
              <Button className="w-full" label="Áp dụng" />
            </div>
            <Hr />
            <div className="my-4">
              <h4>Đánh giá:</h4>
              <div className="mt-4">
                {ratings.map((r, index) => (
                  <div key={index} className="flex justify-center gap-2 cursor-pointer p-1 bg-primary-100 rounded-md mt-1">
                    <Rating value={r} /> <span className={r === 5 && 'opacity-0'}>Trở lên</span>
                  </div>
                ))}
              </div>
            </div>
            <Hr />
            <Button className="w-full mt-4" label="Xóa tất cả" severity="danger" />
          </div>
        </div>
      </div>
      <div className="w-full min-h-screen p-2">
        <div className="card !p-0">
          <div className="h-16 flex gap-2 items-center p-4">
            <h4>Sắp xếp theo:</h4>
            <SelectFormV2 size="md" label="Thể loại" />
            <SelectFormV2 size="md" label="Từ cao đến thấp" />
          </div>
          <Hr />
          <div className="p-4 flex flex-wrap mt-4">
            {items.length > 0 &&
              items.slice(0, 10).map((item, index) => {
                return (
                  <div key={index} className="xs:w-6/12 sm:w-4/12 md:w-3/12 py-2">
                    <CourseCard item={item} type={item.price ? 'pro' : 'free'} />
                  </div>
                );
              })}
          </div>
          <Hr />
          <div className='flex justify-center my-4'>
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebCourses;
