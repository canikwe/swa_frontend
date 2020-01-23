import React from 'react'
import Location from '../components/Location'

const LocationsList = ({ locations, handleSelect }) => {
  console.log(locations)
  return(
    <div className='center animated fadeIn'>
      <h2>Multiple Locations. Please select from below:</h2>
      <ul>
        { locations.map(l => <Location key={ l.annotations.MGRS } location={l} handleSelect={handleSelect}/>) }
      </ul>
    </div>
  )
}

export default LocationsList