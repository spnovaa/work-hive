import React, { useState, useEffect } from 'react';
import axiosInstance from './axiosInstance'; // Importing axiosInstance

const TeamList = () => {
  const [teams, setTeams] = useState([]);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [userIdToAdd, setUserIdToAdd] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);

  // Fetch teams on load
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axiosInstance.get('/api/teams');
        setTeams(response.data);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };
    
    fetchTeams();
  }, []);

  // Fetch members of a team
  const fetchTeamMembers = async (teamId) => {
    try {
      const response = await axiosInstance.get(`/api/teams/users/${teamId}`);
      setTeamMembers(response.data);
    } catch (error) {
      console.error("Error fetching team members:", error);
    }
  };

  // Handle opening the team modal
  const handleTeamClick = (team) => {
    setSelectedTeam(team);
    fetchTeamMembers(team.id); // Fetch team members when a team is clicked
    setShowTeamModal(true);
  };

  // Handle adding a new user to the team
  const addUserToTeam = async () => {
    try {
      const response = await axiosInstance.post('/api/teams/users', {
        userId: userIdToAdd,
        teamId: selectedTeam.id,
      });

      setTeamMembers((prevMembers) => [...prevMembers, response.data]); // Add user to the team members list
      setUserIdToAdd(''); // Clear input field
      setShowAddUserModal(false); // Close the add user modal
    } catch (error) {
      console.error("Error adding user to team:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Team List */}
      <div className="space-y-4">
        {teams.map((team) => (
          <div key={team.id} className="p-4 border rounded-lg shadow-md bg-white">
            <h3 className="text-lg font-bold" onClick={() => handleTeamClick(team)}>
              {team.name}
            </h3>
            <p className="text-sm text-gray-500">{Array.isArray(team.users) ? team.users.length : 0} Members</p>
          </div>
        ))}
      </div>

      {/* Team Members Modal */}
      {showTeamModal && selectedTeam && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-4">Members of {selectedTeam.name}</h3>
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
              onClick={() => setShowTeamModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddUserModal && (
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
                onClick={() => setShowAddUserModal(false)}
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
      )}
    </div>
  );
};

export default TeamList;
