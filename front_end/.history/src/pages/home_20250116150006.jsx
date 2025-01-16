import React, { useState } from 'react';
import ProfileSection from '../components/profile/profileSection';

function Home() {
  const [background, setBackground] = useState('bg-white');
  const handleBackgroundChange = (bg) => {
    setBackground(bg);
  };
  return (
    <div className={`h-screen ${background} p-4`}>
      <div className="absolute top-4 left-4">
        <ProfileSection
          name="عطا موثقی"
          greeting="ظهر بخیر!"
          date="پنج‌شنبه ۲۷ دی"
          onBackgroundChange={handleBackgroundChange}
        />
      </div>
    </div>
  );
}

export default Home;
