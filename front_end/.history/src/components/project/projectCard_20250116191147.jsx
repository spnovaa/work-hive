// ProjectCard.jsx
import React from 'react';

function ProjectCard({ project, onClick }) {
    return (
        <div 
            className="bg-white shadow-md hover:shadow-lg transition-transform transform hover:scale-105 rounded-lg p-4 cursor-pointer" 
            onClick={onClick}
        >
            <h3 className="text-lg font-bold text-gray-800">{project.name || 'New Project'}</h3>
            <p className="text-sm text-gray-600">{project.description || 'Click to create a new project'}</p>
        </div>
    );
}

export default ProjectCard;