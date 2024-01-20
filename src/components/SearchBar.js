import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div>
      <input
        className="search-input"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="clear-search-button" onClick={() => setSearchTerm("")}>
        Clear Search
      </button>
    </div>
  );
};

export default SearchBar;
