// src/config.js
const API_BASE_URL = process.env.REACT_APP_API_URL || (
  process.env.NODE_ENV === 'production' 
    ? window.location.origin // Use same origin (Vercel domain) on production
    : 'http://localhost:3001'  // Use localhost during development
);

export default API_BASE_URL;
