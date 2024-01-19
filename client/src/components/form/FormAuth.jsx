import React from 'react';

const FormAuth = (props) => {
  const { title, subTitle, children } = props;

  return (
    <section className="h-screen flex justify-center">
      <div className="max-w-[1200px]">
        <div className="h-full px-4 py-24">
          <div className="flex h-full flex-wrap items-center justify-center lg:justify-between gap-8">
            <div className="mb-12 md:mb-0 md:w-8/12 lg:w-7/12">
              <img
                src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="w-full"
                alt="Phone image"
              />
            </div>
            <div className="md:w-8/12 lg:ml-6 lg:w-4/12">
              <div className="text-center">
                <h3 className="mt-1 mb-2 pb-1 text-3xl font-semibold">{title}</h3>
                <p className="mb-12 text-md">{subTitle}</p>
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormAuth;
