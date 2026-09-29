import React, { useState } from 'react';
import { 
  HeartPulse, 
  Activity, 
  Layers, 
  HeartHandshake, 
  Clock, 
  Star, 
  CheckCircle2, 
  Calendar, 
  UserCheck, 
  Award,
  Video,
  MapPin,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ServiceCategory } from '../types';

export const ServicesPage: React.FC = () => {
  const { 
    services, 
    serviceCategoryFilter, 
    setServiceCategoryFilter, 
    setSelectedService, 
    navigateTo 
  } = useApp();

  const filteredServices = serviceCategoryFilter === 'all'
    ? services
    : services.filter(s => s.category === serviceCategoryFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Services Header */}
      <div className="rounded-3xl bg-slate-900 border-2 border-blue-500/40 p-8 sm:p-10 relative overflow-hidden shadow-2xl shadow-blue-500/10">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-600/20 border border-blue-500/40 text-xs text-blue-300 font-bold">
            <HeartPulse className="w-3.5 h-3.5 text-blue-400" />
            <span>Integrated Clinical Care & Therapy Sales</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
            Specialized Rehabilitation Therapies
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Our multi-disciplinary team treats the whole human: robotic gait retraining for lower-limb amputees, neurological speech recovery, and trauma counseling for phantom limb adaptation.
          </p>
        </div>
      </div>

      {/* Category Pills Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setServiceCategoryFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              serviceCategoryFilter === 'all'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            All Therapy Programs ({services.length})
          </button>

          <button
            onClick={() => setServiceCategoryFilter('physiotherapy')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              serviceCategoryFilter === 'physiotherapy'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/40 glow-blue'
                : 'bg-slate-900 text-blue-300 hover:text-white border border-blue-500/40'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Physiotherapy & Gait</span>
          </button>

          <button
            onClick={() => setServiceCategoryFilter('speech')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              serviceCategoryFilter === 'speech'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/40 glow-blue'
                : 'bg-slate-900 text-blue-300 hover:text-white border border-blue-500/40'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Speech & Cognitive</span>
          </button>

          <button
            onClick={() => setServiceCategoryFilter('counseling')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              serviceCategoryFilter === 'counseling'
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/40 glow-red'
                : 'bg-slate-900 text-red-300 hover:text-white border border-red-500/40'
            }`}
          >
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Trauma & Counseling</span>
          </button>
        </div>

        <button
          onClick={() => navigateTo('registration')}
          className="text-xs font-bold text-blue-300 hover:text-white flex items-center gap-1.5 bg-blue-600/20 px-3.5 py-2 rounded-xl border border-blue-500/40 hover:bg-blue-600 transition-all"
        >
          <UserCheck className="w-3.5 h-3.5" />
          <span>Need Multi-Therapy Rehabilitation Plan? Register</span>
        </button>
      </div>

      {/* Services List / Cards */}
      <div className="space-y-8">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="rounded-3xl bg-slate-900 border-2 border-slate-800 overflow-hidden shadow-xl hover:border-blue-500/50 transition-all duration-300"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              
              {/* Media / Image Column */}
              <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-900 lg:from-transparent to-transparent"></div>
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className={`text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider ${
                    service.category === 'physiotherapy'
                      ? 'bg-blue-600 text-white shadow'
                      : service.category === 'speech'
                      ? 'bg-blue-600 text-white shadow'
                      : 'bg-red-600 text-white shadow'
                  }`}>
                    {service.category.toUpperCase()} CLINIC
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-200">
                  <span className="flex items-center gap-1 text-amber-400 bg-black/70 px-2.5 py-1 rounded-md backdrop-blur-sm font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <strong>{service.rating}</strong> ({service.reviewCount} reviews)
                  </span>
                  <span className="bg-black/70 px-2.5 py-1 rounded-md backdrop-blur-sm text-slate-300 flex items-center gap-1 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-blue-400" /> {service.durationMinutes} mins
                  </span>
                </div>
              </div>

              {/* Information Column */}
              <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white font-heading">{service.title}</h2>
                    <p className="text-xs text-blue-300 font-semibold mt-1">{service.subtitle}</p>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {service.fullDesc}
                  </p>

                  {/* Clinical Benefits list */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Key Clinical Outcomes & Milestones:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {service.keyBenefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Lead Specialist Box */}
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={service.leadTherapist.avatar}
                        alt={service.leadTherapist.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-red-500 shrink-0"
                      />
                      <div>
                        <div className="text-xs font-bold text-white">{service.leadTherapist.name}</div>
                        <div className="text-[11px] text-red-400 font-bold">{service.leadTherapist.role}</div>
                        <div className="text-[10px] text-slate-400">{service.leadTherapist.credentials}</div>
                      </div>
                    </div>
                    <div className="hidden sm:block text-right">
                      <span className="text-[11px] px-2.5 py-1 rounded bg-blue-600/20 text-blue-300 border border-blue-500/40 font-bold">
                        {service.leadTherapist.experienceYears}+ Years Clinical
                      </span>
                    </div>
                  </div>

                  {/* Delivery Modes */}
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <span className="font-semibold text-slate-400">Available Settings:</span>
                    {service.deliveryMode.map((mode) => (
                      <span key={mode} className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700 text-[11px] font-medium">
                        {mode}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price and CTA row */}
                <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="w-full sm:w-auto">
                    <div className="text-xs text-slate-400">Treatment Pricing</div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-2xl font-extrabold text-white">${service.pricePerSession}</span>
                      <span className="text-xs text-slate-400">/ session</span>
                      <span className="text-xs font-bold text-emerald-300 bg-emerald-600/20 px-2.5 py-0.5 rounded border border-emerald-500/40">
                        Bundle: ${service.packagePrice} ({service.packageSessions} sessions)
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => setSelectedService(service)}
                      className="flex-1 sm:flex-initial px-5 py-3 rounded-xl font-bold text-xs text-white bg-red-600 hover:bg-red-500 shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 transition-all"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Book Session / Package</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Multi-Disciplinary Care Guarantee */}
      <div className="p-8 rounded-3xl bg-slate-900 border-2 border-blue-500/40 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left shadow-lg">
        <div className="space-y-1">
          <div className="text-blue-400 font-bold text-base flex items-center justify-center md:justify-start gap-2">
            <Activity className="w-5 h-5 text-blue-400" /> Gait & Stride Science
          </div>
          <p className="text-xs text-slate-300">
            Computerized force-plate diagnostics to eliminate hip tilting and asymmetrical limping.
          </p>
        </div>

        <div className="space-y-1">
          <div className="text-blue-300 font-bold text-base flex items-center justify-center md:justify-start gap-2">
            <Layers className="w-5 h-5 text-blue-400" /> Speech & Articulation
          </div>
          <p className="text-xs text-slate-300">
            Certified SLP neurological rehab for trauma recovery and respiratory voice stamina.
          </p>
        </div>

        <div className="space-y-1">
          <div className="text-red-400 font-bold text-base flex items-center justify-center md:justify-start gap-2">
            <HeartHandshake className="w-5 h-5 text-red-400" /> Psychological Resilience
          </div>
          <p className="text-xs text-slate-300">
            Phantom limb sensory therapy and trauma coping for the patient and immediate family.
          </p>
        </div>
      </div>

    </div>
  );
};
