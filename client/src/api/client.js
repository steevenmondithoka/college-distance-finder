import axios from "axios";

// Access the environment variable set on Vercel
// Note: Vite uses import.meta.env for environment variables.
// The variable name must be VITE_APP_API_URL (with the VITE_ prefix).
const BASE_URL = import.meta.env.VITE_APP_API_URL;

const client = axios.create({
  // Use the deployed URL. The /api is already included in your routes.
  // If your VITE_APP_API_URL is "https://college-distance-finder.onrender.com", 
  // you must append the rest of the path, which is usually "/api".
  baseURL: `${BASE_URL}/api`, 
});

export default client;