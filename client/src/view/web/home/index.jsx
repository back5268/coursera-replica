import { Carousel } from '@components/uiCore';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Carousel items={['', '', '']} />
  )
};

export default Home;
