import React from 'react';
import { CheckBox } from '../uiCore';

const MultiCheckBox = (props) => {
  const { id, value = [], onChange = () => {}, label, children, data = [], dataLabel = 'label', dataValue = 'key', className, ...prop } = props;

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
          return <CheckBox key={index} id={id + '-' + d.key} label={d.label} checked={value.includes(d.key)} onChange={() => {
            if (value.includes(d.key)) onChange(value.filter(v => v !== d.key))
            else onChange([ ...value, d.key ])
          }} />;
        })}
      </div>
    </div>
  );
};

export default MultiCheckBox;