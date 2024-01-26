import React from 'react';
import { Input } from '../uiCore';

export const InputForm = (props) => {
  const { id, watch = () => {}, setValue = () => {}, errors = {}, className, ...prop } = props;

  const errorTheme = {
    notchTrailingDefault: 'border-danger-600',
    notchMiddleDefault: 'border-danger-600',
    notchLeadingDefault: 'border-danger-600'
  };

  return (
    <div className={`flex flex-col gap-1 p-2 w-full lg:w-6/12 ${className}`}>
      <Input id={id} value={watch(id)} onChange={(e) => setValue(id, e.target.value)} theme={errors[id] ? errorTheme : {}} {...prop} />
      {errors[id] && <small className="w-full ml-2 text-danger-600 dark:text-danger-400">{errors[id].message}</small>}
    </div>
  );
};

export const InputFormV2 = (props) => {
  const {  className, ...prop } = props;

  return (
    <div className={`p-2 lg:w-3/12`}>
      <Input {...prop} />
    </div>
  );
};
