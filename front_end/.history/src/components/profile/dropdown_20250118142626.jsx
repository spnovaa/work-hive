import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../common/axiosInstance.js'; // Adjust the path as needed
import ProfileSettingsModal from './profileSettingsModal.jsx';

const ProfileDropdown = ({ onBackgroundChange, onSettingsClick, userId }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedBackground, setSelectedBackground] = useState(null);
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    name: '',
    lastName: '',
    email: '',
  });

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userInfo');
    sessionStorage.clear();
    document.cookie = 'session=; expires=Thu, 01 Jan 2012 00:00:00 UTC; path=/;';
    navigate('/login');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirm = async () => {
    try {
      const response = await axiosInstance.put(`/api/users/${userId}`, userDetails);
      if (response.status === 204) {
        alert('User details updated successfully!');
        setIsOpen(false);
      }
    } catch (error) {
      console.error('Error updating user details:', error.response?.data || error.message);
      alert('Failed to update user details.');
    }
  };

  const backgrounds = [
    'bg-gradient-to-r from-yellow-400 via-red-400 to-pink-400',
    'bg-blue-500',
    'bg-red-300',
    'bg-yellow-200',
    'bg-indigo-200',
    'bg-gray-900',
    'bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600',
    'bg-gradient-to-r from-blue-800 to-blue-900',
    'bg-gradient-to-r from-purple-900 via-purple-800 to-purple-700',
    'bg-gradient-to-b from-black to-gray-800',
    'bg-gray-700',
    'bg-gradient-to-r from-green-400 via-teal-500 to-blue-500',
    'bg-gradient-to-b from-orange-400 to-red-400',
    'bg-pink-200',
    'bg-purple-300',
    'bg-teal-200',
    'bg-gradient-to-l from-red-500 via-yellow-500 to-green-500',
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleBackgroundChange = (bg) => {
    setSelectedBackground(bg);
    onBackgroundChange(bg);
    toggleDropdown();
  };

  return (
    <>
      {isOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-0 left-0 bg-white rounded-lg shadow-lg w-max p-4"
        >
          <div
            className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100 rounded"
            onClick={() => {
              onSettingsClick();
              toggleDropdown();
            }}
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
                d="M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM19.4 15a1.77 1.77 0 00.32 1.8l.05.06a2 2 0 11-2.83 2.83l-.06-.05a1.77 1.77 0 00-1.8-.32 1.77 1.77 0 00-1.05 1.61V21a2 2 0 01-4 0v-.13a1.77 1.77 0 00-1.61-1.05 1.77 1.77 0 00-1.8.32l-.06.05a2 2 0 11-2.83-2.83l.05-.06a1.77 1.77 0 00.32-1.8 1.77 1.77 0 00-1.61-1.05H3a2 2 0 010-4h.13a1.77 1.77 0 001.61-1.05 1.77 1.77 0 00-.32-1.8l-.05-.06a2 2 0 112.83-2.83l.06.05a1.77 1.77 0 001.8.32H9a1.77 1.77 0 001.05-1.61V3a2 2 0 014 0v.13a1.77 1.77 0 001.05 1.61 1.77 1.77 0 001.8-.32l.06-.05a2 2 0 112.83 2.83l-.05.06a1.77 1.77 0 00-.32 1.8V9a1.77 1.77 0 001.61 1.05H21a2 2 0 010 4h-.13a1.77 1.77 0 00-1.61 1.05z"
              />
            </svg>
          </div>
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
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
              />
            </svg>
          </div>
          <div className="mt-4">
            <span className="text-gray-700 font-semibold">انتخاب پس‌زمینه</span>
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

          {/* Confirm Button */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={userDetails.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={userDetails.lastName}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={userDetails.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <button
              onClick={handleConfirm}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileDropdown;
