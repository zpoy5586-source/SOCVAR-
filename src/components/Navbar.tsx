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
  Cpu,
  Home,
  Info,
  BookOpen,
  Minimize2,
  Maximize2,
  ChevronRight
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
  const [isHeaderMinimized, setIsHeaderMinimized] = useState(false);

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
    <header className="sticky top-0 z-50 bg-[#071329]/95 backdrop-blur-md border-b border-blue-500/30 transition-all duration-300">
      
      {/* 1. TOP EMERGENCY & MINIMIZE CONTROL BAR (Hidden when minimized) */}
      {!isHeaderMinimized && (
        <div className="bg-gradient-to-r from-blue-700 via-slate-900 to-red-700 px-4 py-1.5 border-b border-blue-500/30 text-xs transition-all">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-white">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-blue-200 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse"></span>
                Bionix & Rehab Clinical Center
              </span>
              <span className="hidden sm:inline text-blue-300">|</span>
              <span className="hidden sm:inline text-slate-200">ISO 13485 & CE MDR Accredited Prosthetics & Physical Therapy</span>
            </div>
            
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-red-200 font-semibold">
                <PhoneCall className="w-3.5 h-3.5 text-red-300" />
                <span className="hidden sm:inline">24/7 Urgent Line:</span> <strong>+1 (800) 555-BIONIX</strong>
              </span>

              {/* Minimize Header Button */}
              <button
                type="button"
                onClick={() => setIsHeaderMinimized(true)}
                className="px-2.5 py-0.5 rounded-md bg-slate-900/80 hover:bg-slate-800 border border-blue-400/40 text-blue-200 hover:text-white flex items-center gap-1 text-[11px] font-semibold transition-colors shadow-sm"
                title="Minimize Header to Compact Button View"
              >
                <Minimize2 className="w-3 h-3 text-blue-400" />
                <span>Minimize Header</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. MAIN HEADER BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${isHeaderMinimized ? 'h-14' : 'h-18'}`}>
          
          {/* Logo & Brand Button */}
          <button 
            type="button"
            onClick={() => navigateTo('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-none shrink-0"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-red-600 p-[2px] shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#0a1a36] rounded-[10px] flex items-center justify-center">
                <Activity className="w-5 h-5 text-red-500 group-hover:text-blue-400 transition-colors" />
              </div>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#071329] animate-ping opacity-75"></span>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#071329]"></span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight text-white font-heading">BIONIX</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded font-extrabold uppercase tracking-wider bg-blue-600 text-white shadow-sm shadow-blue-500/40">
                  REHAB
                </span>
              </div>
              {!isHeaderMinimized && (
                <p className="text-[10px] text-blue-300 font-semibold tracking-wide">Prosthetics & Care</p>
              )}
            </div>
          </button>

          {/* DESKTOP HEADER MENU WITH ELEVATED BUTTONS */}
          <nav className="hidden lg:flex items-center space-x-1.5 xl:space-x-2">
            
            {/* 1. Home Button */}
            <button
              type="button"
              onClick={() => navigateTo('home')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border shadow-sm ${
                currentPage === 'home'
                  ? 'text-white bg-blue-600 border-blue-400 shadow-md shadow-blue-600/40 glow-blue'
                  : 'text-slate-200 bg-slate-900/90 border-slate-700 hover:border-blue-500 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Home className="w-3.5 h-3.5 text-blue-400" />
              <span>Home</span>
            </button>

            {/* 2. Products Dropdown Button */}
            <div 
              className="relative"
              onMouseEnter={() => setProductsDropdownOpen(true)}
              onMouseLeave={() => setProductsDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => navigateTo('products', { productCat: 'all' })}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border shadow-sm ${
                  currentPage === 'products'
                    ? 'text-white bg-blue-600 border-blue-400 shadow-md shadow-blue-600/40 glow-blue'
                    : 'text-slate-200 bg-slate-900/90 border-slate-700 hover:border-blue-500 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Cpu className="w-3.5 h-3.5 text-blue-400" />
                <span>Products Menu</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${productsDropdownOpen ? 'rotate-180 text-blue-300' : 'text-slate-400'}`} />
              </button>

              {productsDropdownOpen && (
                <div className="absolute top-full left-0 w-72 pt-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="bg-slate-900 border-2 border-blue-500/50 rounded-2xl p-2.5 backdrop-blur-xl shadow-2xl shadow-blue-500/30 space-y-1.5">
                    <div className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-blue-400 border-b border-slate-800 flex items-center justify-between">
                      <span>Prosthetic Products</span>
                      <span className="text-slate-400">Select Category</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleProductSelect('legs')}
                      className="w-full text-left p-2.5 rounded-xl bg-slate-800/80 hover:bg-blue-600/20 border border-slate-700 hover:border-blue-500 flex items-center justify-between group transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xl p-1.5 rounded-lg bg-blue-600/20 border border-blue-500/30">🦵</span>
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-blue-300">Bionic Legs & Knees</div>
                          <div className="text-[10px] text-slate-400">Microprocessor & carbon blades</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-600 text-white">4 Models</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleProductSelect('hands')}
                      className="w-full text-left p-2.5 rounded-xl bg-slate-800/80 hover:bg-red-600/20 border border-slate-700 hover:border-red-500 flex items-center justify-between group transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xl p-1.5 rounded-lg bg-red-600/20 border border-red-500/30">🦾</span>
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-red-300">Bionic Hands & Arms</div>
                          <div className="text-[10px] text-slate-400">Multi-articulating myoelectric</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-red-600 text-white">4 Models</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleProductSelect('all')}
                      className="w-full text-center py-2 px-3 rounded-lg text-xs font-bold text-blue-300 hover:text-white hover:bg-blue-600 border border-blue-500/30 transition-colors"
                    >
                      View All 8 Bionic Prosthetics →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Services Dropdown Button */}
            <div 
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => navigateTo('services', { serviceCat: 'all' })}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border shadow-sm ${
                  currentPage === 'services'
                    ? 'text-white bg-blue-600 border-blue-400 shadow-md shadow-blue-600/40 glow-blue'
                    : 'text-slate-200 bg-slate-900/90 border-slate-700 hover:border-blue-500 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Activity className="w-3.5 h-3.5 text-blue-400" />
                <span>Services Menu</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-blue-300' : 'text-slate-400'}`} />
              </button>

              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 w-80 pt-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="bg-slate-900 border-2 border-blue-500/50 rounded-2xl p-2.5 backdrop-blur-xl shadow-2xl shadow-blue-500/30 space-y-1.5">
                    <div className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-blue-400 border-b border-slate-800">
                      Rehabilitation Therapies
                    </div>

                    <button
                      type="button"
                      onClick={() => handleServiceSelect('physiotherapy')}
                      className="w-full text-left p-2.5 rounded-xl bg-slate-800/80 hover:bg-blue-600/20 border border-slate-700 hover:border-blue-500 flex items-center justify-between group transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-blue-400 shrink-0" />
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-blue-300">Physiotherapy & Gait Training</div>
                          <div className="text-[10px] text-slate-400">Computerized harness & biomechanics</div>
                        </div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleServiceSelect('speech')}
                      className="w-full text-left p-2.5 rounded-xl bg-slate-800/80 hover:bg-blue-600/20 border border-slate-700 hover:border-blue-500 flex items-center justify-between group transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-blue-400 shrink-0" />
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-blue-300">Speech & Language Therapy</div>
                          <div className="text-[10px] text-slate-400">Vocal acoustics & cognitive rehabilitation</div>
                        </div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleServiceSelect('counseling')}
                      className="w-full text-left p-2.5 rounded-xl bg-slate-800/80 hover:bg-red-600/20 border border-slate-700 hover:border-red-500 flex items-center justify-between group transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <HeartHandshake className="w-4 h-4 text-red-400 shrink-0" />
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-red-300">Trauma & Phantom Counseling</div>
                          <div className="text-[10px] text-slate-400">VR mirror therapy & psychological adaptation</div>
                        </div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-red-400" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleServiceSelect('all')}
                      className="w-full text-center py-2 px-3 rounded-lg text-xs font-bold text-blue-300 hover:text-white hover:bg-blue-600 border border-blue-500/30 transition-colors"
                    >
                      Browse All Clinical Therapies →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 4. Registration Dropdown Button */}
            <div 
              className="relative"
              onMouseEnter={() => setRegistrationDropdownOpen(true)}
              onMouseLeave={() => setRegistrationDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => navigateTo('registration')}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border shadow-sm ${
                  currentPage === 'registration'
                    ? 'text-white bg-red-600 border-red-400 shadow-md shadow-red-600/40 glow-red'
                    : 'text-red-200 bg-red-950/40 border-red-800/80 hover:border-red-500 hover:text-white hover:bg-red-900/60'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5 text-red-400" />
                <span>Registration Menu</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${registrationDropdownOpen ? 'rotate-180 text-red-300' : 'text-red-400'}`} />
              </button>

              {registrationDropdownOpen && (
                <div className="absolute top-full left-0 w-80 pt-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="bg-slate-900 border-2 border-red-500/50 rounded-2xl p-2.5 backdrop-blur-xl shadow-2xl shadow-red-500/30 space-y-1.5">
                    <div className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-red-400 border-b border-slate-800 flex items-center justify-between">
                      <span>Clinical Intake Forms</span>
                      <span className="text-emerald-400 font-bold">Fast-Track Pass</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRegistrationSelect('legs')}
                      className="w-full text-left p-2.5 rounded-xl bg-slate-800/80 hover:bg-red-600/20 border border-slate-700 hover:border-red-500 flex items-center justify-between group transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xl p-1.5 rounded-lg bg-red-600/20 border border-red-500/30">🦵</span>
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-red-300">Leg Amputee Registration</div>
                          <div className="text-[10px] text-slate-400">Transtibial, transfemoral, bilateral</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-red-600 text-white">Intake</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleRegistrationSelect('hands')}
                      className="w-full text-left p-2.5 rounded-xl bg-slate-800/80 hover:bg-blue-600/20 border border-slate-700 hover:border-blue-500 flex items-center justify-between group transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xl p-1.5 rounded-lg bg-blue-600/20 border border-blue-500/30">🦾</span>
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-blue-300">Hand & Arm Registration</div>
                          <div className="text-[10px] text-slate-400">Transradial, transhumeral, myoelectric</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-600 text-white">Intake</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleRegistrationSelect('both')}
                      className="w-full text-center py-2 px-3 rounded-lg text-xs font-bold text-red-300 hover:text-white hover:bg-red-600 border border-red-500/30 transition-colors"
                    >
                      Dual-Limb / Complex Care Intake →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 5. Dashboard Button (Upper prominence) */}
            <button
              type="button"
              onClick={() => navigateTo('dashboard')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border shadow-sm ${
                currentPage === 'dashboard'
                  ? 'text-white bg-blue-600 border-blue-400 shadow-lg shadow-blue-600/40 glow-blue'
                  : 'text-blue-200 bg-blue-950/40 border-blue-500/50 hover:bg-blue-600 hover:text-white'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-blue-400" />
              <span>Dashboard</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </button>

            {/* 6. About Us Button */}
            <button
              type="button"
              onClick={() => navigateTo('about')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border shadow-sm ${
                currentPage === 'about'
                  ? 'text-white bg-blue-600 border-blue-400 shadow-md shadow-blue-600/40 glow-blue'
                  : 'text-slate-200 bg-slate-900/90 border-slate-700 hover:border-blue-500 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Info className="w-3.5 h-3.5 text-slate-400" />
              <span>About Us</span>
            </button>

            {/* 7. News Button */}
            <button
              type="button"
              onClick={() => navigateTo('news')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border shadow-sm ${
                currentPage === 'news'
                  ? 'text-white bg-blue-600 border-blue-400 shadow-md shadow-blue-600/40 glow-blue'
                  : 'text-slate-200 bg-slate-900/90 border-slate-700 hover:border-blue-500 hover:text-white hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-slate-400" />
              <span>News</span>
            </button>

          </nav>

          {/* RIGHT ACTION BUTTONS */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Quick Register CTA Button */}
            <button
              type="button"
              onClick={() => navigateTo('registration', { registrationType: 'legs' })}
              className="px-3.5 py-2 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 shadow-md shadow-red-600/30 transition-all active:scale-95 flex items-center gap-1.5 border border-red-400/50"
            >
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span className="hidden sm:inline">Register Amputee</span>
              <span className="sm:hidden">Register</span>
            </button>

            {/* Cart / Orders Drawer Button */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-xl bg-slate-900 hover:bg-blue-600/20 border-2 border-blue-500/50 text-blue-300 hover:text-white transition-all shadow-md flex items-center gap-1.5"
              title="View Cart & Medical Orders"
            >
              <ShoppingBag className="w-4 h-4 text-blue-400" />
              <span className="hidden md:inline text-xs font-bold text-white">Cart</span>
              {cartCount > 0 && (
                <span className="min-w-[18px] h-4.5 px-1 rounded-full bg-red-600 text-[10px] font-black text-white flex items-center justify-center border border-white/40">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Maximize / Restore Header Button (When minimized) */}
            {isHeaderMinimized && (
              <button
                type="button"
                onClick={() => setIsHeaderMinimized(false)}
                className="hidden sm:flex px-2.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold items-center gap-1 shadow-sm transition-all"
                title="Expand Full Header"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Expand</span>
              </button>
            )}

            {/* Mobile menu hamburger toggle button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 border border-blue-500/50 text-slate-300 hover:text-white lg:hidden focus:outline-none"
              title="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-red-400" /> : <Menu className="w-5 h-5 text-blue-400" />}
            </button>
          </div>

        </div>
      </div>

      {/* 3. DEDICATED HEADER BUTTON RIBBON (Quick direct 1-click access buttons) */}
      {!isHeaderMinimized && (
        <div className="bg-[#0b1b3a] border-t border-blue-500/25 px-4 py-2 overflow-x-auto no-scrollbar shadow-inner">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 min-w-max sm:min-w-0">
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-300 px-2 py-0.5 rounded bg-blue-900/60 border border-blue-500/40">
                Direct Buttons:
              </span>

              {/* Home */}
              <button
                type="button"
                onClick={() => navigateTo('home')}
                className={`px-2.5 py-1 rounded-lg font-bold text-xs transition-colors flex items-center gap-1 border ${
                  currentPage === 'home'
                    ? 'bg-blue-600 text-white border-blue-400 shadow-sm'
                    : 'bg-slate-900/80 text-slate-300 border-slate-700/80 hover:text-white hover:border-blue-400'
                }`}
              >
                <span>🏠 Home</span>
              </button>

              {/* Legs Button */}
              <button
                type="button"
                onClick={() => handleProductSelect('legs')}
                className="px-2.5 py-1 rounded-lg font-bold text-xs bg-slate-900/80 text-blue-300 border border-slate-700/80 hover:bg-blue-600 hover:text-white hover:border-blue-400 transition-colors flex items-center gap-1"
              >
                <span>🦵 Bionic Legs</span>
              </button>

              {/* Hands Button */}
              <button
                type="button"
                onClick={() => handleProductSelect('hands')}
                className="px-2.5 py-1 rounded-lg font-bold text-xs bg-slate-900/80 text-red-300 border border-slate-700/80 hover:bg-red-600 hover:text-white hover:border-red-400 transition-colors flex items-center gap-1"
              >
                <span>🦾 Bionic Hands</span>
              </button>

              {/* Physiotherapy Button */}
              <button
                type="button"
                onClick={() => handleServiceSelect('physiotherapy')}
                className="px-2.5 py-1 rounded-lg font-bold text-xs bg-slate-900/80 text-slate-300 border border-slate-700/80 hover:bg-blue-600 hover:text-white hover:border-blue-400 transition-colors flex items-center gap-1"
              >
                <span>🏃 Physiotherapy</span>
              </button>

              {/* Speech Button */}
              <button
                type="button"
                onClick={() => handleServiceSelect('speech')}
                className="px-2.5 py-1 rounded-lg font-bold text-xs bg-slate-900/80 text-slate-300 border border-slate-700/80 hover:bg-blue-600 hover:text-white hover:border-blue-400 transition-colors flex items-center gap-1"
              >
                <span>🗣️ Speech Therapy</span>
              </button>

              {/* Counseling Button */}
              <button
                type="button"
                onClick={() => handleServiceSelect('counseling')}
                className="px-2.5 py-1 rounded-lg font-bold text-xs bg-slate-900/80 text-slate-300 border border-slate-700/80 hover:bg-red-600 hover:text-white hover:border-red-400 transition-colors flex items-center gap-1"
              >
                <span>🧠 Counseling</span>
              </button>

              {/* Register Leg Button */}
              <button
                type="button"
                onClick={() => handleRegistrationSelect('legs')}
                className="px-2.5 py-1 rounded-lg font-bold text-xs bg-red-950/60 text-red-300 border border-red-800/80 hover:bg-red-600 hover:text-white transition-colors flex items-center gap-1"
              >
                <span>📋 Register Leg</span>
              </button>

              {/* Register Hand Button */}
              <button
                type="button"
                onClick={() => handleRegistrationSelect('hands')}
                className="px-2.5 py-1 rounded-lg font-bold text-xs bg-blue-950/60 text-blue-300 border border-blue-800/80 hover:bg-blue-600 hover:text-white transition-colors flex items-center gap-1"
              >
                <span>📋 Register Hand</span>
              </button>

              {/* Dashboard Direct Button */}
              <button
                type="button"
                onClick={() => navigateTo('dashboard')}
                className="px-2.5 py-1 rounded-lg font-bold text-xs bg-blue-600 text-white border border-blue-400 shadow-sm flex items-center gap-1 hover:bg-blue-500 transition-colors"
              >
                <BarChart3 className="w-3 h-3 text-white" />
                <span>Dashboard</span>
              </button>
            </div>

            {/* Quick Mini Toggle */}
            <button
              type="button"
              onClick={() => setIsHeaderMinimized(true)}
              className="text-[10px] text-blue-300 hover:text-white flex items-center gap-1 pl-2 border-l border-blue-700/40 shrink-0 font-medium"
              title="Compact View"
            >
              <Minimize2 className="w-3 h-3" />
              <span>Compact</span>
            </button>
          </div>
        </div>
      )}

      {/* 4. MOBILE DRAWER MENU WITH BUTTONS */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-blue-500/40 px-4 pt-3 pb-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          
          {/* Main Top Mobile Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => { navigateTo('home'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border ${
                currentPage === 'home'
                  ? 'bg-blue-600 text-white border-blue-400'
                  : 'bg-slate-800 text-slate-200 border-slate-700'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>

            <button
              type="button"
              onClick={() => { navigateTo('dashboard'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border ${
                currentPage === 'dashboard'
                  ? 'bg-blue-600 text-white border-blue-400'
                  : 'bg-blue-950/60 text-blue-300 border-blue-500/40'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-blue-400" />
              <span>Dashboard</span>
            </button>
          </div>

          {/* Products Mobile Buttons */}
          <div className="space-y-1.5 pt-2 border-t border-slate-800">
            <div className="text-[11px] font-extrabold uppercase tracking-wider text-blue-400">
              Bionic Products Buttons
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleProductSelect('legs')}
                className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 hover:border-blue-500 text-left text-xs font-bold text-white flex items-center gap-2"
              >
                <span className="text-lg">🦵</span>
                <div>
                  <div>Bionic Legs</div>
                  <div className="text-[10px] text-slate-400 font-normal">Knees & feet</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleProductSelect('hands')}
                className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 hover:border-red-500 text-left text-xs font-bold text-white flex items-center gap-2"
              >
                <span className="text-lg">🦾</span>
                <div>
                  <div>Bionic Hands</div>
                  <div className="text-[10px] text-slate-400 font-normal">Myoelectric</div>
                </div>
              </button>
            </div>
            <button
              type="button"
              onClick={() => handleProductSelect('all')}
              className="w-full py-1.5 text-center text-xs font-semibold text-blue-300 hover:text-white"
            >
              View All Products Catalog →
            </button>
          </div>

          {/* Services Mobile Buttons */}
          <div className="space-y-1.5 pt-2 border-t border-slate-800">
            <div className="text-[11px] font-extrabold uppercase tracking-wider text-blue-400">
              Clinical Therapy Buttons
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleServiceSelect('physiotherapy')}
                className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-center text-[11px] font-bold text-slate-200"
              >
                <Activity className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                <div>Physio</div>
              </button>

              <button
                type="button"
                onClick={() => handleServiceSelect('speech')}
                className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-center text-[11px] font-bold text-slate-200"
              >
                <Layers className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                <div>Speech</div>
              </button>

              <button
                type="button"
                onClick={() => handleServiceSelect('counseling')}
                className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-center text-[11px] font-bold text-slate-200"
              >
                <HeartHandshake className="w-4 h-4 text-red-400 mx-auto mb-1" />
                <div>Counseling</div>
              </button>
            </div>
          </div>

          {/* Registration Mobile Buttons */}
          <div className="space-y-1.5 pt-2 border-t border-slate-800">
            <div className="text-[11px] font-extrabold uppercase tracking-wider text-red-400">
              Amputee Registration Buttons
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleRegistrationSelect('legs')}
                className="p-2.5 rounded-xl bg-red-950/40 border border-red-800 text-left text-xs font-bold text-red-200 flex items-center gap-2"
              >
                <span className="text-lg">🦵</span>
                <span>Register Leg</span>
              </button>

              <button
                type="button"
                onClick={() => handleRegistrationSelect('hands')}
                className="p-2.5 rounded-xl bg-blue-950/40 border border-blue-800 text-left text-xs font-bold text-blue-200 flex items-center gap-2"
              >
                <span className="text-lg">🦾</span>
                <span>Register Hand</span>
              </button>
            </div>
          </div>

          {/* Quick Links & CTA */}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={() => { navigateTo('about'); setMobileMenuOpen(false); }}
              className="text-slate-300 hover:text-white font-semibold"
            >
              About Company
            </button>
            <button
              type="button"
              onClick={() => { navigateTo('news'); setMobileMenuOpen(false); }}
              className="text-slate-300 hover:text-white font-semibold"
            >
              News & Research
            </button>
            <button
              type="button"
              onClick={() => { setIsCartOpen(true); setMobileMenuOpen(false); }}
              className="text-blue-400 font-bold"
            >
              Cart ({cartCount})
            </button>
          </div>
        </div>
      )}

    </header>
  );
};
