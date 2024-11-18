import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home';
import CarComp from './pages/carshow';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/car-show" element={<CarComp />} />
      </Routes>
    </Router>
  );
}

export default App;
