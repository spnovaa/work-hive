import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login.jsx';
import Home from './pages/home'
import Registration from './pages/registration';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element = {<Home/>}/>
        <Route path="/register" element={<Registration />} /> {/* Registration page route */}
      </Routes>
    </Router>
  );
}

export default App;
