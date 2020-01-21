import React from 'react'

const Forecast = ({ forecast }) => {

  const sample = (max) => {
    return Math.floor(Math.random() * Math.floor(max))
  }

  return (
    <>
      <h1 className='rating center'>{ forecast.msg }</h1>
      <p>{ forecast.description }</p>
    </>
  )
}

export default Forecast