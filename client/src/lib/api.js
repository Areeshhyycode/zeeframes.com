// Base URL for the backend API.
//
// - In local dev, VITE_API_URL is unset, so this is "" and requests go to
//   "/api/..." which Vite's dev proxy forwards to http://localhost:5000.
// - In production (e.g. on Vercel), set VITE_API_URL to your deployed backend
//   origin, e.g. https://zeeframes-api.onrender.com — requests then go there.
export const API_BASE = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

// Build a full API URL from a path like "/api/chat".
export function apiUrl(path) {
  return `${API_BASE}${path}`;
}
