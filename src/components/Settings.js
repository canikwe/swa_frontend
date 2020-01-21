import React from 'react'

const Settings = ({ saved, handleSave, scale, handleScale }) => {
  return (
    <div className='settings'>
      <div>
        <span 
          className={scale === 'C' ? 'active' : ''}
          onClick={handleScale}
          id='C'
        >C°</span> | 
        <span 
          className={scale === 'F' ? 'active' : ''}
          onClick={handleScale}
          id='F'
          name='F'
        > F°</span>
      </div>
      <button onClick={ handleSave }>{ saved ? 'Remove' : 'Save' } my fucking settings</button>
      {/* <input type='checkbox' checked={ checked } onChange={ handleChange } /> */}
    </div>
  )
}

export default Settings