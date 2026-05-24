import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import api from '../api/axiosInstance'

export const useAuthStore = create(persist(
  (set) => ({
    user: null,
    token: null,
    isAuthenticated: false,

    login: async (credentials) => {
      const { data } = await api.post('/auth/login', credentials)
      localStorage.setItem('token', data.access_token)
      set({ user: data.user, token: data.access_token, isAuthenticated: true })
      return data.user
    },

    register: async (userData) => {
      const { data } = await api.post('/auth/register', userData)
      localStorage.setItem('token', data.access_token)
      set({ user: data.user, token: data.access_token, isAuthenticated: true })
      return data.user
    },

    logout: async () => {
      await api.post('/auth/logout').catch(() => {})
      localStorage.removeItem('token')
      set({ user: null, token: null, isAuthenticated: false })
    },
  }),
  { name: 'luma-auth', partialize: (s) => ({ user: s.user, token: s.token, isAuthenticated: s.isAuthenticated }) }
))