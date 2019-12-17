import React from 'react'

const LocationList = ({ locations, handleClick }) => {
  console.log(locations)
  return(
    <>
      <h2>Multiple Locations. Please select from below:</h2>
      <ul>
        { locations.map(l => <li key={ l.annotations.MGRS } onClick={ () => handleClick({type: 'coord', query: l.geometry}, l) }>{l.annotations.flag} - {l.formatted}</li>) }
      </ul>
    </>
  )
}

export default LocationList