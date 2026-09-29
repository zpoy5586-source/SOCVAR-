import React, { useState, useEffect } from 'react';
import { 
  UserCheck, 
  Activity, 
  ShieldCheck, 
  CheckCircle2, 
  Printer, 
  Calendar, 
  AlertCircle, 
  Sparkles, 
  Search,
  ArrowRight,
  HeartPulse,
  Clock,
  Phone,
  Layers,
  HeartHandshake
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { AmputationType, PatientRegistration, MobilityLevel } from '../types';

export const RegistrationPage: React.FC = () => {
  const { 
    addRegistration, 
    registrations, 
    registrationPreselect, 
    setRegistrationPreselect,
    navigateTo 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'form' | 'lookup'>('form');

  // Registration Form State
  const [amputationType, setAmputationType] = useState<AmputationType>(registrationPreselect || 'legs');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState<number>(35);
  const [gender, setGender] = useState<PatientRegistration['gender']>('male');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('United States');

  // Clinical details
  const [amputationSide, setAmputationSide] = useState<'left' | 'right' | 'bilateral'>('right');
  const [amputationLevel, setAmputationLevel] = useState<string>('Transtibial (Below Knee)');
  const [causeOfAmputation, setCauseOfAmputation] = useState<PatientRegistration['causeOfAmputation']>('Trauma / Accident');
  const [timeSinceAmputation, setTimeSinceAmputation] = useState('6-12 months');
  const [mobilityKLevel, setMobilityKLevel] = useState<MobilityLevel>('K3');
  const [currentDeviceStatus, setCurrentDeviceStatus] = useState<PatientRegistration['currentDeviceStatus']>('First-time prosthetic user');
  const [selectedServices, setSelectedServices] = useState<('physiotherapy' | 'speech' | 'counseling')[]>(['physiotherapy', 'counseling']);
  const [primaryGoal, setPrimaryGoal] = useState('');
  const [preferredConsultationType, setPreferredConsultationType] = useState<PatientRegistration['preferredConsultationType']>('In-Clinic VIP Fitting');
  const [emergencyContactName, setEmergencyContactName] = useState('');
  const [emergencyContactPhone, setEmergencyContactPhone] = useState('');
  const [notes, setNotes] = useState('');

  // Form errors & completion state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedRegistration, setSubmittedRegistration] = useState<PatientRegistration | null>(null);

  // Status Lookup state
  const [searchId, setSearchId] = useState('');
  const [lookupResult, setLookupResult] = useState<PatientRegistration | null>(null);
  const [lookupError, setLookupError] = useState('');

  // Synchronize when preselect changes from navbar dropdown
  useEffect(() => {
    if (registrationPreselect) {
      setAmputationType(registrationPreselect);
      if (registrationPreselect === 'legs') {
        setAmputationLevel('Transtibial (Below Knee)');
      } else if (registrationPreselect === 'hands') {
        setAmputationLevel('Transradial (Below Elbow)');
      }
    }
  }, [registrationPreselect]);

  const handleTypeChange = (type: AmputationType) => {
    setAmputationType(type);
    setRegistrationPreselect(type);
    if (type === 'legs') {
      setAmputationLevel('Transtibial (Below Knee)');
    } else if (type === 'hands') {
      setAmputationLevel('Transradial (Below Elbow)');
    } else {
      setAmputationLevel('Bilateral Complex');
    }
  };

  const toggleService = (svc: 'physiotherapy' | 'speech' | 'counseling') => {
    setSelectedServices(prev => 
      prev.includes(svc) ? prev.filter(s => s !== svc) : [...prev, svc]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!email.trim() || !email.includes('@')) newErrors.email = 'Valid Email is required';
    if (!phone.trim()) newErrors.phone = 'Phone Number is required';
    if (!city.trim()) newErrors.city = 'City is required';
    if (!primaryGoal.trim()) newErrors.primaryGoal = 'Please summarize your mobility or rehabilitation goal';
    if (!emergencyContactName.trim()) newErrors.emergencyContactName = 'Emergency contact is required';
    if (!emergencyContactPhone.trim()) newErrors.emergencyContactPhone = 'Emergency phone is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      window.scrollTo({ top: 300, behavior: 'smooth' });
      return;
    }

    setErrors({});

    const created = addRegistration({
      fullName,
      email,
      phone,
      age: Number(age) || 30,
      gender,
      city,
      country,
      amputationType,
      amputationSide,
      amputationLevel,
      causeOfAmputation,
      timeSinceAmputation,
      mobilityKLevel: amputationType === 'legs' ? mobilityKLevel : undefined,
      currentDeviceStatus,
      selectedServices,
      primaryGoal,
      preferredConsultationType,
      emergencyContactName,
      emergencyContactPhone,
      additionalNotes: notes
    });

    setSubmittedRegistration(created);

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });
    } catch {
      // ignore
    }

    window.scrollTo({ top: 150, behavior: 'smooth' });
  };

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    setLookupError('');
    if (!searchId.trim()) {
      setLookupError('Please enter a Registration Number or Email');
      return;
    }

    const query = searchId.trim().toLowerCase();
    const found = registrations.find(
      r => r.registrationNumber.toLowerCase() === query || r.email.toLowerCase() === query
    );

    if (found) {
      setLookupResult(found);
    } else {
      setLookupError(`No patient intake found matching "${searchId}". Please verify your registration ID.`);
      setLookupResult(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Page Header (Vibrant Blue & Red) */}
      <div className="rounded-3xl bg-slate-900 border-2 border-blue-500/40 p-8 sm:p-10 relative overflow-hidden shadow-2xl shadow-blue-500/10">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-blue-600/20 border border-blue-500/40 text-xs text-blue-300 font-bold">
            <UserCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Clinical Intake & Prosthetic Assessment Portal</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
            Amputee Patient Registration
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Welcome to Bionix. Submit your clinical profile for <strong className="text-blue-400">Leg Amputee</strong> or <strong className="text-red-400">Hand/Arm Amputee</strong> care. Our certified CPO prosthetists and therapy specialists will evaluate your anatomical profile and schedule your digital socket scan.
          </p>
        </div>
      </div>

      {/* Tabs: New Registration vs Check Status */}
      <div className="flex border-b border-slate-800 gap-6">
        <button
          onClick={() => setActiveTab('form')}
          className={`pb-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'form'
              ? 'border-red-500 text-white'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <UserCheck className="w-4 h-4 text-red-400" />
          <span>New Patient Intake Form</span>
        </button>

        <button
          onClick={() => setActiveTab('lookup')}
          className={`pb-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'lookup'
              ? 'border-blue-500 text-white'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Search className="w-4 h-4 text-blue-400" />
          <span>Track Registration Status</span>
        </button>
      </div>

      {/* SUBMISSION CONFIRMATION BADGE */}
      {submittedRegistration && activeTab === 'form' && (
        <div className="rounded-2xl bg-slate-900 border-2 border-emerald-500 p-8 shadow-2xl space-y-6 animate-in zoom-in-95 duration-300">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 shrink-0">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white font-heading">Intake Successfully Registered!</h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Registration Number: <span className="font-mono text-base font-bold text-red-400">{submittedRegistration.registrationNumber}</span>
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white flex items-center gap-1.5 border border-slate-700"
              >
                <Printer className="w-3.5 h-3.5 text-blue-400" />
                <span>Print Intake Card</span>
              </button>
              <button
                onClick={() => navigateTo('dashboard')}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white flex items-center gap-1.5 shadow-md shadow-blue-600/30"
              >
                <span>Go to Patient Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-slate-400">Patient:</span>
              <div className="font-bold text-white text-sm">{submittedRegistration.fullName}</div>
              <div className="text-slate-300">{submittedRegistration.email} · {submittedRegistration.phone}</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-slate-400">Clinical Focus:</span>
              <div className="font-bold text-red-400 text-sm capitalize">
                {submittedRegistration.amputationType === 'legs' ? '🦵 Leg Amputee Care' : '🦾 Hand / Arm Amputee Care'}
              </div>
              <div className="text-slate-300">{submittedRegistration.amputationLevel} ({submittedRegistration.amputationSide})</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-slate-400">Next Step:</span>
              <div className="font-bold text-emerald-400 text-sm">Under Clinical Triage</div>
              <div className="text-slate-300">A clinical specialist will contact you within 24 hours.</div>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => setSubmittedRegistration(null)}
              className="text-xs text-blue-400 font-bold hover:underline"
            >
              Submit another patient intake
            </button>
          </div>
        </div>
      )}

      {/* LOOKUP TAB */}
      {activeTab === 'lookup' && (
        <div className="space-y-6">
          <form onSubmit={handleLookup} className="p-6 rounded-2xl bg-slate-900 border-2 border-slate-800 flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Enter Registration ID (e.g. BNX-2026-7841) or Email..."
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white shadow-md shadow-blue-600/30"
            >
              Search Intake Record
            </button>
          </form>

          {lookupError && (
            <div className="p-4 rounded-xl bg-red-600/20 border border-red-500 text-xs text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{lookupError}</span>
            </div>
          )}

          {lookupResult && (
            <div className="p-6 rounded-2xl bg-slate-900 border-2 border-slate-700 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-slate-800 pb-4">
                <div>
                  <div className="text-xs text-slate-400">Intake ID:</div>
                  <div className="text-xl font-bold text-white font-mono">{lookupResult.registrationNumber}</div>
                </div>
                <div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    lookupResult.status === 'device_delivered'
                      ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40'
                      : lookupResult.status === 'fitting_in_progress'
                      ? 'bg-blue-600/20 text-blue-300 border border-blue-500/40'
                      : lookupResult.status === 'assessment_scheduled'
                      ? 'bg-blue-600 text-white'
                      : 'bg-amber-600/20 text-amber-300 border border-amber-500/40'
                  }`}>
                    Status: {lookupResult.status.replace(/_/g, ' ')}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-slate-400">Patient:</span>
                  <div className="font-semibold text-white">{lookupResult.fullName} ({lookupResult.age}y)</div>
                </div>
                <div>
                  <span className="text-slate-400">Amputation Type:</span>
                  <div className="font-semibold text-red-400 capitalize">
                    {lookupResult.amputationType} - {lookupResult.amputationLevel}
                  </div>
                </div>
                <div>
                  <span className="text-slate-400">Side:</span>
                  <div className="font-semibold text-white capitalize">{lookupResult.amputationSide}</div>
                </div>
                <div>
                  <span className="text-slate-400">Assigned Clinician:</span>
                  <div className="font-semibold text-blue-400">{lookupResult.assignedSpecialist || 'Triage in review'}</div>
                </div>
              </div>

              {lookupResult.scheduledDate && (
                <div className="p-3 rounded-lg bg-blue-600/15 border border-blue-500/40 text-xs text-blue-300 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-400" />
                  <span>Next Clinical Fitting Session: <strong>{new Date(lookupResult.scheduledDate).toLocaleDateString()}</strong> at {new Date(lookupResult.scheduledDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              )}

              <div className="text-right pt-2">
                <button
                  onClick={() => navigateTo('dashboard')}
                  className="text-xs font-bold text-blue-400 hover:text-blue-300"
                >
                  Open Full Details in Dashboard →
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* REGISTRATION FORM (Visible when on Form tab and not yet submitted) */}
      {activeTab === 'form' && !submittedRegistration && (
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* STEP 1: AMPUTEE SPECIALIZATION SELECTOR */}
          <div className="p-6 rounded-2xl bg-slate-900 border-2 border-slate-800 space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-red-400 block mb-1">
                Step 1: Select Amputee Clinical Intake Focus *
              </label>
              <p className="text-xs text-slate-300">
                Choose the anatomical limb specialization required for your prosthetic and therapy fitting.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Option A: Legs */}
              <button
                type="button"
                onClick={() => handleTypeChange('legs')}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  amputationType === 'legs'
                    ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg shadow-blue-600/30'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-blue-500/40'
                }`}
              >
                <div className="text-2xl mb-2">🦵</div>
                <div className="text-sm font-bold text-white">Leg Amputee Intake</div>
                <div className="text-xs text-blue-300 font-semibold mt-1">Transtibial, Transfemoral & Bilateral</div>
                <div className="text-[10px] text-slate-400 mt-1">Microprocessor knee, vacuum sockets, sprint blades</div>
              </button>

              {/* Option B: Hands */}
              <button
                type="button"
                onClick={() => handleTypeChange('hands')}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  amputationType === 'hands'
                    ? 'bg-red-600/20 border-red-500 text-white shadow-lg shadow-red-600/30'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-red-500/40'
                }`}
              >
                <div className="text-2xl mb-2">🦾</div>
                <div className="text-sm font-bold text-white">Hand / Arm Amputee Intake</div>
                <div className="text-xs text-red-300 font-semibold mt-1">Transradial, Transhumeral & Myoelectric</div>
                <div className="text-[10px] text-slate-400 mt-1">Multi-grip bionic hand, sensory haptics, heavy duty</div>
              </button>

              {/* Option C: Both / Complex */}
              <button
                type="button"
                onClick={() => handleTypeChange('both')}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  amputationType === 'both'
                    ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="text-2xl mb-2">🔄</div>
                <div className="text-sm font-bold text-white">Bilateral / Complex Rehab</div>
                <div className="text-xs text-indigo-300 font-semibold mt-1">Multi-Limb Restoration & Gait</div>
                <div className="text-[10px] text-slate-400 mt-1">Holistic multi-discipline prosthetic pathway</div>
              </button>
            </div>
          </div>

          {/* STEP 2: PERSONAL & CONTACT INFORMATION */}
          <div className="p-6 rounded-2xl bg-slate-900 border-2 border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">2</span>
              Patient Personal & Contact Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-300 block mb-1">Full Legal Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Johnathan Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
                {errors.fullName && <p className="text-[11px] text-red-400 mt-0.5">{errors.fullName}</p>}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-slate-300 block mb-1">Age *</label>
                  <input
                    type="number"
                    min={4}
                    max={105}
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300 block mb-1">Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 font-medium"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer_not_to_say">Prefer not to say</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">Email Address *</label>
                <input
                  type="email"
                  placeholder="johnathan@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
                {errors.email && <p className="text-[11px] text-red-400 mt-0.5">{errors.email}</p>}
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">Phone Number *</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
                {errors.phone && <p className="text-[11px] text-red-400 mt-0.5">{errors.phone}</p>}
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">City, State / Region *</label>
                <input
                  type="text"
                  placeholder="Chicago, IL"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
                {errors.city && <p className="text-[11px] text-red-400 mt-0.5">{errors.city}</p>}
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">Country</label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* STEP 3: CLINICAL AMPUTATION PROFILE */}
          <div className="p-6 rounded-2xl bg-slate-900 border-2 border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-red-600 text-white text-xs flex items-center justify-center font-bold">3</span>
              Clinical Amputation Details ({amputationType === 'legs' ? 'Legs' : 'Hands & Arms'})
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Amputation Side */}
              <div>
                <label className="text-xs text-slate-300 block mb-1">Amputation Side *</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['left', 'right', 'bilateral'] as const).map((side) => (
                    <button
                      key={side}
                      type="button"
                      onClick={() => setAmputationSide(side)}
                      className={`py-2 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all ${
                        amputationSide === side
                          ? 'bg-red-600 text-white border-red-500'
                          : 'bg-slate-950 border-slate-700 text-slate-300'
                      }`}
                    >
                      {side}
                    </button>
                  ))}
                </div>
              </div>

              {/* Anatomical Level */}
              <div>
                <label className="text-xs text-slate-300 block mb-1">Anatomical Amputation Level *</label>
                <select
                  value={amputationLevel}
                  onChange={(e) => setAmputationLevel(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 font-medium"
                >
                  {amputationType === 'legs' ? (
                    <>
                      <option value="Transtibial (Below Knee)">Transtibial (Below Knee)</option>
                      <option value="Transfemoral (Above Knee)">Transfemoral (Above Knee)</option>
                      <option value="Knee Disarticulation">Knee Disarticulation</option>
                      <option value="Hip Disarticulation / Hemipelvectomy">Hip Disarticulation / Hemipelvectomy</option>
                      <option value="Symes / Partial Foot">Symes / Partial Foot</option>
                      <option value="Bilateral Transtibial (Both Below Knee)">Bilateral Transtibial (Both Below Knee)</option>
                      <option value="Bilateral Transfemoral (Both Above Knee)">Bilateral Transfemoral (Both Above Knee)</option>
                    </>
                  ) : (
                    <>
                      <option value="Transradial (Below Elbow)">Transradial (Below Elbow)</option>
                      <option value="Transhumeral (Above Elbow)">Transhumeral (Above Elbow)</option>
                      <option value="Wrist Disarticulation">Wrist Disarticulation</option>
                      <option value="Shoulder Disarticulation">Shoulder Disarticulation</option>
                      <option value="Partial Hand / Digit Level">Partial Hand / Multi-Finger Loss</option>
                      <option value="Bilateral Transradial">Bilateral Transradial (Both arms)</option>
                    </>
                  )}
                </select>
              </div>

              {/* Cause of Amputation */}
              <div>
                <label className="text-xs text-slate-300 block mb-1">Primary Etiology / Cause</label>
                <select
                  value={causeOfAmputation}
                  onChange={(e) => setCauseOfAmputation(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 font-medium"
                >
                  <option value="Trauma / Accident">Trauma / Accident (Motorcycle, Industrial, Blast)</option>
                  <option value="Vascular / Diabetic">Vascular / Peripheral Artery / Diabetic</option>
                  <option value="Cancer / Tumor">Cancer / Sarcoma / Tumor resection</option>
                  <option value="Congenital">Congenital Limb Difference</option>
                  <option value="Other">Other Medical Cause</option>
                </select>
              </div>

              {/* Time since surgery */}
              <div>
                <label className="text-xs text-slate-300 block mb-1">Time Since Amputation</label>
                <select
                  value={timeSinceAmputation}
                  onChange={(e) => setTimeSinceAmputation(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 font-medium"
                >
                  <option value="< 6 months">Under 6 months (Acute healing & shrinking stage)</option>
                  <option value="6-12 months">6 to 12 months (Mature stump formation)</option>
                  <option value="1-3 years">1 to 3 years (Experienced prosthetic user)</option>
                  <option value="3+ years">3+ years (Long-term device wearer)</option>
                </select>
              </div>

              {/* Mobility K-Level (Legs only) */}
              {amputationType === 'legs' && (
                <div>
                  <label className="text-xs text-slate-300 block mb-1">Expected / Current Mobility Level (K-Level)</label>
                  <select
                    value={mobilityKLevel}
                    onChange={(e) => setMobilityKLevel(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 font-medium"
                  >
                    <option value="K1">K1 - Household Ambulation (Flat indoor walking)</option>
                    <option value="K2">K2 - Limited Community (Curbs, low stairs)</option>
                    <option value="K3">K3 - Active Community (Variable cadence, outdoor terrain)</option>
                    <option value="K4">K4 - High Impact / Athlete / Child (Running, strenuous work)</option>
                  </select>
                </div>
              )}

              {/* Current Device Status */}
              <div>
                <label className="text-xs text-slate-300 block mb-1">Current Device Status</label>
                <select
                  value={currentDeviceStatus}
                  onChange={(e) => setCurrentDeviceStatus(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 font-medium"
                >
                  <option value="First-time prosthetic user">First-time prosthetic user (Need initial fitting)</option>
                  <option value="Upgrading current device">Upgrading current device to Bionic technology</option>
                  <option value="Replacement needed">Replacement socket needed due to volume change</option>
                  <option value="Post-surgical recovery">Post-surgical recovery / Pre-amputation consultation</option>
                </select>
              </div>
            </div>

            {/* Primary Goal Textarea */}
            <div>
              <label className="text-xs text-slate-300 block mb-1">What is your primary personal mobility or functional goal? *</label>
              <textarea
                rows={2}
                placeholder="e.g. Return to walking unassisted without crutches, play with my grandchildren, return to carpentry work, climb stairs naturally..."
                value={primaryGoal}
                onChange={(e) => setPrimaryGoal(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              />
              {errors.primaryGoal && <p className="text-[11px] text-red-400 mt-0.5">{errors.primaryGoal}</p>}
            </div>
          </div>

          {/* STEP 4: REHABILITATION THERAPY PROGRAM SELECTION */}
          <div className="p-6 rounded-2xl bg-slate-900 border-2 border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">4</span>
              Select Clinical Services & Therapies Needed
            </h3>
            <p className="text-xs text-slate-300">
              Select all therapy programs you wish to include in your clinical care pathway:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => toggleService('physiotherapy')}
                className={`p-3.5 rounded-xl border-2 text-left flex items-start gap-3 transition-all ${
                  selectedServices.includes('physiotherapy')
                    ? 'bg-blue-600/20 border-blue-500 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className={`p-2 rounded-lg ${selectedServices.includes('physiotherapy') ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Physiotherapy & Gait</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Gait biomechanics, balance, stump volume conditioning</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => toggleService('speech')}
                className={`p-3.5 rounded-xl border-2 text-left flex items-start gap-3 transition-all ${
                  selectedServices.includes('speech')
                    ? 'bg-blue-600/20 border-blue-500 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className={`p-2 rounded-lg ${selectedServices.includes('speech') ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Speech & Cognitive</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Neuro speech rehab, vocal strength, breath articulation</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => toggleService('counseling')}
                className={`p-3.5 rounded-xl border-2 text-left flex items-start gap-3 transition-all ${
                  selectedServices.includes('counseling')
                    ? 'bg-red-600/20 border-red-500 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className={`p-2 rounded-lg ${selectedServices.includes('counseling') ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Trauma & Counseling</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Phantom pain management & emotional adaptation</div>
                </div>
              </button>
            </div>
          </div>

          {/* STEP 5: CONSULTATION SETTING & EMERGENCY CONTACT */}
          <div className="p-6 rounded-2xl bg-slate-900 border-2 border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">5</span>
              Consultation Mode & Emergency Contact
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-300 block mb-1">Preferred Consultation Setting</label>
                <select
                  value={preferredConsultationType}
                  onChange={(e) => setPreferredConsultationType(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 font-medium"
                >
                  <option value="In-Clinic VIP Fitting">In-Clinic VIP Fitting (3D Socket Scanning Lab)</option>
                  <option value="Telehealth Initial Assessment">Telehealth Virtual Initial Assessment</option>
                  <option value="Home Evaluation">Home Evaluation (For non-ambulatory patients)</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">Emergency Contact Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Sarah Doe (Spouse / Guardian)"
                  value={emergencyContactName}
                  onChange={(e) => setEmergencyContactName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
                {errors.emergencyContactName && <p className="text-[11px] text-red-400 mt-0.5">{errors.emergencyContactName}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs text-slate-300 block mb-1">Emergency Contact Phone Number *</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 999-8888"
                  value={emergencyContactPhone}
                  onChange={(e) => setEmergencyContactPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
                {errors.emergencyContactPhone && <p className="text-[11px] text-red-400 mt-0.5">{errors.emergencyContactPhone}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs text-slate-300 block mb-1">Additional Clinical Notes or Questions</label>
                <textarea
                  rows={2}
                  placeholder="Any skin allergies, surgical pins, existing liners or special scheduling needs..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Submit button */}
          <div className="p-6 rounded-2xl bg-slate-900 border-2 border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-300 max-w-md">
              By submitting this intake, your clinical profile is encrypted according to HIPAA guidelines and forwarded directly to the Chief Prosthetist.
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-red-600 hover:bg-red-500 shadow-xl shadow-red-600/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>Complete Amputee Intake Registration</span>
            </button>
          </div>

        </form>
      )}

    </div>
  );
};
