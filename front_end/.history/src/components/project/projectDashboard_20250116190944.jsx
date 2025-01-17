// ProjectsDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectCard from './ProjectCard';

function ProjectsDashboard() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchProjects() {
            try {
                const response = await fetch('/api/projects');
                if (!response.ok) {
                    throw new Error('Failed to fetch projects');
                }
                const data = await response.json();
                setProjects(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchProjects();
    }, []);

    if (loading) return <div className="text-center text-gray-700">Loading...</div>;
    if (error) return <div className="text-center text-red-500">Error: {error}</div>;

    return (
        <div className="flex space-x-4 overflow-x-auto p-4">
            {projects.map((project) => (
                <ProjectCard 
                    key={project.id} 
                    project={project} 
                    onClick={() => navigate(`/projects/${project.id}`)}
                />
            ))}
            <ProjectCard 
                project={{ name: '', description: '' }} 
                onClick={() => navigate('/projects/new')} 
            />
        </div>
    );
}

export default ProjectsDashboard;
