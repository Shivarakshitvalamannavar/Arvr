// HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css'

function HomePage() {
  return (
    <div className="homepage">
      <h1>Welcome to Car Show</h1>
      <p>Experience interactive 3D car customization and visualization.</p>
      <Link to="/car-show">
        <button>Get Started</button>
      </Link>
    </div>
  );
}

export default HomePage;
