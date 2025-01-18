import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Registration from './pages/registration';
import Home from './pages/home';
import ProjectsDashboard from './components/project/projectDashboard.jsx';
import ProjectDetails from './components/project/projectDetails.jsx';
import NewProject from './components/project/newProject.jsx';
import DashboardSidebar from './components/dashboardSidebar';
import TaskModal from './components/task/tasksComponent.jsx'
import TeamList from './components/team/teamList.jsx'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />

        <Route
          path="*"
          element={
            <div className="flex h-screen">
              {/* Sidebar Toggle Button */}
              <button
                className="sm:hidden p-4 text-white bg-blue-500"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                ☰
              </button>

              {/* Sidebar: Fixed on the right side for larger screens */}
              <div
                className={`w-64 bg-gray-100 fixed right-0 top-0 bottom-0 z-10 transform ${
                  sidebarOpen ? 'translate-x-0' : 'translate-x-full'
                } transition-transform duration-300 sm:translate-x-0`}
              >
                <DashboardSidebar />
              </div>

              {/* Main content area: Respect the sidebar width on the right */}
              <div className="flex-grow mr-64 sm:mr-0 p-4">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/projects" element={<ProjectsDashboard />} />
                  <Route path="/projects/new" element={<NewProject />} />
                  <Route path="/projects/:projectId" element={<ProjectDetails />} />
                  <Route path="/tasks" element={<TaskModal />} />
                  <Route path="/teams" element={<TeamList />} />
                </Routes>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}
export default App;

