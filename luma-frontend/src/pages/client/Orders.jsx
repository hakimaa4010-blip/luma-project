import { useState, useEffect } from 'react';
import api from '../../api/axiosInstance';
import { useAuthStore } from '../../store/authStore';
import { ShoppingBag, Calendar, CheckCircle2, ChevronRight, Package, MapPin, Truck, Download } from 'lucide-react';
import html2pdf from 'html2pdf.js';

export default function ClientOrders() {
  const { token } = useAuthStore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    if (token) {
      api.get('/client/orders')
        .then(res => {
          setOrders(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [token]);

  const toggleExpand = (id) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'delivered': return { text: 'Livrée', color: 'text-emerald-700 bg-emerald-50 border-emerald-100' };
      case 'shipped': return { text: 'En cours d’expédition', color: 'text-purple-700 bg-purple-50 border-purple-100' };
      case 'processing': return { text: 'En préparation', color: 'text-blue-700 bg-blue-50 border-blue-100' };
      case 'cancelled': return { text: 'Annulée', color: 'text-red-700 bg-red-50 border-red-100' };
      default: return { text: 'En attente de validation', color: 'text-orange-700 bg-orange-50 border-orange-100' };
    }
  };

  const downloadOrderPDF = (order) => {
    // We create a temporary div to hold the invoice HTML
    const element = document.createElement('div');
    element.innerHTML = `
      <div style="padding: 40px; font-family: sans-serif; color: #1A1A1A;">
        <div style="text-align: center; margin-bottom: 40px;">
          <h1 style="font-size: 24px; font-weight: bold; letter-spacing: 4px;">LUMA</h1>
          <p style="font-size: 12px; color: #666; margin-top: 10px;">Facture / Reçu de Commande</p>
        </div>
        <div style="margin-bottom: 30px; padding-bottom: 20px; border-bottom: 1px solid #eee;">
          <p><strong>Commande N°:</strong> ${order.id.toString().padStart(5, '0')}</p>
          <p><strong>Date:</strong> ${new Date(order.created_at).toLocaleDateString('fr-FR')}</p>
          <p><strong>Statut:</strong> ${getStatusLabel(order.status).text}</p>
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
      filename:     `LUMA_Facture_${order.id}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(element).save();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-10 h-10 border-4 border-[#C8956C] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-light uppercase tracking-widest text-[#1A1A1A]">Mes Commandes</h1>
        <p className="text-xs text-gray-400 mt-1">Consultez l'historique et suivez le statut de vos commandes Luma.</p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-[#FCFCFA] border border-[#F3F2EE] rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-4">
          <ShoppingBag size={40} className="text-stone-300" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-800">Aucune commande passée</h3>
          <p className="text-xs text-stone-400 max-w-sm">Vous n'avez pas encore passé de commande sur notre boutique. Explorez nos collections couture pour y dénicher vos pièces préférées.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const status = getStatusLabel(order.status);
            const isExpanded = expandedOrderId === order.id;

            return (
              <div 
                key={order.id} 
                className="bg-[#FCFCFA] border border-[#F3F2EE] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-sm"
              >
                {/* Main Header summary block */}
                <div 
                  onClick={() => toggleExpand(order.id)}
                  className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-500">
                      <Package size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-stone-900">Commande #{order.id.toString().padStart(5, '0')}</p>
                      <div className="flex items-center gap-2 mt-1 text-[10px] text-stone-400 font-medium">
                        <Calendar size={12} />
                        <span>{new Date(order.created_at).toLocaleDateString('fr-FR')}</span>
                        <span>•</span>
                        <span>{order.items?.length || 0} article(s)</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-stretch md:self-auto justify-between md:justify-end">
                    <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border ${status.color}`}>
                      {status.text}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-stone-950">{order.total} MAD</span>
                      <ChevronRight 
                        size={18} 
                        className={`text-stone-400 transition-transform duration-300 ${isExpanded ? 'rotate-90 text-[#C8956C]' : ''}`} 
                      />
                    </div>
                  </div>
                </div>

                {/* Expanded Details section */}
                {isExpanded && (
                  <div className="border-t border-[#F3F2EE] bg-[#FDFDFD] p-6 space-y-6 animate-fade-in">
                    
                    {/* Items List */}
                    <div className="space-y-3">
                      <h4 className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Articles Commandés</h4>
                      <div className="border border-stone-100 rounded-xl divide-y divide-stone-100 bg-white">
                        {order.items?.map((item) => (
                          <div key={item.id} className="p-4 flex items-center justify-between gap-4 text-xs">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-stone-50 rounded-lg overflow-hidden border border-stone-100 flex-shrink-0 flex items-center justify-center">
                                {item.product?.image ? (
                                  <img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover" />
                                ) : (
                                  <ShoppingBag className="w-5 h-5 text-stone-300" />
                                )}
                              </div>
                              <div>
                                <p className="font-bold text-stone-900 line-clamp-1">{item.product?.name}</p>
                                <p className="text-[10px] text-stone-400 font-medium mt-0.5">Quantité : {item.quantity} • {item.unit_price} MAD / unité</p>
                              </div>
                            </div>
                            <p className="font-bold text-stone-950">{item.total_price} MAD</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-stone-100 text-xs">
                      {/* Shipping Address */}
                      <div className="space-y-2">
                        <h4 className="text-[10px] uppercase tracking-widest text-stone-400 font-bold flex items-center gap-1.5">
                          <MapPin size={12} className="text-[#C8956C]" />
                          Adresse de Livraison
                        </h4>
                        <div className="bg-stone-50 rounded-xl p-4 border border-stone-100/50">
                          <p className="font-bold text-stone-800">
                            {order.shipping_address?.name}
                          </p>
                          <p className="text-stone-500 mt-1">
                            {order.shipping_address?.address}, {order.shipping_address?.city}
                          </p>
                          <p className="text-stone-500 mt-0.5">Tél : {order.shipping_address?.phone}</p>
                        </div>
                      </div>

                      {/* Payment Method / Summary */}
                      <div className="space-y-2">
                        <h4 className="text-[10px] uppercase tracking-widest text-stone-400 font-bold flex items-center gap-1.5">
                          <Truck size={12} className="text-[#C8956C]" />
                          Récapitulatif Financier
                        </h4>
                        <div className="bg-stone-50 rounded-xl p-4 border border-stone-100/50 space-y-2">
                          <div className="flex justify-between text-stone-500">
                            <span>Mode de paiement</span>
                            <span className="font-semibold text-stone-700 uppercase">
                              {order.payment_method === 'cod' ? 'Paiement à la livraison' : order.payment_method}
                            </span>
                          </div>
                          <div className="h-[1px] bg-stone-200/50 my-2"></div>
                          <div className="flex justify-between text-stone-500">
                            <span>Sous-total</span>
                            <span>{order.subtotal} MAD</span>
                          </div>
                          <div className="flex justify-between text-stone-500">
                            <span>Frais de livraison</span>
                            <span>{order.shipping_cost} MAD</span>
                          </div>
                          <div className="flex justify-between text-sm font-bold text-stone-950 pt-2 border-t border-stone-200/50">
                            <span>Montant Total</span>
                            <span>{order.total} MAD</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-stone-100 flex justify-end">
                      <button
                        onClick={() => downloadOrderPDF(order)}
                        className="flex items-center gap-2 bg-[#F5F5F5] hover:bg-[#EBEBEB] text-stone-800 px-6 py-3 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 rounded-xl"
                      >
                        <Download size={14} />
                        Télécharger la facture (PDF)
                      </button>
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}