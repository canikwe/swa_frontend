import React from 'react'

const Location = ({ location, handleSelect }) => {
  return (
     <li onClick={ () => handleSelect(location) }>{location.annotations.flag} - {location.formatted}</li>
  )
}

export default Location