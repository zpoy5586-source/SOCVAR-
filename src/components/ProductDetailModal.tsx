import React, { useState } from 'react';
import { 
  X, 
  Check, 
  ShieldCheck, 
  Cpu, 
  Droplet, 
  Battery, 
  Scale, 
  ShoppingBag, 
  Star, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addToCart, setIsCartOpen, navigateTo } = useApp();

  const [selectedSide, setSelectedSide] = useState<'Left' | 'Right' | 'Bilateral Pair'>('Right');
  const [selectedSize, setSelectedSize] = useState<string>('Standard Medium');
  const [selectedFinish, setSelectedFinish] = useState<string>('Matte Stealth Black');
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCart = () => {
    addToCart({
      id: `${product.id}-${Date.now()}`,
      type: 'product',
      productId: product.id,
      name: product.name,
      category: product.category,
      unitPrice: product.price,
      quantity,
      image: product.image,
      options: {
        side: selectedSide,
        size: selectedSize,
        socketCustomization: `${selectedFinish} - ${product.fittingType}`
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
      <div className="relative bg-slate-900 border border-slate-700/80 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Image and Specs */}
          <div className="p-6 md:p-8 bg-slate-950/70 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className={`text-xs px-2.5 py-1 rounded-md font-bold uppercase tracking-wider ${
                  product.category === 'legs' 
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' 
                    : 'bg-red-600/20 text-red-400 border border-red-500/30'
                }`}>
                  Bionic {product.category === 'legs' ? 'Legs & Knees' : 'Hands & Upper Limb'}
                </span>
                <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{product.rating}</span>
                  <span className="text-slate-500">({product.reviewCount} reviews)</span>
                </div>
              </div>

              <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-900/50 aspect-square flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded bg-black/70 backdrop-blur text-[10px] text-slate-300 font-mono border border-slate-800">
                  {product.fittingType}
                </div>
              </div>

              {/* Technical Badges */}
              <div className="grid grid-cols-3 gap-2">
                <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-center">
                  <Scale className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Weight</div>
                  <div className="text-xs font-bold text-white">{product.weightGrams}g</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-center">
                  <Battery className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Battery</div>
                  <div className="text-xs font-bold text-white">{product.batteryLifeHours ? `${product.batteryLifeHours}h` : 'Passive'}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-center">
                  <Droplet className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Rating</div>
                  <div className="text-xs font-bold text-white">{product.isWaterproof ? 'IP68 Waterproof' : 'Splash Resistant'}</div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Full {product.warrantyYears}-Year Manufacturer & Clinical Alignment Warranty included</span>
            </div>
          </div>

          {/* Right Column: Customization and Ordering */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-white font-heading">
                  {product.name}
                </h2>
                <div className="text-xs text-blue-400 font-medium mt-0.5">
                  {product.tagline}
                </div>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-white">
                  ${product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-sm line-through text-slate-500">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-xs text-slate-400">
                  (Insurance eligible)
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {product.description}
              </p>

              {/* Highlights */}
              <div className="space-y-1.5 pt-2">
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-blue-400" />
                  <span>Clinical & Engineering Highlights</span>
                </div>
                <ul className="space-y-1">
                  {product.keyFeatures.map((feature, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Side Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wide">
                  Anatomical Side
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Right', 'Left', 'Bilateral Pair'] as const).map((side) => (
                    <button
                      key={side}
                      type="button"
                      onClick={() => setSelectedSide(side)}
                      className={`py-2 px-3 rounded-lg text-xs font-bold transition-all border ${
                        selectedSide === side
                          ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/20'
                          : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      {side}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizes / Finish */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase">
                    Limb Size / Socket
                  </label>
                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Small (Custom Cast)">Small (Custom Cast)</option>
                    <option value="Standard Medium">Standard Medium</option>
                    <option value="Large (Athletic)">Large (Athletic)</option>
                    <option value="Extra Large High-Impact">Extra Large High-Impact</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase">
                    Casing Finish
                  </label>
                  <select
                    value={selectedFinish}
                    onChange={(e) => setSelectedFinish(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Matte Stealth Black">Matte Stealth Black</option>
                    <option value="Raw Aerospace Carbon">Raw Aerospace Carbon</option>
                    <option value="Titanium Silver">Titanium Silver</option>
                    <option value="Cyber Crimson Accent">Cyber Crimson Accent</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2.5 pt-4 border-t border-slate-800">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-4 rounded-xl font-bold text-xs text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Order Bag • ${(product.price * quantity).toLocaleString()}</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleProceedToRegistration}
                className="w-full py-2.5 px-4 rounded-xl font-bold text-xs text-red-300 bg-red-950/40 hover:bg-red-900/60 border border-red-800/80 flex items-center justify-center gap-2 transition-all"
              >
                <span>Register as Amputee for Fitting Assessment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
