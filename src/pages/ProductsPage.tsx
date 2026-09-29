import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Star, 
  ShieldCheck, 
  Cpu, 
  Droplet, 
  Battery, 
  Scale, 
  ShoppingBag, 
  UserCheck, 
  ArrowRight,
  SlidersHorizontal
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCategory, Product } from '../types';

export const ProductsPage: React.FC = () => {
  const { 
    products, 
    productCategoryFilter, 
    setProductCategoryFilter, 
    setSelectedProduct, 
    addToCart, 
    setIsCartOpen,
    navigateTo 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [waterproofOnly, setWaterproofOnly] = useState(false);

  // Subcategories available based on active category
  const subCategories = useMemo(() => {
    const list = new Set<string>();
    products.forEach(p => {
      if (productCategoryFilter === 'all' || p.category === productCategoryFilter) {
        list.add(p.subCategory);
      }
    });
    return Array.from(list);
  }, [products, productCategoryFilter]);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let result = products.filter(p => {
      // Category filter
      if (productCategoryFilter !== 'all' && p.category !== productCategoryFilter) {
        return false;
      }
      // Subcategory
      if (selectedSubCategory !== 'all' && p.subCategory !== selectedSubCategory) {
        return false;
      }
      // Waterproof toggle
      if (waterproofOnly && !p.isWaterproof) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesTag = p.tagline.toLowerCase().includes(query);
        const matchesSub = p.subCategory.toLowerCase().includes(query);
        const matchesDesc = p.description.toLowerCase().includes(query);
        return matchesName || matchesTag || matchesSub || matchesDesc;
      }
      return true;
    });

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, productCategoryFilter, selectedSubCategory, waterproofOnly, searchQuery, sortBy]);

  const handleQuickAdd = (product: Product) => {
    addToCart({
      id: `${product.id}-quick-${Date.now()}`,
      type: 'product',
      productId: product.id,
      name: product.name,
      category: product.category,
      unitPrice: product.price,
      quantity: 1,
      image: product.image,
      options: {
        side: 'Right',
        socketCustomization: 'Standard High-Activity Socket'
      }
    });
    setIsCartOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Banner */}
      <div className="rounded-3xl bg-slate-900 border-2 border-blue-500/40 p-8 sm:p-10 relative overflow-hidden shadow-2xl shadow-blue-500/10">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-600/20 border border-blue-500/40 text-xs text-blue-300 font-bold">
            <Cpu className="w-3.5 h-3.5 text-blue-400" />
            <span>Biomechanical Engineering & Product Sales</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
            Prosthetic & Bionic Hardware Systems
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Engineered for biological fluidity, real-time ground reaction response, and delicate tactile control. Available via clinical prescription, healthcare insurance co-pay, or direct medical acquisition.
          </p>
        </div>
      </div>

      {/* Main Filter & Navigation Controls */}
      <div className="space-y-4">
        {/* Category Switcher (All / Legs / Hands) */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setProductCategoryFilter('all');
                setSelectedSubCategory('all');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                productCategoryFilter === 'all'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              All Hardware ({products.length})
            </button>

            <button
              onClick={() => {
                setProductCategoryFilter('legs');
                setSelectedSubCategory('all');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                productCategoryFilter === 'legs'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/40 glow-blue'
                  : 'bg-slate-900 text-blue-300 hover:text-white border border-blue-500/40'
              }`}
            >
              <span>🦵 Bionic Legs & Blades (4)</span>
            </button>

            <button
              onClick={() => {
                setProductCategoryFilter('hands');
                setSelectedSubCategory('all');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                productCategoryFilter === 'hands'
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/40 glow-red'
                  : 'bg-slate-900 text-red-300 hover:text-white border border-red-500/40'
              }`}
            >
              <span>🦾 Bionic Hands & Arms (4)</span>
            </button>
          </div>

          {/* Registration Hook Button */}
          <button
            onClick={() => navigateTo('registration', {
              registrationType: productCategoryFilter === 'hands' ? 'hands' : 'legs'
            })}
            className="text-xs font-bold text-red-300 hover:text-white flex items-center gap-1.5 bg-red-600/20 px-3.5 py-2 rounded-xl border border-red-500/40 hover:bg-red-600 transition-all"
          >
            <UserCheck className="w-4 h-4 text-red-400" />
            <span>Need Custom Socket Scanning? Register Intake</span>
          </button>
        </div>

        {/* Search, SubCategory & Sorting Toolbar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Search Input */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by model, microprocessor, grip type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Subcategory select */}
          <div className="md:col-span-3">
            <select
              value={selectedSubCategory}
              onChange={(e) => setSelectedSubCategory(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500 font-semibold"
            >
              <option value="all">All Anatomical Levels</option>
              {subCategories.map((sub) => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </div>

          {/* Sorting */}
          <div className="md:col-span-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500 font-semibold"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {/* Waterproof toggle */}
          <div className="md:col-span-2">
            <button
              onClick={() => setWaterproofOnly(!waterproofOnly)}
              className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition-colors ${
                waterproofOnly
                  ? 'bg-blue-600 border-blue-500 text-white shadow-md'
                  : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
              }`}
            >
              <Droplet className="w-3.5 h-3.5 text-blue-400" />
              <span>IP68 Waterproof</span>
            </button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-xs text-slate-400 flex items-center justify-between">
        <span>Showing <strong className="text-white">{filteredProducts.length}</strong> prosthetic devices</span>
        {filteredProducts.length === 0 && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedSubCategory('all');
              setWaterproofOnly(false);
              setProductCategoryFilter('all');
            }}
            className="text-blue-400 font-bold hover:underline"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Product Cards Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center bg-slate-900 rounded-2xl border border-slate-800">
          <p className="text-slate-300 text-sm">No prosthetic devices matched your current filter criteria.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedSubCategory('all');
              setWaterproofOnly(false);
              setProductCategoryFilter('all');
            }}
            className="mt-3 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="rounded-2xl bg-slate-900 border-2 border-slate-800 hover:border-blue-500/60 flex flex-col justify-between overflow-hidden group transition-all duration-300 hover:shadow-2xl shadow-lg"
            >
              <div>
                {/* Image Header */}
                <div className="relative aspect-video overflow-hidden bg-slate-950">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-black/30 to-transparent"></div>

                  <span className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded shadow ${
                    product.category === 'legs'
                      ? 'bg-blue-600 text-white'
                      : 'bg-red-600 text-white'
                  }`}>
                    {product.category === 'legs' ? '🦵 Bionic Leg' : '🦾 Bionic Hand'}
                  </span>

                  {product.badge && (
                    <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-600 text-white">
                      {product.badge}
                    </span>
                  )}

                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-slate-200">
                    <span className="bg-black/70 px-2 py-0.5 rounded backdrop-blur-sm font-semibold">
                      {product.subCategory}
                    </span>
                    <span className="flex items-center gap-1 text-amber-400 bg-black/70 px-2 py-0.5 rounded backdrop-blur-sm font-bold">
                      <Star className="w-3 h-3 fill-amber-400" /> {product.rating}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 space-y-3">
                  <h3 className="font-bold text-white text-lg font-heading group-hover:text-blue-400 transition-colors">
                    {product.name}
                  </h3>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Spec pills */}
                  <div className="grid grid-cols-3 gap-1.5 pt-1 text-center">
                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                      <Scale className="w-3.5 h-3.5 mx-auto text-blue-400 mb-0.5" />
                      <div className="text-[10px] text-slate-300 font-semibold">{product.weightGrams}g</div>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                      <Battery className="w-3.5 h-3.5 mx-auto text-emerald-400 mb-0.5" />
                      <div className="text-[10px] text-slate-300 font-semibold">
                        {product.batteryLifeHours ? `${product.batteryLifeHours}h` : 'Passive'}
                      </div>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                      <Droplet className={`w-3.5 h-3.5 mx-auto mb-0.5 ${product.isWaterproof ? 'text-blue-400' : 'text-slate-500'}`} />
                      <div className="text-[10px] text-slate-300 font-semibold">{product.isWaterproof ? 'IP68' : 'Standard'}</div>
                    </div>
                  </div>

                  {/* Pricing info */}
                  <div className="pt-2 border-t border-slate-800 flex items-baseline justify-between">
                    <div>
                      <div className="text-[10px] text-slate-400">Clinical Base MSRP</div>
                      <div className="text-xl font-extrabold text-white">${product.price.toLocaleString()}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-emerald-400 font-bold">Insurance Co-Pay OK</div>
                      <div className="text-[10px] text-slate-400">Warranty: {product.warrantyYears} yrs</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedProduct(product)}
                  className="py-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors text-center"
                >
                  Full Specs
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickAdd(product)}
                  className="py-2.5 rounded-xl font-bold text-xs text-white bg-blue-600 hover:bg-blue-500 flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/30 transition-all"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Order / Trial</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Clinical Fitting Advisory */}
      <div className="p-6 rounded-2xl bg-slate-900 border-2 border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-emerald-400 shrink-0" />
          <div>
            <h4 className="text-white text-sm font-bold font-heading">Prosthetic Fitment Guarantee</h4>
            <p className="text-xs text-slate-300 mt-0.5">
              Every prosthesis includes a 90-day socket volume comfort guarantee, free digital adjustments, and certified gait training.
            </p>
          </div>
        </div>
        <button
          onClick={() => navigateTo('registration')}
          className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-500 shrink-0 shadow-md shadow-red-600/30"
        >
          Book Socket Fitting
        </button>
      </div>

    </div>
  );
};
