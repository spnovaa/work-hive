import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/login';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
  </Router>
);

export default AppRouter;
