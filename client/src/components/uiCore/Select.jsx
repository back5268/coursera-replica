import React from 'react';
import { TESelect } from 'tw-elements-react';

const Select = (props) => {
  const { data = [], ...prop } = props;

  return (
    <TESelect size="lg" data={data} {...prop} />
  );
};

export default Select;
