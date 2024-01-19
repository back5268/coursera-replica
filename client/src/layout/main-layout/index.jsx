import React from 'react';
import SideBar from './SideBar';
import TopBar from './TopBar';

const MainLayout = (props) => {
  const { children } = props;

  return (
    <div className='flex'>
      <SideBar />
    </div>
  );
};

export default MainLayout;
