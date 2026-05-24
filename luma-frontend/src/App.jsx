// src/routes/AppRouter.jsx (wla fin 3ndk had l-ficher)
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Evenements from '../pages/Evenements' // 1. Importi la page dyalna hna!

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* 2. ZID HAD L-KHET HNA F L-LINE 22 (Fin 3ndk l-mochkila) */}
      <Route path="/evenements" element={<Evenements />} />
      
      <Route path="*" element={<div>Page non trouvée.</div>} />
    </Routes>
  )
}