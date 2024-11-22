import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

// Create axios instance with default config
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // Note: In production, you'd want to handle token management more securely
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzNhZDY1YmQ0ZmIyMTczYjEwNTUyZGMiLCJpYXQiOjE3MzE5OTUwOTYsImV4cCI6MTczMjA4MTQ5Nn0.DHNP9dDWOFElJvtH1-uu37oA8ux_6u4iWKI7IocCiN8'
  }
}); 