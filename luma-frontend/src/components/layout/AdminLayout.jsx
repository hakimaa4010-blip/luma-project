import { Link, useLocation, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Tags,
  LogOut,
  User
} from 'lucide-react';

export default function AdminLayout() {
  const { logout, user } = useAuthStore();
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Customers', path: '/admin/customers', icon: User },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex h-screen bg-[#F8F9FA] font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col justify-between">
        <div>
          <div className="h-20 flex items-center px-8 border-b border-gray-50">
            <h1 className="text-2xl font-bold text-[#1A1A1A] tracking-tighter">
              Luma<span className="text-[#C8956C]">.</span>
            </h1>
          </div>
          
          <nav className="mt-8 px-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-xl transition-all duration-300 group
                    ${isActive 
                      ? 'bg-[#C8956C] text-white shadow-md shadow-[#C8956C]/20' 
                      : 'text-gray-500 hover:bg-gray-50 hover:text-[#1A1A1A]'
                    }
                  `}
                >
                  <Icon size={20} className={`mr-3 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-[#1A1A1A]'}`} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-50">
          <div className="flex items-center px-4 py-3 mb-2 rounded-xl bg-gray-50">
            <div className="w-8 h-8 rounded-full bg-[#C8956C] text-white flex items-center justify-center font-bold">
              {user?.name?.charAt(0) || <User size={16} />}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{user?.name || 'Admin User'}</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
          >
            <LogOut size={20} className="mr-3" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="min-h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
