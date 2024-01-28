import { Input } from '@components/uiCore';
import React from 'react';
import { TEInput } from 'tw-elements-react';

export const InputFormAuth = (props) => {
  const { id, register, errors = {}, className, ...prop } = props;

  const errorTheme = {
    notchTrailingDefault: 'border-danger-600',
    notchMiddleDefault: 'border-danger-600',
    notchLeadingDefault: 'border-danger-600'
  };

  return (
    <div className={`flex flex-col gap-1 w-full ${className}`}>
      <TEInput size="lg" id={id} {...register(id)} theme={errors[id] ? errorTheme : {}} {...prop} />
      {errors[id] && <small className="w-full ml-2 text-danger-600 dark:text-danger-400">{errors[id].message}</small>}
    </div>
  );
};

export const InputFormDetail = (props) => {
  const { id, register, errors = {}, className, ...prop } = props;

  const errorTheme = {
    notchTrailingDefault: 'border-danger-600',
    notchMiddleDefault: 'border-danger-600',
    notchLeadingDefault: 'border-danger-600'
  };

  return (
    <div className={`flex flex-col gap-1 w-full p-2 lg:w-6/12 ${className}`}>
      <TEInput size="lg" id={id} {...register(id)} theme={errors[id] ? errorTheme : {}} {...prop} />
      {errors[id] && <small className="w-full ml-2 text-danger-600 dark:text-danger-400">{errors[id].message}</small>}
    </div>
  );
};

export const InputFormV2 = (props) => {
  const { className, ...prop } = props;

  return (
    <div className={`p-2 xs:w-full sm:w-6/12 lg:w-3/12`}>
      <Input {...prop} />
    </div>
  );
};
