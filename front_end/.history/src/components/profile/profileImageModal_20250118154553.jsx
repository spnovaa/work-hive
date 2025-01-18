import React, { useState } from 'react';
import axiosInstance from '../../common/axiosInstance.js';

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

      const url = `https://work-hive.liara.run/api/users/${userId}/profile-image`;
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
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
        <h3 className="text-lg font-semibold mb-4">Select Profile Image</h3>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {['../../assets/image1.jpg', '../../assets/image2.jpg', '../../assets/image3.jpg','../../assets/image4.jpg','../../assets/image5.jpg'].map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Profile ${index}`}
              className={`cursor-pointer rounded-lg border ${
                selectedImage === image ? 'border-blue-500' : 'border-transparent'
              }`}
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div>
        <div className="flex justify-between">
          <button
            onClick={() => handleImageUpload('post')}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Upload
          </button>
          <button
            onClick={() => handleImageUpload('put')}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Update
          </button>
          <button
            onClick={() => handleImageUpload('delete')}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileImageModal;
