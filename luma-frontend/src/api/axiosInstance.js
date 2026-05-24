import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: { 'Content-Type': 'application/json' }
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  res => res,
  async err => {
    if (
      err.response?.status === 401 &&
      !err.config._retry &&
      !err.config.url?.includes('/auth/refresh') &&
      !err.config.url?.includes('/auth/login')
    ) {
      err.config._retry = true
      try {
        const { data } = await api.post('/auth/refresh')
        localStorage.setItem('token', data.access_token)
        err.config.headers.Authorization = `Bearer ${data.access_token}`
        return api(err.config)
      } catch {
        localStorage.clear()
        window.location.href = '/login'
      }
    }
    return Promise.reject(err)
  }
)

export default api