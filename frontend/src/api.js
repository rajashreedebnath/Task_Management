import axios from 'axios';

const authBaseURL = process.env.REACT_APP_AUTH_URL || 'http://localhost:5000';
const taskBaseURL = process.env.REACT_APP_TASK_URL || 'http://localhost:8000';

export const apiAuth = axios.create({
  baseURL: `${authBaseURL}/api/auth`,
  headers: { 'Content-Type': 'application/json' },
});

export const apiTasks = axios.create({
  baseURL: `${taskBaseURL}/api`,
  headers: { 'Content-Type': 'application/json' },
});

apiTasks.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
