import React from "react";

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="search-bar">
      <label htmlFor="patient-search" className="visually-hidden">Search Patient Name</label>
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          id="patient-search"
          type="text"
          placeholder="Search patient by name..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
