import React from 'react'

const UpdateForm = ({ searchTerm, handleChange, handleClick }) => {

  return(
    <>
      <p>Update Form Component</p>
      <form>
        <label htmlFor='location' />
        <input type='text' value={searchTerm} onChange={ handleChange } name='location' />
        <input type='submit' value='Update my fucking location' onClick={ handleClick } />
      </form>
    </>
  )
}

export default UpdateForm