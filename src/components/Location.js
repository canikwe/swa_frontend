import React from 'react'

const Location = props => {
  return (
    <p className='location'>{ props.city }, { props.state }</p>
  )
}

Location.defaultProps = {
  name: 'Welcome to The Fucking Weather'
}

export default Location