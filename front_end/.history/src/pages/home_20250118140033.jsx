import React, { useState } from 'react';
import ProfileSection from '../components/profile/profileSection';
import { useLocation } from 'react-router-dom';
import DashboardSidebar from '../components/dashboardSidebar';
import  ProfileSettingsModal  from '../components/profile/profileSettingsModal.jsx'
function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
  const location = useLocation();
  const name = location.state?.name || "نام کاربری ناشناس";
  const [background, setBackground] = useState('bg-white');
  const handleBackgroundChange = (bg) => {
    setBackground(bg);
  };
  const getCurrentDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('fa-IR', options); 
  };
  return (
    <div className={`h-screen ${background} p-4`}>
      <div className="absolute top-20 left-8">
        <ProfileSection
          name={name}
          greeting="ظهر بخیر"
          date={getCurrentDate()}
          onBackgroundChange={handleBackgroundChange}
          onSettingsClick={openModal}
        />
      </div>
      <ProfileSettingsModal show={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default Home;
