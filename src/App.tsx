import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { CartDrawerModal } from './components/CartDrawerModal';

import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ServicesPage } from './pages/ServicesPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { DashboardPage } from './pages/DashboardPage';
import { AboutPage } from './pages/AboutPage';
import { NewsPage } from './pages/NewsPage';

const AppContent: React.FC = () => {
  const { 
    currentPage, 
    selectedProduct, 
    setSelectedProduct, 
    selectedService, 
    setSelectedService 
  } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#0a1a36] text-slate-100 selection:bg-red-600/30 selection:text-red-200">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Page Routing */}
      <main className="flex-1">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'products' && <ProductsPage />}
        {currentPage === 'services' && <ServicesPage />}
        {currentPage === 'registration' && <RegistrationPage />}
        {currentPage === 'dashboard' && <DashboardPage />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'news' && <NewsPage />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Modals & Notifications */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {selectedService && (
        <ServiceDetailModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}

      <CartDrawerModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
