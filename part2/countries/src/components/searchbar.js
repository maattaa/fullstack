import React from 'react';

const SearchBar = ({ search, handleSearch }) => {
    return(
    <form>
      <label>
        find countries &nbsp;
    <input type="text" value={search} onChange={handleSearch} />
      </label>
    </form>
    );
  };

  export default SearchBar;