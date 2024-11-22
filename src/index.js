// Importing the necessary modules for React and ReactDOM to render the app
import React from 'react';
import ReactDOM from 'react-dom/client';

// Importing the global CSS styles for the application
import './index.css';

// Importing the main App component that serves as the root of the application
import App from './App';

// Importing the function to measure performance and report web vitals
import reportWebVitals from './reportWebVitals';

// Creating a root element where the React app will be mounted
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendering the root component (`App`) into the DOM
root.render(
  <React.StrictMode>
    {/* StrictMode helps identify potential problems in the app */}
    <App />
  </React.StrictMode>
);

// reportWebVitals is a tool to measure app performance (optional)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
