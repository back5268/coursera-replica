import { Button } from '@components/uiCore';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <section className="h-screen flex justify-center">
      <div className="w-full h-full px-4 flex flex-col justify-center items-center">
        <div className="flex flex-col gap-4 w-[300px]">
          <Button className="w-full" onClick={() => navigate('/admin')}>
            Trang admin
          </Button>
          <Button className="w-full" onClick={() => navigate('/auth/signin')}>
            Đăng nhập
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Home;
