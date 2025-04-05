import React from 'react';
import Dashboard from './components/Dashboard';
import Header from './components/Header';

function App() {
  return (
    <div className="app">
      <Header title="Brewery Explorer" />
      <Dashboard />
    </div>
  );
}

export default App;