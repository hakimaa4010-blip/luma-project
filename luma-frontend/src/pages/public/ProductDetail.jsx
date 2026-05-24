import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../../api/axiosInstance';
import { useAuthStore } from '../../store/authStore';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { ShieldCheck, Truck, ArrowLeft, Heart, ShoppingBag, Check } from 'lucide-react';

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get(`/products/${slug}`)
      .then(res => {
        setProduct(res.data);
        if (res.data.variants && res.data.variants.length > 0) {
          setSelectedVariant(res.data.variants[0]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Erreur lors du chargement du produit", err);
        setLoading(false);
      });
  }, [slug]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!selectedVariant) {
      alert("Veuillez sélectionner une taille / variante.");
      return;
    }

    setAdding(true);
    setAddedSuccess(false);
    try {
      await api.post('/client/cart/add', {
        product_id: product.id,
        product_variant_id: selectedVariant.id,
        quantity: quantity
      });
      setAddedSuccess(true);
      setTimeout(() => setAddedSuccess(false), 4000);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'ajout au panier.");
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#C8956C] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center space-y-4">
        <p className="text-stone-400">Produit introuvable.</p>
        <Link to="/catalog" className="text-sm font-semibold text-[#C8956C] uppercase tracking-wider underline">Retour au catalogue</Link>
      </div>
    );
  }

  const price = product.sale_price ?? product.price;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
      <Navbar />

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
        
        {/* Back Link */}
        <Link to="/catalog" className="inline-flex items-center text-xs uppercase tracking-widest text-stone-450 hover:text-stone-900 transition-colors mb-10 gap-2">
          <ArrowLeft size={14} />
          Retour au Catalogue
        </Link>

        {/* Product Grid details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Product Image showcase */}
          <div className="bg-[#FAF9F6] rounded-3xl overflow-hidden border border-stone-100 p-4 flex items-center justify-center min-h-[400px] md:min-h-[550px]">
            {product.image ? (
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full max-h-[500px] object-contain rounded-2xl hover:scale-105 transition-transform duration-700" 
              />
            ) : (
              <ShoppingBag size={80} className="text-stone-200 animate-pulse" />
            )}
          </div>

          {/* RIGHT COLUMN: Product details purchasing actions */}
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C8956C] font-semibold">{product.category?.name}</span>
              <h1 className="text-3xl md:text-4xl font-extralight tracking-wide text-stone-900 leading-tight">{product.name}</h1>
              <p className="text-2xl font-light text-[#C8956C] pt-2">
                {price} MAD
                {product.sale_price && (
                  <span className="text-sm text-stone-400 line-through ml-3 font-normal">{product.price} MAD</span>
                )}
              </p>
            </div>

            <div className="h-[1px] bg-stone-100"></div>

            <div className="space-y-3">
              <h3 className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">L'histoire de la Pièce</h3>
              <p className="text-sm text-stone-600 leading-relaxed font-light">{product.description || "Aucune description de la pièce n'est fournie."}</p>
            </div>

            {/* Variant choices */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Taille & Coupe</h3>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => {
                    const isSelected = selectedVariant?.id === v.id;
                    return (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariant(v)}
                        className={`px-4 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider border transition-all duration-200 flex items-center gap-2
                          ${isSelected 
                            ? 'border-stone-900 bg-stone-900 text-white shadow-sm' 
                            : 'border-stone-200 hover:border-stone-400 text-stone-700 bg-white'
                          }
                        `}
                      >
                        {v.size}
                        {v.color && <span className="text-[10px] opacity-70">({v.color})</span>}
                      </button>
                    );
                  })}
                </div>
                {selectedVariant && (
                  <p className="text-[10px] text-stone-400 italic">
                    Disponibilité : <span className={`font-semibold ${selectedVariant.stock > 0 ? 'text-emerald-600' : 'text-red-500'}`}>{selectedVariant.stock > 0 ? `${selectedVariant.stock} pièces en stock` : 'Rupture de stock'}</span>
                  </p>
                )}
              </div>
            )}

            {/* Quantity Selector */}
            <div className="space-y-3">
              <h3 className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Quantité</h3>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-stone-200 hover:border-stone-400 text-stone-600 flex items-center justify-center rounded-lg text-lg select-none transition-colors"
                >
                  -
                </button>
                <span className="w-12 text-center text-sm font-bold text-stone-900">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-stone-200 hover:border-stone-400 text-stone-600 flex items-center justify-center rounded-lg text-lg select-none transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-4 space-y-3">
              {addedSuccess && (
                <div className="p-4 bg-emerald-50 border-l-2 border-emerald-500 text-xs text-emerald-800 tracking-wide rounded-lg flex items-center gap-2 animate-fade-in">
                  <Check size={14} className="text-emerald-600 flex-shrink-0" />
                  <span>Pièce ajoutée avec succès au panier. <Link to="/cart" className="underline font-bold">Voir mon panier</Link></span>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={adding || (selectedVariant && selectedVariant.stock === 0)}
                  className="flex-1 bg-[#1A1A1A] hover:bg-[#C8956C] text-white py-4 text-xs font-bold uppercase tracking-widest transition-all duration-300 rounded-xl shadow-md disabled:bg-stone-200 disabled:text-stone-400 disabled:border-stone-250 flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={16} />
                  {adding ? "AJOUT EN COURS..." : selectedVariant && selectedVariant.stock === 0 ? "RUPTURE DE STOCK" : "AJOUTER AU PANIER"}
                </button>
                
                <button className="px-5 border border-stone-200 hover:border-stone-400 text-stone-500 hover:text-red-500 rounded-xl transition-all duration-300 flex items-center justify-center">
                  <Heart size={18} />
                </button>
              </div>
            </div>

            {/* Guarantees */}
            <div className="pt-6 border-t border-stone-100 grid grid-cols-2 gap-4 text-[10px] text-stone-500 leading-relaxed">
              <div className="flex gap-2">
                <Truck size={16} className="text-[#C8956C] flex-shrink-0" />
                <div>
                  <p className="font-bold text-stone-750 uppercase">Livraison Signature</p>
                  <p className="mt-0.5">Expédition sécurisée et soignée sous 48 heures au Maroc.</p>
                </div>
              </div>
              <div className="flex gap-2">
                <ShieldCheck size={16} className="text-[#C8956C] flex-shrink-0" />
                <div>
                  <p className="font-bold text-stone-750 uppercase">Service Concierge</p>
                  <p className="mt-0.5">Assistance téléphonique et retours facilités à domicile.</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      <Footer />
    </div>
  );
}