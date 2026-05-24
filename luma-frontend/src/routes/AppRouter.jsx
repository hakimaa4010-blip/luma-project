import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import AdminRoute from './AdminRoute'

import Home from '../pages/public/Home'
import Login from '../pages/public/Login'
import Register from '../pages/public/Register'
import Catalog from '../pages/public/Catalog'
import ProductDetail from '../pages/public/ProductDetail'
import Evenements from '../pages/public/Evenements'
import Contact from '../pages/public/Contact'
import About from '../pages/public/About'

import Cart from '../pages/client/Cart'
import Orders from '../pages/client/Orders'
import PlaceOrder from '../pages/client/PlaceOrder'
import Profile from '../pages/client/Profile'
import ClientDashboard from '../pages/client/Dashboard'
import ClientLayout from '../components/layout/ClientLayout'

import Dashboard from '../pages/admin/Dashboard'
import AdminProducts from '../pages/admin/Products'
import AdminOrders from '../pages/admin/Orders'
import AdminCustomers from '../pages/admin/Customers'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/"                element={<Home />} />
        <Route path="/login"           element={<Login />} />
        <Route path="/register"        element={<Register />} />
        <Route path="/catalog"         element={<Catalog />} />
        <Route path="/products/:slug"  element={<ProductDetail />} />
        <Route path="/evenements"      element={<Evenements />} />
        <Route path="/contact"         element={<Contact />} />
        <Route path="/a-propos"        element={<About />} />

        {/* Client */}
        <Route element={<PrivateRoute />}>
          <Route path="/cart"    element={<Cart />} />
          <Route element={<ClientLayout />}>
            <Route path="/dashboard" element={<ClientDashboard />} />
            <Route path="/orders"  element={<Orders />} />
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>

        {/* Admin */}
        <Route element={<AdminRoute />}>
          <Route path="/admin"          element={<Dashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/orders"   element={<AdminOrders />} />
          <Route path="/admin/customers" element={<AdminCustomers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}