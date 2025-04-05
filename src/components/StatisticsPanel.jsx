import React from 'react';

function StatisticsPanel({ statistics }) {
  return (
    <div className="statistics-panel">
      {statistics.map((stat, index) => (
        <div key={index} className="stat-card">
          <h3>{stat.label}</h3>
          <p>{stat.value}</p>
        </div>
      ))}
    </div>
  );
}

export default StatisticsPanel;