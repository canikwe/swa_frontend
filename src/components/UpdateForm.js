import React from 'react'

const UpdateForm = ({ searchTerm, handleChange, handleClick }) => {

  return(
    <>
      <p>Update Form Component</p>
      <label htmlFor='location' />
      <input type='text' value={searchTerm} onChange={ handleChange } name='location' />
      <button onClick={ handleClick } >Update my fucking location</button>
    </>
  )
}

export default UpdateForm