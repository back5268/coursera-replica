import React from 'react';
import { Radio } from '../uiCore';

const MultiRadio = (props) => {
  const { id, value = '', onChange = () => {}, label, children, data = [], dataLabel = 'label', dataValue = 'key', className } = props;

  const handleData = (array) => {
    return array.map((d) => {
      if (typeof d === 'object' && d[dataLabel] && d[dataValue]) return { label: d[dataLabel], key: d[dataValue] };
      else return { label: d, key: d };
    });
  };

  return (
    <div className="flex gap-12 card content-center">
      {children || label}
      <div className={`w-full flex gap-4 ${className} flex-wrap`}>
        {handleData(data).map((d, index) => {
          return <Radio key={index} id={id + '-' + d.key} checked={value === d.key} onChange={() => onChange(d.key)} label={d.label} />;
        })}
      </div>
    </div>
  );
};

export default MultiRadio;
