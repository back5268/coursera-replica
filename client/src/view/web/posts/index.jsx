import { Hr } from '@components/uiCore';
import React from 'react';
import Post from './Post';
import { Pagination } from '@components/base';

const WebPosts = () => {
  const items = [
    {
      title: 'First slide label',
      rating: '3/5',
      price: 500000,
      sale: 10000,
      fullName: 'oko ok ok ',
      image: 'https://tecdn.b-cdn.net/img/Photos/Slides/img%20(15).jpg'
    },
    {
      title: 'Second slide label',
      rating: '3/5',
      price: 500000,
      sale: 10000,
      fullName: 'oko ok ok ',
      image: 'https://tecdn.b-cdn.net/img/Photos/Slides/img%20(22).jpg'
    },
    {
      title: 'Third slide label',
      rating: '3/5',
      price: 500000,
      sale: 10000,
      fullName: 'oko ok ok ',
      image: 'https://tecdn.b-cdn.net/img/Photos/Slides/img%20(23).jpg'
    },
    {
      title: 'First slide label',
      rating: '3/5',
      price: 500000,
      sale: 10000,
      fullName: 'oko ok ok ',
      image: 'https://tecdn.b-cdn.net/img/Photos/Slides/img%20(15).jpg'
    },
    {
      title: 'Second slide label',
      rating: '3/5',
      price: 500000,
      sale: 10000,
      fullName: 'oko ok ok ',
      image: 'https://tecdn.b-cdn.net/img/Photos/Slides/img%20(22).jpg'
    },
    {
      title: 'Third slide label',
      rating: '3/5',
      price: 500000,
      sale: 10000,
      fullName: 'oko ok ok ',
      image: 'https://tecdn.b-cdn.net/img/Photos/Slides/img%20(23).jpg'
    },
    {
      title: 'First slide label',
      rating: '3/5',
      price: 500000,
      sale: 10000,
      fullName: 'oko ok ok ',
      image: 'https://tecdn.b-cdn.net/img/Photos/Slides/img%20(15).jpg'
    },
    {
      title: 'Second slide label',
      rating: '3/5',
      price: 500000,
      sale: 10000,
      fullName: 'oko ok ok ',
      image: 'https://tecdn.b-cdn.net/img/Photos/Slides/img%20(22).jpg'
    },
    {
      title: 'Third slide label',
      rating: '3/5',
      price: 500000,
      sale: 10000,
      fullName: 'oko ok ok ',
      image: 'https://tecdn.b-cdn.net/img/Photos/Slides/img%20(23).jpg'
    }
  ];

  return (
    <div className="mt-24 flex">
      <div className="w-8/12 ">
        <h2 className="uppercase font-semibold text-left p-2">Danh sách bài viết</h2>
        <Hr />
        {items.length > 0 && items.map((item, index) => <Post key={index} item={item} />)}
        <Hr />
        <div className="flex justify-center my-4">
          <Pagination />
        </div>
      </div>
      <div className="w-4/12"></div>
    </div>
  );
};

export default WebPosts;
