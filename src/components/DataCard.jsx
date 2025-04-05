import React from 'react';

function DataCard({ item }) {
  return (
    <div className="table-row">
      <div className="table-cell">{item.name}</div>
      <div className="table-cell">{item.brewery_type}</div>
      <div className="table-cell">{item.city}, {item.state}</div>
      <div className="table-cell">{item.phone || 'N/A'}</div>
      <div className="table-cell">
        {item.website_url 
          ? <a href={item.website_url} target="_blank" rel="noopener noreferrer">Visit Site</a>
          : 'N/A'
        }
      </div>
    </div>
  );
}

export default DataCard;