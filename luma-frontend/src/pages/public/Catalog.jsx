import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import api from '../../api/axiosInstance';
import { useAuthStore } from '../../store/authStore';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { Search, SlidersHorizontal, Grid, Archive, Image, ShoppingBag } from 'lucide-react';

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const [quickAddingId, setQuickAddingId] = useState(null);
  
  // Active filters in state
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedGender, setSelectedGender] = useState(searchParams.get('gender') || 'all');
  const [selectedCat, setSelectedCat] = useState(searchParams.get('category') || 'all');

  useEffect(() => {
    fetchCategories();
  }, []);

  // Sync state when URL params change (e.g. navigation from Home page links)
  useEffect(() => {
    const gender = searchParams.get('gender') || 'all';
    const category = searchParams.get('category') || 'all';
    const search = searchParams.get('search') || '';
    
    if (gender !== selectedGender) setSelectedGender(gender);
    if (category !== selectedCat) setSelectedCat(category);
    if (search !== searchTerm) setSearchTerm(search);
  }, [searchParams]);

  useEffect(() => {
    fetchProducts();
    
    // Sync URL search params
    const params = {};
    if (searchTerm) params.search = searchTerm;
    if (selectedGender !== 'all') params.gender = selectedGender;
    if (selectedCat !== 'all') params.category = selectedCat;
    setSearchParams(params);

  }, [searchTerm, selectedGender, selectedCat]);

  const fetchCategories = () => {
    api.get('/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  };

  const fetchProducts = () => {
    setLoading(true);
    const query = {};
    if (searchTerm) query.search = searchTerm;
    if (selectedGender !== 'all') query.gender = selectedGender;
    if (selectedCat !== 'all') query.category = selectedCat;

    // Convert query object to search params query string
    const qs = new URLSearchParams(query).toString();

    api.get(`/products?${qs}`)
      .then(res => {
        // Handle paginated structure from laravel: res.data.data or flat list res.data
        setProducts(res.data.data || res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const handleQuickAdd = async (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const firstVariant = product.variants && product.variants.length > 0 ? product.variants[0] : null;
    if (!firstVariant) {
      alert("Cette création n'est pas disponible pour le moment.");
      return;
    }

    setQuickAddingId(product.id);
    try {
      await api.post('/client/cart/add', {
        product_id: product.id,
        product_variant_id: firstVariant.id,
        quantity: 1
      });
      // Show check success animation for 2 seconds
      setTimeout(() => setQuickAddingId(null), 2000);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'ajout au panier.");
      setQuickAddingId(null);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
      <Navbar />

      {/* Hero Header */}
      <div className="bg-[#FAF9F6] py-12 px-6 md:py-20 text-center border-b border-stone-100">
        <p className="text-[10px] tracking-[0.4em] uppercase text-[#9E7755] font-semibold mb-3">Maison Luma</p>
        <h1 className="text-4xl md:text-5xl font-extralight tracking-wide text-stone-900 uppercase">La Collection</h1>
        <p className="text-xs text-stone-400 mt-3 max-w-md mx-auto font-light">Explorez notre sélection haut de gamme de robes d’exception et d’accessoires d’ateliers d’art.</p>
      </div>

      {/* Catalog Body */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 flex flex-col lg:flex-row gap-8" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
        
        {/* SIDEBAR FILTERS (Luxury Minimalist) */}
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-8">
          
          {/* Search box */}
          <div className="space-y-2">
            <h3 className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Recherche</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-300" size={16} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher une pièce..."
                className="w-full pl-9 pr-4 py-3 bg-white border border-stone-200 rounded-xl text-xs tracking-wider placeholder-stone-300 focus:outline-none focus:border-stone-900 transition-colors uppercase"
              />
            </div>
          </div>

          {/* Gender choices */}
          <div className="space-y-2">
            <h3 className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Ligne</h3>
            <div className="flex flex-col space-y-1">
              {[
                { id: 'all', name: 'Toutes les lignes' },
                { id: 'women', name: 'Ligne Féminine' },
                { id: 'kids', name: "L'Enfant Épuré" }
              ].map((g) => (
                <button
                  key={g.id}
                  onClick={() => setSelectedGender(g.id)}
                  className={`text-left py-2 text-xs transition-colors tracking-wide
                    ${selectedGender === g.id 
                      ? 'text-[#C8956C] font-semibold border-l-2 border-[#C8956C] pl-2' 
                      : 'text-stone-500 hover:text-stone-900 pl-2'
                    }
                  `}
                >
                  {g.name}
                </button>
              ))}
            </div>
          </div>

          {/* Categories */}
          {categories.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Catégories</h3>
              <div className="flex flex-col space-y-1">
                <button
                  onClick={() => setSelectedCat('all')}
                  className={`text-left py-2 text-xs transition-colors tracking-wide
                    ${selectedCat === 'all' 
                      ? 'text-[#C8956C] font-semibold border-l-2 border-[#C8956C] pl-2' 
                      : 'text-stone-500 hover:text-stone-900 pl-2'
                    }
                  `}
                >
                  Toutes les catégories
                </button>
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCat(c.id.toString())}
                    className={`text-left py-2 text-xs transition-colors tracking-wide
                      ${selectedCat === c.id.toString() 
                        ? 'text-[#C8956C] font-semibold border-l-2 border-[#C8956C] pl-2' 
                        : 'text-stone-500 hover:text-stone-900 pl-2'
                      }
                    `}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
          )}

        </aside>

        {/* PRODUCTS GRID AREA */}
        <main className="flex-1">
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <div className="w-10 h-10 border-4 border-[#C8956C] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="bg-[#FCFCFA] rounded-3xl p-16 text-center border border-stone-100 flex flex-col items-center justify-center space-y-4">
              <Archive size={40} className="text-stone-200" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-850">Aucune pièce disponible</h3>
              <p className="text-xs text-stone-400 max-w-xs mx-auto">Il n'y a actuellement aucune création correspondant à vos critères de recherche.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {products.map((product) => {
                const finalPrice = product.sale_price ?? product.price;
                return (
                  <Link 
                    key={product.id} 
                    to={`/products/${product.slug}`}
                    className="group flex flex-col justify-between"
                  >
                    <div>
                      {/* Card Image Wrapper */}
                      <div className="aspect-[3/4] bg-[#FAF9F6] rounded-2xl overflow-hidden border border-stone-100/50 flex items-center justify-center p-4 relative group/img">
                        {product.image ? (
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover rounded-xl transition-transform duration-1000 group-hover:scale-102"
                          />
                        ) : (
                          <Image className="w-8 h-8 text-stone-200 group-hover:scale-110 transition-transform" />
                        )}
                        <span className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-stone-800 rounded border border-stone-100 shadow-sm">
                          {product.gender === 'women' ? 'Femme' : 'Enfant'}
                        </span>

                        {/* Floating Quick Add Icon (Shopping Bag Logo) */}
                        {product.variants && product.variants.length > 0 && (
                          <button
                            onClick={(e) => handleQuickAdd(e, product)}
                            disabled={quickAddingId === product.id}
                            className={`absolute right-4 bottom-4 w-10 h-10 rounded-full flex items-center justify-center border shadow-md transition-all duration-300 transform translate-y-2 opacity-0 group-hover/img:translate-y-0 group-hover/img:opacity-100
                              ${quickAddingId === product.id
                                ? 'bg-emerald-500 border-emerald-500 text-white'
                                : 'bg-white hover:bg-stone-900 border-stone-150 hover:border-stone-900 text-stone-700 hover:text-white'
                              }
                            `}
                            title="Ajouter au panier"
                          >
                            {quickAddingId === product.id ? (
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce"><polyline points="20 6 9 17 4 12"/></svg>
                            ) : (
                              <ShoppingBag size={16} />
                            )}
                          </button>
                        )}
                      </div>

                      {/* Card Content details */}
                      <div className="mt-4 space-y-1 px-1">
                        <span className="text-[9px] uppercase tracking-widest text-[#C8956C] font-semibold">
                          {product.category?.name || 'Couture'}
                        </span>
                        <h3 className="text-sm font-light text-stone-900 group-hover:text-[#C8956C] transition-colors truncate">
                          {product.name}
                        </h3>
                      </div>
                    </div>

                    <div className="mt-2 px-1 flex items-center justify-between">
                      <p className="text-xs font-bold text-stone-950 tracking-wide">
                        {finalPrice} MAD
                        {product.sale_price && (
                          <span className="text-[10px] text-stone-400 line-through ml-2 font-normal">{product.price} MAD</span>
                        )}
                      </p>
                      <span className="text-[9px] font-bold uppercase tracking-widest text-stone-400 group-hover:text-stone-900 transition-colors flex items-center gap-1">
                        Détails
                        <ChevronRight size={10} />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </main>

      </div>

      <Footer />
    </div>
  );
}

// Quick helper
function ChevronRight({ size }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
  );
}