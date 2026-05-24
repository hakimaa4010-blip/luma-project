import { Link, useLocation, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import Navbar from './Navbar';
import { 
  User, 
  ShoppingBag, 
  ShoppingCart,
  Heart, 
  LogOut,
  Home,
  LayoutDashboard,
  PackagePlus
} from 'lucide-react';

export default function ClientLayout() {
  const { logout, user } = useAuthStore();
  const location = useLocation();

  const navItems = [
    { name: 'Tableau de Bord', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Passer Commande', path: '/place-order', icon: PackagePlus },
    { name: 'Mes Commandes', path: '/orders', icon: ShoppingBag },
    { name: 'Mon Profil', path: '/profile', icon: User },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-[100px] flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-[#C8956C] text-white flex items-center justify-center font-bold text-xl">
                {user?.name?.charAt(0) || <User size={24} />}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{user?.name || 'Customer'}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center px-4 py-3 rounded-xl transition-all duration-300 group
                      ${isActive 
                        ? 'bg-gray-50 text-[#C8956C] font-medium' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }
                    `}
                  >
                    <Icon size={18} className={`mr-3 ${isActive ? 'text-[#C8956C]' : 'text-gray-400 group-hover:text-gray-600'}`} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
              >
                <LogOut size={18} className="mr-3" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 min-h-[500px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
