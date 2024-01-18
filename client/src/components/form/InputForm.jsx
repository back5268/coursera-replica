import React from 'react';
import { Input } from '../uiCore';

const InputForm = (props) => {
  const { id, errors = {}, className, ...prop } = props;

  const errorTheme = {
    notchTrailingDefault: 'border-danger-600',
    notchMiddleDefault: 'border-danger-600',
    notchLeadingDefault: 'border-danger-600',
  };

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <Input id={id} theme={errors[id] ? errorTheme : {}} {...prop} />
      {errors[id] && <small className="w-full ml-2 text-danger-600 dark:text-danger-400">{errors[id].message}</small>}
    </div>
  );
};

export default InputForm;
