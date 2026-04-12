import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/api/auth/login', credentials),
  register: (userData) => {
    console.log('🔍 Sending registration request:', userData);
    
    // Prepare the request data
    const requestData = {
      name: userData.name,
      email: userData.email,
      password: userData.password
    };
    
    // If there's a profile picture, use FormData
    if (userData.avatar && userData.avatar instanceof File) {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('email', userData.email);
      formData.append('password', userData.password);
      formData.append('profileImage', userData.avatar);
      
      return api.post('/api/auth/signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } else {
      // Regular JSON request
      return api.post('/api/auth/signup', requestData);
    }
  },
  getProfile: () => api.get('/api/auth/profile'),
  updateProfile: (profileData) => {
    // Check if profileData is FormData (for file uploads)
    if (profileData instanceof FormData) {
      return api.put('/api/auth/profile', profileData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } else {
      // Regular JSON request
      return api.put('/api/auth/profile', profileData);
    }
  },
  changePassword: (passwordData) => api.put('/api/auth/change-password', passwordData),
};

// Session API
export const sessionAPI = {
  createSession: (sessionData) => api.post('/api/session/create', sessionData),
  getSessions: () => api.get('/api/session'),
  getSession: (sessionId) => api.get(`/api/session/${sessionId}`),
  updateSession: (sessionId, data) => api.put(`/api/session/${sessionId}`, data),
  deleteSession: (sessionId) => api.delete(`/api/session/${sessionId}`),
};

// Question API
export const questionAPI = {
  addQuestion: (questionData) => api.post('/api/question/addque', questionData),
  getQuestions: (sessionId) => api.get(`/api/question/${sessionId}`),
  updateQuestion: (questionId, data) => api.put(`/api/question/${questionId}`, data),
  deleteQuestion: (questionId) => api.delete(`/api/question/${questionId}`),
};

// AI Interview API
export const interviewAPI = {
  generateQuestions: (interviewData) => api.post('/api/ai/generate-interview-questions', interviewData),
  startInterview: (interviewData) => api.post('/api/interviews/start', interviewData),
  submitAnswer: (answerData) => api.post('/api/question/addque', answerData),
  getInterviewResults: (interviewId) => api.get(`/api/interviews/${interviewId}/results`),
  getActiveInterviews: () => api.get('/api/session/active'),
  getInterviewDetails: (interviewId) => api.get(`/api/interviews/${interviewId}`),
};

// Contact API
export const contactAPI = {
  submitContact: (contactData) => {
    console.log('🔍 Contact API - Submitting with data:', contactData);
    console.log('🔍 Contact API - Base URL:', api.defaults.baseURL);
    return api.post('/api/contact/submit', contactData);
  },
  getAllContacts: (params) => api.get('/api/contact/admin/all', { params }),
  getContactById: (id) => api.get(`/api/contact/admin/${id}`),
  updateContactStatus: (id, statusData) => api.put(`/api/contact/admin/${id}/status`, statusData),
  deleteContact: (id) => api.delete(`/api/contact/admin/${id}`),
  getContactStats: () => api.get('/api/contact/admin/stats'),
};

// Feedback API
export const feedbackAPI = {
  submitFeedback: (feedbackData) => {
    console.log('🔍 Feedback API - Submitting with data:', feedbackData);
    console.log('🔍 Feedback API - Base URL:', api.defaults.baseURL);
    return api.post('/api/feedback/submit', feedbackData);
  },
  getAllFeedback: (params) => api.get('/api/feedback/admin/all', { params }),
  getFeedbackById: (id) => api.get(`/api/feedback/admin/${id}`),
  updateFeedbackStatus: (id, statusData) => api.put(`/api/feedback/admin/${id}/status`, statusData),
  deleteFeedback: (id) => api.delete(`/api/feedback/admin/${id}`),
  getFeedbackStats: () => api.get('/api/feedback/admin/stats'),
};

export default api; 