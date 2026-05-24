import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axiosInstance';
import { useAuthStore } from '../../store/authStore';
import { 
  ShoppingBag, Package, MapPin, CreditCard, Truck, ShieldCheck, 
  CheckCircle2, ChevronRight, ChevronLeft, Minus, Plus, Trash2, Sparkles, Download
} from 'lucide-react';
import html2pdf from 'html2pdf.js';

export default function PlaceOrder() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1); // 1: Review, 2: Shipping, 3: Payment, 4: Confirmation

  // Shipping
  const [shippingForm, setShippingForm] = useState({
    name: user?.name || '',
    address: '',
    city: '',
    phone: user?.phone || '',
  });

  // Payment
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [submitting, setSubmitting] = useState(false);
  const [orderResult, setOrderResult] = useState(null);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await api.get('/client/cart');
      setCart(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQty = async (itemId, newQty) => {
    try {
      await api.put(`/client/cart/${itemId}`, { quantity: newQty });
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await api.delete(`/client/cart/${itemId}`);
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const handlePlaceOrder = async () => {
    setSubmitting(true);
    try {
      const res = await api.post('/client/orders', {
        payment_method: paymentMethod,
        shipping_address: shippingForm,
      });
      setOrderResult(res.data);
      setStep(4);
    } catch (err) {
      console.error(err);
      alert("Une erreur s'est produite lors de la validation.");
    } finally {
      setSubmitting(false);
    }
  };

  const downloadPDF = () => {
    const element = document.getElementById('invoice-content');
    const opt = {
      margin:       1,
      filename:     `LUMA_Commande_${orderResult?.id}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };

  // Calculations
  const items = cart?.items || [];
  const subtotal = items.reduce((sum, item) => {
    const price = item.product?.sale_price ?? item.product?.price ?? 0;
    return sum + price * item.quantity;
  }, 0);
  const shipping = subtotal > 0 ? 30 : 0;
  const total = subtotal + shipping;

  const steps = [
    { num: 1, label: 'Articles' },
    { num: 2, label: 'Livraison' },
    { num: 3, label: 'Paiement' },
    { num: 4, label: 'Confirmation' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-10 h-10 border-4 border-[#C8956C] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // ===== STEP 4: SUCCESS =====
  if (step === 4 && orderResult) {
    return (
      <div className="space-y-8 animate-fade-in" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
        <div className="max-w-xl mx-auto text-center space-y-8 py-8">
          <div className="w-24 h-24 bg-gradient-to-br from-[#C8956C]/20 to-[#C8956C]/5 text-[#C8956C] rounded-full flex items-center justify-center mx-auto shadow-lg shadow-[#C8956C]/10">
            <CheckCircle2 size={48} strokeWidth={1.5} />
          </div>

          <div>
            <h1 className="text-2xl font-light uppercase tracking-[0.25em] text-[#1A1A1A]">
              Commande Confirmée
            </h1>
            <p className="text-xs text-stone-400 mt-3 leading-relaxed">
              Votre commande <span className="font-bold text-stone-700">#{orderResult.id?.toString().padStart(5, '0')}</span> a été enregistrée avec succès.
              <br />Un récapitulatif vous sera envoyé par email.
            </p>
          </div>

          <div className="bg-[#FCFCFA] border border-[#F3F2EE] rounded-2xl p-6 text-left space-y-4">
            <h3 className="text-[10px] uppercase tracking-widest text-stone-400 font-bold border-b border-stone-100 pb-2">
              Récapitulatif
            </h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-stone-400">Destinataire</span>
                <p className="font-bold text-stone-800 mt-0.5">{shippingForm.name}</p>
              </div>
              <div>
                <span className="text-stone-400">Téléphone</span>
                <p className="font-bold text-stone-800 mt-0.5">{shippingForm.phone}</p>
              </div>
              <div className="col-span-2">
                <span className="text-stone-400">Adresse</span>
                <p className="font-bold text-stone-800 mt-0.5">{shippingForm.address}, {shippingForm.city}</p>
              </div>
              <div>
                <span className="text-stone-400">Paiement</span>
                <p className="font-bold text-stone-800 mt-0.5 uppercase">
                  {paymentMethod === 'cod' ? 'Livraison' : paymentMethod === 'card' ? 'Carte Bancaire' : 'Mobile'}
                </p>
              </div>
              <div>
                <span className="text-stone-400">Montant Total</span>
                <p className="font-bold text-[#C8956C] mt-0.5 text-sm">{total.toFixed(2)} MAD</p>
              </div>
            </div>
          </div>

          {/* Hidden invoice for PDF generation */}
          <div style={{ display: 'none' }}>
            <div id="invoice-content" style={{ padding: '40px', fontFamily: 'sans-serif', color: '#1A1A1A' }}>
              <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', letterSpacing: '4px' }}>LUMA</h1>
                <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>Facture / Reçu de Commande</p>
              </div>
              <div style={{ marginBottom: '30px', paddingBottom: '20px', borderBottom: '1px solid #eee' }}>
                <p><strong>Commande N°:</strong> {orderResult.id?.toString().padStart(5, '0')}</p>
                <p><strong>Date:</strong> {new Date().toLocaleDateString('fr-FR')}</p>
              </div>
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ fontSize: '14px', marginBottom: '10px', textTransform: 'uppercase' }}>Informations de livraison</h3>
                <p><strong>Nom:</strong> {shippingForm.name}</p>
                <p><strong>Adresse:</strong> {shippingForm.address}, {shippingForm.city}</p>
                <p><strong>Téléphone:</strong> {shippingForm.phone}</p>
              </div>
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ fontSize: '14px', marginBottom: '10px', textTransform: 'uppercase' }}>Détails de la commande</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #1A1A1A', textAlign: 'left' }}>
                      <th style={{ padding: '8px 0' }}>Article</th>
                      <th style={{ padding: '8px 0' }}>Qté</th>
                      <th style={{ padding: '8px 0', textAlign: 'right' }}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map(item => {
                      const price = item.product?.sale_price ?? item.product?.price ?? 0;
                      return (
                        <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                          <td style={{ padding: '8px 0' }}>{item.product?.name}</td>
                          <td style={{ padding: '8px 0' }}>{item.quantity}</td>
                          <td style={{ padding: '8px 0', textAlign: 'right' }}>{(price * item.quantity).toFixed(2)} MAD</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div style={{ textAlign: 'right', marginTop: '20px' }}>
                <p>Sous-total: {subtotal.toFixed(2)} MAD</p>
                <p>Livraison: {shipping > 0 ? shipping.toFixed(2) + ' MAD' : 'Gratuite'}</p>
                <p style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '10px' }}>Total: {total.toFixed(2)} MAD</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <button
              onClick={downloadPDF}
              className="w-full flex items-center justify-center gap-2 bg-[#F5F5F5] hover:bg-[#EBEBEB] text-stone-800 py-4 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 rounded-xl"
            >
              <Download size={14} />
              Télécharger le reçu (PDF)
            </button>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate('/orders')}
                className="flex-1 bg-[#1A1A1A] hover:bg-[#C8956C] text-white py-4 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 rounded-xl shadow-md"
              >
                Suivre mes commandes
              </button>
              <Link
                to="/catalog"
                className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-700 py-4 text-[10px] font-bold uppercase tracking-widest text-center transition-all duration-300 rounded-xl"
              >
                Continuer mes achats
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-light uppercase tracking-widest text-[#1A1A1A]">Passer Commande</h1>
        <p className="text-xs text-gray-400 mt-1">Finalisez votre commande en quelques étapes simples.</p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-1 select-none">
        {steps.map((s, i) => (
          <div key={s.num} className="flex items-center gap-1">
            <div className={`flex items-center gap-2 px-3 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
              step === s.num
                ? 'bg-[#C8956C] text-white shadow-md shadow-[#C8956C]/20'
                : step > s.num
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                : 'bg-stone-50 text-stone-400 border border-stone-100'
            }`}>
              {step > s.num ? <CheckCircle2 size={12} /> : <span className="w-4 text-center">{s.num}</span>}
              <span className="hidden sm:inline">{s.label}</span>
            </div>
            {i < steps.length - 1 && (
              <ChevronRight size={14} className="text-stone-300" />
            )}
          </div>
        ))}
      </div>

      {/* Empty cart */}
      {items.length === 0 ? (
        <div className="bg-[#FCFCFA] border border-[#F3F2EE] rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-4">
          <ShoppingBag size={40} className="text-stone-300" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-800">Votre panier est vide</h3>
          <p className="text-xs text-stone-400 max-w-sm">
            Explorez nos collections pour ajouter des pièces à votre panier.
          </p>
          <Link
            to="/catalog"
            className="mt-4 bg-[#1A1A1A] hover:bg-[#C8956C] text-white px-8 py-3 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all duration-300"
          >
            Découvrir la collection
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT: Main Content */}
          <div className="lg:col-span-8 space-y-6">

            {/* STEP 1: Review Articles */}
            {step === 1 && (
              <div className="bg-[#FCFCFA] border border-[#F3F2EE] rounded-2xl p-6 space-y-5 animate-fade-in">
                <h2 className="text-xs font-bold uppercase tracking-widest text-stone-400 flex items-center gap-2 pb-3 border-b border-stone-100">
                  <Package size={14} className="text-[#C8956C]" />
                  Vos Articles ({items.length})
                </h2>

                <div className="divide-y divide-stone-100">
                  {items.map((item) => {
                    const price = item.product?.sale_price ?? item.product?.price ?? 0;
                    return (
                      <div key={item.id} className="py-5 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-20 bg-white rounded-xl overflow-hidden border border-stone-100 flex-shrink-0 flex items-center justify-center shadow-sm">
                            {item.product?.image ? (
                              <img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover" />
                            ) : (
                              <ShoppingBag className="w-6 h-6 text-stone-200" />
                            )}
                          </div>
                          <div className="space-y-1">
                            <span className="text-[9px] uppercase tracking-widest text-[#C8956C] font-semibold">
                              {item.product?.category?.name || 'Couture'}
                            </span>
                            <h3 className="text-xs font-bold text-stone-900">{item.product?.name}</h3>
                            {item.variant && (
                              <p className="text-[10px] text-stone-400">
                                Taille: <span className="uppercase text-stone-600 font-semibold">{item.variant.size}</span>
                                {item.variant.color && <span> • Couleur: <span className="uppercase text-stone-600 font-semibold">{item.variant.color}</span></span>}
                              </p>
                            )}
                            <div className="flex items-center gap-2 pt-1">
                              <button
                                onClick={() => handleUpdateQty(item.id, Math.max(1, item.quantity - 1))}
                                className="w-6 h-6 border border-stone-200 hover:border-[#C8956C] text-stone-500 hover:text-[#C8956C] flex items-center justify-center rounded-md text-xs transition-colors"
                              >
                                <Minus size={10} />
                              </button>
                              <span className="w-6 text-center text-xs font-bold text-stone-900">{item.quantity}</span>
                              <button
                                onClick={() => handleUpdateQty(item.id, item.quantity + 1)}
                                className="w-6 h-6 border border-stone-200 hover:border-[#C8956C] text-stone-500 hover:text-[#C8956C] flex items-center justify-center rounded-md text-xs transition-colors"
                              >
                                <Plus size={10} />
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <p className="text-xs font-bold text-stone-950">{(price * item.quantity).toFixed(2)} MAD</p>
                          {item.product?.sale_price && (
                            <span className="text-[9px] line-through text-stone-400">{(item.product.price * item.quantity).toFixed(2)} MAD</span>
                          )}
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-stone-300 hover:text-red-500 transition-colors p-1"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setStep(2)}
                    className="bg-[#1A1A1A] hover:bg-[#C8956C] text-white px-8 py-3.5 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all duration-300 shadow-md flex items-center gap-2"
                  >
                    Continuer
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Shipping */}
            {step === 2 && (
              <div className="bg-[#FCFCFA] border border-[#F3F2EE] rounded-2xl p-6 space-y-5 animate-fade-in">
                <h2 className="text-xs font-bold uppercase tracking-widest text-stone-400 flex items-center gap-2 pb-3 border-b border-stone-100">
                  <MapPin size={14} className="text-[#C8956C]" />
                  Adresse de Livraison
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Nom Complet *</label>
                    <input
                      type="text"
                      value={shippingForm.name}
                      onChange={(e) => setShippingForm({ ...shippingForm, name: e.target.value })}
                      placeholder="Ex: Yassine Belkacem"
                      className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-[#C8956C] focus:ring-2 focus:ring-[#C8956C]/10 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Téléphone *</label>
                    <input
                      type="text"
                      value={shippingForm.phone}
                      onChange={(e) => setShippingForm({ ...shippingForm, phone: e.target.value })}
                      placeholder="Ex: +212 600 000 000"
                      className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-[#C8956C] focus:ring-2 focus:ring-[#C8956C]/10 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Adresse Complète *</label>
                    <input
                      type="text"
                      value={shippingForm.address}
                      onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                      placeholder="Rue, Quartier, Numéro d'appartement"
                      className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-[#C8956C] focus:ring-2 focus:ring-[#C8956C]/10 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Ville *</label>
                    <input
                      type="text"
                      value={shippingForm.city}
                      onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                      placeholder="Ex: Casablanca"
                      className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-[#C8956C] focus:ring-2 focus:ring-[#C8956C]/10 transition-all"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="px-6 py-3.5 border border-stone-200 hover:border-stone-400 text-stone-600 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2"
                  >
                    <ChevronLeft size={14} />
                    Retour
                  </button>
                  <button
                    onClick={() => {
                      if (!shippingForm.name || !shippingForm.address || !shippingForm.city || !shippingForm.phone) {
                        alert('Veuillez remplir tous les champs.');
                        return;
                      }
                      setStep(3);
                    }}
                    className="bg-[#1A1A1A] hover:bg-[#C8956C] text-white px-8 py-3.5 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all duration-300 shadow-md flex items-center gap-2"
                  >
                    Continuer
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Payment */}
            {step === 3 && (
              <div className="bg-[#FCFCFA] border border-[#F3F2EE] rounded-2xl p-6 space-y-5 animate-fade-in">
                <h2 className="text-xs font-bold uppercase tracking-widest text-stone-400 flex items-center gap-2 pb-3 border-b border-stone-100">
                  <CreditCard size={14} className="text-[#C8956C]" />
                  Mode de Paiement
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { key: 'cod', icon: Truck, title: 'Cash à la Livraison', desc: 'Réglez lors de la réception.' },
                    { key: 'card', icon: CreditCard, title: 'Carte Bancaire', desc: 'Paiement sécurisé SSL.' },
                    { key: 'mobile', icon: Sparkles, title: 'Paiement Mobile', desc: 'Orange Money, InWi Money...' },
                  ].map((pm) => (
                    <label
                      key={pm.key}
                      className={`p-5 rounded-xl border-2 cursor-pointer transition-all duration-300 flex flex-col items-center text-center gap-3 ${
                        paymentMethod === pm.key
                          ? 'border-[#C8956C] bg-[#C8956C]/5 shadow-md shadow-[#C8956C]/10'
                          : 'border-stone-150 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <pm.icon size={24} className={paymentMethod === pm.key ? 'text-[#C8956C]' : 'text-stone-400'} />
                      <div>
                        <p className="text-xs font-bold text-stone-900">{pm.title}</p>
                        <p className="text-[9px] text-stone-400 mt-1">{pm.desc}</p>
                      </div>
                      <input
                        type="radio"
                        name="payment_method"
                        value={pm.key}
                        checked={paymentMethod === pm.key}
                        onChange={() => setPaymentMethod(pm.key)}
                        className="accent-[#C8956C]"
                      />
                    </label>
                  ))}
                </div>

                {/* Review before confirm */}
                <div className="bg-white border border-stone-100 rounded-xl p-5 space-y-3">
                  <h3 className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Récapitulatif Livraison</h3>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-stone-400">Nom:</span>
                      <span className="font-bold text-stone-800 ml-1">{shippingForm.name}</span>
                    </div>
                    <div>
                      <span className="text-stone-400">Tél:</span>
                      <span className="font-bold text-stone-800 ml-1">{shippingForm.phone}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-stone-400">Adresse:</span>
                      <span className="font-bold text-stone-800 ml-1">{shippingForm.address}, {shippingForm.city}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-3.5 border border-stone-200 hover:border-stone-400 text-stone-600 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2"
                  >
                    <ChevronLeft size={14} />
                    Retour
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={submitting}
                    className="bg-[#C8956C] hover:bg-[#B07D55] text-white px-10 py-3.5 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all duration-300 shadow-lg shadow-[#C8956C]/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Traitement...
                      </>
                    ) : (
                      <>
                        <ShieldCheck size={14} />
                        Confirmer la commande
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Order Summary Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-[#FCFCFA] border border-[#F3F2EE] rounded-2xl p-6 space-y-5 sticky top-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 pb-3 border-b border-stone-100">
                Résumé de la commande
              </h3>

              {/* Mini item list */}
              <div className="max-h-48 overflow-y-auto divide-y divide-stone-100 -mx-1 px-1">
                {items.map((item) => {
                  const price = item.product?.sale_price ?? item.product?.price ?? 0;
                  return (
                    <div key={item.id} className="py-2.5 flex justify-between items-center gap-2 text-xs">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-8 h-8 bg-white rounded-lg border border-stone-100 flex-shrink-0 flex items-center justify-center overflow-hidden">
                          {item.product?.image ? (
                            <img src={item.product.image} alt="" className="h-full w-full object-cover" />
                          ) : (
                            <ShoppingBag size={10} className="text-stone-300" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-stone-800 truncate font-medium text-[11px]">{item.product?.name}</p>
                          <p className="text-[9px] text-stone-400">x{item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-bold text-stone-900 flex-shrink-0">{(price * item.quantity).toFixed(2)} MAD</span>
                    </div>
                  );
                })}
              </div>

              {/* Totals */}
              <div className="space-y-2 pt-3 border-t border-stone-100 text-xs">
                <div className="flex justify-between text-stone-500">
                  <span>Sous-total</span>
                  <span>{subtotal.toFixed(2)} MAD</span>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>Livraison</span>
                  <span className="text-emerald-600 font-semibold">{shipping > 0 ? `${shipping.toFixed(2)} MAD` : 'Gratuite'}</span>
                </div>
                <div className="h-[1px] bg-stone-200/50 my-1"></div>
                <div className="flex justify-between text-sm font-bold text-stone-950">
                  <span>Total</span>
                  <span className="text-[#C8956C]">{total.toFixed(2)} MAD</span>
                </div>
              </div>

              {/* Trust badges */}
              <div className="bg-white rounded-xl p-4 border border-stone-100/50 space-y-3 text-[10px] text-stone-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-[#C8956C] flex-shrink-0" />
                  <span>Paiement 100% sécurisé</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck size={14} className="text-[#C8956C] flex-shrink-0" />
                  <span>Livraison sous 3-5 jours ouvrés</span>
                </div>
                <div className="flex items-center gap-2">
                  <Package size={14} className="text-[#C8956C] flex-shrink-0" />
                  <span>Emballage coffret signature LUMA</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
