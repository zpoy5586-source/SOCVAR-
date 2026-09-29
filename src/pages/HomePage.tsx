import React, { useState } from 'react';
import { 
  ArrowRight, 
  Activity, 
  ShieldCheck, 
  Cpu, 
  HeartPulse, 
  CheckCircle2, 
  Sparkles, 
  Star, 
  Users, 
  Layers, 
  HeartHandshake, 
  ChevronRight,
  Zap,
  PhoneCall,
  Calendar,
  BarChart3
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { INITIAL_TESTIMONIALS } from '../data/mockData';

export const HomePage: React.FC = () => {
  const { 
    products, 
    services, 
    news, 
    navigateTo, 
    setSelectedProduct, 
    setSelectedService, 
    setSelectedArticle 
  } = useApp();

  const [activeTabProduct, setActiveTabProduct] = useState<'all' | 'legs' | 'hands'>('all');

  const filteredProducts = activeTabProduct === 'all'
    ? products.slice(0, 4)
    : products.filter(p => p.category === activeTabProduct).slice(0, 4);

  return (
    <div className="space-y-20 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-800/80 bg-gradient-to-b from-slate-950 via-[#0a0f1d] to-[#070b14]">
        {/* Ambient Vivid Neon Glows (Red & Vibrant Blue) */}
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[130px] pointer-events-none -z-10 animate-pulse"></div>
        <div className="absolute top-20 right-1/4 w-[450px] h-[450px] bg-red-600/20 rounded-full blur-[120px] pointer-events-none -z-10"></div>
        
        {/* Tech grid lines */}
        <div className="absolute inset-0 bg-tech-grid opacity-40 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Headline & Action */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-blue-500/40 shadow-lg shadow-blue-500/10">
                <span className="flex h-2.5 w-2.5 rounded-full bg-red-500 animate-ping"></span>
                <span className="text-xs font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-red-400">
                  Next-Gen Bionics & Holistic Amputee Rehabilitation
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] font-heading">
                Restoring Movement. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-red-500">
                  Rebuilding Confidence.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Bionix delivers ultra-responsive <strong className="text-blue-400">bionic legs</strong> and <strong className="text-red-400">myoelectric hands</strong> integrated with specialized <strong className="text-white">physiotherapy, speech therapy, and trauma counseling</strong>. From surgical recovery to athletic mobility, we empower every step.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => navigateTo('registration', { registrationType: 'legs' })}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-white bg-red-600 hover:bg-red-500 shadow-xl shadow-red-600/30 flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5 active:scale-95 text-sm"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Amputee Intake Registration</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => navigateTo('products', { productCat: 'all' })}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 transition-all text-sm"
                >
                  <Cpu className="w-4 h-4 text-white" />
                  <span>Explore Bionic Hardware</span>
                </button>

                <button
                  onClick={() => navigateTo('dashboard')}
                  className="w-full sm:w-auto px-5 py-3.5 rounded-xl font-bold text-blue-300 hover:text-white bg-slate-900 hover:bg-blue-600/20 border-2 border-blue-500/40 text-sm transition-all flex items-center justify-center gap-2"
                >
                  <BarChart3 className="w-4 h-4 text-blue-400" />
                  <span>Live Dashboard</span>
                </button>
              </div>

              {/* Fast Trust Indicators */}
              <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  <span>FDA & CE Cleared</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span>Insurance Co-Pay Covered</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-red-400" />
                  <span>1,420+ Amputees Restored</span>
                </div>
              </div>
            </div>

            {/* Right Bionic Showcase Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl bg-gradient-to-br from-blue-500/30 via-slate-900 to-red-500/30 p-[2px] shadow-2xl shadow-blue-500/10 border border-blue-500/40 backdrop-blur-xl">
                <div className="bg-slate-900 rounded-[14px] p-6 space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
                      Clinical Spotlight Model
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-red-600/20 text-red-300 border border-red-500/50 font-bold">
                      Flagship Bionic
                    </span>
                  </div>

                  <div className="relative rounded-xl overflow-hidden aspect-video border border-slate-800 group">
                    <img
                      src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=900&q=80"
                      alt="Aegis-X Titan"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                      <div>
                        <div className="font-bold">Aegis-X Titan Microprocessor Knee</div>
                        <div className="text-[11px] text-blue-300 font-medium">1000Hz Real-Time Stumble Reflex</div>
                      </div>
                      <span className="font-extrabold text-red-400 text-sm">$18,500</span>
                    </div>
                  </div>

                  {/* Dual Limb Quick Access Switcher */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <button
                      onClick={() => navigateTo('products', { productCat: 'legs' })}
                      className="p-3 rounded-xl bg-blue-600/15 hover:bg-blue-600/30 border border-blue-500/40 text-left transition-colors group"
                    >
                      <div className="text-base mb-1">🦵</div>
                      <div className="text-xs font-bold text-white group-hover:text-blue-300">Leg Prosthetics</div>
                      <div className="text-[10px] text-slate-300">Microprocessor knees & blades</div>
                    </button>

                    <button
                      onClick={() => navigateTo('products', { productCat: 'hands' })}
                      className="p-3 rounded-xl bg-red-600/15 hover:bg-red-600/30 border border-red-500/40 text-left transition-colors group"
                    >
                      <div className="text-base mb-1">🦾</div>
                      <div className="text-xs font-bold text-white group-hover:text-red-300">Hand Prosthetics</div>
                      <div className="text-[10px] text-slate-300">14-grip myoelectric & haptic</div>
                    </button>
                  </div>

                  {/* Quick Patient Intake Banner */}
                  <div className="p-3.5 rounded-xl bg-gradient-to-r from-red-600/20 via-slate-900 to-blue-600/20 border border-slate-700 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">New Amputee Patient?</div>
                      <div className="text-[11px] text-slate-300">Book your zero-obligation socket scan</div>
                    </div>
                    <button
                      onClick={() => navigateTo('registration')}
                      className="px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-xs font-bold text-white shadow-md shadow-red-600/40"
                    >
                      Register Now
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* THREE PILLAR QUICK NAV (Products Sales, Services Sales, Registration) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Product Sales (Vivid Blue) */}
          <div className="p-6 rounded-2xl bg-slate-900 border-2 border-blue-500/40 relative overflow-hidden group hover:border-blue-500 transition-all duration-300 shadow-xl shadow-blue-500/5">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-2xl group-hover:bg-blue-600/30 transition-colors"></div>
            <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 mb-4">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white font-heading mb-2">Bionic Product Sales</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Explore advanced bionic legs and multi-grip hands engineered with aerospace titanium, carbon fiber blades, and intuitive myoelectric sensors.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => navigateTo('products', { productCat: 'legs' })}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 text-white hover:bg-blue-500 shadow-sm"
              >
                Legs Catalog
              </button>
              <button
                onClick={() => navigateTo('products', { productCat: 'hands' })}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600/20 text-blue-300 border border-blue-500/40 hover:bg-blue-600 hover:text-white"
              >
                Hands Catalog
              </button>
            </div>
          </div>

          {/* Card 2: Service Sales (Crimson Red) */}
          <div className="p-6 rounded-2xl bg-slate-900 border-2 border-red-500/40 relative overflow-hidden group hover:border-red-500 transition-all duration-300 shadow-xl shadow-red-500/5">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/20 rounded-full blur-2xl group-hover:bg-red-600/30 transition-colors"></div>
            <div className="w-12 h-12 rounded-xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400 mb-4">
              <HeartPulse className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white font-heading mb-2">Clinical Service Sales</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Full-spectrum rehabilitation: specialized gait physiotherapy, neurological speech therapy, and trauma counseling for amputees and families.
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => navigateTo('services', { serviceCat: 'physiotherapy' })}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-red-600 text-white hover:bg-red-500 shadow-sm"
              >
                Physiotherapy
              </button>
              <button
                onClick={() => navigateTo('services', { serviceCat: 'speech' })}
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-red-600/20 text-red-300 border border-red-500/40 hover:bg-red-600 hover:text-white"
              >
                Speech
              </button>
              <button
                onClick={() => navigateTo('services', { serviceCat: 'counseling' })}
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-red-600/20 text-red-300 border border-red-500/40 hover:bg-red-600 hover:text-white"
              >
                Counseling
              </button>
            </div>
          </div>

          {/* Card 3: Amputee Registration */}
          <div className="p-6 rounded-2xl bg-slate-900 border-2 border-indigo-500/40 relative overflow-hidden group hover:border-indigo-400 transition-all duration-300 shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/20 rounded-full blur-2xl group-hover:bg-indigo-600/30 transition-colors"></div>
            <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 mb-4">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white font-heading mb-2">Amputee Intake Portal</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Complete your patient intake registration for leg or hand limb loss. Get matched with a dedicated CPO specialist and custom socket schedule.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => navigateTo('registration', { registrationType: 'legs' })}
                className="flex-1 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-red-600 hover:bg-red-500 text-center shadow-md shadow-red-600/30"
              >
                Leg Intake
              </button>
              <button
                onClick={() => navigateTo('registration', { registrationType: 'hands' })}
                className="flex-1 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 text-center shadow-md shadow-blue-600/30"
              >
                Hand Intake
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* FEATURED PRODUCTS (Legs & Hands) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-1">
              Bionic Hardware Systems
            </div>
            <h2 className="text-3xl font-extrabold text-white font-heading">
              Featured Prosthetic Products
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-xl">
              Microprocessor-controlled knee hydraulics, athletic carbon blades, and sensory feedback myoelectric hands.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-900 border-2 border-slate-800">
            <button
              onClick={() => setActiveTabProduct('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTabProduct === 'all'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Bionics
            </button>
            <button
              onClick={() => setActiveTabProduct('legs')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                activeTabProduct === 'legs'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>🦵 Legs (4)</span>
            </button>
            <button
              onClick={() => setActiveTabProduct('hands')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                activeTabProduct === 'hands'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>🦾 Hands (4)</span>
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="rounded-2xl bg-slate-900 border-2 border-slate-800 hover:border-blue-500/60 overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:shadow-xl shadow-lg"
            >
              <div>
                <div className="relative aspect-4/3 overflow-hidden bg-slate-950">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                  
                  {/* Category Badge */}
                  <span className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded shadow ${
                    product.category === 'legs'
                      ? 'bg-blue-600 text-white'
                      : 'bg-red-600 text-white'
                  }`}>
                    {product.category === 'legs' ? '🦵 Bionic Leg' : '🦾 Bionic Hand'}
                  </span>

                  {product.badge && (
                    <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-600 text-white shadow">
                      {product.badge}
                    </span>
                  )}
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-1 text-[11px] text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-semibold">{product.rating}</span>
                    <span className="text-slate-400">({product.reviewCount})</span>
                  </div>

                  <h3 className="font-bold text-white text-base font-heading group-hover:text-blue-400 transition-colors line-clamp-1">
                    {product.name}
                  </h3>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {product.tagline}
                  </p>

                  <div className="pt-2 flex items-baseline justify-between border-t border-slate-800">
                    <div>
                      <span className="text-xs text-slate-400">Clinical MSRP</span>
                      <div className="text-lg font-extrabold text-white">${product.price.toLocaleString()}</div>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-bold">Insurance Covered</span>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0 flex gap-2">
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="flex-1 py-2 rounded-xl text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 transition-colors text-center"
                >
                  View Specs
                </button>
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-md shadow-blue-600/30"
                  title="Configure & Order"
                >
                  Order
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigateTo('products')}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border-2 border-blue-500/40 bg-blue-600/10 text-xs font-bold text-blue-300 hover:bg-blue-600 hover:text-white transition-all shadow"
          >
            <span>View All Bionic Legs & Hands Products</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* CLINICAL SERVICES SECTION (Physiotherapy, Speech, Counseling) */}
      <section className="py-16 bg-[#0a1b38] border-y-2 border-blue-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="text-xs font-bold uppercase tracking-wider text-red-400 mb-1">
              Integrated Recovery Pathways
            </div>
            <h2 className="text-3xl font-extrabold text-white font-heading">
              Comprehensive Clinical Services
            </h2>
            <p className="text-sm text-blue-100 mt-2 leading-relaxed">
              Receiving high-tech prosthetic hardware is only half the journey. Our integrated clinical team of Doctors of Physical Therapy, Speech Pathologists, and Trauma Counselors ensure complete mental and physical restoration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="rounded-3xl bg-[#0e244d] border-2 border-blue-500/30 overflow-hidden flex flex-col justify-between hover:border-blue-400 transition-all duration-300 hover:shadow-2xl shadow-xl"
              >
                <div>
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e244d] via-black/20 to-transparent"></div>
                    <span className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-0.5 rounded shadow ${
                      service.category === 'physiotherapy'
                        ? 'bg-blue-600 text-white'
                        : service.category === 'speech'
                        ? 'bg-blue-600 text-white'
                        : 'bg-red-600 text-white'
                    }`}>
                      {service.category.toUpperCase()}
                    </span>
                  </div>

                  <div className="p-5 space-y-3">
                    <h3 className="text-lg font-bold text-white font-heading">{service.title}</h3>
                    <p className="text-xs text-blue-100 line-clamp-3 leading-relaxed">
                      {service.shortDesc}
                    </p>

                    {/* Therapist Preview */}
                    <div className="flex items-center gap-2.5 pt-2 border-t border-blue-500/20">
                      <img
                        src={service.leadTherapist.avatar}
                        alt={service.leadTherapist.name}
                        className="w-8 h-8 rounded-full object-cover border border-blue-400"
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-white truncate">{service.leadTherapist.name}</div>
                        <div className="text-[10px] text-blue-300">{service.leadTherapist.experienceYears}+ yrs experience</div>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="pt-2 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-blue-300">Single: </span>
                        <strong className="text-white">${service.pricePerSession}</strong>
                      </div>
                      <div>
                        <span className="text-blue-300">5-Pack: </span>
                        <strong className="text-red-400 font-bold">${service.packagePrice}</strong>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="w-full py-2.5 rounded-xl font-bold text-xs text-white bg-red-600 hover:bg-red-500 flex items-center justify-center gap-1.5 shadow-md shadow-red-600/30"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Clinical Consultation</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => navigateTo('services')}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-blue-400 text-xs font-semibold text-blue-100 hover:text-white hover:bg-blue-600 transition-colors"
            >
              <span>Explore All Clinical Therapies & Methodologies</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* AMPUTEE INTAKE REGISTRATION CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-[#102d5c] via-[#0d2247] to-[#2a0e20] border-2 border-blue-400/50 p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-red-400 bg-red-600/20 px-3 py-1 rounded-md border border-red-500/40">
                Official Patient Care Program
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white font-heading">
                Step Forward: Register for Specialized Amputee Intake
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                Whether you are an above-knee, below-knee, transradial hand, or complex amputee, our clinical team creates an individualized care pathway including 3D digital socket scanning, trial fittings, and insurance navigation.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Free Initial Consultation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Zero-Slip Socket Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Integrated Psychological Support</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <button
                onClick={() => navigateTo('registration', { registrationType: 'legs' })}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-white bg-red-600 hover:bg-red-500 text-sm shadow-xl shadow-red-600/30 flex items-center justify-center gap-2"
              >
                <span>Register: Leg Amputee Intake</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigateTo('registration', { registrationType: 'hands' })}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-500 text-sm shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2"
              >
                <span>Register: Hand Amputee Intake</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PATIENT SUCCESS STORIES & TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-1">
            Real Amputee Journeys
          </div>
          <h2 className="text-3xl font-extrabold text-white font-heading">
            Triumphs in Motion
          </h2>
          <p className="text-sm text-slate-300 mt-2">
            Hear from individuals who regained active careers, athletic milestones, and joyful daily independence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INITIAL_TESTIMONIALS.map((test) => (
            <div
              key={test.id}
              className="p-6 rounded-2xl bg-slate-900 border-2 border-slate-800 flex flex-col justify-between hover:border-blue-500/50 transition-colors shadow-lg"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <img
                    src={test.image}
                    alt={test.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-red-500"
                  />
                  <div>
                    <h4 className="font-bold text-white text-sm font-heading">{test.name}, {test.age}</h4>
                    <p className="text-xs text-red-400 font-bold">{test.amputationInfo}</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-blue-300 font-semibold">
                  <span className="text-slate-400">Milestone: </span>
                  {test.achievement}
                </div>

                <p className="text-xs text-slate-300 italic leading-relaxed">
                  "{test.quote}"
                </p>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {test.story}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800 text-[11px] text-slate-400">
                Fitted with: <strong className="text-white font-bold">{test.deviceUsed}</strong>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CLINICAL NEWS & RESEARCH PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-red-400 mb-1">
              Clinical Insights
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              Latest Bionic Research & Patient Spotlights
            </h2>
          </div>
          <button
            onClick={() => navigateTo('news')}
            className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1"
          >
            <span>Browse All Articles</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.slice(0, 3).map((article) => (
            <div
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="rounded-2xl bg-slate-900 border-2 border-slate-800 overflow-hidden cursor-pointer group hover:border-blue-500/50 transition-all shadow-lg"
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded bg-black/80 text-white border border-slate-700 backdrop-blur-sm">
                  {article.category}
                </span>
              </div>
              <div className="p-5 space-y-2">
                <div className="text-[11px] text-slate-400">
                  {article.date} · {article.readTime}
                </div>
                <h4 className="font-bold text-white text-base font-heading group-hover:text-blue-400 transition-colors line-clamp-2">
                  {article.title}
                </h4>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {article.summary}
                </p>
                <div className="pt-2 text-xs font-bold text-red-400 group-hover:text-red-300 flex items-center gap-1">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
