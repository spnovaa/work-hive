import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const ProfileDropdown  = ({  onBackgroundChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBackground, setSelectedBackground] = useState(null);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userInfo');
    sessionStorage.clear();
    document.cookie = 'session=; expires=Thu, 01 Jan 2012 00:00:00 UTC; path=/;';
    navigate('/login');
  };
  const backgrounds = [
    'bg-white',
    'bg-gradient-to-r from-yellow-400 via-red-400 to-pink-400',
    'bg-blue-500',
    'bg-red-300',
    'bg-yellow-200',
    'bg-indigo-200',
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleBackgroundChange = (bg) => {
    setSelectedBackground(bg);
    onBackgroundChange(bg);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="p-2 bg-gray-100 rounded-lg shadow-md"
      >
        Profile Options
      </button>

      {isOpen && (
        <div className="absolute top-12 left-0 bg-white rounded-lg shadow-lg w-64 p-4">
          <div
            className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100 rounded"
            onClick={() => alert('Account Settings Clicked')}
          >
            <span>تنظیمات حساب کاربری</span>
            <svg
  xmlns="http://www.w3.org/2000/svg"
  className="h-6 w-6 text-gray-800"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d="M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM19.4 15a1.77 1.77 0 00.32 1.8l.05.06a2 2 0 11-2.83 2.83l-.06-.05a1.77 1.77 0 00-1.8-.32 1.77 1.77 0 00-1.05 1.61V21a2 2 0 01-4 0v-.13a1.77 1.77 0 00-1.61-1.05 1.77 1.77 0 00-1.8.32l-.06.05a2 2 0 11-2.83-2.83l.05-.06a1.77 1.77 0 00.32-1.8 1.77 1.77 0 00-1.61-1.05H3a2 2 0 010-4h.13a1.77 1.77 0 001.61-1.05 1.77 1.77 0 00-.32-1.8l-.05-.06a2 2 0 112.83-2.83l.06.05a1.77 1.77 0 001.8.32H9a1.77 1.77 0 001.05-1.61V3a2 2 0 014 0v.13a1.77 1.77 0 001.05 1.61 1.77 1.77 0 001.8-.32l.06-.05a2 2 0 112.83 2.83l-.05.06a1.77 1.77 0 00-.32 1.8V9a1.77 1.77 0 001.61 1.05H21a2 2 0 010 4h-.13a1.77 1.77 0 00-1.61 1.05z"
  />
</svg>

          </div>

          {/* Logout */}
          <div
            className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100 rounded"
            onClick={handleLogout}
          >
            <span>خروج</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 17l-4 4m0 0l-4-4m4 4V3"
              />
            </svg>
          </div>

          {/* Background Selection */}
          <div className="mt-4">
            <span className="text-gray-700 font-semibold">انتخاب پس‌زمینه:</span>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {backgrounds.map((bg, index) => (
                <div
                  key={index}
                  className={`w-16 h-16 rounded-lg cursor-pointer ${bg} ${
                    selectedBackground === bg ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => handleBackgroundChange(bg)}
                ></div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
