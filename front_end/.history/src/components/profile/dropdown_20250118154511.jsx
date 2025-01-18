import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../common/axiosInstance.js'; // Adjust the path as needed
import ProfileImageModal from './ProfileImageModal'; // Import the modal component

const ProfileDropdown = ({ onBackgroundChange, onSettingsClick, userId }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [showImageModal, setShowImageModal] = useState(false); // State for image modal
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userInfo');
    sessionStorage.clear();
    document.cookie = 'session=; expires=Thu, 01 Jan 2012 00:00:00 UTC; path=/;';
    navigate('/login');
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleProfileImageClick = () => {
    setShowImageModal(true); // Open the modal for profile image selection
  };

  const handleProfileImageClose = () => {
    setShowImageModal(false); // Close the modal
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
          <div
            className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100 rounded"
            onClick={handleProfileImageClick} // Open the modal on click
          >
            <span>تنظیم عکس پروفایل</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zM12 14c-4.41 0-8 3.59-8 8 0 0 16 0 16 0 0-4.41-3.59-8-8-8z"
              />
            </svg>
          </div>
        </div>
      )}

      {/* Profile Image Modal */}
      {showImageModal && (
        <ProfileImageModal
          userId={userId}
          onClose={handleProfileImageClose}
        />
      )}
    </>
  );
};

export default ProfileDropdown;
