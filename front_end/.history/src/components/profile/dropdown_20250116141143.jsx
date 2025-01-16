import React, { useState } from 'react';

const ProfileDropdown  = ({ onLogout, onBackgroundChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBackground, setSelectedBackground] = useState(null);

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
      {/* Profile Section */}
      <button
        onClick={toggleDropdown}
        className="p-2 bg-gray-100 rounded-lg shadow-md"
      >
        Profile Options
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-12 left-0 bg-white rounded-lg shadow-lg w-64 p-4">
          {/* Account Settings */}
          <div
            className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100 rounded"
            onClick={() => alert('Account Settings Clicked')}
          >
            <span>تنظیمات حساب کاربری</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4.5c-1.104 0-2 .896-2 2v3h-3c-1.104 0-2 .896-2 2v6h12v-6c0-1.104-.896-2-2-2h-3v-3c0-1.104-.896-2-2-2z"
              />
            </svg>
          </div>

          {/* Logout */}
          <div
            className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100 rounded"
            onClick={onLogout}
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
