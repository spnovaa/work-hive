import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Registration from './pages/registration';
import Home from './pages/home';
import ProjectsDashboard from './components/project/projectDashboard.jsx';
import ProjectDetails from './components/project/projectDetails.jsx';
import NewProject from './components/project/newProject.jsx';
import DashboardSidebar from './components/dashboardSidebar';
function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <div className="absolute top-4 right-4 w-64 bg-gray-100">
          <DashboardSidebar />
        </div>
        <div className="flex-grow p-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<ProjectsDashboard />} />
            <Route path="/projects/new" element={<NewProject />} />
            <Route path="/projects/:projectId" element={<ProjectDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

