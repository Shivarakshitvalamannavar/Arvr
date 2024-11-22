// HomePage.js
// Importing the React library to use JSX and component features
import React from 'react';

// Importing the `Link` component from `react-router-dom` for navigation between routes
import { Link } from 'react-router-dom';

// Importing a CSS file for styling the `HomePage` component
import '../styles/home.css';

// Defining the `HomePage` functional component
function HomePage() {
  return (
    // Main container for the homepage content with a class for styling
    <div className="homepage">
      {/* Heading text for the homepage */}
      <h1>Welcome to Car Show</h1>

      {/* Description text for the homepage */}
      <p>Experience interactive 3D car customization and visualization.</p>

      {/* Navigation link to the "car-show" route, wrapped around a button */}
      <Link to="/car-show">
        <button>Get Started</button>
      </Link>
    </div>
  );
}

// Exporting the `HomePage` component for use in other parts of the application
export default HomePage;
