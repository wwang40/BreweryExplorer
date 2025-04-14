import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import DataList from '../components/DataList';
import StatisticsPanel from '../components/StatisticsPanel';
import BreweryTypeChart from '../components/Charts/BreweryTypeChart';
import BreweryStateChart from '../components/Charts/BreweryStateChart';

function Home() {
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
      { label: `Most Common Type: ${mostCommonType?.[0] || 'N/A'}`, value: mostCommonType?.[1] || 0 }
    ];
  };

  const statistics = calculateStatistics();

  const filterOptions = ['all', ...new Set(data.map(item => item.brewery_type))].filter(Boolean);

  if (loading) return <div>Loading breweries...</div>;
  if (error) return <div>Error loading data: {error}</div>;

  return (
    <div className="app-container">
      <div className="content">
        <div className="search-filter-container">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <FilterBar 
            filterType={filterType} 
            setFilterType={setFilterType} 
            options={filterOptions} 
          />
        </div>
        
        <StatisticsPanel statistics={statistics} />
        
        <div className="charts-container">
          <BreweryTypeChart data={data} />
          <BreweryStateChart data={data} />
        </div>
        
        <DataList data={filteredData} />
      </div>
      
      <Sidebar data={data} />
    </div>
  );
}

export default Home;