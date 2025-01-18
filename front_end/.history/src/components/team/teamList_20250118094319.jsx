import React, { useState, useEffect } from 'react';
import axiosInstance from '../../common/axiosInstance';
import TeamModal from './teamModal.jsx';
const TeamList = () => {
  const [teams, setTeams] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [teamName, setTeamName] = useState('');
  
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
  
  // Create team function
  const createTeam = async () => {
    try {
      const response = await axiosInstance.post('/api/teams', { name: teamName });
      setTeams([...teams, response.data]); // Add newly created team to the list
      setShowModal(false); // Close modal
      setTeamName(''); // Clear input field
    } catch (error) {
      console.error("Error creating team:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Team List */}
      <div className="space-y-4">
        {teams.map((team) => (
          <div key={team.id} className="p-4 border rounded-lg shadow-md bg-white">
            <h3 className="text-lg font-bold">{team.name}</h3>
          </div>
        ))}
      </div>
      
      {/* Create Team Button */}
      <button 
        className="mt-8 px-6 py-3 bg-green-600 text-white rounded-lg"
        onClick={() => setShowModal(true)}
      >
        Create New Team
      </button>

      {/* Modal for Creating Team */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-4">Create New Team</h3>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Enter team name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
                onClick={() => setShowModal(false)}
              >
                Discard
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
                onClick={createTeam}
                disabled={!teamName}
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
