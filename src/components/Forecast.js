import React from 'react'

const Forecast = ({ forecast: {msg, description} }) => {

  return (
    <div className='center animated fadeInUp'>
      <h1 className='rating'>{ msg }</h1>
      <div className='container'>
        <p>{ description }</p>
      </div>
    </div>
  )
}

export default Forecast