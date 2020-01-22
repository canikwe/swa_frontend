import React from 'react'

const Header = ({city, state, handleToggle}) => {
  return (
   <div className='header'>
    <span className='location'>
      {city}, {state} 

    </span>
      <i className="material-icons" onClick={handleToggle}> search</i>
      </div>
  )
}

Location.defaultProps = {
  city: 'Welcome to The Fucking Weather',
  state: "enjoy your stay."
}

export default Header