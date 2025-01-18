import React, { useState } from 'react';
import axiosInstance from '../../common/axiosInstance.js'; // Adjust the path as needed

const ProfileImageModal = ({ userId, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = async (method) => {
    if (!selectedImage && method !== 'delete') {
      alert('Please select an image!');
      return;
    }

    try {
      const formData = new FormData();
      if (method !== 'delete') {
        formData.append('profile_image', selectedImage);
      }

      const url = `/api/users/${userId}/profile-image`;
      const response = await axiosInstance({
        method,
        url,
        data: method !== 'delete' ? formData : null,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 200 || response.status === 204) {
        alert('Profile image updated successfully!');
        onClose();
      }
    } catch (error) {
      console.error('Error uploading profile image:', error.response?.data || error.message);
      alert('Failed to update profile image.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center just
