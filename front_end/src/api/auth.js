import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Login failed';
  }
};
 
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Registration failed';
  }
};