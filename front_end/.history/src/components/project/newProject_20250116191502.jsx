import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NewProject() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, description })
            });
            if (!response.ok) {
                throw new Error('Failed to create project');
            }
            navigate('/projects');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 space-y-4">
            <h1 className="text-2xl font-bold text-gray-800">Create New Project</h1>
            <input 
                type="text" 
                placeholder="Project Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required
                className="w-full p-2 border rounded-lg"
            />
            <textarea 
                placeholder="Project Description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                required
                className="w-full p-2 border rounded-lg min-h-[100px]"
            ></textarea>
            <button 
                type="submit" 
                disabled={loading} 
                className={`w-full p-2 bg-blue-500 text-white rounded-lg ${loading ? 'opacity-50' : 'hover:bg-blue-600'}`}
            >
                {loading ? 'Creating...' : 'Create Project'}
            </button>
            {error && <div className="text-red-500 mt-2">{error}</div>}
        </form>
    );
}

export default NewProject;
