const API_BASE_URL = 'http://localhost:5000/api';

export const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
};

// Auth APIs
export const authAPI = {
  register: (data) => apiCall('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  login: (data) => apiCall('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
};

// Car APIs
export const carsAPI = {
  list: (params) => {
    const query = new URLSearchParams(params).toString();
    return apiCall(`/cars?${query}`);
  },
  get: (id) => apiCall(`/cars/${id}`),
  create: (data) => apiCall('/cars', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiCall(`/cars/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiCall(`/cars/${id}`, { method: 'DELETE' }),
};

// User APIs
export const usersAPI = {
  get: (id) => apiCall(`/users/${id}`),
  update: (id, data) => apiCall(`/users/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  getListings: (id) => apiCall(`/users/${id}/listings`),
};

// Message APIs
export const messagesAPI = {
  list: () => apiCall('/messages'),
  get: (userId) => apiCall(`/messages/${userId}`),
  send: (data) => apiCall('/messages', { method: 'POST', body: JSON.stringify(data) }),
};

// Favorite APIs
export const favoritesAPI = {
  list: () => apiCall('/favorites'),
  add: (carId) => apiCall(`/favorites/${carId}`, { method: 'POST' }),
  remove: (carId) => apiCall(`/favorites/${carId}`, { method: 'DELETE' }),
};

// Test Drive APIs
export const testDrivesAPI = {
  list: () => apiCall('/test-drives'),
  create: (data) => apiCall('/test-drives', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiCall(`/test-drives/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
};

// Offer APIs
export const offersAPI = {
  list: () => apiCall('/offers'),
  create: (data) => apiCall('/offers', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiCall(`/offers/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
};
