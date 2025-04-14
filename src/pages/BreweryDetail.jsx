import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

function BreweryDetail() {
  const { breweryId } = useParams();
  const navigate = useNavigate();
  
  const [brewery, setBrewery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allBreweries, setAllBreweries] = useState([]);

  useEffect(() => {
    const fetchBrewery = async () => {
      try {
        setLoading(true);
        
        const breweryResponse = await fetch(`https://api.openbrewerydb.org/v1/breweries/${breweryId}`);
        
        if (!breweryResponse.ok) {
          throw new Error(`HTTP error! Status: ${breweryResponse.status}`);
        }
        
        const breweryData = await breweryResponse.json();
        setBrewery(breweryData);
        
        const allBreweriesResponse = await fetch('https://api.openbrewerydb.org/v1/breweries?per_page=50');
        
        if (!allBreweriesResponse.ok) {
          throw new Error(`HTTP error! Status: ${allBreweriesResponse.status}`);
        }
        
        const allBreweriesData = await allBreweriesResponse.json();
        setAllBreweries(allBreweriesData);
        
        setError(null);
      } catch (err) {
        setError(err.message);
        setBrewery(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBrewery();
  }, [breweryId]);

  const handleBack = () => {
    navigate('/');
  };

  if (loading) return <div>Loading brewery details...</div>;
  if (error) return <div>Error loading brewery: {error}</div>;
  if (!brewery) return <div>Brewery not found</div>;

  return (
    <div className="app-container">
      <div className="content">
        <div className="brewery-detail">
          <div className="detail-header">
            <h2 className="detail-name">{brewery.name}</h2>
            <button className="back-button" onClick={handleBack}>Back to List</button>
          </div>
          
          <div className="detail-section">
            <h3>General Information</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Type:</span>
                {brewery.brewery_type}
              </div>
              <div className="detail-item">
                <span className="detail-label">Founded:</span>
                {brewery.created_at ? new Date(brewery.created_at).getFullYear() : 'N/A'}
              </div>
              <div className="detail-item">
                <span className="detail-label">Website:</span>
                {brewery.website_url ? (
                  <a href={brewery.website_url} target="_blank" rel="noopener noreferrer">
                    {brewery.website_url}
                  </a>
                ) : 'N/A'}
              </div>
              <div className="detail-item">
                <span className="detail-label">Phone:</span>
                {brewery.phone || 'N/A'}
              </div>
            </div>
          </div>
          
          <div className="detail-section">
            <h3>Location & Contact</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Address:</span>
                {brewery.street || 'N/A'}
              </div>
              <div className="detail-item">
                <span className="detail-label">City:</span>
                {brewery.city || 'N/A'}
              </div>
              <div className="detail-item">
                <span className="detail-label">State:</span>
                {brewery.state || 'N/A'}
              </div>
              <div className="detail-item">
                <span className="detail-label">Postal Code:</span>
                {brewery.postal_code || 'N/A'}
              </div>
              <div className="detail-item">
                <span className="detail-label">Country:</span>
                {brewery.country || 'N/A'}
              </div>
              <div className="detail-item">
                <span className="detail-label">Latitude:</span>
                {brewery.latitude || 'N/A'}
              </div>
              <div className="detail-item">
                <span className="detail-label">Longitude:</span>
                {brewery.longitude || 'N/A'}
              </div>
            </div>
            
            {brewery.latitude && brewery.longitude && (
              <div className="map-container">
                Map would be displayed here with coordinates: {brewery.latitude}, {brewery.longitude}
              </div>
            )}
          </div>
          
          <div className="detail-section">
            <h3>Related Breweries</h3>
            <div className="detail-grid">
              {allBreweries
                .filter(b => b.id !== brewery.id && b.state === brewery.state)
                .slice(0, 3)
                .map(b => (
                  <div key={b.id} className="detail-item">
                    <Link to={`/brewery/${b.id}`}>{b.name}</Link> - {b.city}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      
      <Sidebar data={allBreweries} />
    </div>
  );
}

export default BreweryDetail;