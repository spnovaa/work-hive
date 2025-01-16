import React, { useState } from 'react';
import ProfileSection from '../components/profile/profileSection';

function Home({name =null}) {
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
          greeting="ظهر بخیر!"
          date={getCurrentDate()}
          onBackgroundChange={handleBackgroundChange}
        />
      </div>
    </div>
  );
}

export default Home;
