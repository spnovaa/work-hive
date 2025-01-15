import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Login failed';
  }
};
 