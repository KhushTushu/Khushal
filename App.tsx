
import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  User, 
  Zap, 
  Search, 
  Menu, 
  X, 
  ChevronRight, 
  Star, 
  Flame,
  LayoutDashboard,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { AppSection, Product, CartItem, UserProfile } from './types';
import { MOCK_PRODUCTS } from './constants';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import AIConsultant from './components/AIConsultant';
import AdminPanel from './components/AdminPanel';
import StyleQuiz from './components/StyleQuiz';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.HOME);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);

  // User Mock State
  const [user, setUser] = useState<UserProfile>({
    name: "Alex Rivera",
    email: "alex@genzee.fits",
    preferences: ["Cyberpunk", "Streetwear"],
    sizePreference: "M",
    loyaltyPoints: 1250
  });

  // Handlers
  const addToCart = (product: Product, size: string, color: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === size && item.selectedColor === color);
      if (existing) {
        return prev.map(item => 
          item === existing ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1, selectedSize: size, selectedColor: color }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string, size: string, color: string) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.selectedSize === size && item.selectedColor === color)));
  };

  const toggleWishlist = (id: string) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory ? p.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Navbar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        setIsCartOpen={setIsCartOpen}
        user={user}
      />

      <main className="max-w-7xl mx-auto px-4 pt-24 pb-12">
        {activeSection === AppSection.HOME && (
          <div className="space-y-12">
            {/* Hero Section */}
            <section className="relative h-[60vh] rounded-3xl overflow-hidden glass group">
              <img 
                src="https://picsum.photos/seed/hero3/1600/900" 
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                alt="Hero"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-12 left-12 space-y-4 max-w-xl">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-600/30 border border-purple-400 text-xs font-bold uppercase tracking-widest animate-pulse">
                  Drop 004 Now Live
                </span>
                <h1 className="text-5xl md:text-7xl font-display font-bold leading-none">
                  EVOLVE YOUR <br/><span className="text-gradient">AESTHETIC</span>
                </h1>
                <p className="text-gray-300 text-lg">Curated digital-first fashion for the new generation. Limited drops only.</p>
                <div className="flex gap-4 pt-4">
                  <button 
                    onClick={() => setActiveSection(AppSection.SHOP)}
                    className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-purple-500 hover:text-white transition-colors flex items-center gap-2"
                  >
                    SHOP NOW <ArrowRight size={18} />
                  </button>
                  <button 
                    onClick={() => setShowQuiz(true)}
                    className="px-8 py-4 glass text-white font-bold rounded-full hover:bg-white/10 transition-colors flex items-center gap-2"
                  >
                    STYLE QUIZ <Sparkles size={18} />
                  </button>
                </div>
              </div>
            </section>

            {/* Trending Now */}
            <section>
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="text-3xl font-display font-bold flex items-center gap-2">
                    <Flame className="text-orange-500" /> TRENDING NOW
                  </h2>
                  <p className="text-gray-400">What everyone's wearing right now.</p>
                </div>
                <button 
                  onClick={() => setActiveSection(AppSection.SHOP)}
                  className="text-purple-400 hover:text-purple-300 flex items-center gap-1 font-semibold"
                >
                  View All <ChevronRight size={18} />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {MOCK_PRODUCTS.filter(p => p.trending).map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={addToCart}
                    onToggleWishlist={toggleWishlist}
                    isWishlisted={wishlist.includes(product.id)}
                  />
                ))}
              </div>
            </section>

            {/* AI Experience Promo */}
            <section className="grid md:grid-cols-2 gap-8">
               <div className="p-12 rounded-3xl bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-500/30 flex flex-col justify-center items-start space-y-6">
                 <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center neon-glow">
                   <Zap className="text-white" />
                 </div>
                 <h2 className="text-4xl font-display font-bold">Personalized Outfit <br/> AI Engines</h2>
                 <p className="text-gray-300 leading-relaxed">Our Gemini-powered fashion engine learns your vibes to suggest the perfect fits for your next event. No more scrolling aimlessly.</p>
                 <button 
                   onClick={() => setActiveSection(AppSection.AI_LAB)}
                   className="px-6 py-3 bg-purple-500 rounded-full font-bold hover:bg-purple-600 transition-colors"
                 >
                   Launch Style Lab
                 </button>
               </div>
               <div className="rounded-3xl overflow-hidden glass group">
                 <img 
                   src="https://picsum.photos/seed/fashion55/800/800" 
                   className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000" 
                   alt="AI Fashion"
                 />
               </div>
            </section>
          </div>
        )}

        {activeSection === AppSection.SHOP && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h2 className="text-4xl font-display font-bold">THE CATALOG</h2>
              <div className="flex gap-2 flex-wrap">
                {['Men', 'Women', 'Accessories', 'Footwear'].map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                    className={`px-4 py-2 rounded-full border transition-all ${selectedCategory === cat ? 'bg-white text-black border-white' : 'border-white/20 text-white hover:border-white/50'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input 
                type="text" 
                placeholder="Search styles, trends, or drops..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-purple-500/50 transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={addToCart}
                    onToggleWishlist={toggleWishlist}
                    isWishlisted={wishlist.includes(product.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 glass rounded-3xl">
                <Search size={48} className="mx-auto mb-4 text-gray-600" />
                <h3 className="text-2xl font-bold">No styles found</h3>
                <p className="text-gray-400">Try adjusting your filters or search term.</p>
              </div>
            )}
          </div>
        )}

        {activeSection === AppSection.AI_LAB && (
          <div className="max-w-4xl mx-auto">
            <AIConsultant products={MOCK_PRODUCTS} onAddToCart={addToCart} />
          </div>
        )}

        {activeSection === AppSection.WISHLIST && (
          <div className="space-y-8">
            <h2 className="text-4xl font-display font-bold">SAVED DROPS</h2>
            {wishlist.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {MOCK_PRODUCTS.filter(p => wishlist.includes(p.id)).map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={addToCart}
                    onToggleWishlist={toggleWishlist}
                    isWishlisted={true}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 glass rounded-3xl">
                <Heart size={48} className="mx-auto mb-4 text-gray-600" />
                <h3 className="text-2xl font-bold">Your wishlist is empty</h3>
                <p className="text-gray-400">Save items you vibe with for later.</p>
                <button 
                  onClick={() => setActiveSection(AppSection.SHOP)}
                  className="mt-6 px-8 py-3 bg-purple-500 rounded-full font-bold"
                >
                  Browse Store
                </button>
              </div>
            )}
          </div>
        )}

        {activeSection === AppSection.ADMIN && (
          <AdminPanel products={MOCK_PRODUCTS} />
        )}

        {activeSection === AppSection.PROFILE && (
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="flex items-center gap-6 p-8 glass rounded-3xl">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-purple-500/30">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="Avatar" />
              </div>
              <div>
                <h2 className="text-3xl font-display font-bold">{user.name}</h2>
                <p className="text-gray-400">{user.email}</p>
                <div className="flex items-center gap-2 mt-2 text-purple-400 font-bold">
                  <Star size={16} fill="currentColor" /> {user.loyaltyPoints} G-Points
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 glass rounded-2xl">
                <h3 className="font-bold mb-4 flex items-center gap-2"><Sparkles size={18} className="text-purple-400" /> Style DNA</h3>
                <div className="flex flex-wrap gap-2">
                  {user.preferences.map(pref => (
                    <span key={pref} className="px-3 py-1 bg-white/10 rounded-full text-sm">{pref}</span>
                  ))}
                  <button className="px-3 py-1 border border-white/20 rounded-full text-sm text-gray-400 hover:border-white/50 transition-colors">+ Add</button>
                </div>
              </div>
              <div className="p-6 glass rounded-2xl">
                <h3 className="font-bold mb-4 flex items-center gap-2"><ShoppingBag size={18} className="text-purple-400" /> Recent Orders</h3>
                <p className="text-sm text-gray-500">Order #88219 - Delivered June 12</p>
                <p className="text-sm text-gray-500">Order #88104 - Shipped June 05</p>
              </div>
            </div>
          </div>
        )}
      </main>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        onRemove={removeFromCart}
        onUpdateQuantity={(id, s, c, q) => {
          setCart(prev => prev.map(item => 
            (item.id === id && item.selectedSize === s && item.selectedColor === c) ? { ...item, quantity: q } : item
          ).filter(item => item.quantity > 0));
        }}
      />

      {showQuiz && <StyleQuiz onClose={() => setShowQuiz(false)} onComplete={(prefs) => {
        setUser(prev => ({ ...prev, preferences: prefs }));
        setShowQuiz(false);
        setActiveSection(AppSection.AI_LAB);
      }} />}

      {/* Floating Action Navigation (Mobile) */}
      <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] glass rounded-full px-6 py-4 flex justify-between items-center z-50">
        <button onClick={() => setActiveSection(AppSection.HOME)} className={`p-2 rounded-full transition-colors ${activeSection === AppSection.HOME ? 'bg-purple-500 text-white' : 'text-gray-400'}`}>
          <Menu size={20} />
        </button>
        <button onClick={() => setActiveSection(AppSection.SHOP)} className={`p-2 rounded-full transition-colors ${activeSection === AppSection.SHOP ? 'bg-purple-500 text-white' : 'text-gray-400'}`}>
          <ShoppingBag size={20} />
        </button>
        <button onClick={() => setActiveSection(AppSection.AI_LAB)} className={`p-2 rounded-full transition-colors ${activeSection === AppSection.AI_LAB ? 'bg-purple-500 text-white' : 'text-gray-400'}`}>
          <Sparkles size={20} />
        </button>
        <button onClick={() => setActiveSection(AppSection.WISHLIST)} className={`p-2 rounded-full transition-colors ${activeSection === AppSection.WISHLIST ? 'bg-purple-500 text-white' : 'text-gray-400'}`}>
          <Heart size={20} />
        </button>
        <button onClick={() => setActiveSection(AppSection.PROFILE)} className={`p-2 rounded-full transition-colors ${activeSection === AppSection.PROFILE ? 'bg-purple-500 text-white' : 'text-gray-400'}`}>
          <User size={20} />
        </button>
      </nav>
    </div>
  );
};

export default App;
