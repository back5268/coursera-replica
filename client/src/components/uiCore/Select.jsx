import React from 'react';
import { TESelect } from 'tw-elements-react';

const Select = (props) => {
  const { id, data = [], dataLabel = 'label', dataValue = 'key', ...prop } = props;

  const handleData = (array) => {
    return array.map((d) => {
      if (typeof d === 'object' && d[dataLabel] && d[dataValue]) return { text: d[dataLabel], value: d[dataValue] };
      else return { text: d, value: d };
    });
  };

  return <TESelect search preventFirstSelection noResultsText="không có kết quả" size="lg" data={handleData(data)} {...prop} />;
};

export default Select;