import React, { useState, useEffect } from 'react';
import axiosInstance from '../../common/axiosInstance';
import TeamModal from './teamModal.jsx';
const TeamList = () => {
    const [teams, setTeams] = useState([]);
    const [showTeamModal, setShowTeamModal] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);
    const [newTeamName, setNewTeamName] = useState('');
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axiosInstance.get('https://work-hive.liara.run/api/user/teams');
        setTeams(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };
    fetchTeams();
  }, []);
  const handleTeamClick = (team) => {
    setSelectedTeam(team);
    setShowTeamModal(true);
  };
  const openCreateTeamModal = () => {
    setShowCreateTeamModal(true);
  };
  const createTeam = async () => {
    try {
      const response = await axiosInstance.post('https://work-hive.liara.run/api/teams', { name: newTeamName });
      
      setTeams((prevTeams) => [...prevTeams, response.data]);
      console.log(teams);
      console.log(response.data);
      setNewTeamName('');
      setShowCreateTeamModal(false);
    } catch (error) {
      console.error("Error creating team:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="space-y-4">
      {teams.map((team) => (
  <div
    key={team.id}
    className="p-4 border rounded-lg shadow-md bg-white cursor-pointer space-y-2"
    onClick={() => handleTeamClick(team)}
  >
    <p className="text-xl font-bold">{team.team.name}</p>

    <p className="text-sm text-gray-500">
      {Array.isArray(team.users) ? team.team.users.length : 0} Members
    </p>
  </div>
))}


      </div>
      <button
        className="mt-8 px-6 py-3 bg-green-600 text-white rounded-lg"
        onClick={openCreateTeamModal}
      >
        Create New Team
      </button>
      {showTeamModal && selectedTeam && (
        <TeamModal
          team={selectedTeam}    
          onClose={() => setShowTeamModal(false)}
        />
      )}
      {showCreateTeamModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-4">Create New Team</h3>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Enter team name"
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
            />
            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
                onClick={() => setShowCreateTeamModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
                onClick={createTeam}
                disabled={!newTeamName}
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
