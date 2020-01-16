import React from 'react'

const Forcast = ({ forcast }) => {

  const sample = (max) => {
    return Math.floor(Math.random() * Math.floor(max))
  }

  return (
    <>
      <h1 className='rating center'>{ forcast.msg }</h1>
      <p>{ forcast.description }</p>
    </>
  )
}

export default Forcast