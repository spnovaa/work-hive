import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';

const UserSpinner = ({ onSelect }) => {
  const [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    if (!isOpen) {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get('https://work-hive.liara.run/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        className="px-4 py-2 bg-gray-300 rounded-md shadow-md"
        onClick={fetchUsers}
      >
        {isLoading ? "Loading..." : "Select User"}
      </button>
      {isOpen && (
        <div className="absolute mt-2 max-h-48 w-60 overflow-y-auto bg-white border border-gray-300 rounded shadow-md z-10">
          {users.length === 0 ? (
            <p className="p-2 text-sm text-gray-500">No users found</p>
          ) : (
            users.map((user) => (
              <div
                key={user.id}
                className="p-2 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  onSelect(user);
                  setIsOpen(false);
                }}
              >
                <div className="flex items-center">
                  <img
                    src={user.profileImage}
                    alt={`${user.name} ${user.lastName}`}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span>{user.name} {user.lastName}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default UserSpinner;
