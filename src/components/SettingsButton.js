import React from 'react'

const SettingsButton = ({ text, handleChange }) => {
  return (
    <div>
      <hr />
      <p>Save settings component</p>
      <button onClick={ handleChange }>{ text }</button>
      {/* <input type='checkbox' checked={ checked } onChange={ handleChange } /> */}
    </div>
  )
}

export default SettingsButton