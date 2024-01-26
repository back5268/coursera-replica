import React from 'react'
import { TextArea } from '../uiCore'

const TextAreaForm = (props) => {
  const { id, watch = () => {}, setValue = () => {}, className, ...prop } = props;

  return (
    <div className={`${className}`}>
      <TextArea id={id} value={watch(id)} onChange={(e) => setValue(id, e.value)} {...prop} />
    </div>
  )
}

export default TextAreaForm