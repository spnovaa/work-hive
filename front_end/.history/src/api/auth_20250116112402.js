import axios from 'axios';

const BASE_URL = 'https://work-hive.liara.run/api/v1'; 

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, credentials, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Login failed';
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Registration failed';
  }
};