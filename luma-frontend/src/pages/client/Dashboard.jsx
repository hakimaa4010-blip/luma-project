import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axiosInstance';
import { useAuthStore } from '../../store/authStore';
import { User, ShoppingBag, ShoppingCart, Calendar, Mail, Phone, Clock, ArrowRight, Package } from 'lucide-react';

export default function ClientDashboard() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [profileRes, ordersRes, cartRes] = await Promise.all([
        api.get('/client/profile'),
        api.get('/client/orders'),
        api.get('/client/cart')
      ]);
      setProfile(profileRes.data);
      setOrders(ordersRes.data);
      setCart(cartRes.data);
    } catch (err) {
      console.error("Erreur lors de la récupération des données du tableau de bord client", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'shipped': return 'bg-purple-50 text-purple-700 border-purple-100';
      case 'processing': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'cancelled': return 'bg-red-50 text-red-700 border-red-100';
      default: return 'bg-orange-50 text-orange-700 border-orange-100'; // pending
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'delivered': return 'Livrée';
      case 'shipped': return 'Expédiée';
      case 'processing': return 'Préparation';
      case 'cancelled': return 'Annulée';
      default: return 'En attente';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-10 h-10 border-4 border-[#C8956C] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const subtotal = cart?.items?.reduce((sum, item) => {
    const price = item.product?.sale_price ?? item.product?.price ?? 0;
    return sum + (price * item.quantity);
  }, 0) || 0;

  return (
    <div className="space-y-8" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
      
      {/* Welcome Banner */}
      <div>
        <h1 className="text-2xl font-light uppercase tracking-widest text-[#1A1A1A]">Tableau de Bord Privé</h1>
        <p className="text-xs text-gray-400 mt-1">
          Bienvenue dans votre salon privé, <span className="font-semibold text-stone-700">{profile?.name}</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COLUMN 1: Profile & Cart info */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Card 1: Member Card Info */}
          <div className="bg-[#FAF9F6] border border-[#F3F2EE] rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#C8956C] text-white flex items-center justify-center font-bold text-xl">
                {profile?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-semibold text-stone-900 leading-tight">{profile?.name}</h3>
                <span className="text-[9px] uppercase tracking-widest text-[#C8956C] font-bold">Membre Haute Couture</span>
              </div>
            </div>
            <div className="h-[1px] bg-stone-200/50"></div>
            <div className="space-y-2 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <Mail size={12} className="text-stone-400" />
                <span className="truncate">{profile?.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={12} className="text-stone-400" />
                <span>{profile?.phone || 'Téléphone non renseigné'}</span>
              </div>
            </div>
            <Link 
              to="/profile" 
              className="block text-center bg-white hover:bg-stone-50 border border-stone-250 py-2.5 text-[10px] font-bold uppercase tracking-widest text-stone-750 rounded-lg transition-colors"
            >
              Gérer mon compte
            </Link>
          </div>

          {/* Card 2: Luxury shopping Cart */}
          <div className="bg-white border border-[#F3F2EE] rounded-2xl p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-widest text-stone-450 flex items-center gap-2">
                <ShoppingCart size={14} className="text-[#C8956C]" />
                Mon Panier
              </h3>
              <span className="px-2 py-0.5 bg-[#C8956C]/10 text-[#C8956C] text-[9px] font-bold rounded-full">
                {cart?.items?.length || 0} articles
              </span>
            </div>
            <div className="h-[1px] bg-stone-100"></div>

            {(!cart?.items || cart.items.length === 0) ? (
              <p className="text-xs text-stone-400 text-center py-4">Votre panier est vide.</p>
            ) : (
              <div className="space-y-3">
                <div className="max-h-40 overflow-y-auto divide-y divide-stone-100">
                  {cart.items.slice(0, 3).map((item) => (
                    <div key={item.id} className="py-2 flex justify-between items-center gap-2 text-xs">
                      <span className="text-stone-800 truncate max-w-[150px]">{item.product?.name}</span>
                      <span className="font-semibold text-stone-900">{item.product?.sale_price ?? item.product?.price} MAD</span>
                    </div>
                  ))}
                </div>
                <div className="h-[1px] bg-stone-100 pt-1"></div>
                <div className="flex justify-between text-xs font-bold text-stone-950 pt-1">
                  <span>Sous-total</span>
                  <span>{subtotal} MAD</span>
                </div>
                <Link 
                  to="/place-order" 
                  className="block text-center bg-[#1A1A1A] hover:bg-[#C8956C] text-white py-3 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-colors shadow-sm"
                >
                  Passer commande
                </Link>
                <Link 
                  to="/cart" 
                  className="block text-center bg-stone-50 hover:bg-stone-100 text-stone-600 py-2.5 text-[10px] font-medium uppercase tracking-widest rounded-lg transition-colors border border-stone-200"
                >
                  Voir le panier
                </Link>
              </div>
            )}
          </div>

        </div>

        {/* COLUMN 2: Orders tracker */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-[#F3F2EE] rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-widest text-stone-450 flex items-center gap-2">
                <Package size={14} className="text-[#C8956C]" />
                Commandes Récentes
              </h3>
              <Link to="/orders" className="text-[10px] text-[#C8956C] font-semibold hover:underline flex items-center gap-1">
                Toutes mes commandes
                <ArrowRight size={10} />
              </Link>
            </div>
            <div className="h-[1px] bg-stone-100"></div>

            {orders.length === 0 ? (
              <div className="text-center py-12 text-stone-400 space-y-2">
                <ShoppingBag size={30} className="mx-auto text-stone-200" />
                <p className="text-xs">Vous n'avez pas encore passé de commande.</p>
              </div>
            ) : (
              <div className="divide-y divide-stone-100">
                {orders.slice(0, 3).map((order) => (
                  <div key={order.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-stone-50 border border-stone-100 flex items-center justify-center text-stone-500 font-bold text-xs">
                        #{order.id.toString().padStart(4, '0')}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-stone-900">{order.total} MAD</p>
                        <div className="flex items-center gap-1.5 text-[10px] text-stone-400 font-medium">
                          <Calendar size={10} />
                          <span>{new Date(order.created_at).toLocaleDateString('fr-FR')}</span>
                          <span>•</span>
                          <span>{order.items?.length || 0} article(s)</span>
                        </div>
                      </div>
                    </div>
                    
                    <span className={`px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider rounded-full border self-start sm:self-auto capitalize ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
