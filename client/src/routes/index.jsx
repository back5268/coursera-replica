import React, { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import routes from './routes';
import { AdminLayout, WebLayout } from '@/layout';

const Router = () => {
  return (
    <Routes>
      {routes.map((route, index) => {
        const DefaultLayout = route.layout ? (route.layout === 'admin' ? AdminLayout : WebLayout) : Fragment;
        const Page = route.element;
        
        return (
          <Route
            key={index}
            path={route.path}
            element={
              <DefaultLayout>
                <Page />
              </DefaultLayout>
            }
          />
        );
      })}
    </Routes>
  );
};

export default Router;
