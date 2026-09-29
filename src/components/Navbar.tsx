import React, { useState } from 'react';
import { 
  Activity, 
  ChevronDown, 
  ShoppingBag, 
  Menu, 
  X, 
  PhoneCall, 
  ShieldCheck, 
  UserCheck, 
  HeartHandshake,
  Layers,
  Sparkles,
  BarChart3,
  Cpu
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCategory, ServiceCategory, AmputationType } from '../types';

export const Navbar: React.FC = () => {
  const { 
    currentPage, 
    navigateTo, 
    cartCount, 
    setIsCartOpen,
    productCategoryFilter,
    serviceCategoryFilter
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [registrationDropdownOpen, setRegistrationDropdownOpen] = useState(false);

  const handleProductSelect = (cat: 'all' | ProductCategory) => {
    navigateTo('products', { productCat: cat });
    setProductsDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const handleServiceSelect = (cat: 'all' | ServiceCategory) => {
    navigateTo('services', { serviceCat: cat });
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const handleRegistrationSelect = (type: AmputationType) => {
    navigateTo('registration', { registrationType: type });
    setRegistrationDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#090d19]/95 backdrop-blur-md border-b border-blue-500/20">
      {/* Top Clinical Alert / Hotline Bar with Vivid Blue and Crimson */}
      <div className="bg-gradient-to-r from-blue-700 via-slate-900 to-red-700 px-4 py-1.5 border-b border-blue-500/30 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-white">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-blue-200 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse"></span>
              Bionix & Rehab Clinical Center
            </span>
            <span className="hidden sm:inline text-blue-300">|</span>
            <span className="hidden sm:inline text-slate-200">FDA Cleared & ISO 13485 Certified Bionic Labs</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1 text-red-200 font-semibold">
              <PhoneCall className="w-3.5 h-3.5 text-red-300" />
              24/7 Amputee Urgent Helpline: <strong className="text-white">+1 (800) 555-BIONIX</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button 
            onClick={() => navigateTo('home')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-red-600 p-[2px] shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#0b0f1a] rounded-[10px] flex items-center justify-center">
                <Activity className="w-6 h-6 text-red-500 group-hover:text-blue-400 transition-colors" />
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#090d19] animate-ping opacity-75"></span>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#090d19]"></span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-white font-heading">BIONIX</span>
                <span className="text-xs px-2 py-0.5 rounded font-extrabold uppercase tracking-wider bg-blue-600 text-white shadow-sm shadow-blue-500/50">
                  REHAB
                </span>
              </div>
              <p className="text-[11px] text-blue-300 font-semibold">Bionic Limbs & Clinical Therapies</p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {/* Home */}
            <button
              onClick={() => navigateTo('home')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                currentPage === 'home'
                  ? 'text-white bg-blue-600 shadow-md shadow-blue-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Home
            </button>

            {/* Products Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setProductsDropdownOpen(true)}
              onMouseLeave={() => setProductsDropdownOpen(false)}
            >
              <button
                onClick={() => navigateTo('products', { productCat: 'all' })}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  currentPage === 'products'
                    ? 'text-white bg-blue-600 shadow-md shadow-blue-600/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <span>Products</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${productsDropdownOpen ? 'rotate-180 text-blue-400' : 'text-slate-400'}`} />
              </button>

              {productsDropdownOpen && (
                <div className="absolute top-full left-0 w-72 pt-2 shadow-2xl z-50">
                  <div className="bg-slate-900 border-2 border-blue-500/40 rounded-xl p-2.5 backdrop-blur-xl shadow-2xl shadow-blue-500/20">
                    <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-blue-400 border-b border-slate-800">
                      Bionic Hardware Solutions
                    </div>
                    <button
                      onClick={() => handleProductSelect('all')}
                      className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-slate-200 hover:bg-blue-600 hover:text-white flex items-center justify-between group transition-colors"
                    >
                      <span className="font-semibold">All Prosthetic Products</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 group-hover:bg-white group-hover:text-blue-600 font-bold">8 Models</span>
                    </button>
                    <button
                      onClick={() => handleProductSelect('legs')}
                      className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-slate-200 hover:bg-blue-600/20 border-l-4 border-transparent hover:border-blue-500 flex items-center justify-between group transition-colors"
                    >
                      <div>
                        <div className="font-bold text-blue-300 flex items-center gap-1.5">
                          <span className="text-base">🦵</span> Bionic & Prosthetic Legs
                        </div>
                        <div className="text-xs text-slate-400">Titan Knees, Ankle-Foot, Blades</div>
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded bg-blue-600 text-white font-bold">4 Models</span>
                    </button>
                    <button
                      onClick={() => handleProductSelect('hands')}
                      className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-slate-200 hover:bg-red-600/20 border-l-4 border-transparent hover:border-red-500 flex items-center justify-between group transition-colors"
                    >
                      <div>
                        <div className="font-bold text-red-300 flex items-center gap-1.5">
                          <span className="text-base">🦾</span> Bionic & Myoelectric Hands
                        </div>
                        <div className="text-xs text-slate-400">14-Grip NeuroGrip, Haptic Sensory</div>
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded bg-red-600 text-white font-bold">4 Models</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                onClick={() => navigateTo('services', { serviceCat: 'all' })}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  currentPage === 'services'
                    ? 'text-white bg-blue-600 shadow-md shadow-blue-600/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-blue-400' : 'text-slate-400'}`} />
              </button>

              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 w-80 pt-2 shadow-2xl z-50">
                  <div className="bg-slate-900 border-2 border-blue-500/40 rounded-xl p-2.5 backdrop-blur-xl shadow-2xl shadow-blue-500/20">
                    <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-blue-400 border-b border-slate-800">
                      Integrated Clinical Therapies
                    </div>
                    <button
                      onClick={() => handleServiceSelect('all')}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-blue-600 hover:text-white flex items-center justify-between font-semibold transition-colors"
                    >
                      <span>All Clinical Therapy Programs</span>
                    </button>
                    <button
                      onClick={() => handleServiceSelect('physiotherapy')}
                      className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-slate-200 hover:bg-blue-600/20 border-l-4 border-transparent hover:border-blue-500 transition-colors"
                    >
                      <div className="font-bold text-blue-300 flex items-center gap-1.5">
                        <Activity className="w-4 h-4 text-blue-400" /> Physiotherapy & Gait Retraining
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">Robotic harness & stride biomechanics</div>
                    </button>
                    <button
                      onClick={() => handleServiceSelect('speech')}
                      className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-slate-200 hover:bg-blue-600/20 border-l-4 border-transparent hover:border-blue-500 transition-colors"
                    >
                      <div className="font-bold text-blue-300 flex items-center gap-1.5">
                        <Layers className="w-4 h-4 text-blue-400" /> Speech & Language Therapy
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">Vocal restoration & cognitive speech</div>
                    </button>
                    <button
                      onClick={() => handleServiceSelect('counseling')}
                      className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-slate-200 hover:bg-red-600/20 border-l-4 border-transparent hover:border-red-500 transition-colors"
                    >
                      <div className="font-bold text-red-300 flex items-center gap-1.5">
                        <HeartHandshake className="w-4 h-4 text-red-400" /> Trauma & Amputee Counseling
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">Phantom limb coping & VR adaptation</div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Registration Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setRegistrationDropdownOpen(true)}
              onMouseLeave={() => setRegistrationDropdownOpen(false)}
            >
              <button
                onClick={() => navigateTo('registration')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  currentPage === 'registration'
                    ? 'text-white bg-red-600 shadow-md shadow-red-600/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <span className="flex items-center gap-1.5 text-red-400">
                  <UserCheck className="w-4 h-4" /> Registration
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${registrationDropdownOpen ? 'rotate-180 text-red-400' : 'text-slate-400'}`} />
              </button>

              {registrationDropdownOpen && (
                <div className="absolute top-full left-0 w-80 pt-2 shadow-2xl z-50">
                  <div className="bg-slate-900 border-2 border-red-500/40 rounded-xl p-2.5 backdrop-blur-xl shadow-2xl shadow-red-500/20">
                    <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-red-400 border-b border-slate-800">
                      Amputee Patient Intake Portal
                    </div>
                    <button
                      onClick={() => handleRegistrationSelect('legs')}
                      className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-slate-200 hover:bg-red-600/20 border-l-4 border-transparent hover:border-red-500 group transition-colors"
                    >
                      <div className="font-bold text-red-300 flex items-center justify-between">
                        <span>🦵 Leg Amputee Registration</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-red-600 text-white font-bold">Intake</span>
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">Transtibial, Transfemoral & Bilateral</div>
                    </button>
                    <button
                      onClick={() => handleRegistrationSelect('hands')}
                      className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-slate-200 hover:bg-blue-600/20 border-l-4 border-transparent hover:border-blue-500 group transition-colors"
                    >
                      <div className="font-bold text-blue-300 flex items-center justify-between">
                        <span>🦾 Hand / Arm Amputee Registration</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-blue-600 text-white font-bold">Intake</span>
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">Transradial, Transhumeral & Myoelectric</div>
                    </button>
                    <button
                      onClick={() => handleRegistrationSelect('both')}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-slate-800 font-semibold"
                    >
                      <div className="text-slate-300">Dual Limb / Complex Rehabilitation</div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* About Us */}
            <button
              onClick={() => navigateTo('about')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                currentPage === 'about'
                  ? 'text-white bg-blue-600 shadow-md shadow-blue-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              About Us
            </button>

            {/* News */}
            <button
              onClick={() => navigateTo('news')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                currentPage === 'news'
                  ? 'text-white bg-blue-600 shadow-md shadow-blue-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              News & Research
            </button>

            {/* Dashboard (High visibility with upper access) */}
            <button
              onClick={() => navigateTo('dashboard')}
              className={`px-3.5 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-1.5 ${
                currentPage === 'dashboard'
                  ? 'text-white bg-blue-600 shadow-lg shadow-blue-600/40 glow-blue'
                  : 'text-white bg-slate-800 hover:bg-blue-600/30 border border-blue-500/40'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-blue-400" />
              <span>Dashboard</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Quick Register CTA */}
            <button
              onClick={() => navigateTo('registration', { registrationType: 'legs' })}
              className="relative group overflow-hidden px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-500 shadow-lg shadow-red-600/30 transition-all active:scale-95 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>+ Register Amputee</span>
            </button>

            {/* Cart / Orders Drawer Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-slate-800 hover:bg-blue-600/20 border-2 border-blue-500/50 text-blue-300 hover:text-white transition-all shadow-md"
              title="View Cart & Bookings"
            >
              <ShoppingBag className="w-5 h-5 text-blue-400" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 rounded-full bg-red-600 text-[11px] font-extrabold text-white flex items-center justify-center border-2 border-[#090d19] animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-lg bg-slate-800 border border-blue-500/40 text-blue-400"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-[10px] font-bold text-white flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-blue-500/30 px-4 pt-3 pb-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            <button
              onClick={() => { navigateTo('home'); setMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold ${
                currentPage === 'home' ? 'bg-blue-600 text-white' : 'text-slate-300'
              }`}
            >
              Home
            </button>

            {/* Dashboard Mobile Link - Upper placement */}
            <button
              onClick={() => { navigateTo('dashboard'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-bold bg-blue-600/20 border border-blue-500/40 text-blue-300 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-blue-400" />
                <span>Dashboard & Triage Center</span>
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            </button>

            {/* Products Mobile */}
            <div className="pt-2">
              <div className="px-3 text-xs font-bold uppercase tracking-wider text-blue-400">Products (Hardware)</div>
              <div className="pl-3 mt-1 space-y-1">
                <button
                  onClick={() => handleProductSelect('all')}
                  className="w-full text-left px-3 py-1.5 text-sm text-slate-300 hover:text-white"
                >
                  All Products
                </button>
                <button
                  onClick={() => handleProductSelect('legs')}
                  className="w-full text-left px-3 py-1.5 text-sm text-blue-300 hover:text-white flex items-center gap-1.5 font-semibold"
                >
                  <span>🦵 Bionic Legs (Microprocessor & Blades)</span>
                </button>
                <button
                  onClick={() => handleProductSelect('hands')}
                  className="w-full text-left px-3 py-1.5 text-sm text-red-300 hover:text-white flex items-center gap-1.5 font-semibold"
                >
                  <span>🦾 Bionic Hands (Myoelectric & Haptic)</span>
                </button>
              </div>
            </div>

            {/* Services Mobile */}
            <div className="pt-2">
              <div className="px-3 text-xs font-bold uppercase tracking-wider text-blue-400">Clinical Services</div>
              <div className="pl-3 mt-1 space-y-1">
                <button
                  onClick={() => handleServiceSelect('all')}
                  className="w-full text-left px-3 py-1.5 text-sm text-slate-300 hover:text-white"
                >
                  All Services
                </button>
                <button
                  onClick={() => handleServiceSelect('physiotherapy')}
                  className="w-full text-left px-3 py-1.5 text-sm text-slate-300 hover:text-white"
                >
                  Physiotherapy & Gait Training
                </button>
                <button
                  onClick={() => handleServiceSelect('speech')}
                  className="w-full text-left px-3 py-1.5 text-sm text-slate-300 hover:text-white"
                >
                  Speech & Language Therapy
                </button>
                <button
                  onClick={() => handleServiceSelect('counseling')}
                  className="w-full text-left px-3 py-1.5 text-sm text-slate-300 hover:text-white"
                >
                  Trauma & Amputee Counseling
                </button>
              </div>
            </div>

            {/* Registration Mobile */}
            <div className="pt-2">
              <div className="px-3 text-xs font-bold uppercase tracking-wider text-red-400">Amputee Intake Registration</div>
              <div className="pl-3 mt-1 space-y-1">
                <button
                  onClick={() => handleRegistrationSelect('legs')}
                  className="w-full text-left px-3 py-1.5 text-sm text-red-300 hover:text-white font-semibold"
                >
                  🦵 Leg Amputee Intake
                </button>
                <button
                  onClick={() => handleRegistrationSelect('hands')}
                  className="w-full text-left px-3 py-1.5 text-sm text-blue-300 hover:text-white font-semibold"
                >
                  🦾 Hand / Arm Amputee Intake
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <button
                onClick={() => { navigateTo('about'); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:text-white"
              >
                About Us
              </button>
              <button
                onClick={() => { navigateTo('news'); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:text-white"
              >
                News & Research
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => { navigateTo('registration'); setMobileMenuOpen(false); }}
              className="w-full py-2.5 rounded-xl text-center font-bold text-white bg-red-600 hover:bg-red-500 shadow-lg shadow-red-600/30"
            >
              + Start Amputee Registration
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
