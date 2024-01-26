import React from 'react';
import { Select } from '../uiCore';

export const SelectForm = (props) => {
  const { value, onChange = () => {}, className, ...prop } = props;

  return (
    <div className={`p-2 ${className}`}>
      <Select onValueChange={(e) => onChange(e?.value)} {...prop} />
    </div>
  );
};

export const SelectFormV2 = (props) => {
  const { className, ...prop } = props;

  return (
    <div className={`p-2 lg:w-3/12 ${className}`}>
      <Select {...prop} />
    </div>
  );
};
