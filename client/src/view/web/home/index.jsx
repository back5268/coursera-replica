import { Carousel } from '@components/uiCore';
import React from 'react';
import CourseSlider from './CourseSlider';
import PostList from './PostList';
import { useGetApi } from '@lib/react-query';
import { getListCourseWebApi, getListPostWebApi } from '@api';

const Home = () => {
  const { data: posts, isLoading: isLoadingPost } = useGetApi(getListPostWebApi, { page: 1, limit: 10 }, 'posts');
  const { data: courses, isLoading: isLoadingCourse } = useGetApi(getListCourseWebApi, { page: 1, limit: 10 }, 'courses');

  return (
    <div>
      <Carousel
        items={[
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
        ]}
      />
      <CourseSlider items={courses?.documents?.filter((c) => c.price > 0)} />
      <CourseSlider items={courses?.documents?.filter((c) => c.price === 0)} type="free" />
      <PostList items={posts?.documents} />
    </div>
  );
};

export default Home;
