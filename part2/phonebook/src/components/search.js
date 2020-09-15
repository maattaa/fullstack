import React from 'react';

const Search = ({ search, handleSearch }) => (
    <form>
      <div>
        filter shown with 
        <input
          value={search}
          onChange={handleSearch}
        />
      </div>
    </form>
  );

export default Search;
