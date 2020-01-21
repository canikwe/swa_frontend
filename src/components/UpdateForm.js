import React from 'react'

const UpdateForm = ({ searchTerm, handleBackNav, handleChange, handleSearch }) => {

  return(
    <>
      <p onClick={handleBackNav}>↩️ Back</p>
      <form>
        <label htmlFor='location' />
        <input type='text' value={searchTerm} onChange={ handleChange } name='location' />
        <input type='submit' value='Update my fucking location' onClick={ handleSearch } />
      </form>
    </>
  )
}

export default UpdateForm