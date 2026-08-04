import axios from 'axios';

const API_BASE = '/api';

export const analyzeProject = async (formData) => {
  const response = await axios.post(`${API_BASE}/architect/analyze`, formData);
  return response.data;
};

export const getSavedProjects = async () => {
  const response = await axios.get(`${API_BASE}/architect/projects`);
  return response.data;
};

export const getProjectById = async (id) => {
  const response = await axios.get(`${API_BASE}/architect/projects/${id}`);
  return response.data;
};

export const deleteProject = async (id) => {
  const response = await axios.delete(`${API_BASE}/architect/projects/${id}`);
  return response.data;
};

export const getHealth = async () => {
  const response = await axios.get(`${API_BASE}/health`);
  return response.data;
};
