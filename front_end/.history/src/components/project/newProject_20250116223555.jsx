import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {BASE_URL} from '../../config.js'
function NewProject() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [teamId, setTeamId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null); 

        try {
            console.log(`${BASE_URL}/projects`)
            const response = await axios.post(`${BASE_URL}/projects`, { name, teamId });
            if (response.status === 201) {
                navigate('/projects');
            }
        } catch (error) {
            if (error.response && error.response.data.error) {
                setError(Object.values(error.response.data.error).flat().join(', '));
            } else {
                setError(error.message || 'An unexpected error occurred');
            }
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
            <input
                type="number"
                placeholder="Team ID"
                value={teamId}
                onChange={(e) => setTeamId(e.target.value)}
                required
                className="w-full p-2 border rounded-lg"
            />
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
