import React, { useState, useEffect } from 'react';
import axiosInstance from '../../common/axiosInstance.js';

const ProfileSettingsModal = ({ show, onClose }) => {
  const [userInfo, setUserInfo] = useState({ name: '', lastName: '', email: '' });
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    if (show) {
      const fetchUserInfo = async () => {
        try {
          const response = await axiosInstance.post('https://work-hive.liara.run/api/me');
          const { U_Id, name, lastName, email } = response.data;
          setUserId(U_Id);
          setUserInfo({ name, lastName, email });
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      };

      fetchUserInfo();
    }
  }, [show]);
  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.put(`https://work-hive.liara.run/api/users/${userId}`, {
        name: userInfo.name,
        lastName: userInfo.lastName,
        email: userInfo.email,
      });
      if (response.status === 204) {
        alert('Profile updated successfully!');
        onClose();
      }
    } catch (error) {
      console.error('Error updating user info:', error.response?.data || error.message);
      alert('Failed to update profile.');
    }
  };

  if (!show) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-30 z-40" onClick={onClose}></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 shadow-lg rounded-lg z-50 w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

        <input
          type="text"
          value={userInfo.name}
          onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
          placeholder="First Name"
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          value={userInfo.lastName}
          onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })}
          placeholder="Last Name"
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        />
        <input
          type="email"
          value={userInfo.email}
          onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
          placeholder="Email"
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        />

        <div className="flex justify-start space-x-4">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            تایید
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
          >
            انصراف
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileSettingsModal;
