import React from 'react';
import { Link } from 'react-router-dom';

function DataCard({ item }) {
  return (
    <Link to={`/brewery/${item.id}`} className="table-row" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="table-cell">{item.name}</div>
      <div className="table-cell">{item.brewery_type}</div>
      <div className="table-cell">{item.city}, {item.state}</div>
      <div className="table-cell">{item.phone || 'N/A'}</div>
      <div className="table-cell">
        <span style={{ color: '#61dafb' }}>View Details</span>
      </div>
    </Link>
  );
}

export default DataCard;