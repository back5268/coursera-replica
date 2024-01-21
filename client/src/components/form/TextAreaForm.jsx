import React from 'react'
import { TextArea } from '../uiCore'

const TextAreaForm = (props) => {
  const { className, ...prop } = props;

  return (
    <div className={`${className}`}>
      <TextArea {...prop} />
    </div>
  )
}

export default TextAreaForm