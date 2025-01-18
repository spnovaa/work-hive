// src/components/AddUserModal.js
import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';

const AddUserModal = ({ teamId, onClose, onUserAdded }) => {
  const [userIdToAdd, setUserIdToAdd] = useState('');

  // Handle adding user to the team
  const addUserToTeam = async () => {
    try {
      const response = await axiosInstance.post('/api/teams/users', {
        userId: userIdToAdd,
        teamId,
      });

      onUserAdded(response.data); // Pass newly added user to parent
      setUserIdToAdd(''); // Clear input field
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error adding user to team:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-xl font-semibold mb-4">Add New User</h3>
        <input
          type="number"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Enter User ID"
          value={userIdToAdd}
          onChange={(e) => setUserIdToAdd(e.target.value)}
        />
        <div className="flex justify-between">
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded-lg"
            onClick={addUserToTeam}
            disabled={!userIdToAdd}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
