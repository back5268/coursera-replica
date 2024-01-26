import React from 'react';
import { TESelect } from 'tw-elements-react';

const Select = (props) => {
  const { id, value = '', onValueChange = () => {}, data = [], dataLabel = 'label', dataValue = 'key', ...prop } = props;

  const handleData = (array) => {
    return array.map((d) => {
      if (typeof d === 'object' && d[dataLabel] && d[dataValue]) return { text: d[dataLabel], value: String(d[dataValue]) };
      else return { text: d, value: String(d) };
    });
  };

  return (
    <TESelect
      value={value}
      onValueChange={onValueChange}
      clearBtn
      preventFirstSelection
      noResultsText="không có kết quả"
      size="lg"
      data={handleData(data)}
      {...prop}
    />
  );
};

export default Select;
