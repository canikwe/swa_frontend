import React from 'react'

const SettingsCheckbox = ({ checked, handleChange }) => {
  return (
    <input type='checkbox' checked={ checked } onChange={ handleChange } />
  )
}

export default SettingsCheckbox