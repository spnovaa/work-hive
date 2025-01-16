import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectCard from './projectCardComponent.jsx'
import Spinner from '../components/loadingSpinner.jsx'
const BASE_URL = process.env.REACT_APP_API_URL
function ProjectsDashboard() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    function Spinner() {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
            </div>
        );
    }
    useEffect(() => {
        async function fetchProjects() {
            try {
                const response = await fetch('https://work-hive.liara.run/projects');
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

    if (loading) return <Spinner />;
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
