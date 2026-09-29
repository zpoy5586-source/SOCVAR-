import React, { useState } from 'react';
import { 
  X, 
  Clock, 
  UserCheck, 
  CheckCircle2, 
  Star, 
  ShoppingBag,
  Award,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Service } from '../types';

interface ServiceDetailModalProps {
  service: Service;
  onClose: () => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ service, onClose }) => {
  const { addToCart, setIsCartOpen, navigateTo } = useApp();

  const [packageType, setPackageType] = useState<'single' | 'package'>('package');
  const [deliveryMode, setDeliveryMode] = useState<string>(service.deliveryMode[0] || 'In-Clinic');
  const [selectedDate, setSelectedDate] = useState<string>('2026-10-06');
  const [selectedTime, setSelectedTime] = useState<string>('10:00 AM');

  const activePrice = packageType === 'single' ? service.pricePerSession : service.packagePrice;

  const handleBookService = () => {
    addToCart({
      id: `${service.id}-${Date.now()}`,
      type: 'service',
      serviceId: service.id,
      name: `${service.title} (${packageType === 'single' ? 'Single 1-on-1 Session' : `${service.packageSessions}-Session Comprehensive Program`})`,
      category: service.category,
      unitPrice: activePrice,
      quantity: 1,
      image: service.image,
      options: {
        sessionPackage: packageType === 'single' ? '1 Single Session' : `${service.packageSessions} Sessions Bundle`,
        bookingDate: selectedDate,
        bookingTime: selectedTime,
        deliveryMode
      }
    });

    setIsCartOpen(true);
    onClose();
  };

  const handleRegisterAsPatient = () => {
    onClose();
    navigateTo('registration', {
      serviceCat: service.category
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
          {/* Left Column: Image, Therapist, Clinical Overview */}
          <div className="p-6 md:p-8 bg-slate-950/70 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2.5 py-1 rounded-md font-bold uppercase tracking-wider ${
                  service.category === 'physiotherapy'
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                    : service.category === 'speech'
                    ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                    : 'bg-red-600/20 text-red-400 border border-red-500/30'
                }`}>
                  {service.category.toUpperCase()} CLINIC
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-blue-400" /> {service.durationMinutes} min / session
                </span>
              </div>

              <div className="relative rounded-xl overflow-hidden border border-slate-700 aspect-video">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-200">
                  <div className="flex items-center gap-1 font-semibold">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span>{service.rating} Clinical Rating</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-blue-600 text-white font-bold text-[10px]">
                    Insurance Approved
                  </span>
                </div>
              </div>

              {/* Assigned Specialist */}
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 font-bold shrink-0">
                  <UserCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1">
                    <span>{service.leadTherapist.name}</span>
                    <Award className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="text-[11px] text-blue-400 font-medium">{service.leadTherapist.credentials}</div>
                  <div className="text-[10px] text-slate-400">{service.leadTherapist.role}</div>
                </div>
              </div>

              {/* What will happen */}
              <div className="space-y-1.5 pt-2">
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  <span>Clinical Benefits & Key Outcomes</span>
                </div>
                <ul className="space-y-1">
                  {service.keyBenefits.map((item, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Delivery Modes: {service.deliveryMode.join(' • ')}</span>
              <button
                type="button"
                onClick={handleRegisterAsPatient}
                className="text-xs font-bold text-red-400 hover:text-red-300 underline"
              >
                Need Intake Form?
              </button>
            </div>
          </div>

          {/* Right Column: Scheduling & Booking */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div>
                <h2 className="text-2xl font-bold text-white font-heading">
                  {service.title}
                </h2>
                <div className="text-xs text-blue-400 font-medium mt-0.5">
                  {service.subtitle}
                </div>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {service.fullDesc || service.shortDesc}
                </p>
              </div>

              {/* Package Options */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wide">
                  Select Care Plan Package
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPackageType('single')}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      packageType === 'single'
                        ? 'bg-blue-600/15 border-blue-500 shadow-md ring-1 ring-blue-500'
                        : 'bg-slate-800/80 border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    <div className="text-xs font-bold text-white">Single Assessment</div>
                    <div className="text-xl font-extrabold text-blue-400 mt-1">${service.pricePerSession}</div>
                    <div className="text-[10px] text-slate-400 mt-1">1x {service.durationMinutes}-min clinical evaluation</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPackageType('package')}
                    className={`p-3.5 rounded-xl border text-left transition-all relative ${
                      packageType === 'package'
                        ? 'bg-blue-600/15 border-blue-500 shadow-md ring-1 ring-blue-500'
                        : 'bg-slate-800/80 border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    <span className="absolute -top-2 right-2 text-[9px] font-black uppercase tracking-wider bg-red-600 text-white px-2 py-0.5 rounded-full">
                      Recommended
                    </span>
                    <div className="text-xs font-bold text-white">{service.packageSessions}-Session Program</div>
                    <div className="text-xl font-extrabold text-emerald-400 mt-1">${service.packagePrice}</div>
                    <div className="text-[10px] text-slate-400 mt-1">
                      Save ${(service.pricePerSession * service.packageSessions) - service.packagePrice} with bundle
                    </div>
                  </button>
                </div>
              </div>

              {/* Delivery Mode */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wide">
                  Appointment Setting
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {service.deliveryMode.map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setDeliveryMode(mode)}
                      className={`py-2 px-2 rounded-lg text-xs font-bold border transition-all text-center ${
                        deliveryMode === mode
                          ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                          : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Time Selection */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase">
                    Select Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase">
                    Preferred Time
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="09:00 AM">09:00 AM (Morning)</option>
                    <option value="10:00 AM">10:00 AM (Morning)</option>
                    <option value="11:30 AM">11:30 AM (Morning)</option>
                    <option value="02:00 PM">02:00 PM (Afternoon)</option>
                    <option value="03:30 PM">03:30 PM (Afternoon)</option>
                    <option value="05:00 PM">05:00 PM (Late Shift)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2.5 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={handleBookService}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-xs text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Confirm & Add Care Booking • ${activePrice.toLocaleString()}</span>
              </button>

              <button
                type="button"
                onClick={handleRegisterAsPatient}
                className="w-full py-2.5 px-4 rounded-xl font-bold text-xs text-red-300 bg-red-950/40 hover:bg-red-900/60 border border-red-800/80 flex items-center justify-center gap-2 transition-all"
              >
                <span>Or Register As New Patient For Clinical Direct Billing</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
