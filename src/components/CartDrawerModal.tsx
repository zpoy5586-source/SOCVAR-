import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ShieldCheck, 
  CreditCard, 
  Building2, 
  FileText, 
  CheckCircle2, 
  Printer, 
  ArrowRight,
  Package
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { Order } from '../types';

export const CartDrawerModal: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    cartTotal,
    completeCheckout,
    navigateTo
  } = useApp();

  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'confirmed'>('cart');
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  // Form states
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<Order['paymentMethod']>('Health Insurance Co-Pay');
  const [insurancePolicyNumber, setInsurancePolicyNumber] = useState('BCBS-7729104');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  if (!isCartOpen) return null;

  const handleProceedToCheckout = () => {
    if (cart.length === 0) return;
    setCheckoutStep('checkout');
  };

  const handleFinalizeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!customerName.trim()) errors.name = 'Patient / Customer name is required';
    if (!customerEmail.trim() || !customerEmail.includes('@')) errors.email = 'Valid email required';
    if (!customerPhone.trim()) errors.phone = 'Phone number required';
    if (!shippingAddress.trim()) errors.address = 'Clinic or Delivery address required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const order = completeCheckout({
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      paymentMethod
    });

    setLastOrder(order);
    setCheckoutStep('confirmed');

    // Confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const handleClose = () => {
    setIsCartOpen(false);
    // Reset to cart step if closed after completed
    if (checkoutStep === 'confirmed') {
      setCheckoutStep('cart');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-xl bg-slate-900 border-l border-slate-800 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base font-heading">
                {checkoutStep === 'cart' && 'Medical Selection & Bookings'}
                {checkoutStep === 'checkout' && 'Clinical Order & Insurance Checkout'}
                {checkoutStep === 'confirmed' && 'Order & Fitting Scheduled'}
              </h3>
              <p className="text-xs text-slate-400">
                {checkoutStep === 'cart' && `${cart.length} items in your order list`}
                {checkoutStep === 'checkout' && 'Verification and healthcare clearance'}
                {checkoutStep === 'confirmed' && `Confirmation ID: ${lastOrder?.orderNumber}`}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          
          {/* STEP 1: CART ITEMS */}
          {checkoutStep === 'cart' && (
            <>
              {cart.length === 0 ? (
                <div className="py-20 text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-slate-800/50 border border-slate-700 flex items-center justify-center mx-auto text-slate-500">
                    <Package className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-base font-heading">Your selection is empty</h4>
                    <p className="text-xs text-slate-400 max-w-xs mx-auto mt-1">
                      Browse our bionic legs, myoelectric hands, or schedule physiotherapy and counseling sessions.
                    </p>
                  </div>
                  <div className="flex justify-center gap-3 pt-2">
                    <button
                      onClick={() => { handleClose(); navigateTo('products'); }}
                      className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-md"
                    >
                      Explore Products
                    </button>
                    <button
                      onClick={() => { handleClose(); navigateTo('services'); }}
                      className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-red-600 hover:bg-red-500 transition-colors shadow-md"
                    >
                      Book Services
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex gap-3 items-start group hover:border-blue-500/40 transition-colors"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover border border-slate-700 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h5 className="text-sm font-semibold text-white truncate">{item.name}</h5>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-slate-500 hover:text-red-400 p-1 transition-colors"
                            title="Remove"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="text-xs text-blue-400 font-medium">
                          {item.type === 'product' ? 'Prosthetic Hardware' : 'Clinical Therapy'}
                        </div>

                        {/* Options badge summary */}
                        {item.options && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {item.options.side && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                                Side: {item.options.side}
                              </span>
                            )}
                            {item.options.sessionPackage && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-950/60 text-red-300 border border-red-900/40">
                                {item.options.sessionPackage}
                              </span>
                            )}
                            {item.options.bookingDate && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-600/20 text-blue-300 border border-blue-500/30">
                                {item.options.bookingDate} at {item.options.bookingTime}
                              </span>
                            )}
                          </div>
                        )}

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-slate-700 rounded-md bg-slate-900">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="px-2 py-1 text-slate-400 hover:text-white transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-semibold text-white">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="px-2 py-1 text-slate-400 hover:text-white transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="text-sm font-bold text-white">
                            ${(item.unitPrice * item.quantity).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* STEP 2: CHECKOUT FORM */}
          {checkoutStep === 'checkout' && (
            <form onSubmit={handleFinalizeOrder} className="space-y-4">
              <div className="p-3 rounded-lg bg-blue-600/10 border border-blue-500/30 text-xs text-blue-200 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                <span>
                  HIPAA-Compliant Order Processing: All prescription prosthetics are reviewed by licensed CPO orthotists.
                </span>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Patient & Contact Information
                </h4>

                <div>
                  <label className="text-xs text-slate-300 block mb-1">Full Legal Name *</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Robert Sterling"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                  {formErrors.name && <p className="text-[11px] text-red-400 mt-0.5">{formErrors.name}</p>}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Email Address *</label>
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="robert@example.com"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                    {formErrors.email && <p className="text-[11px] text-red-400 mt-0.5">{formErrors.email}</p>}
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                    {formErrors.phone && <p className="text-[11px] text-red-400 mt-0.5">{formErrors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-300 block mb-1">Delivery / Clinic Address *</label>
                  <textarea
                    rows={2}
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    placeholder="Street, Suite/Apt, City, State, ZIP"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                  {formErrors.address && <p className="text-[11px] text-red-400 mt-0.5">{formErrors.address}</p>}
                </div>
              </div>

              {/* Payment / Insurance Method */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Payment / Reimbursement Method
                </h4>
                
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'Health Insurance Co-Pay', label: 'Insurance Co-Pay', icon: Building2 },
                    { id: 'Credit Card', label: 'Credit / Debit Card', icon: CreditCard },
                    { id: 'Medical Financing', label: '0% APR Medical Loan', icon: FileText },
                    { id: 'Direct Transfer', label: 'Bank Wire / HSA', icon: ShieldCheck }
                  ].map((m) => {
                    const Icon = m.icon;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPaymentMethod(m.id as Order['paymentMethod'])}
                        className={`p-2.5 rounded-lg border text-left flex items-center gap-2 text-xs transition-all ${
                          paymentMethod === m.id
                            ? 'bg-blue-600/20 border-blue-500 text-white shadow-sm ring-1 ring-blue-500'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <Icon className="w-4 h-4 text-blue-400 shrink-0" />
                        <span className="font-medium truncate">{m.label}</span>
                      </button>
                    );
                  })}
                </div>

                {paymentMethod === 'Health Insurance Co-Pay' && (
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2 mt-2">
                    <label className="text-[11px] text-slate-400 block">
                      Insurance Policy ID / Member Number
                    </label>
                    <input
                      type="text"
                      value={insurancePolicyNumber}
                      onChange={(e) => setInsurancePolicyNumber(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white"
                    />
                    <p className="text-[10px] text-emerald-400">
                      Eligible for up to 80-100% prosthesis reimbursement under major private & government plans.
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setCheckoutStep('cart')}
                  className="px-4 py-2.5 rounded-xl border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white"
                >
                  Back to List
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-500 text-xs shadow-lg shadow-blue-600/30 transition-all"
                >
                  Confirm & Submit Order
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: ORDER CONFIRMED */}
          {checkoutStep === 'confirmed' && lastOrder && (
            <div className="py-6 space-y-6 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-400 animate-in zoom-in-75">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-2xl font-bold text-white font-heading">Clinical Order Confirmed!</h4>
                <p className="text-xs text-slate-300 mt-1">
                  Order Number: <strong className="text-blue-400 font-mono">{lastOrder.orderNumber}</strong>
                </p>
                <p className="text-xs text-slate-400 mt-2 max-w-sm mx-auto">
                  A clinical coordinator has been assigned to your order. We will reach out to confirm your socket casting appointment or delivery timeline.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="text-left bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2 text-xs">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Patient:</span>
                  <span className="font-semibold text-white">{lastOrder.customerName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Payment Channel:</span>
                  <span className="font-semibold text-emerald-400">{lastOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Total Billed:</span>
                  <span className="font-bold text-white text-sm">${lastOrder.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-400 pt-1">
                  <span>Status:</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800 text-[10px] font-bold uppercase">
                    Paid / Approved
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handlePrintReceipt}
                  className="flex-1 py-2.5 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-xs font-semibold text-white flex items-center justify-center gap-2 transition-colors"
                >
                  <Printer className="w-4 h-4 text-blue-400" />
                  <span>Print Receipt & Intake</span>
                </button>
                <button
                  onClick={() => {
                    handleClose();
                    navigateTo('dashboard');
                  }}
                  className="flex-1 py-2.5 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-500 text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all"
                >
                  <span>View in Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer Bar (Visible on Cart Step) */}
        {checkoutStep === 'cart' && cart.length > 0 && (
          <div className="p-5 border-t border-slate-800 bg-slate-950 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span className="text-white font-medium">${cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Estimated Medical Co-Pay Deduction</span>
                <span className="text-emerald-400 font-medium">Eligible upon review</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-white border-t border-slate-800 pt-2">
                <span>Order Total</span>
                <span className="text-lg text-blue-400">${cartTotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={clearCart}
                className="px-3 py-2.5 rounded-xl border border-slate-800 hover:bg-slate-800 text-xs font-medium text-slate-400 hover:text-red-400 transition-colors"
                title="Clear All"
              >
                Clear
              </button>
              <button
                onClick={handleProceedToCheckout}
                className="flex-1 py-3 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-500 text-sm shadow-lg shadow-blue-600/40 flex items-center justify-center gap-2 transition-all"
              >
                <span>Proceed to Clinical Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
