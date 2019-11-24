import React from 'react'

const SettingsCheckbox = ({ checked, handleChange }) => {
  return (
    <div>
      <hr />
      <p>Save settings component</p>
      <input type='checkbox' checked={ checked } onChange={ handleChange } />
    </div>
  )
}

export default SettingsCheckbox