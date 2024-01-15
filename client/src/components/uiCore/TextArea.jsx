import React from 'react';
import { TETextarea } from 'tw-elements-react';

const TextArea = (props) => {
  const { id, label, ...prop } = props;

  return (
    <div className="flex justify-center">
      <div className="relative mb-3 xl:w-96">
        <TETextarea id={id} label={label} rows={4} {...prop}></TETextarea>
      </div>
    </div>
  );
};

export default TextArea;
