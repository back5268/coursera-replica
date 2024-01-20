import React from 'react';
import NotifySection from './NotifySection';
import AvatarSection from './AvatarSection';

const TopBar = (props) => {
  const { isShow, setIsShow } = props;

  return (
    <div className="fixed top-0 inset-x-0 text-white z-50">
      <div className={`transition-all duration-500 ease-in-out h-16 p-6 ${isShow ? 'ml-64' : 'ml-20'}`}>
        <div className="flex items-center w-full h-full justify-end">
          <div className="flex gap-4 items-center">
            <NotifySection />
            <AvatarSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
