// src/components/AddUserModal.js
import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';
import UserSpinner from './UserSpinner'; // Import the UserSpinner component

const AddUserModal = ({ teamId, onClose, onUserAdded }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  // Handle adding user to the team
  const addUserToTeam = async () => {
    try {
      const response = await axiosInstance.post('/api/teams/users', {
        userId: selectedUser.id,
        teamId,
      });

      onUserAdded(response.data); // Pass newly added user to parent
      setSelectedUser(null); // Clear selection
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error adding user to team:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-xl font-semibold mb-4">Add New User</h3>

        <UserSpinner onSelect={(user) => setSelectedUser(user)} />

        {selectedUser && (
          <div className="mt-4 p-2 border rounded bg-gray-100">
            <p className="text-sm">Selected User:</p>
            <p className="font-semibold">{selectedUser.name} {selectedUser.lastName}</p>
          </div>
        )}

        <div className="flex justify-between mt-4">
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded-lg"
            onClick={addUserToTeam}
            disabled={!selectedUser}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
