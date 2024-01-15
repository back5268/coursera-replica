import React from 'react';
import { TEInput } from 'tw-elements-react';

const Input = (props) => {
  const { ...prop } = props;

  return (
    <TEInput size="lg" {...prop} />
  );
};

export default Input;
