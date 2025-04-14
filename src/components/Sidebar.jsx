import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar({ data }) {
  // Get 10 random breweries for the "Featured Breweries" section
  const getRandomBreweries = (breweries, count) => {
    const shuffled = [...breweries].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const randomBreweries = getRandomBreweries(data, 10);
  
  // Count breweries by state
  const breweriesByState = data.reduce((acc, brewery) => {
    if (brewery.state) {
      acc[brewery.state] = (acc[brewery.state] || 0) + 1;
    }
    return acc;
  }, {});

  // Get top 5 states by brewery count
  const topStates = Object.entries(breweriesByState)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="sidebar">
      <div className="sidebar-section">
        <h3>Featured Breweries</h3>
        <ul>
          {randomBreweries.map(brewery => (
            <li key={brewery.id}>
              <Link to={`/brewery/${brewery.id}`}>{brewery.name}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-section">
        <h3>Top States</h3>
        <ul>
          {topStates.map(([state, count]) => (
            <li key={state}>
              {state}: {count} breweries
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;