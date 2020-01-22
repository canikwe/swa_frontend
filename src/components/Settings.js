import React from 'react'

const Settings = ({ saved, handleSave, scale, handleScale }) => {
  return (
    <div className='settings'>
      <div className='scale'>
        <span 
          className={scale === 'C' ? 'active' : 'inactive'}
          onClick={handleScale}
          id='C'
        >C°</span> | 
        <span 
          className={scale === 'F' ? 'active' : 'inactive'}
          onClick={handleScale}
          id='F'
          name='F'
        > F°</span>
      </div>
      <div className='settings'>
        <label className='switch'>
          <input type='checkbox' onChange={handleSave} checked={saved} />
          <span className='slider round'></span>
        </label>
        <div>
          {saved ? 'Remove' : 'Save'} my <br /> fucking settings
        </div>
      </div>
    </div>
  )
}

export default Settings