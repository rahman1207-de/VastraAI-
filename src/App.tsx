import React, { useState } from 'react';
import { 
  Search, 
  MessageSquare, 
  User, 
  ShoppingBag, 
  Filter, 
  Star, 
  ChevronRight,
  Menu,
  X,
  Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

// --- Types ---
interface Product {
  id: number;
  name: string;
  category: 'Men' | 'Women' | 'Kids';
  price: number;
  rating: number;
  image: string;
  tag?: string;
}

// --- Mock Data Generation ---
const generateProducts = (count: number): Product[] => {
  const womenItems = [
    { name: "Silk Saree", basePrice: 4000, img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c" },
    { name: "Anarkali Suit", basePrice: 2500, img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b" },
    { name: "Chanderi Kurti", basePrice: 1200, img: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb" },
    { name: "Lehenga Choli", basePrice: 8500, img: "https://images.unsplash.com/photo-1599733589046-10c7057a9ecb" },
    { name: "Banarasi Dupatta", basePrice: 1500, img: "https://images.unsplash.com/photo-1610189012906-4000854619fd" },
  ];

  const menItems = [
    { name: "Nehru Jacket", basePrice: 2200, img: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35" },
    { name: "Cotton Kurta", basePrice: 1500, img: "https://images.unsplash.com/photo-1597983073493-88cd35cf93b0" },
    { name: "Formal Shirt", basePrice: 1800, img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf" },
    { name: "Sherwani Set", basePrice: 12000, img: "https://images.unsplash.com/photo-1598511028591-45503582f84b" },
    { name: "Linen Trousers", basePrice: 2500, img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1" },
  ];

  const products: Product[] = [];
  const categories: ('Men' | 'Women')[] = ['Men', 'Women'];
  const tags = ["Best Seller", "Trending", "New Arrival", "Limited Edition", undefined];

  for (let i = 1; i <= count; i++) {
    const category = categories[i % 2];
    const templates = category === 'Women' ? womenItems : menItems;
    const template = templates[Math.floor(Math.random() * templates.length)];
    
    products.push({
      id: i,
      name: `${template.name} ${String.fromCharCode(65 + (i % 26))}`,
      category,
      price: template.basePrice + (Math.floor(Math.random() * 10) * 100),
      rating: 4 + (Math.random() * 1),
      image: `${template.img}?q=80&w=800&auto=format&fit=crop&sig=${i}`,
      tag: i % 10 === 0 ? tags[Math.floor(Math.random() * tags.length)] : undefined
    });
  }
  return products;
};

const PRODUCTS: Product[] = generateProducts(240);

const CATEGORIES = [
  { name: 'Men', icon: '👨', color: 'bg-blue-50' },
  { name: 'Women', icon: '👩', color: 'bg-pink-50' },
];

const SIZES = ['XS', 'S', 'M', 'L', 'XL'];
const PRICE_RANGES = ['₹500–₹1000', '₹1000–₹3000', '₹3000+'];

export default function App() {
  const [activeCategory, setActiveCategory] = useState('Women');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* --- Header Section --- */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-100">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-saffron via-white to-green-600 opacity-50" />
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-navy rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">V</span>
              </div>
              <div>
                <h1 className="text-navy font-bold text-lg leading-tight">VastraAI</h1>
                <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Smart Fashion Assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 text-navy hover:bg-slate-100 rounded-full transition-colors">
                <ShoppingBag size={20} />
              </button>
              <button className="p-2 text-navy hover:bg-slate-100 rounded-full transition-colors">
                <User size={20} />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search for Kurtas, Sarees, Shirts..."
              className="w-full bg-slate-100 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-saffron transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* AI Chat Button */}
          <motion.button 
            whileTap={{ scale: 0.98 }}
            className="w-full bg-navy text-white rounded-xl py-3 px-4 flex items-center justify-center gap-2 shadow-lg shadow-navy/20 hover:bg-navy-light transition-colors"
          >
            <MessageSquare size={18} className="text-saffron" />
            <span className="font-semibold text-sm">Ask VastraAI – Your Style Expert</span>
          </motion.button>
        </div>
      </header>

      <main className="max-w-md mx-auto">
        {/* --- Category Section --- */}
        <section className="px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-navy font-bold text-base">Shop by Category</h2>
            <button className="text-saffron text-xs font-semibold flex items-center">
              View All <ChevronRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {CATEGORIES.map((cat) => (
              <motion.button
                key={cat.name}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat.name)}
                className={cn(
                  "flex flex-col items-center gap-2 p-4 rounded-2xl transition-all border-2",
                  activeCategory === cat.name 
                    ? "border-saffron bg-white shadow-md" 
                    : "border-transparent bg-white"
                )}
              >
                <span className="text-3xl">{cat.icon}</span>
                <span className={cn(
                  "text-xs font-bold",
                  activeCategory === cat.name ? "text-navy" : "text-slate-500"
                )}>
                  {cat.name}
                </span>
              </motion.button>
            ))}
          </div>
        </section>

        {/* --- Filter Panel (Quick Access) --- */}
        <section className="px-4 mb-6 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 pb-2">
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-1 bg-white border border-slate-200 rounded-full px-3 py-1.5 text-xs font-semibold text-navy shrink-0"
            >
              <Filter size={14} /> Filters
            </button>
            <div className="h-4 w-[1px] bg-slate-200 shrink-0 mx-1" />
            {SIZES.map(size => (
              <button key={size} className="bg-white border border-slate-200 rounded-full px-4 py-1.5 text-xs font-medium text-slate-600 hover:border-saffron hover:text-saffron transition-colors shrink-0">
                {size}
              </button>
            ))}
          </div>
        </section>

        {/* --- Product Display Section --- */}
        <section className="px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-navy font-bold text-base">Curated for You</h2>
            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">240 Items</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {PRODUCTS.filter(p => p.category === activeCategory || activeCategory === 'All').map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>

      {/* --- Bottom Navigation --- */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-3 z-50">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <NavItem icon={<ShoppingBag size={20} />} label="Shop" active />
          <NavItem icon={<Heart size={20} />} label="Wishlist" />
          <div className="relative -top-6">
            <div className="bg-saffron p-3 rounded-full shadow-xl shadow-saffron/30 border-4 border-white">
              <MessageSquare size={24} className="text-white" />
            </div>
          </div>
          <NavItem icon={<Search size={20} />} label="Explore" />
          <NavItem icon={<User size={20} />} label="Profile" />
        </div>
      </nav>

      {/* --- Filter Sidebar/Modal --- */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed top-0 right-0 bottom-0 w-4/5 max-w-xs bg-white z-[70] shadow-2xl p-6"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-navy font-bold text-xl">Filters</h3>
                <button onClick={() => setIsFilterOpen(false)} className="p-2 hover:bg-slate-100 rounded-full">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-8">
                <div>
                  <h4 className="text-navy font-bold text-sm mb-4 uppercase tracking-wider">Price Range</h4>
                  <div className="space-y-3">
                    {PRICE_RANGES.map(range => (
                      <label key={range} className="flex items-center gap-3 cursor-pointer group">
                        <div className="w-5 h-5 border-2 border-slate-200 rounded flex items-center justify-center group-hover:border-saffron transition-colors">
                          <div className="w-2.5 h-2.5 bg-saffron rounded-sm opacity-0 group-hover:opacity-20" />
                        </div>
                        <span className="text-sm text-slate-600 font-medium">{range}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-navy font-bold text-sm mb-4 uppercase tracking-wider">Brand</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {['FabIndia', 'Biba', 'Manyavar', 'W', 'Peter England', 'Allen Solly'].map(brand => (
                      <button key={brand} className="text-left px-3 py-2 rounded-lg border border-slate-100 text-xs font-medium text-slate-600 hover:border-navy hover:text-navy transition-all">
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-navy font-bold text-sm mb-4 uppercase tracking-wider">Color</h4>
                  <div className="flex flex-wrap gap-3">
                    {['#FF9933', '#1A237E', '#FFFFFF', '#000000', '#E91E63', '#4CAF50'].map(color => (
                      <button 
                        key={color} 
                        className="w-8 h-8 rounded-full border border-slate-200 shadow-sm" 
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <button 
                  onClick={() => setIsFilterOpen(false)}
                  className="w-full bg-navy text-white py-4 rounded-xl font-bold shadow-lg shadow-navy/20"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProductCard({ product }: { product: Product, key?: React.Key }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 group"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-md rounded-full text-slate-400 hover:text-red-500 transition-colors">
          <Heart size={16} />
        </button>
        {product.tag && (
          <div className="absolute top-3 left-3 bg-saffron text-white text-[9px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
            {product.tag}
          </div>
        )}
      </div>
      <div className="p-3">
        <div className="flex items-center gap-1 mb-1">
          <Star size={12} className="fill-saffron text-saffron" />
          <span className="text-[10px] font-bold text-slate-700">{product.rating}</span>
        </div>
        <h3 className="text-navy font-bold text-sm mb-1 line-clamp-1">{product.name}</h3>
        <p className="text-saffron font-bold text-base mb-3">₹{product.price.toLocaleString('en-IN')}</p>
        <button className="w-full py-2 border border-navy/10 rounded-lg text-navy text-xs font-bold hover:bg-navy hover:text-white transition-all">
          View More
        </button>
      </div>
    </motion.div>
  );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <button className={cn(
      "flex flex-col items-center gap-1 transition-colors",
      active ? "text-navy" : "text-slate-400 hover:text-navy"
    )}>
      {icon}
      <span className="text-[10px] font-bold uppercase tracking-tighter">{label}</span>
    </button>
  );
}
