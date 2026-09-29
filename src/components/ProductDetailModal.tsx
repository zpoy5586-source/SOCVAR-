import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Zap, 
  Check, 
  Scale, 
  Battery, 
  Droplet, 
  Clock, 
  ShoppingBag, 
  UserCheck, 
  Star,
  Cpu,
  Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addToCart, navigateTo, setIsCartOpen } = useApp();

  const [selectedSide, setSelectedSide] = useState<'Left' | 'Right' | 'Bilateral Pair'>('Right');
  const [socketOption, setSocketOption] = useState<string>('Custom 3D Titanium Matrix Socket');
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCart = () => {
    addToCart({
      id: `${product.id}-${selectedSide}-${Date.now()}`,
      type: 'product',
      productId: product.id,
      name: product.name,
      category: product.category,
      unitPrice: product.price,
      quantity,
      image: product.image,
      options: {
        side: selectedSide,
        socketCustomization: socketOption
      }
    });
    setIsCartOpen(true);
    onClose();
  };

  const handleProceedToRegistration = () => {
    onClose();
    navigateTo('registration', {
      registrationType: product.category === 'legs' ? 'legs' : 'hands'
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative bg-[#0c101d] border border-slate-700/80 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image & Key Attributes */}
          <div className="p-6 md:p-8 bg-gradient-to-b from-[#0f172a] to-[#070b14] flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-xs px-2.5 py-1 rounded-md font-bold uppercase tracking-wider ${
                  product.category === 'legs' 
                    ? 'bg-blue-900/50 text-blue-300 border border-blue-700/50'
                    : 'bg-red-900/50 text-red-300 border border-red-700/50'
                }`}>
                  {product.category === 'legs' ? '🦵 Bionic Leg System' : '🦾 Bionic Hand System'}
                </span>
                {product.badge && (
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-900/50 text-emerald-300 border border-emerald-700/40 font-semibold">
                    {product.badge}
                  </span>
                )}
              </div>

              <div className="relative rounded-xl overflow-hidden border border-slate-700/70 shadow-inner group aspect-video md:aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070b14]/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300">
                  <span className="bg-black/60 px-2 py-1 rounded backdrop-blur-sm border border-slate-700">
                    Lead Time: ~{product.leadTimeDays} days
                  </span>
                  <span className="bg-black/60 px-2 py-1 rounded backdrop-blur-sm border border-slate-700 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> {product.warrantyYears} Years Warranty
                  </span>
                </div>
              </div>

              {/* Quick Tech Metrics */}
              <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <Scale className="w-4 h-4 mx-auto text-blue-400 mb-1" />
                  <div className="text-[10px] text-slate-400 uppercase">Weight</div>
                  <div className="text-xs font-bold text-white">{product.weightGrams}g</div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <Battery className="w-4 h-4 mx-auto text-emerald-400 mb-1" />
                  <div className="text-[10px] text-slate-400 uppercase">Battery</div>
                  <div className="text-xs font-bold text-white">
                    {product.batteryLifeHours ? `${product.batteryLifeHours}h` : 'Passive'}
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <Droplet className={`w-4 h-4 mx-auto mb-1 ${product.isWaterproof ? 'text-cyan-400' : 'text-slate-500'}`} />
                  <div className="text-[10px] text-slate-400 uppercase">Waterproof</div>
                  <div className="text-xs font-bold text-white">{product.isWaterproof ? 'Yes (IP68)' : 'Resistant'}</div>
                </div>
              </div>
            </div>

            {/* Clinical Certification Notice */}
            <div className="mt-6 p-3 rounded-lg bg-blue-950/30 border border-blue-800/40 text-xs text-blue-300 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Includes 1-on-1 CPO prosthetist fitting calibration and digital gait alignment session.</span>
            </div>
          </div>

          {/* Details & Customization Selection */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-amber-400 mb-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold">{product.rating}</span>
                  <span className="text-slate-400">({product.reviewCount} amputee clinical reviews)</span>
                </div>
                <h3 className="text-2xl font-bold text-white font-heading">{product.name}</h3>
                <p className="text-xs text-blue-400 font-medium mt-0.5">{product.subCategory}</p>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {product.description}
              </p>

              {/* Price & Insurance info */}
              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400">Standard Clinical MSRP</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-white">${product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                      <span className="text-sm line-through text-slate-500">
                        ${product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-emerald-400 font-medium block">Insurance Co-Pay Eligible</span>
                  <span className="text-[10px] text-slate-400">0% APR Financing from $390/mo</span>
                </div>
              </div>

              {/* Options selection */}
              <div className="space-y-3 pt-2">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Amputation Side Orientation
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Left', 'Right', 'Bilateral Pair'] as const).map((side) => (
                      <button
                        key={side}
                        type="button"
                        onClick={() => setSelectedSide(side)}
                        className={`py-2 px-3 rounded-lg text-xs font-medium border transition-all ${
                          selectedSide === side
                            ? 'bg-blue-600/30 border-blue-500 text-white shadow-sm shadow-blue-500/20'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        {side}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Socket / Interface Configuration
                  </label>
                  <select
                    value={socketOption}
                    onChange={(e) => setSocketOption(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                  >
                    <option value="Custom 3D Titanium Matrix Socket">Custom 3D Titanium Matrix Socket (Recommended)</option>
                    <option value="Active Smart Vacuum Liner Attachment">Active Smart Vacuum Liner Attachment</option>
                    <option value="Modular Osseointegrated Direct Clamp">Modular Direct Skeletal Attachment Interface</option>
                    <option value="Pylon Only (Connect to existing socket)">Pylon Only (Connect to my existing custom socket)</option>
                  </select>
                </div>
              </div>

              {/* Specs Table */}
              <div className="pt-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Technical Specifications
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs bg-slate-900/50 p-3 rounded-lg border border-slate-800/80">
                  {product.specs.map((s, idx) => (
                    <div key={idx} className="flex justify-between py-1 border-b border-slate-800/60 last:border-0">
                      <span className="text-slate-400">{s.label}:</span>
                      <span className="text-slate-200 font-medium text-right">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 py-3 px-4 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-900/40 flex items-center justify-center gap-2 text-sm transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Order / Quote (${(product.price * (selectedSide === 'Bilateral Pair' ? 2 : 1)).toLocaleString()})</span>
              </button>

              <button
                type="button"
                onClick={handleProceedToRegistration}
                className="py-3 px-4 rounded-xl font-semibold text-red-200 bg-red-950/60 hover:bg-red-900/60 border border-red-700/60 flex items-center justify-center gap-2 text-sm transition-all"
              >
                <UserCheck className="w-4 h-4 text-red-400" />
                <span>Register for Clinical Trial</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
