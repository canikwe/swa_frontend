import React, { useState } from "react";

const SearchBar = ({ searchTerm, onNavigateBack, onChange, onSearch }) => {
  const [errorMessage, updateErrorMessage] = useState(undefined);

  const validateSearch = (e) => {
    e.preventDefault();
    const strippedTerm = searchTerm.replace(/[^\w\s]/gi, "");

    if (!strippedTerm) {
      updateErrorMessage("That's not a fucking location");
    } else {
      updateErrorMessage(undefined);
      onSearch(strippedTerm);
    }
  };

  const doSomething = (e) => {
    if (errorMessage) updateErrorMessage(undefined);
    onChange(e);
  };

  return (
    <div className="header animated fadeIn">
      <i onClick={onNavigateBack} className="btn material-icons">
        arrow_back_ios
      </i>
      <form className="header">
        <div>
          <label htmlFor="location" />
          <input
            className="search"
            type="search"
            value={searchTerm}
            onChange={doSomething}
            name="location"
            placeholder="Update your fucking location"
          />
        </div>
        <button type="submit" onClick={validateSearch} className="btn">
          <i className="material-icons">search</i>
        </button>
      </form>
      {errorMessage && <p className="danger">{errorMessage}</p>}
    </div>
  );
};

export default SearchBar;
