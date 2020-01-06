import React from 'react'

const SettingsButton = ({ text, handleChange }) => {
  return (
    <div>
      <hr />
      <p>Settings component</p>
      <button onClick={ handleChange }>{ text }</button>
      {/* <input type='checkbox' checked={ checked } onChange={ handleChange } /> */}
    </div>
  )
}

export default SettingsButton