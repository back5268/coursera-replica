import React from 'react';
import { Route, Routes } from 'react-router-dom';
import routes from './routes';

const Router = () => {
  return (
    <Routes>
      {routes.map((route, index) => {
        const Page = route.element;

        return <Route key={index} path={route.path} element={<Page />} />;
      })}
    </Routes>
  );
};

export default Router;
