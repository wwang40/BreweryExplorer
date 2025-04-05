import React from 'react';

function FilterBar({ filterType, setFilterType, options }) {
  return (
    <div className="filter-bar">
      <select 
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
      >
        {options.map(option => (
          <option key={option} value={option}>
            {option === 'all' ? 'All Types' : option.replace('_', ' ')}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterBar;