import React from 'react';
import { TEInput } from 'tw-elements-react';

const Input = (props) => {
  const { value =  '', ...prop } = props;

  return <TEInput value={value} size="lg" {...prop} />;
};

export default Input;
