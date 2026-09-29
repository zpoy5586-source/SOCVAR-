import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  UserCheck, 
  CheckCircle2, 
  Star, 
  MapPin, 
  Video, 
  Home, 
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
      <div className="relative bg-[#0c101d] border border-slate-700/80 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Image, Therapist, Clinical Overview */}
          <div className="p-6 md:p-8 bg-gradient-to-b from-[#0f172a] to-[#070b14] border-b md:border-b-0 md:border-r border-slate-800 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2.5 py-1 rounded-md font-bold uppercase tracking-wider ${
                  service.category === 'physiotherapy'
                    ? 'bg-blue-900/50 text-blue-300 border border-blue-700/50'
                    : service.category === 'speech'
                    ? 'bg-indigo-900/50 text-indigo-300 border border-indigo-700/50'
                    : 'bg-red-900/50 text-red-300 border border-red-700/50'
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
                  <span className="flex items-center gap-1 text-amber-400">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <strong>{service.rating}</strong> ({service.reviewCount} amputee recovery reviews)
                  </span>
                </div>
              </div>

              {/* Lead Therapist Profile */}
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Clinical Care Lead Specialist
                </div>
                <div className="flex items-center gap-3">
                  <img
                    src={service.leadTherapist.avatar}
                    alt={service.leadTherapist.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-blue-500/50 shrink-0"
                  />
                  <div>
                    <h5 className="text-sm font-bold text-white">{service.leadTherapist.name}</h5>
                    <p className="text-xs text-blue-400 font-medium">{service.leadTherapist.role}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{service.leadTherapist.experienceYears}+ years specialized clinical experience</p>
                  </div>
                </div>
              </div>

              {/* Key Clinical Benefits */}
              <div className="space-y-1.5 pt-1">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Clinical Milestones
                </div>
                {service.keyBenefits.slice(0, 3).map((b, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 text-xs text-slate-500">
              Approved by major health insurance carriers and worker compensation funds.
            </div>
          </div>

          {/* Right Column: Scheduling & Booking */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-white font-heading">{service.title}</h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{service.subtitle}</p>
              </div>

              {/* Package selection */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                  Select Treatment Plan
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPackageType('single')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      packageType === 'single'
                        ? 'bg-blue-950/40 border-blue-500 text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-medium text-slate-300">Single Session</div>
                    <div className="text-lg font-bold text-white mt-1">${service.pricePerSession}</div>
                    <div className="text-[10px] text-slate-400">Evaluation & Plan</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPackageType('package')}
                    className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden ${
                      packageType === 'package'
                        ? 'bg-red-950/40 border-red-500 text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="absolute top-0 right-0 bg-red-600 text-[9px] font-bold text-white px-2 py-0.5 rounded-bl">
                      SAVE $50
                    </span>
                    <div className="text-xs font-medium text-red-300">5-Session Bundle</div>
                    <div className="text-lg font-bold text-white mt-1">${service.packagePrice}</div>
                    <div className="text-[10px] text-slate-400">Complete Restoration</div>
                  </button>
                </div>
              </div>

              {/* Delivery mode */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Consultation Setting
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {service.deliveryMode.map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setDeliveryMode(mode)}
                      className={`p-2 rounded-lg text-xs font-medium border flex items-center justify-center gap-1.5 transition-all ${
                        deliveryMode === mode
                          ? 'bg-blue-600/30 border-blue-500 text-white'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {mode === 'In-Clinic' && <MapPin className="w-3.5 h-3.5 text-blue-400" />}
                      {mode === 'Virtual Telehealth' && <Video className="w-3.5 h-3.5 text-cyan-400" />}
                      {mode === 'Home Visit' && <Home className="w-3.5 h-3.5 text-amber-400" />}
                      <span>{mode}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Time Slot Picker */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Time Slot
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                  >
                    <option value="09:00 AM">09:00 AM - 10:00 AM</option>
                    <option value="10:00 AM">10:00 AM - 11:00 AM</option>
                    <option value="01:30 PM">01:30 PM - 02:30 PM</option>
                    <option value="03:00 PM">03:00 PM - 04:00 PM</option>
                    <option value="04:30 PM">04:30 PM - 05:30 PM</option>
                  </select>
                </div>
              </div>

              {/* Methodology details */}
              <div className="pt-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Clinical Modalities Utilized
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {service.methodologies.map((m, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleBookService}
                className="flex-1 py-3 px-4 rounded-xl font-semibold text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 shadow-lg shadow-red-900/40 flex items-center justify-center gap-2 text-sm transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Confirm & Book Therapy (${activePrice})</span>
              </button>

              <button
                type="button"
                onClick={handleRegisterAsPatient}
                className="py-3 px-4 rounded-xl font-semibold text-blue-200 bg-blue-950/60 hover:bg-blue-900/60 border border-blue-700/60 flex items-center justify-center gap-2 text-sm transition-all"
              >
                <UserCheck className="w-4 h-4 text-blue-400" />
                <span>Register Full Intake</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
