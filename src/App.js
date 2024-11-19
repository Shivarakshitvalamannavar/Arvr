import React from 'react'; // Import React library for building the UI
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import routing components from react-router-dom
import HomePage from './pages/home'; // Import the HomePage component
import CarComp from './pages/carshow'; // Import the CarComp (Car Show) component

// The App component serves as the main entry point of the application
function App() {
  return (
    // Router wraps the application to enable routing functionality
    <Router>
      {/* Routes container defines all the available routes in the application */}
      <Routes>
        {/* Route for the home page, accessible at the root path ("/") */}
        <Route path="/" element={<HomePage />} />

        {/* Route for the Car Show page, accessible at "/car-show" */}
        <Route path="/car-show" element={<CarComp />} />
      </Routes>
    </Router>
  );
}

export default App; // Export the App component for use in index.js
