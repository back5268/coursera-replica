import React from 'react';
import { Select } from '../uiCore';

const SelectForm = (props) => {
  const { id, value = '', onChange = () => {}, ...prop } = props;

  return <Select onValueChange={(e) => onChange(e.value)} id={id} {...prop} />;
};

export default SelectForm;
