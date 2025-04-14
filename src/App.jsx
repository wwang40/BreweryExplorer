import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import BreweryDetail from './pages/BreweryDetail';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="app">
      <Header title="Brewery Explorer" />
      
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/brewery/:breweryId" element={<BreweryDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;