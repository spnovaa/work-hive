import React, { useState, useEffect } from "react";
import axiosInstance from "../../common/axiosInstance"; 

function ProjectScreen({ projectId, refreshProjects }) {
  const [project, setProject] = useState(null);
  const [updateForm, setUpdateForm] = useState({ name: "", teamId: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    async function fetchProjectDetails() {
      try {
        const response = await axiosInstance.get(
          `https://work-hive.liara.run/api/projects/${projectId}`
        );
        setProject(response.data);
        setUpdateForm({
          name: response.data.name,
          teamId: response.data.team.id,
        });
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProjectDetails();
  }, [projectId]);

  const handleDelete = async () => {
    try {
      const response = await axiosInstance.delete(`/api/projects/${projectId}`);
      if (response.status === 200) {
        alert(response.data.message);
        refreshProjects(); // Refresh the project list or navigate away
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Failed to delete project.");
    }
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      const response = await axiosInstance.put(
        `/api/projects/${projectId}`,
        updateForm
      );
      if (response.status === 204) {
        alert("Project updated successfully.");
        refreshProjects(); // Refresh the project list to reflect changes
      }
    } catch (error) {
      console.error("Error updating project:", error);
      alert("Failed to update project.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateForm((prev) => ({ ...prev, [name]: value }));
  };

  if (loading)
    return <div className="text-center text-gray-700">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-6">
      {/* Project Card */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
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

        <div className="p-6">
          {/* Project Info */}
          <h2 className="text-2xl font-bold mb-4">{project.name}</h2>

          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <h3 className="text-lg font-semibold mb-2">Team: {project.team.name}</h3>
            <p className="text-sm text-gray-600 mb-2">Team ID: {project.team.id}</p>
          </div>

          {/* Update Form */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Update Project</h3>
            <input
              type="text"
              name="name"
              value={updateForm.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mb-2"
              placeholder="Project Name"
            />
            <input
              type="number"
              name="teamId"
              value={updateForm.teamId}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mb-2"
              placeholder="Team ID"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-between">
            <button
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              onClick={handleDelete}
            >
              Delete Project
            </button>
            <button
              className={`px-4 py-2 ${
                isUpdating ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
              } text-white rounded-lg`}
              onClick={handleUpdate}
              disabled={isUpdating}
            >
              {isUpdating ? "Updating..." : "Update Project"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectScreen;
