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
  city: 'Welcome to The Fucking Weather',
  state: "enjoy your stay."
}

export default Header