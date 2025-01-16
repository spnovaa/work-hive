import React, { useState } from 'react';
import ProfileDropdown from '../components/profile/ProfileDropdown';

function Home() {
  const [background, setBackground] = useState('bg-white');

  const handleLogout = () => {
    alert('Logging out...');
  };

  const handleBackgroundChange = (bg) => {
    setBackground(bg);
  };

  return (
    <div className={`h-screen ${background} p-4`}>
      <div className="absolute top-4 left-4">
        <ProfileDropdown
          onLogout={handleLogout}
          onBackgroundChange={handleBackgroundChange}
        />
      </div>
    </div>
  );
}

export default Home;
