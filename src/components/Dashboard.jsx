import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import FilterBar from './FilterBar';
import DataList from './DataList';
import StatisticsPanel from './StatisticsPanel';

function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.openbrewerydb.org/v1/breweries?per_page=50');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.city?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterType === 'all' || item.brewery_type === filterType;
    
    return matchesSearch && matchesFilter;
  });

  const calculateStatistics = () => {
    if (data.length === 0) return [];

    const uniqueStates = [...new Set(data.map(item => item.state))].filter(Boolean).length;
    
    const typeCount = data.reduce((acc, brewery) => {
      acc[brewery.brewery_type] = (acc[brewery.brewery_type] || 0) + 1;
      return acc;
    }, {});
    
    const mostCommonType = Object.entries(typeCount).sort((a, b) => b[1] - a[1])[0];

    return [
      { label: 'Total Breweries', value: data.length },
      { label: 'States Represented', value: uniqueStates },
      { label: `Most Common Type:`, value: mostCommonType?.[0]}
    ];
  };

  const statistics = calculateStatistics();

  const filterOptions = ['all', ...new Set(data.map(item => item.brewery_type))].filter(Boolean);

  if (loading) return <div>Loading breweries...</div>;
  if (error) return <div>Error loading data: {error}</div>;

  return (
    <div className="dashboard">
      <div className="search-filter-container">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <FilterBar 
          filterType={filterType} 
          setFilterType={setFilterType} 
          options={filterOptions} 
        />
      </div>
      
      <StatisticsPanel statistics={statistics} />
      
      <DataList data={filteredData} />
    </div>
  );
}

export default Dashboard;