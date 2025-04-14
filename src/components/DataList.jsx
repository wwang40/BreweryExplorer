import React from 'react';
import { Link } from 'react-router-dom';
import DataCard from './DataCard';

function DataList({ data }) {
  if (data.length === 0) {
    return <div>No breweries match your search criteria.</div>;
  }

  return (
    <div className="data-table">
      <div className="table-header">
        <div className="table-row">
          <div className="table-cell header-cell">Name</div>
          <div className="table-cell header-cell">Type</div>
          <div className="table-cell header-cell">Location</div>
          <div className="table-cell header-cell">Phone</div>
          <div className="table-cell header-cell">Details</div>
        </div>
      </div>
      <div className="table-body">
        {data.map(item => (
          <DataCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default DataList;