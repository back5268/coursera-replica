import React from 'react';
import { Input } from '../uiCore';

const InputForm = (props) => {
  const { id, register = () => {}, error = {}, ...prop } = props;

  return (
    <div className="flex flex-col gap-1 m-2">
      <Input {...prop} />
      <small className="w-full ml-2 text-danger-600 dark:text-danger-400">{error[id]}</small>
    </div>
  );
};

export default InputForm;
