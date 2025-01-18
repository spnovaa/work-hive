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
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold text-gray-800">{project.project.name}</h1>
            <p className="text-gray-600 mt-2">{project.project.description}</p>
        </div>
    );
}

export default ProjectDetails;
