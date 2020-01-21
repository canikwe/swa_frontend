import React from 'react'

const Header = ({city, state, handleClick}) => {
  return (
    <p className='location'>
      {city}, {state} 
      <span onClick={handleClick}>  🔍</span>
    </p>
  )
}

Location.defaultProps = {
  name: 'Welcome to The Fucking Weather'
}

export default Header