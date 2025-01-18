import React, { useState, useEffect } from 'react';
import axiosInstance from '../../common/axiosInstance';
import AddUserModal from './addUserModal.jsx';

const TeamModal = ({ team, onClose }) => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        console.log(`https://work-hive.liara.run/api/teams/users/${team.id}`);
        const response = await axiosInstance.get(`https://work-hive.liara.run/api/teams/users/${team.id}`);
        setTeamMembers(response.data);
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };
    
    fetchTeamMembers();
  }, [team.id]);

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-xl font-semibold mb-4">Members of {team.name}</h3>
        <ul className="space-y-2">
          {teamMembers.map((user) => (
            <li key={user.id} className="flex justify-between items-center">
              <span>{user.name}</span>
            </li>
          ))}
        </ul>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
          onClick={() => setShowAddUserModal(true)}
        >
          Add New User
        </button>
        <button
          className="mt-4 ml-2 px-4 py-2 bg-red-600 text-white rounded-lg"
          onClick={onClose}
        >
          Close
        </button>
        {showAddUserModal && (
          <AddUserModal
            teamId={team.id}
            onClose={() => setShowAddUserModal(false)}
            onUserAdded={(newUser) => setTeamMembers([...teamMembers, newUser])}
          />
        )}
      </div>
    </div>
  );
};

export default TeamModal;
