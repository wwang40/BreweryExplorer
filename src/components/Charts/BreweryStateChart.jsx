import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function BreweryStateChart({ data }) {
  const stateCounts = data.reduce((acc, brewery) => {
    if (brewery.state) {
      acc[brewery.state] = (acc[brewery.state] || 0) + 1;
    }
    return acc;
  }, {});
  
  const sortedStates = Object.entries(stateCounts)
    .map(([state, count]) => ({ state, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10); 
    
  return (
    <div className="chart-card">
      <h3 className="chart-title">Top 10 States by Brewery Count</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={sortedStates}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="state" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#61dafb" name="Number of Breweries" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BreweryStateChart;