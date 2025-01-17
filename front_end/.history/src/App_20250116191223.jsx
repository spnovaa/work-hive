import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Registration from './pages/registration';
import Home from './pages/home';
import ProjectsDashboard from './components/ProjectsDashboard';
import ProjectDetails from './components/ProjectDetails';
import NewProject from './components/NewProject';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} /> 
        <Route path="/" element = {<Home/>}/>
        <Route path="/projects" element={<ProjectsDashboard />} />
                <Route path="/projects/new" element={<NewProject />} />
                <Route path="/projects/:projectId" element={<ProjectDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
