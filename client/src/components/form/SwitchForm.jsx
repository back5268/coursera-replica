import React from 'react'
import { Switch } from '../uiCore'

const SwitchForm = (props) => {
  const { className, ...prop } = props
  return (
    <div className={`flex items-center ${className}`}>
      <Switch {...prop} />
    </div>
  )
}

export default SwitchForm