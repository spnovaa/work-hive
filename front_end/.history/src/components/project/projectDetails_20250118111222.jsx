import React from 'react';

function ProjectScreen({ project, onDelete, onUpdate }) {
  return (
    <div className="container mx-auto p-6">
      {/* Project Card */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Project Image */}
        <div className="h-64 bg-gray-200 flex justify-center items-center">
          {project.img ? (
            <img
              src={project.img}
              alt={project.name}
              className="object-cover h-full w-full"
            />
          ) : (
            <p className="text-gray-500 italic">No image available</p>
          )}
        </div>

        {/* Project Details */}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">{project.name}</h2>

          {/* Team Information */}
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <h3 className="text-lg font-semibold mb-2">Team: {project.team.name}</h3>
            <p className="text-sm text-gray-600 mb-2">
              Team ID: <span className="font-semibold">{project.team.id}</span>
            </p>
            <p className="text-sm text-gray-600">
              Members:{" "}
              {project.team.users.length > 0 ? (
                project.team.users.map((user) => (
                  <span key={user.id} className="inline-block mr-2">
                    {user.name}
                  </span>
                ))
              ) : (
                <span className="italic text-gray-500">No members</span>
              )}
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-between">
            <button
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              onClick={onDelete}
            >
              Delete Project
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={onUpdate}
            >
              Update Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectScreen;
