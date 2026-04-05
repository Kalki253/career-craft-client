// src/api.js
// Centralized Axios instance.
// In production (deployed on Vercel), REACT_APP_API_URL points to your Render backend.
// In local dev, the proxy in package.json handles /api/* requests to localhost:5001.
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '',
});

export default api;
