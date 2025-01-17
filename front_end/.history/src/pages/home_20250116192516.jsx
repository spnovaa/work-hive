import React, { useState } from 'react';
import ProfileSection from '../components/profile/profileSection';
import { useLocation } from 'react-router-dom';
import DashboardSidebar from '../components/dashboardSidebar';
function Home() {
  const location = useLocation();
  const name = location.state?.name || "نام کاربری ناشناس";
  const [background, setBackground] = useState('bg-white');
  const handleBackgroundChange = (bg) => {
    setBackground(bg);
  };
  const getCurrentDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('fa-IR', options); // Persian calendar format
  };
  return (
    <div className={`h-screen ${background} p-4`}>
      <div className="absolute top-4 left-4">
        <ProfileSection
          name={name}
          greeting="ظهر بخیر"
          date={getCurrentDate()}
          onBackgroundChange={handleBackgroundChange}
        />
      </div>
      {/* Dashboard Sidebar */}
      <div className="absolute top-4 right-4">
        <DashboardSidebar />
      </div>
    </div>
  );
}

export default Home;
