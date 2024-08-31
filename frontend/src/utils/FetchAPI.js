// src/utils/api.js
import axios from 'axios';
import Cookies from 'js-cookie';
// Set up a base URL for the API
const API_BASE_URL = 'http://localhost:5000/api/v1'; 

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Utility function for GET request
export const getRequest = async (url, params = {}) => {
  try {
    const response = await axiosInstance.get(url, { params });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get('accessToken') || localStorage.getItem('accessToken');
  if (token) {
      config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Utility function for POST request
export const postRequest = async (url, data = {}, config={}) => {
  try {
    const response = await axiosInstance.post(url, data,config);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Utility function for PATCH request
export const patchRequest = async (url, data = {}) => {
  try {
    const response = await axiosInstance.patch(url, data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Utility function for DELETE request
export const deleteRequest = async (url, params = {}) => {
  try {
    const response = await axiosInstance.delete(url, { params });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Error handling function
const handleError = (error) => {
    console.log("this is the whole error", error);
  if (error.response) {
    console.error('Server Error:', error);
    throw new Error(error.response.data || 'Server Error');
  } else if (error.request) {
    console.error('Network Error:', error);
    throw new Error('Network Error');
  } else {
    console.error('Error:', error);
    throw new Error(error.message);
  }
};
