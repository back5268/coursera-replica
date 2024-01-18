import React from 'react';
import { TEInput } from 'tw-elements-react';

const Input = (props) => {
  const { id, register = () => {}, ...prop } = props;

  return <TEInput id={id} {...register(id)} size="lg" {...prop} />;
};

export default Input;
