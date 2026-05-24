import { useState, useEffect } from 'react';
import api from '../../api/axiosInstance';
import { Search, Eye, Filter, Calendar, X, ShoppingBag, MapPin, CreditCard, ChevronRight, Printer } from 'lucide-react';
import html2pdf from 'html2pdf.js';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Detail Modal State
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    setLoading(true);
    api.get('/admin/orders').then(res => {
      setOrders(res.data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
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

  const handleOpenDetail = (order) => {
    api.get(`/admin/orders/${order.id}`).then(res => {
      setSelectedOrder(res.data);
      setIsDetailOpen(true);
    }).catch(err => console.error(err));
  };

  const handleUpdateStatus = async (status) => {
    setUpdatingStatus(true);
    try {
      await api.put(`/admin/orders/${selectedOrder.id}`, { status });
      // Update local state in modal
      setSelectedOrder({ ...selectedOrder, status });
      // Re-fetch orders for the background list
      fetchOrders();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la mise à jour du statut.");
    } finally {
      setUpdatingStatus(false);
    }
  };

  const downloadOrderPDF = (order) => {
    const element = document.createElement('div');
    element.innerHTML = `
      <div style="padding: 40px; font-family: sans-serif; color: #1A1A1A;">
        <div style="text-align: center; margin-bottom: 40px;">
          <h1 style="font-size: 24px; font-weight: bold; letter-spacing: 4px;">LUMA</h1>
          <p style="font-size: 12px; color: #666; margin-top: 10px;">Ticket d'Archive / Facture</p>
        </div>
        <div style="margin-bottom: 30px; padding-bottom: 20px; border-bottom: 1px solid #eee;">
          <p><strong>Commande N°:</strong> ${order.id.toString().padStart(5, '0')}</p>
          <p><strong>Date:</strong> ${new Date(order.created_at).toLocaleDateString('fr-FR')}</p>
          <p><strong>Statut:</strong> ${order.status}</p>
        </div>
        <div style="margin-bottom: 30px;">
          <h3 style="font-size: 14px; margin-bottom: 10px; text-transform: uppercase;">Informations de livraison</h3>
          <p><strong>Nom:</strong> ${order.shipping_address?.name || 'N/A'}</p>
          <p><strong>Adresse:</strong> ${order.shipping_address?.address || ''}, ${order.shipping_address?.city || ''}</p>
          <p><strong>Téléphone:</strong> ${order.shipping_address?.phone || ''}</p>
        </div>
        <div style="margin-bottom: 30px;">
          <h3 style="font-size: 14px; margin-bottom: 10px; text-transform: uppercase;">Détails de la commande</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="border-bottom: 1px solid #1A1A1A; text-align: left;">
                <th style="padding: 8px 0;">Article</th>
                <th style="padding: 8px 0;">Qté</th>
                <th style="padding: 8px 0; text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${(order.items || []).map(item => `
                <tr style="border-bottom: 1px solid #eee;">
                  <td style="padding: 8px 0;">${item.product?.name || 'Article'}</td>
                  <td style="padding: 8px 0;">${item.quantity}</td>
                  <td style="padding: 8px 0; text-align: right;">${item.total_price} MAD</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div style="text-align: right; margin-top: 20px;">
          <p>Sous-total: ${order.subtotal || 0} MAD</p>
          <p>Livraison: ${order.shipping_cost || 0} MAD</p>
          <p style="font-size: 18px; font-weight: bold; margin-top: 10px;">Total: ${order.total || 0} MAD</p>
        </div>
      </div>
    `;

    const opt = {
      margin:       1,
      filename:     `LUMA_Ticket_${order.id}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(element).save();
  };

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const custName = order.user?.name || 'Guest';
    const custEmail = order.user?.email || 'N/A';
    const orderId = order.id.toString();
    const matchSearch = custName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        custEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        orderId.includes(searchTerm);
    const matchStatus = selectedStatus === 'all' ? true : order.status === selectedStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="min-h-full bg-[#F8F9FA] p-8 relative">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Archives et Commandes</h1>
            <p className="text-gray-500 mt-1">Gérez le suivi, expédiez les articles et consultez l'archive des tickets.</p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Rechercher par ID, nom ou email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C8956C]/20 focus:border-[#C8956C] transition-all"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="flex-1 sm:flex-none bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl focus:ring-[#C8956C] focus:border-[#C8956C] block p-2 outline-none"
            >
              <option value="all">Tous les statuts</option>
              <option value="pending">En attente</option>
              <option value="processing">En préparation</option>
              <option value="shipped">Expédiée</option>
              <option value="delivered">Livrée (Archivée)</option>
              <option value="cancelled">Annulée (Archivée)</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                      <div className="flex justify-center">
                        <div className="w-8 h-8 border-4 border-[#C8956C] border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    </td>
                  </tr>
                ) : filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-400">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <ShoppingBag size={32} className="text-gray-300" />
                        <p className="text-sm">Aucune commande trouvée.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-950">
                        #{order.id.toString().padStart(5, '0')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">{order.user?.name || 'Guest'}</div>
                        <div className="text-xs text-gray-400">{order.user?.email || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(order.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-bold rounded-full border capitalize ${getStatusColor(order.status)}`}>
                          {order.status || 'pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-950 font-bold">
                        {order.total} MAD
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          onClick={() => handleOpenDetail(order)}
                          className="p-2 text-stone-400 hover:text-[#C8956C] hover:bg-[#C8956C]/10 rounded-xl transition-all duration-200"
                          title="Inspect Order"
                        >
                          <Eye size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between text-sm bg-gray-50/50 text-gray-500">
            <span>Affichage de <span className="font-semibold text-gray-900">{filteredOrders.length}</span> commandes</span>
          </div>
        </div>

      </div>

      {/* ORDER DETAILS & STATUS EDITOR MODAL */}
      {isDetailOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm transition-opacity">
          <div className="w-full max-w-xl bg-white h-full shadow-2xl p-8 overflow-y-auto flex flex-col justify-between animate-slide-in">
            <div className="space-y-6">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <div>
                  <h2 className="text-xl font-light uppercase tracking-widest text-[#1A1A1A]">Détails de la commande</h2>
                  <p className="text-xs text-stone-400 mt-1">ID: #{selectedOrder.id.toString().padStart(5, '0')} • Passée le {new Date(selectedOrder.created_at).toLocaleDateString('fr-FR')}</p>
                </div>
                <button onClick={() => setIsDetailOpen(false)} className="p-2 hover:bg-stone-50 rounded-full transition-colors text-stone-400 hover:text-stone-900">
                  <X size={20} />
                </button>
              </div>

              {/* Status Editor */}
              <div className="bg-stone-50 rounded-xl p-4 border border-stone-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Action sur le statut</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-full capitalize ${getStatusColor(selectedOrder.status)}`}>
                      {selectedOrder.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <select 
                    value={selectedOrder.status}
                    disabled={updatingStatus}
                    onChange={(e) => handleUpdateStatus(e.target.value)}
                    className="bg-white border border-stone-200 text-stone-800 text-xs font-semibold rounded-lg px-3 py-2 outline-none focus:border-[#C8956C]"
                  >
                    <option value="pending">En attente</option>
                    <option value="processing">En préparation</option>
                    <option value="shipped">Expédiée</option>
                    <option value="delivered">Livrée (Archive)</option>
                    <option value="cancelled">Annulée</option>
                  </select>
                </div>
              </div>

              {/* Customer Info */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400">Détails du client</h3>
                <div className="grid grid-cols-2 gap-4 bg-stone-50/50 rounded-xl p-4 border border-stone-100/50 text-sm">
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase font-medium">Nom</span>
                    <p className="font-semibold text-stone-850 mt-0.5">{selectedOrder.user?.name || 'Guest'}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase font-medium">Email</span>
                    <p className="font-semibold text-stone-850 mt-0.5">{selectedOrder.user?.email || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Delivery Details */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400">Livraison et Paiement</h3>
                <div className="bg-stone-50/50 rounded-xl p-4 border border-stone-100/50 space-y-4 text-xs">
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-[#C8956C] mt-0.5" />
                    <div>
                      <p className="font-bold text-stone-800">
                        {selectedOrder.shipping_address?.name || selectedOrder.user?.name}
                      </p>
                      <p className="text-stone-500 mt-1">
                        {selectedOrder.shipping_address?.address}, {selectedOrder.shipping_address?.city}
                      </p>
                      <p className="text-stone-500 mt-0.5">Téléphone: {selectedOrder.shipping_address?.phone}</p>
                    </div>
                  </div>
                  <div className="h-[1px] bg-stone-100"></div>
                  <div className="flex items-center gap-3">
                    <CreditCard size={16} className="text-[#C8956C]" />
                    <div>
                      <p className="font-bold text-stone-800 uppercase">
                        Méthode : {selectedOrder.payment_method === 'cod' ? 'Paiement à la livraison' : selectedOrder.payment_method}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400">Articles commandés</h3>
                <div className="border border-stone-100 rounded-xl overflow-hidden divide-y divide-stone-100">
                  {selectedOrder.items?.map((item) => (
                    <div key={item.id} className="p-4 flex items-center justify-between gap-4 hover:bg-stone-50/30 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-stone-50 rounded-lg overflow-hidden border border-stone-100 flex-shrink-0 flex items-center justify-center">
                          {item.product?.image ? (
                            <img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover" />
                          ) : (
                            <ShoppingBag className="w-5 h-5 text-stone-300" />
                          )}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-stone-900 line-clamp-1">{item.product?.name}</p>
                          <p className="text-[10px] text-stone-400 font-medium">Qté: {item.quantity} • Unité: {item.unit_price} MAD</p>
                        </div>
                      </div>
                      <p className="text-xs font-bold text-stone-950">{item.total_price} MAD</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="pt-4 border-t border-stone-100 text-sm space-y-2">
                <div className="flex justify-between text-stone-500">
                  <span>Sous-total</span>
                  <span>{selectedOrder.subtotal} MAD</span>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>Frais de livraison</span>
                  <span>{selectedOrder.shipping_cost} MAD</span>
                </div>
                <div className="flex justify-between text-base font-bold text-stone-950 pt-2 border-t border-stone-50">
                  <span>Montant Total</span>
                  <span>{selectedOrder.total} MAD</span>
                </div>
              </div>

              {/* Print Archive Ticket */}
              <div className="pt-6 border-t border-stone-100">
                <button
                  onClick={() => downloadOrderPDF(selectedOrder)}
                  className="w-full bg-[#1A1A1A] hover:bg-gray-800 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <Printer size={18} />
                  Imprimer le Ticket d'Archive
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}