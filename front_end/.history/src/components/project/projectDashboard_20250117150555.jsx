import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectCard from './projectCardComponent.jsx'
import Spinner from '../loadingSpinner.jsx'
import axiosInstance from '../../common/axiosInstance.js'


const BASE_URL = process.env.REACT_APP_API_URL
function ProjectsDashboard() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchProjects() {
            try {
                const response = await axiosInstance.get('https://work-hive.liara.run/api/projects');
                if (response.status !== 200) {
                    throw new Error(`Failed to fetch projects: ${response.status} ${response.statusText}`);
                }
                
                setProjects(response.data.projects);
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
        <div className="flex overflow-x-auto p-4" style={{ marginRight: '16rem', direction: 'rtl' }}>
             {loading && (
            <div className="absolute inset-0 bg-opacity-50 bg-gray-100 flex items-center justify-center z-50">
                <Spinner />
            </div>
        )}
            <div className="flex space-x-4 flex-row-reverse">
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
        </div>
    );

}

export default ProjectsDashboard;
