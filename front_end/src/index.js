import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client' for React 18+
import './styles/globals.css';
import App from './App';

// Create a root element for rendering the React application
const root = ReactDOM.createRoot(document.getElementById('root'));

// Use the new `render` method for React 18+
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
