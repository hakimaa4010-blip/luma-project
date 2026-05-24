import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axiosInstance';
import { useAuthStore } from '../../store/authStore';
import { ShoppingCart, Trash2, ShieldCheck, Truck, CreditCard, ChevronRight, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

export default function Cart() {
  const { token, user } = useAuthStore();
  const navigate = useNavigate();

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkoutStep, setCheckoutStep] = useState(1); // 1: Cart list, 2: Checkout Form, 3: Success

  // Checkout form state
  const [shippingForm, setShippingForm] = useState({
    name: user?.name || '',
    address: '',
    city: '',
    phone: user?.phone || ''
  });
  const [paymentMethod, setPaymentMethod] = useState('cod'); // cod, card
  const [orderCreated, setOrderCreated] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (token) {
      fetchCart();
    }
  }, [token]);

  const fetchCart = () => {
    setLoading(true);
    api.get('/client/cart')
      .then(res => {
        setCart(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await api.delete(`/client/cart/${itemId}`);
      fetchCart();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression de l'article.");
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

  const handlePlaceOrder = async () => {
    if (!shippingForm.name || !shippingForm.address || !shippingForm.city || !shippingForm.phone) {
      alert('Veuillez remplir tous les champs de livraison.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await api.post('/client/orders', {
        payment_method: paymentMethod,
        shipping_address: shippingForm
      });
      setOrderCreated(res.data);
      setCheckoutStep(3);
    } catch (err) {
      console.error(err);
      alert("Une erreur s'est produite lors de la validation de votre commande.");
    } finally {
      setSubmitting(false);
    }
  };

  // Calculations
  const subtotal = cart?.items?.reduce((sum, item) => {
    const price = item.product?.sale_price ?? item.product?.price ?? 0;
    return sum + (price * item.quantity);
  }, 0) || 0;
  const shipping = subtotal > 0 ? 30.00 : 0;
  const total = subtotal + shipping;

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await api.post('/client/orders', {
        payment_method: paymentMethod,
        shipping_address: shippingForm
      });
      setOrderCreated(res.data);
      setCheckoutStep(3); // Success Screen
    } catch (err) {
      console.error(err);
      alert("Une erreur s'est produite lors de la validation de votre commande.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F4] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#C8956C] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // STEP 3: SUCCESS STATE
  if (checkoutStep === 3) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#FAF7F4', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-6 pt-[110px] pb-16" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
          <div className="bg-white rounded-3xl p-8 md:p-12 max-w-lg w-full text-center border border-[#F3F2EE] shadow-xl space-y-6 animate-fade-in">
            <div className="w-20 h-20 bg-[#C8956C]/10 text-[#C8956C] rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 size={44} />
            </div>
            <div>
              <h1 className="text-2xl font-light uppercase tracking-widest text-[#1A1A1A]">Commande Validée</h1>
              <p className="text-xs text-gray-400 mt-2">Votre commande #{orderCreated?.id?.toString().padStart(5, '0')} a été enregistrée avec succès.</p>
            </div>
            
            <div className="bg-[#FAF8F5] rounded-2xl p-6 text-left border border-stone-100 text-xs space-y-3">
              <p className="font-bold text-stone-850 uppercase tracking-widest border-b border-stone-100 pb-2">Détails de livraison</p>
              <p><span className="text-stone-400">Nom :</span> {shippingForm.name}</p>
              <p><span className="text-stone-400">Adresse :</span> {shippingForm.address}, {shippingForm.city}</p>
              <p><span className="text-stone-400">Téléphone :</span> {shippingForm.phone}</p>
              <p><span className="text-stone-400">Montant total :</span> <span className="font-bold text-stone-900">{total} MAD</span></p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={() => navigate('/orders')}
                className="flex-1 bg-[#1A1A1A] hover:bg-[#C8956C] text-white py-4 text-xs font-bold uppercase tracking-widest transition-all duration-300 rounded-xl shadow-md"
              >
                Suivre mes commandes
              </button>
              <Link
                to="/"
                className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-700 py-4 text-xs font-bold uppercase tracking-widest text-center transition-all duration-300 rounded-xl"
              >
                Retour à la boutique
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAF7F4', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8 pt-[110px]" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
        <div className="max-w-6xl mx-auto">
          
          {/* Step indicator */}
          <div className="flex items-center justify-center space-x-4 mb-10 text-xs uppercase tracking-widest font-bold text-stone-400 select-none">
            <span className={checkoutStep === 1 ? 'text-[#C8956C]' : 'text-stone-600'}>01 / Panier</span>
            <ChevronRight size={14} />
            <span className={checkoutStep === 2 ? 'text-[#C8956C]' : ''}>02 / Commande</span>
            <ChevronRight size={14} />
            <span>03 / Succès</span>
          </div>

          {/* Empty state */}
          {!cart?.items || cart.items.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 md:p-20 text-center border border-[#F3F2EE] shadow-sm flex flex-col items-center justify-center space-y-6 max-w-xl mx-auto">
              <div className="w-16 h-16 bg-[#FAF7F4] rounded-full flex items-center justify-center text-stone-300">
                <ShoppingCart size={30} />
              </div>
              <div>
                <h2 className="text-xl font-light uppercase tracking-widest text-[#1A1A1A]">Votre panier est vide</h2>
                <p className="text-xs text-gray-400 mt-2 max-w-sm mx-auto">Explorez nos créations haut de gamme pour ajouter des pièces raffinées à votre garde-robe.</p>
              </div>
              <Link
                to="/"
                className="bg-[#1A1A1A] hover:bg-[#C8956C] text-white px-8 py-4 text-xs font-bold uppercase tracking-widest transition-all duration-300 rounded-xl shadow-md inline-block"
              >
                Découvrir les collections
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT COLUMN: Cart items or Checkout Form */}
              <div className="lg:col-span-8 space-y-6">
                {checkoutStep === 1 ? (
                  // STEP 1: CART LIST
                  <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#F3F2EE] shadow-sm space-y-6">
                    <h2 className="text-lg font-light uppercase tracking-widest text-[#1A1A1A] border-b border-stone-100 pb-4">Mes Articles</h2>
                    
                    <div className="divide-y divide-stone-100">
                      {cart.items.map((item) => {
                        const finalPrice = item.product?.sale_price ?? item.product?.price ?? 0;
                        return (
                          <div key={item.id} className="py-6 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                              <div className="w-20 h-24 bg-[#FAF7F4] rounded-xl overflow-hidden border border-stone-100 flex-shrink-0 flex items-center justify-center">
                                {item.product?.image ? (
                                  <img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover" />
                                ) : (
                                  <ShoppingCart className="w-8 h-8 text-stone-200" />
                                )}
                              </div>
                              <div className="space-y-1">
                                <span className="text-[9px] uppercase tracking-widest text-[#C8956C] font-semibold">{item.product?.category?.name || 'Couture'}</span>
                                <h3 className="text-xs font-bold text-stone-900">{item.product?.name}</h3>
                                {item.variant && (
                                  <p className="text-[10px] text-stone-400">
                                    Taille : <span className="uppercase text-stone-600 font-semibold">{item.variant.size}</span>
                                    {item.variant.color && <span> | Couleur : <span className="uppercase text-stone-600 font-semibold">{item.variant.color}</span></span>}
                                  </p>
                                )}
                                
                                {/* Quantity editor */}
                                <div className="flex items-center space-x-2 pt-2">
                                  <button
                                    onClick={() => handleUpdateQty(item.id, Math.max(1, item.quantity - 1))}
                                    className="w-6 h-6 border border-stone-200 hover:border-stone-400 text-stone-600 flex items-center justify-center rounded text-xs select-none transition-colors"
                                  >
                                    -
                                  </button>
                                  <span className="w-6 text-center text-xs font-bold text-stone-900">{item.quantity}</span>
                                  <button
                                    onClick={() => handleUpdateQty(item.id, item.quantity + 1)}
                                    className="w-6 h-6 border border-stone-200 hover:border-stone-400 text-stone-600 flex items-center justify-center rounded text-xs select-none transition-colors"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-col items-end gap-3">
                              <p className="text-xs font-bold text-stone-950">{finalPrice * item.quantity} MAD</p>
                              <button
                                onClick={() => handleRemoveItem(item.id)}
                                className="text-stone-300 hover:text-red-500 transition-colors p-1"
                                title="Retirer l'article"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  // STEP 2: CHECKOUT FORM
                  <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#F3F2EE] shadow-sm space-y-6">
                    <h2 className="text-lg font-light uppercase tracking-widest text-[#1A1A1A] border-b border-stone-100 pb-4">Adresse de Livraison</h2>
                    
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase tracking-widest text-stone-450 font-bold">Nom Complet</label>
                          <input
                            type="text"
                            value={shippingForm.name}
                            onChange={(e) => setShippingForm({ ...shippingForm, name: e.target.value })}
                            placeholder="Ex: Yassine Belkacem"
                            className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-900 transition-colors"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase tracking-widest text-stone-450 font-bold">Téléphone</label>
                          <input
                            type="text"
                            value={shippingForm.phone}
                            onChange={(e) => setShippingForm({ ...shippingForm, phone: e.target.value })}
                            placeholder="Ex: +212 600 000 000"
                            className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-900 transition-colors"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2 space-y-1">
                          <label className="text-[10px] uppercase tracking-widest text-stone-450 font-bold">Adresse de Résidence</label>
                          <input
                            type="text"
                            value={shippingForm.address}
                            onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                            placeholder="Rue, Quartier, Appartement"
                            className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-900 transition-colors"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase tracking-widest text-stone-450 font-bold">Ville</label>
                          <input
                            type="text"
                            value={shippingForm.city}
                            onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                            placeholder="Ex: Casablanca"
                            className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-900 transition-colors"
                          />
                        </div>
                      </div>

                      <div className="pt-4 border-t border-stone-100 space-y-3">
                        <h3 className="text-[10px] uppercase tracking-widest text-stone-450 font-bold">Mode de Règlement</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <label className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all duration-300
                            ${paymentMethod === 'cod' 
                              ? 'border-[#C8956C] bg-[#C8956C]/5 shadow-sm' 
                              : 'border-stone-200 hover:border-stone-400 bg-white'
                            }
                          `}>
                            <div className="flex items-center gap-3">
                              <Truck size={18} className="text-[#C8956C]" />
                              <div className="text-left">
                                <p className="text-xs font-bold text-stone-900">Paiement Cash à Livraison</p>
                                <p className="text-[9px] text-stone-400">Réglez lors de la remise en main propre.</p>
                              </div>
                            </div>
                            <input
                              type="radio"
                              name="payment"
                              value="cod"
                              checked={paymentMethod === 'cod'}
                              onChange={() => setPaymentMethod('cod')}
                              className="accent-[#C8956C]"
                            />
                          </label>

                          <label className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all duration-300
                            ${paymentMethod === 'card' 
                              ? 'border-[#C8956C] bg-[#C8956C]/5 shadow-sm' 
                              : 'border-stone-200 hover:border-stone-400 bg-white'
                            }
                          `}>
                            <div className="flex items-center gap-3">
                              <CreditCard size={18} className="text-[#C8956C]" />
                              <div className="text-left">
                                <p className="text-xs font-bold text-stone-900">Carte Bancaire / En Ligne</p>
                                <p className="text-[9px] text-stone-400">Paiement hautement sécurisé par SSL.</p>
                              </div>
                            </div>
                            <input
                              type="radio"
                              name="payment"
                              value="card"
                              checked={paymentMethod === 'card'}
                              onChange={() => setPaymentMethod('card')}
                              className="accent-[#C8956C]"
                            />
                          </label>
                        </div>
                      </div>

                      <div className="pt-4 flex gap-4">
                        <button
                          type="button"
                          onClick={() => setCheckoutStep(1)}
                          className="px-6 py-4 border border-stone-200 hover:border-stone-400 text-stone-600 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors"
                        >
                          Retour
                        </button>
                        <button
                          type="button"
                          onClick={handlePlaceOrder}
                          disabled={submitting || !shippingForm.address || !shippingForm.city || !shippingForm.phone}
                          className="flex-1 bg-[#1A1A1A] hover:bg-[#C8956C] text-white py-4 text-xs font-bold uppercase tracking-widest transition-all duration-300 rounded-xl shadow-md disabled:bg-stone-200 disabled:text-stone-400 disabled:border-stone-250"
                        >
                          {submitting ? "TRAITEMENT EN COURS..." : "CONFIRMER MA COMMANDE"}
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>

              {/* RIGHT COLUMN: Order Summary */}
              <div className="lg:col-span-4 bg-white rounded-3xl p-6 md:p-8 border border-[#F3F2EE] shadow-sm space-y-6">
                <h2 className="text-lg font-light uppercase tracking-widest text-[#1A1A1A] border-b border-stone-100 pb-4">Résumé</h2>
                
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between text-stone-650">
                    <span>Articles ({cart.items.reduce((s, i) => s + i.quantity, 0)})</span>
                    <span>{subtotal} MAD</span>
                  </div>
                  <div className="flex justify-between text-stone-650">
                    <span>Livraison Signature</span>
                    <span className="text-emerald-600 font-bold uppercase">Gratuite</span>
                  </div>
                  <div className="h-[1px] bg-stone-100 pt-1"></div>
                  <div className="flex justify-between text-sm font-bold text-stone-950 pt-1">
                    <span>Total</span>
                    <span>{total} MAD</span>
                  </div>
                </div>

                {checkoutStep === 1 && (
                  <button
                    onClick={() => setCheckoutStep(2)}
                    className="w-full bg-[#1A1A1A] hover:bg-[#C8956C] text-white py-4 text-xs font-bold uppercase tracking-widest transition-all duration-300 rounded-xl shadow-md flex items-center justify-center gap-2"
                  >
                    Passer la commande
                    <ChevronRight size={16} />
                  </button>
                )}

                <div className="bg-stone-50/50 rounded-2xl p-4 border border-stone-100/50 flex gap-3 text-[10px] text-stone-500 mt-6 leading-relaxed">
                  <ShieldCheck size={16} className="text-[#C8956C] flex-shrink-0" />
                  <div>
                    <p className="font-bold text-stone-750 uppercase">Garantie Haute Couture</p>
                    <p className="mt-0.5">Vos pièces LUMA sont emballées avec le plus grand soin dans un coffret parfumé signature, accompagnées de leur housse de protection en lin.</p>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
      <Footer />
    </div>
  );
}