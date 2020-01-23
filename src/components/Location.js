import React from 'react'

const Location = ({ location, handleSelect }) => {
  return (
     <li 
      onClick={ () => handleSelect(location) }
      className='animated fadeInUp'
    >
      {location.annotations.flag} - {location.formatted}
    </li>
  )
}

export default Location