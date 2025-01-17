import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Registration from './pages/registration';
import Home from './pages/home';
import ProjectsDashboard from './components/project/projectDashboard.jsx';
import ProjectDetails from './components/project/projectDetails.jsx';
import NewProject from './components/project/newProject.jsx';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} /> 
        <Route path="/" element = {<Home/>}/>
        <Route path="/projects" element={<ProjectsDashboard/>} />
        <Route path="/projects/new" element={<NewProject/>} />
        <Route path="/projects/:projectId" element={<ProjectDetails/>} />
      </Routes>
    </Router>
  );
}

export default App;
