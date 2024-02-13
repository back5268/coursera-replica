import { Hr } from '@components/uiCore';
import React, { useState } from 'react';
import Post from './Post';
import { Pagination } from '@components/base';
import { TETabs, TETabsContent, TETabsItem, TETabsPane } from 'tw-elements-react';

const MyPosts = () => {
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

  const [buttonActive, setButtonActive] = useState('tab1');

  const handleButtonClick = (value) => {
    if (value === buttonActive) {
      return;
    }
    setButtonActive(value);
  };

  return (
    <div className="mt-24 flex">
      <div className="w-8/12 ">
        <TETabs>
          <TETabsItem onClick={() => handleButtonClick('tab1')} active={buttonActive === 'tab1'} tag="button">
            Bài viết của tôi
          </TETabsItem>
          <TETabsItem onClick={() => handleButtonClick('tab2')} active={buttonActive === 'tab2'} tag="button">
            Bài viết đã lưu
          </TETabsItem>
        </TETabs>
        <TETabsContent>
          <TETabsPane show={buttonActive === 'tab1'}>
            <Hr />
            {items.length > 0 && items.map((item, index) => <Post key={index} item={item} />)}
          </TETabsPane>
          <TETabsPane show={buttonActive === 'tab2'}>
            <Hr />
            {items.length > 0 && items.map((item, index) => <Post key={index} item={item} />)}
          </TETabsPane>
        </TETabsContent>
      </div>
      <div className="w-4/12"></div>
    </div>
  );
};

export default MyPosts;
