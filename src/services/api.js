import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper to check if we are using a temporary mock user
const isMockMode = () => {
  const token = localStorage.getItem('token');
  return token && token.startsWith('mock-token-');
};

// Request interceptor to add the auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth Services
export const login = async (username, password) => {
  const response = await apiClient.post('/auth/login', { username, password });
  return response.data;
};

// Appraisal Services
export const submitDeclaration = async (data) => {
  if (isMockMode()) {
    console.log("Simulating Declaration Submission (Mock Mode)", data);
    return new Promise(resolve => setTimeout(() => resolve({ status: "success", message: "Mock submission successful" }), 800));
  }
  const response = await apiClient.post('/declaration', data);
  return response.data;
};

export const submitEnclosures = async (formData) => {
  if (isMockMode()) {
    console.log("Simulating Enclosure Submission (Mock Mode)");
    return new Promise(resolve => setTimeout(() => resolve({ status: "success" }), 800));
  }
  const response = await apiClient.post('/enclosures', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getAppraisalSummary = async (facultyId) => {
  if (isMockMode()) return { scores: {} };
  const response = await apiClient.get(`/appraisal-summary/${facultyId}`);
  return response.data;
};

export const getSubordinates = async () => {
  if (isMockMode()) return [];
  const response = await apiClient.get('/dashboard/subordinates');
  return response.data;
};

// Backward Compatibility Aliases
export const getStaffForDean = getSubordinates;
export const getStaffForVC = getSubordinates;
export const getStaffForDirector = getSubordinates;
export const getFacultyForHOD = getSubordinates;

export const submitHodReview = async (facultyId, data) => {
  if (isMockMode()) {
    console.log("Simulating HOD Review Submission (Mock Mode)", facultyId, data);
    return new Promise(resolve => setTimeout(() => resolve({ status: "success" }), 800));
  }
  const response = await apiClient.put(`/appraisal-remarks/hod/${facultyId}`, data);
  return response.data;
};

export const submitDirectorReview = async (facultyId, data) => {
  if (isMockMode()) {
    console.log("Simulating Director Review Submission (Mock Mode)", facultyId, data);
    return new Promise(resolve => setTimeout(() => resolve({ status: "success" }), 800));
  }
  const response = await apiClient.put(`/appraisal-remarks/director/${facultyId}`, data);
  return response.data;
};

export default apiClient;
