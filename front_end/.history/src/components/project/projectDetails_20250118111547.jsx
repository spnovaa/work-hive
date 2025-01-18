import React, { useState, useEffect } from 'react';
import axiosInstance from '../../common/axiosInstance'
import { useParams } from 'react-router-dom';

function ProjectDetails() {
    const { projectId } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchProjectDetails() {
            try {
                const response = await axiosInstance.get(`https://work-hive.liara.run/api/projects/${projectId}`);
                setProject(response.data);
            } catch (error) {
                setError(error.response?.data?.message || error.message); 
            } finally {
                setLoading(false);
            }
        }

        fetchProjectDetails();
    }, [projectId]);

    if (loading) return <div className="text-center text-gray-700">Loading...</div>;
    if (error) return <div className="text-center text-red-500">Error: {error}</div>;

    return (
        <div className="container mx-auto p-6">
          {/* Project Card */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Project Image */}
            <div className="h-64 bg-gray-200 flex justify-center items-center">
              {project.img ? (
                <img
                  src={project.project.img}
                  alt={project.project.name}
                  className="object-cover h-full w-full"
                />
              ) : (
                <p className="text-gray-500 italic">No image available</p>
              )}
            </div>
    
            {/* Project Details */}
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">{project.project.name}</h2>
    
              {/* Team Information */}
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h3 className="text-lg font-semibold mb-2">Team: {project.project.team.name}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Team ID: <span className="font-semibold">{project.project.team.id}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Members:{" "}
                  {project.project.team.users.length > 0 ? (
                    project.project.team.users.map((user) => (
                      <span key={user.id} className="inline-block mr-2">
                        {user.name}
                      </span>
                    ))
                  ) : (
                    <span className="italic text-gray-500">No members</span>
                  )}
                </p>
              </div>
    
              <div className="flex justify-between">
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
               //   onClick={onDelete}
                >
                  Delete Project
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
               //   onClick={onUpdate}
                >
                  Update Project
                </button>
              </div>
            </div>
          </div>
        </div>
      );
}

export default ProjectDetails;
