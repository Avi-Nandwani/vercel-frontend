import axios from 'axios'

// Base API URL - Change this according to your backend URL
const API_URL = 'https://vercel-backend-ruby.vercel.app/'//'http://localhost:5000/api'

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// API error handler
const handleApiError = (error) => {
  const message = 
    error.response?.data?.message || 
    error.message || 
    'Something went wrong'
  
  return Promise.reject(message)
}

// User API services
export const userService = {
  // Get users with pagination and search
  getUsers: async (page = 1, limit = 10, search = '') => {
    try {
      const response = await api.get(`/users?page=${page}&limit=${limit}${search ? `&search=${search}` : ''}`)
      return response.data
    } catch (error) {
      return handleApiError(error)
    }
  },

  // Get user by ID
  getUserById: async (id) => {
    try {
      const response = await api.get(`/users/${id}`)
      return response.data
    } catch (error) {
      return handleApiError(error)
    }
  },

  // Create new user
  createUser: async (userData) => {
    try {
      const response = await api.post('/users', userData)
      return response.data
    } catch (error) {
      return handleApiError(error)
    }
  },

  // Update user
  updateUser: async (id, userData) => {
    try {
      const response = await api.put(`/users/${id}`, userData)
      return response.data
    } catch (error) {
      return handleApiError(error)
    }
  },

  // Delete user
  deleteUser: async (id) => {
    try {
      const response = await api.delete(`/users/${id}`)
      return response.data
    } catch (error) {
      return handleApiError(error)
    }
  },

  // Export users to CSV
  exportUsersCSV: async () => {
    try {
      const response = await api.get('/users/export', {
        responseType: 'blob'
      })
      
      // Create a download link
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'users.csv')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      return true
    } catch (error) {
      return handleApiError(error)
    }
  }
}

export default api