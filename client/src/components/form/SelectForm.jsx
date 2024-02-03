import React from 'react';
import { Select } from '../uiCore';

export const SelectFormDetail = (props) => {
  const { id, value, watch = () => {}, setValue = () => {}, className, errors = {}, ...prop } = props;

  return (
    <div className={`flex flex-col gap-1 w-full p-2 lg:w-6/12 ${className}`}>
      <Select
        theme={{
          selectInput: `peer block min-h-[auto] w-full rounded focus:border-0 ${(errors[id] && !watch(id)) ? 'border-2 border-danger-600' : '' } 
          bg-transparent outline-none transition-all duration-200 
            ease-linear peer-focus:text-primary motion-reduce:transition-none disabled:bg-neutral-100 dark:disabled:bg-neutral-700 
            dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary cursor-pointer disabled:cursor-default`
        }}
        onValueChange={(e) => setValue(id, e?.value)}
        value={watch(id)}
        {...prop}
      />
      {errors[id] && !watch(id) && <small className="w-full ml-2 text-danger-600 dark:text-danger-400">{errors[id].message}</small>}
    </div>
  );
};

export const SelectFormV2 = (props) => {
  const { className, ...prop } = props;

  return (
    <div className={`p-2 xs:w-full sm:w-6/12 lg:w-3/12`}>
      <Select {...prop} />
    </div>
  );
};
