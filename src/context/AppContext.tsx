import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  Service,
  PatientRegistration,
  CartItem,
  Order,
  NewsArticle,
  ProductCategory,
  ServiceCategory,
  AmputationType
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_SERVICES,
  INITIAL_REGISTRATIONS,
  INITIAL_NEWS
} from '../data/mockData';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  message: string;
}

interface AppContextType {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  
  // Filtering & deep links
  productCategoryFilter: 'all' | ProductCategory;
  setProductCategoryFilter: (cat: 'all' | ProductCategory) => void;
  serviceCategoryFilter: 'all' | ServiceCategory;
  setServiceCategoryFilter: (cat: 'all' | ServiceCategory) => void;
  registrationPreselect: AmputationType;
  setRegistrationPreselect: (type: AmputationType) => void;
  
  // Data
  products: Product[];
  services: Service[];
  news: NewsArticle[];
  registrations: PatientRegistration[];
  orders: Order[];
  
  // Modals & Selected items
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  selectedService: Service | null;
  setSelectedService: (s: Service | null) => void;
  selectedArticle: NewsArticle | null;
  setSelectedArticle: (a: NewsArticle | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  
  // Cart operations
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  
  // Registration operations
  addRegistration: (reg: Omit<PatientRegistration, 'id' | 'registrationNumber' | 'createdAt' | 'status'>) => PatientRegistration;
  updateRegistrationStatus: (id: string, status: PatientRegistration['status']) => void;
  
  // Checkout operations
  completeCheckout: (details: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    shippingAddress: string;
    paymentMethod: Order['paymentMethod'];
  }) => Order;
  
  // Feedback
  toasts: Toast[];
  showToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  
  // Navigation helper
  navigateTo: (page: string, options?: {
    productCat?: 'all' | ProductCategory;
    serviceCat?: 'all' | ServiceCategory;
    registrationType?: AmputationType;
    productId?: string;
    serviceId?: string;
  }) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [productCategoryFilter, setProductCategoryFilter] = useState<'all' | ProductCategory>('all');
  const [serviceCategoryFilter, setServiceCategoryFilter] = useState<'all' | ServiceCategory>('all');
  const [registrationPreselect, setRegistrationPreselect] = useState<AmputationType>('legs');

  // Load state from localStorage or initial
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [services] = useState<Service[]>(INITIAL_SERVICES);
  const [news] = useState<NewsArticle[]>(INITIAL_NEWS);

  const [registrations, setRegistrations] = useState<PatientRegistration[]>(() => {
    try {
      const saved = localStorage.getItem('bionix_registrations');
      return saved ? JSON.parse(saved) : INITIAL_REGISTRATIONS;
    } catch {
      return INITIAL_REGISTRATIONS;
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('bionix_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('bionix_orders');
      if (saved) return JSON.parse(saved);
      // Sample initial order so dashboard has rich metrics
      return [
        {
          id: 'ord-101',
          orderNumber: 'ORD-2026-902',
          createdAt: '2026-09-25T14:20:00Z',
          items: [
            {
              id: 'cart-init-1',
              type: 'product',
              name: 'Aegis-X Titan Microprocessor Knee System',
              category: 'legs',
              unitPrice: 18500,
              quantity: 1,
              image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=900&q=80',
              options: { side: 'Right', socketCustomization: 'Titanium High-Activity Socket' }
            }
          ],
          subtotal: 18500,
          discount: 1000,
          tax: 0,
          total: 17500,
          customerName: 'Robert Sterling',
          customerEmail: 'robert.sterling@example.com',
          customerPhone: '+1 (555) 349-2189',
          shippingAddress: '450 North Michigan Ave, Chicago, IL 60611',
          paymentMethod: 'Health Insurance Co-Pay',
          status: 'processing'
        },
        {
          id: 'ord-102',
          orderNumber: 'ORD-2026-903',
          createdAt: '2026-09-27T11:00:00Z',
          items: [
            {
              id: 'cart-init-2',
              type: 'service',
              name: 'Advanced Physiotherapy & Gait Retraining (5 Sessions)',
              category: 'physiotherapy',
              unitPrice: 650,
              quantity: 1,
              image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80',
              options: { deliveryMode: 'In-Clinic', sessionPackage: '5-Session Comprehensive' }
            }
          ],
          subtotal: 650,
          discount: 0,
          tax: 0,
          total: 650,
          customerName: 'Amina Nour',
          customerEmail: 'amina.nour@example.com',
          customerPhone: '+1 (555) 892-4112',
          shippingAddress: '128 Commonwealth Ave, Boston, MA 02116',
          paymentMethod: 'Credit Card',
          status: 'paid'
        }
      ];
    } catch {
      return [];
    }
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bionix_registrations', JSON.stringify(registrations));
    } catch {
      // ignore
    }
  }, [registrations]);

  useEffect(() => {
    try {
      localStorage.setItem('bionix_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('bionix_orders', JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  const showToast = (toast: Omit<Toast, 'id'>) => {
    const id = 'toast-' + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      // If exact same item ID and options, increment quantity
      const existingIndex = prev.findIndex(
        (ci) => ci.id === item.id || (ci.productId && ci.productId === item.productId)
      );
      if (existingIndex > -1 && item.type === 'product') {
        const updated = [...prev];
        updated[existingIndex].quantity += item.quantity;
        return updated;
      }
      return [...prev, item];
    });

    showToast({
      type: 'success',
      title: 'Added to Selection',
      message: `${item.name} has been added to your order & consultation list.`
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addRegistration = (
    data: Omit<PatientRegistration, 'id' | 'registrationNumber' | 'createdAt' | 'status'>
  ): PatientRegistration => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newReg: PatientRegistration = {
      ...data,
      id: 'reg-' + Date.now(),
      registrationNumber: `BNX-2026-${randomNum}`,
      createdAt: new Date().toISOString(),
      status: 'registered'
    };

    setRegistrations((prev) => [newReg, ...prev]);

    showToast({
      type: 'success',
      title: 'Registration Successful!',
      message: `Intake registered as ${newReg.registrationNumber}. Our clinical care team has received your profile.`
    });

    return newReg;
  };

  const updateRegistrationStatus = (id: string, status: PatientRegistration['status']) => {
    setRegistrations((prev) =>
      prev.map((reg) => (reg.id === id ? { ...reg, status } : reg))
    );
    showToast({
      type: 'info',
      title: 'Status Updated',
      message: `Patient registration status updated to ${status.replace(/_/g, ' ')}.`
    });
  };

  const completeCheckout = (details: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    shippingAddress: string;
    paymentMethod: Order['paymentMethod'];
  }): Order => {
    const randomNum = Math.floor(100 + Math.random() * 900);
    const orderNumber = `ORD-2026-${randomNum}`;
    const subtotal = cartTotal;
    const discount = subtotal > 5000 ? 500 : 0;
    const tax = 0; // Medical prosthetics and certified therapy often tax-exempt
    const total = Math.max(0, subtotal - discount);

    const newOrder: Order = {
      id: 'ord-' + Date.now(),
      orderNumber,
      createdAt: new Date().toISOString(),
      items: [...cart],
      subtotal,
      discount,
      tax,
      total,
      customerName: details.customerName,
      customerEmail: details.customerEmail,
      customerPhone: details.customerPhone,
      shippingAddress: details.shippingAddress,
      paymentMethod: details.paymentMethod,
      status: 'paid'
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();

    showToast({
      type: 'success',
      title: 'Order Confirmed!',
      message: `Order #${orderNumber} processed successfully. Invoice & dispatch schedule created.`
    });

    return newOrder;
  };

  const navigateTo = (
    page: string,
    options?: {
      productCat?: 'all' | ProductCategory;
      serviceCat?: 'all' | ServiceCategory;
      registrationType?: AmputationType;
      productId?: string;
      serviceId?: string;
    }
  ) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (options?.productCat !== undefined) {
      setProductCategoryFilter(options.productCat);
    }
    if (options?.serviceCat !== undefined) {
      setServiceCategoryFilter(options.serviceCat);
    }
    if (options?.registrationType !== undefined) {
      setRegistrationPreselect(options.registrationType);
    }
    if (options?.productId) {
      const p = products.find((prod) => prod.id === options.productId);
      if (p) setSelectedProduct(p);
    }
    if (options?.serviceId) {
      const s = services.find((serv) => serv.id === options.serviceId);
      if (s) setSelectedService(s);
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        productCategoryFilter,
        setProductCategoryFilter,
        serviceCategoryFilter,
        setServiceCategoryFilter,
        registrationPreselect,
        setRegistrationPreselect,
        products,
        services,
        news,
        registrations,
        orders,
        selectedProduct,
        setSelectedProduct,
        selectedService,
        setSelectedService,
        selectedArticle,
        setSelectedArticle,
        isCartOpen,
        setIsCartOpen,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        addRegistration,
        updateRegistrationStatus,
        completeCheckout,
        toasts,
        showToast,
        removeToast,
        navigateTo
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
