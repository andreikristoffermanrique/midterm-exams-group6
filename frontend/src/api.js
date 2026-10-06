export const API_BASE = 'http://localhost:5000/api';

export async function apiRequest(endpoint, { method = 'GET', body = null } = {}) {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const options = { method, headers };
  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, options);
    const result = await res.json();
    if (!res.ok || result.success === false) {
      throw new Error(result.message || 'API request failed');
    }
    return result;
  } catch (err) {
    throw err;
  }
}