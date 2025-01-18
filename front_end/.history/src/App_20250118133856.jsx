import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Registration from './pages/registration';
import Home from './pages/home';
import ProjectsDashboard from './components/project/projectDashboard.jsx';
import ProjectDetails from './components/project/projectDetails.jsx';
import NewProject from './components/project/newProject.jsx';
import DashboardSidebar from './components/dashboardSidebar';
import TaskPage from './components/task/taskPage.jsx';
import TeamList from './components/team/teamList.jsx';
import TopBar from './components/topBar.jsx';

function App() {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  return (
    <Router>
      <div className="flex flex-col h-screen">
        {/* Top Bar */}
        <div className="w-full bg-red-600 shadow-md fixed top-0 z-20">
          <TopBar toggleSidebar={toggleSidebar} />
        </div>

        <div className="flex flex-grow">
          {/* Sidebar */}
          {sidebarVisible && (
            <div className="w-64 bg-gray-800 fixed top-16 bottom-0 right-0 z-10 shadow-md">
              <DashboardSidebar />
            </div>
          )}

          {/* Main Content */}
          <div
            className={`flex-grow ${
              sidebarVisible ? 'pr-64' : ''
            } pt-16 p-4 transition-all duration-300`}
          >
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<ProjectsDashboard />} />
              <Route path="/projects/new" element={<NewProject />} />
              <Route path="/projects/:projectId" element={<ProjectDetails />} />
              <Route path="/tasks" element={<TaskPage />} />
              <Route path="/teams" element={<TeamList />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
