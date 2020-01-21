import React from 'react'

const Header = ({city, state, handleToggle}) => {
  return (
    <p className='location'>
      {city}, {state} 
      <span onClick={handleToggle}>  🔍</span>
    </p>
  )
}

Location.defaultProps = {
  name: 'Welcome to The Fucking Weather'
}

export default Header