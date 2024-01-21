import React from 'react';
import { TEInput } from 'tw-elements-react';

const Input = (props) => {
  const { id, value = '', onChange = () => {}, register = () => {}, ...prop } = props;

  return <TEInput value={value} onChange={e => onChange(e.target)} id={id} {...register(id)} size="lg" {...prop} />;
};

export default Input;
