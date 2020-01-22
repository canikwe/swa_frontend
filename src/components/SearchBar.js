import React from 'react'

const SearchBar = ({ searchTerm, handleBackNav, handleChange, handleSearch, city, state }) => {

  return(
    <div className='header'>
      <i onClick={handleBackNav} className="material-icons">arrow_back_ios</i>
      <form className='header'>
        <label htmlFor='location' />
        <input
          className='search'
          type='text' 
          value={searchTerm} 
          onChange={ handleChange } 
          name='location' 
          placeholder='Update your fucking location'
        />
        <button type='submit' onClick={handleSearch} className='btn'>
          <i className="material-icons">search</i>
        </button>
      </form>
    </div>
  )
}

export default SearchBar