import React from 'react'

const Forecast = ({ forecast: {msg, description} }) => {

  const sample = (max) => {
    return Math.floor(Math.random() * Math.floor(max))
  }

  return (
    <div className='center'>
      <h1 className='rating'>{ msg }</h1>
      <div className='container'>
        <p>{ description }</p>
      </div>
    </div>
  )
}

export default Forecast