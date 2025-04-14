import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="not-found">
      <h2>Page Not Found</h2>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default NotFound;