import React from 'react'

const SearchBar = ({ searchTerm, handleBackNav, handleChange, handleSearch, city, state }) => {

  return(
    <>
      <p onClick={handleBackNav}>↩️ Back</p>
      <form>
        <label htmlFor='location' />
        <input 
          type='text' 
          value={searchTerm} 
          onChange={ handleChange } 
          name='location' 
          placeholder={`${city}, ${state}`}
        />
        <input type='submit' value='Update my fucking location' onClick={ handleSearch } />
      </form>
    </>
  )
}

export default SearchBar