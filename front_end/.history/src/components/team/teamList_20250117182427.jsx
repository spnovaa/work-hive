// src/components/TeamList.js
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../common/axiosInstance';
import TeamModal from './teamModal.jsx'; // Import TeamModal component

const TeamList = () => {
  const [teams, setTeams] = useState([]);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axiosInstance.get('https://work-hive.liara.run/api/teams');
        setTeams(response.data);
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

  return (
    <div className="container mx-auto p-4">
      <div className="space-y-4">
        {teams.map((team) => (
          <div
            key={team.id}
            className="p-4 border rounded-lg shadow-md bg-white cursor-pointer"
            onClick={() => handleTeamClick(team)}
          >
            <h3 className="text-lg font-bold">{team.name}</h3>
            <p className="text-sm text-gray-500">
              {Array.isArray(team.users) ? team.users.length : 0} Members
            </p>
          </div>
        ))}
      </div>

      {/* Team Modal */}
      {showTeamModal && selectedTeam && (
        <TeamModal
          team={selectedTeam}
          onClose={() => setShowTeamModal(false)}
        />
      )}
    </div>
  );
};

export default TeamList;
