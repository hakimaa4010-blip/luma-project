import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import AdminLayout from '../components/layout/AdminLayout'

export default function AdminRoute() {
  const { user, isAuthenticated } = useAuthStore()
  
  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (user?.role !== 'admin') return <Navigate to="/" replace />
  
  return <AdminLayout />
}