import React from "react"

const Weather = ({ temp, scale, description, icon }) => {
  return (
    <div className='center animated fadeInUp'>
      <h2 className='temp'> { temp } ° { scale } </h2>
      <img 
        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={description}
      />
    </div>
  )
}

export default Weather