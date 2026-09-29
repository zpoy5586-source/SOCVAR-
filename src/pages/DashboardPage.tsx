import React, { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  ShoppingBag, 
  Activity, 
  Calendar, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ArrowUpRight, 
  CreditCard, 
  Filter, 
  Search,
  Eye,
  Cpu,
  Layers,
  HeartPulse,
  HeartHandshake,
  TrendingUp,
  Battery,
  Sliders,
  Sparkles,
  Download,
  PlusCircle,
  FileSpreadsheet,
  ChevronDown,
  PhoneCall,
  Printer,
  ExternalLink,
  Wrench,
  Stethoscope
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PatientRegistration, Order } from '../types';

export const DashboardPage: React.FC = () => {
  const { 
    registrations, 
    orders, 
    products, 
    services, 
    updateRegistrationStatus, 
    navigateTo,
    showToast
  } = useApp();

  const [activeDashboardMode, setActiveDashboardMode] = useState<'clinical_provider' | 'patient_portal'>('clinical_provider');
  const [triageFilter, setTriageFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPatientForModal, setSelectedPatientForModal] = useState<PatientRegistration | null>(null);

  // Compute Sales Metrics
  const totalProductSales = orders.reduce((sum, order) => {
    const productTotal = order.items
      .filter(item => item.type === 'product')
      .reduce((s, it) => s + it.unitPrice * it.quantity, 0);
    return sum + productTotal;
  }, 0);

  const totalServiceSales = orders.reduce((sum, order) => {
    const serviceTotal = order.items
      .filter(item => item.type === 'service')
      .reduce((s, it) => s + it.unitPrice * it.quantity, 0);
    return sum + serviceTotal;
  }, 0);

  const combinedRevenue = totalProductSales + totalServiceSales;

  // Registered Amputee Metrics
  const legAmputeesCount = registrations.filter(r => r.amputationType === 'legs').length;
  const handAmputeesCount = registrations.filter(r => r.amputationType === 'hands').length;
  const complexAmputeesCount = registrations.filter(r => r.amputationType === 'both').length;

  // Filtered registrations
  const filteredRegistrations = registrations.filter((r) => {
    const matchesFilter = triageFilter === 'all' || r.status === triageFilter;
    const matchesSearch = 
      r.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.amputationLevel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Pick active patient for Patient Portal demo
  const activePatient = registrations[0] || {
    id: 'demo',
    registrationNumber: 'BNX-2026-7841',
    fullName: 'Robert Sterling',
    email: 'robert.sterling@example.com',
    phone: '+1 (555) 349-2189',
    age: 38,
    amputationType: 'legs',
    amputationSide: 'right',
    amputationLevel: 'Transfemoral (Above Knee)',
    causeOfAmputation: 'Trauma / Accident',
    status: 'assessment_scheduled',
    scheduledDate: '2026-10-04T14:00:00Z',
    assignedSpecialist: 'Dr. Marcus Vance, DPT, CPO',
    selectedServices: ['physiotherapy', 'counseling'],
    primaryGoal: 'Achieve stable independent walking on stairs without crutches.'
  } as PatientRegistration;

  // Export CSV handler
  const handleExportCSV = () => {
    const headers = ['Registration Number', 'Patient Name', 'Email', 'Phone', 'Amputation Type', 'Level', 'Side', 'Status', 'Date'];
    const rows = registrations.map(r => [
      r.registrationNumber,
      `"${r.fullName}"`,
      r.email,
      r.phone,
      r.amputationType,
      `"${r.amputationLevel}"`,
      r.amputationSide,
      r.status,
      r.createdAt
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `bionix_triage_export_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast({
      type: 'success',
      title: 'Triage Exported',
      message: 'Amputee intake roster downloaded as CSV.'
    });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* ============================================================== */}
      {/* UPPER MASTER CONTROL & BUTTONS COMMAND CENTER */}
      {/* ============================================================== */}
      <div className="rounded-3xl bg-gradient-to-r from-[#102a5c] via-[#133570] to-[#1c234a] border-2 border-blue-500/40 p-6 sm:p-7 shadow-2xl space-y-6">
        
        {/* Top Header Row with View Switcher Buttons */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 border-b border-blue-400/20 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                Live Clinical Telemetry & Hardware Hub
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight">
              Bionix Operations Dashboard
            </h1>
            <p className="text-xs text-blue-200 mt-0.5">
              Instant management of bionic limb hardware sales, clinical rehab bookings, and patient intake triage.
            </p>
          </div>

          {/* Mode Switcher Buttons - Positioned Upper with High Contrast */}
          <div className="flex p-1.5 rounded-2xl bg-[#091b3b] border-2 border-blue-400/40 shadow-inner shrink-0">
            <button
              onClick={() => setActiveDashboardMode('clinical_provider')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shadow-sm ${
                activeDashboardMode === 'clinical_provider'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-700/50 scale-[1.02]'
                  : 'text-blue-200 hover:text-white hover:bg-blue-900/40'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-blue-200" />
              <span>Company & Clinical Provider</span>
            </button>

            <button
              onClick={() => setActiveDashboardMode('patient_portal')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shadow-sm ${
                activeDashboardMode === 'patient_portal'
                  ? 'bg-red-600 text-white shadow-lg shadow-red-700/50 scale-[1.02]'
                  : 'text-red-200 hover:text-white hover:bg-red-950/40'
              }`}
            >
              <Activity className="w-4 h-4 text-red-200" />
              <span>Patient Care Portal</span>
            </button>
          </div>
        </div>

        {/* UPPER ACTION BUTTONS ROW (Elevated from bottom to top) */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-300" />
              Upper Command Actions & Quick Shortcuts
            </span>
            <div className="hidden sm:flex items-center gap-2 text-xs text-blue-300">
              <button 
                onClick={() => scrollToSection('dashboard-metrics')} 
                className="hover:text-white underline underline-offset-4"
              >
                Jump to Metrics
              </button>
              <span>•</span>
              <button 
                onClick={() => scrollToSection('dashboard-triage')} 
                className="hover:text-white underline underline-offset-4"
              >
                Jump to Triage
              </button>
              <span>•</span>
              <button 
                onClick={() => scrollToSection('dashboard-orders')} 
                className="hover:text-white underline underline-offset-4"
              >
                Jump to Orders
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {/* Action 1: Register Leg Amputee */}
            <button
              onClick={() => navigateTo('registration', { registrationType: 'legs' })}
              className="p-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-semibold text-xs transition-all shadow-md shadow-red-900/40 flex flex-col items-center justify-center gap-1 text-center group active:scale-95 border border-red-400/30"
            >
              <span className="text-base group-hover:scale-110 transition-transform">🦵</span>
              <span>Register Leg Amputee</span>
            </button>

            {/* Action 2: Register Hand Amputee */}
            <button
              onClick={() => navigateTo('registration', { registrationType: 'hands' })}
              className="p-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-semibold text-xs transition-all shadow-md shadow-red-900/40 flex flex-col items-center justify-center gap-1 text-center group active:scale-95 border border-red-400/30"
            >
              <span className="text-base group-hover:scale-110 transition-transform">🦾</span>
              <span>Register Hand Amputee</span>
            </button>

            {/* Action 3: Bionic Legs Catalog */}
            <button
              onClick={() => navigateTo('products', { productCat: 'legs' })}
              className="p-3 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold text-xs transition-all shadow-md shadow-blue-900/40 flex flex-col items-center justify-center gap-1 text-center group active:scale-95 border border-blue-400/30"
            >
              <Cpu className="w-4 h-4 text-blue-200 group-hover:scale-110 transition-transform" />
              <span>Order Bionic Legs</span>
            </button>

            {/* Action 4: Bionic Hands Catalog */}
            <button
              onClick={() => navigateTo('products', { productCat: 'hands' })}
              className="p-3 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold text-xs transition-all shadow-md shadow-blue-900/40 flex flex-col items-center justify-center gap-1 text-center group active:scale-95 border border-blue-400/30"
            >
              <Layers className="w-4 h-4 text-blue-200 group-hover:scale-110 transition-transform" />
              <span>Order Bionic Hands</span>
            </button>

            {/* Action 5: Book Therapy Services */}
            <button
              onClick={() => navigateTo('services')}
              className="p-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-700 hover:from-blue-500 hover:to-cyan-600 text-white font-semibold text-xs transition-all shadow-md shadow-blue-900/40 flex flex-col items-center justify-center gap-1 text-center group active:scale-95 border border-cyan-400/30"
            >
              <Stethoscope className="w-4 h-4 text-cyan-200 group-hover:scale-110 transition-transform" />
              <span>Book Therapy Sessions</span>
            </button>

            {/* Action 6: Export CSV Data */}
            <button
              onClick={handleExportCSV}
              className="p-3 rounded-xl bg-[#0e244d] hover:bg-[#163673] border border-blue-400/50 text-blue-100 font-semibold text-xs transition-all flex flex-col items-center justify-center gap-1 text-center group active:scale-95 shadow-md"
            >
              <Download className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span>Export Triage CSV</span>
            </button>
          </div>
        </div>

      </div>

      {/* ============================================================== */}
      {/* VIEW 1: CLINICAL PROVIDER / COMPANY OPERATIONS */}
      {/* ============================================================== */}
      {activeDashboardMode === 'clinical_provider' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Top KPI Cards (Product Sales, Service Sales, Revenue, Patients) */}
          <div id="dashboard-metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* KPI 1: Product Sales */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#122e5e] via-[#0f2752] to-[#0c1e3d] border-2 border-blue-500/40 shadow-xl">
              <div className="flex items-center justify-between text-blue-300 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Product Sales</span>
                <div className="p-2 rounded-lg bg-blue-600/30 text-blue-300">
                  <Cpu className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">
                ${totalProductSales.toLocaleString()}
              </div>
              <div className="text-xs text-blue-200 mt-2 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                <span>Legs & Hands Hardware</span>
              </div>
            </div>

            {/* KPI 2: Service Sales */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#3b1227] via-[#2a0e20] to-[#1a0c1a] border-2 border-red-500/40 shadow-xl">
              <div className="flex items-center justify-between text-red-300 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Service Sales</span>
                <div className="p-2 rounded-lg bg-red-600/30 text-red-300">
                  <HeartPulse className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">
                ${totalServiceSales.toLocaleString()}
              </div>
              <div className="text-xs text-red-200 mt-2 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                <span>Physio, Speech & Counseling</span>
              </div>
            </div>

            {/* KPI 3: Combined Revenue */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#1e2560] via-[#161c4d] to-[#0f143d] border-2 border-indigo-400/40 shadow-xl">
              <div className="flex items-center justify-between text-indigo-300 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Combined Revenue</span>
                <div className="p-2 rounded-lg bg-indigo-600/30 text-indigo-300">
                  <CreditCard className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">
                ${combinedRevenue.toLocaleString()}
              </div>
              <div className="text-xs text-indigo-200 mt-2">
                {orders.length} clinical transactions processed
              </div>
            </div>

            {/* KPI 4: Registered Amputees */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#133261] via-[#0f274e] to-[#0a1b38] border-2 border-cyan-400/40 shadow-xl">
              <div className="flex items-center justify-between text-cyan-300 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Registered Patients</span>
                <div className="p-2 rounded-lg bg-cyan-600/30 text-cyan-300">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">
                {registrations.length} Amputees
              </div>
              <div className="text-xs text-cyan-200 mt-2 flex items-center gap-2">
                <span className="text-blue-300 font-bold">{legAmputeesCount} Legs</span>
                <span>•</span>
                <span className="text-red-300 font-bold">{handAmputeesCount} Hands</span>
                {complexAmputeesCount > 0 && (
                  <>
                    <span>•</span>
                    <span className="text-indigo-300 font-bold">{complexAmputeesCount} Both</span>
                  </>
                )}
              </div>
            </div>

          </div>

          {/* ============================================================== */}
          {/* PATIENT INTAKE TRIAGE & REGISTRATION QUEUE (With Upper Filter Controls) */}
          {/* ============================================================== */}
          <div id="dashboard-triage" className="rounded-3xl bg-[#0d2247] border-2 border-blue-500/40 overflow-hidden shadow-2xl">
            
            {/* Upper Table Toolbar & Filter Buttons */}
            <div className="p-6 border-b border-blue-500/30 bg-[#102b5a]/90 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-extrabold text-white text-lg font-heading flex items-center gap-2.5">
                    <Activity className="w-5 h-5 text-red-500" />
                    <span>Amputee Patient Registration & Clinical Triage Queue</span>
                  </h3>
                  <p className="text-xs text-blue-200 mt-0.5">
                    Real-time intake tracking across Legs, Hands, and Multidisciplinary care.
                  </p>
                </div>

                {/* Instant Search Bar */}
                <div className="relative w-full md:w-72">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-blue-300" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, ID, or level..."
                    className="w-full bg-[#0a1a38] border border-blue-400/50 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-blue-300/60 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-blue-300 hover:text-white"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* UPPER TRIAGE FILTER BUTTONS ROW (Moved from table bottom to upper control) */}
              <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-blue-400/20">
                <span className="text-xs font-bold text-blue-300 mr-1 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" /> Filter Status:
                </span>
                {[
                  { id: 'all', label: 'All Patients', count: registrations.length },
                  { id: 'registered', label: 'Registered', count: registrations.filter(r => r.status === 'registered').length },
                  { id: 'under_clinical_review', label: 'Under Review', count: registrations.filter(r => r.status === 'under_clinical_review').length },
                  { id: 'assessment_scheduled', label: 'Assessment Scheduled', count: registrations.filter(r => r.status === 'assessment_scheduled').length },
                  { id: 'fitting_in_progress', label: 'Fitting in Progress', count: registrations.filter(r => r.status === 'fitting_in_progress').length },
                  { id: 'device_delivered', label: 'Delivered', count: registrations.filter(r => r.status === 'device_delivered').length },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setTriageFilter(tab.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      triageFilter === tab.id
                        ? 'bg-red-600 text-white shadow-md shadow-red-700/40 scale-105'
                        : 'bg-[#0a1a38] text-blue-200 hover:text-white hover:bg-blue-800/50 border border-blue-400/30'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                      triageFilter === tab.id ? 'bg-red-800 text-red-100' : 'bg-blue-900 text-blue-200'
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Patients Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0b1c3b] text-blue-300 uppercase tracking-wider border-b border-blue-500/30 font-semibold">
                  <tr>
                    <th className="py-3.5 px-4">Registration ID</th>
                    <th className="py-3.5 px-4">Patient Name</th>
                    <th className="py-3.5 px-4">Category & Level</th>
                    <th className="py-3.5 px-4">Side</th>
                    <th className="py-3.5 px-4">Mobility Goal</th>
                    <th className="py-3.5 px-4">Status & Clinical Stage</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-500/20">
                  {filteredRegistrations.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-8 text-blue-200">
                        No registrations match the selected filter.
                      </td>
                    </tr>
                  ) : (
                    filteredRegistrations.map((reg) => (
                      <tr key={reg.id} className="hover:bg-blue-800/20 transition-colors">
                        <td className="py-4 px-4 font-mono font-bold text-red-400">
                          {reg.registrationNumber}
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-bold text-white text-sm">{reg.fullName}</div>
                          <div className="text-[11px] text-blue-300">{reg.city} · {reg.phone}</div>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-bold inline-flex items-center gap-1.5 ${
                            reg.amputationType === 'legs'
                              ? 'bg-blue-900/80 text-blue-200 border border-blue-500'
                              : 'bg-red-950 text-red-200 border border-red-600'
                          }`}>
                            <span>{reg.amputationType === 'legs' ? '🦵' : '🦾'}</span>
                            <span>{reg.amputationLevel}</span>
                          </span>
                        </td>
                        <td className="py-4 px-4 uppercase text-blue-200 font-bold">
                          {reg.amputationSide}
                        </td>
                        <td className="py-4 px-4 max-w-xs truncate text-blue-100" title={reg.primaryGoal}>
                          {reg.primaryGoal}
                        </td>
                        <td className="py-4 px-4">
                          <select
                            value={reg.status}
                            onChange={(e) => updateRegistrationStatus(reg.id, e.target.value as any)}
                            className="bg-[#0a1a38] border-2 border-blue-400/60 rounded-xl px-2.5 py-1 text-xs text-white focus:outline-none focus:border-red-500 font-semibold"
                          >
                            <option value="registered">Registered</option>
                            <option value="under_clinical_review">Under Review</option>
                            <option value="assessment_scheduled">Assessment Scheduled</option>
                            <option value="fitting_in_progress">Fitting in Progress</option>
                            <option value="device_delivered">Device Delivered</option>
                          </select>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <button
                            onClick={() => setSelectedPatientForModal(reg)}
                            className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors shadow-sm"
                          >
                            Full View
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer Summary Bar */}
            <div className="p-4 bg-[#0a1a38] border-t border-blue-500/30 flex items-center justify-between text-xs text-blue-200">
              <span>Showing {filteredRegistrations.length} of {registrations.length} total patient registrations</span>
              <button
                onClick={() => navigateTo('registration')}
                className="font-bold text-red-400 hover:text-red-300 flex items-center gap-1"
              >
                + Open New Registration Form
              </button>
            </div>
          </div>

          {/* ============================================================== */}
          {/* RECENT CLINICAL ORDERS & SALES TRANSACTIONS */}
          {/* ============================================================== */}
          <div id="dashboard-orders" className="rounded-3xl bg-[#0d2247] border-2 border-blue-500/40 overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-blue-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#102b5a]/90">
              <div>
                <h3 className="font-extrabold text-white text-lg font-heading flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-blue-400" />
                  <span>Recent Hardware Sales & Clinical Bookings</span>
                </h3>
                <p className="text-xs text-blue-200 mt-0.5">
                  Processed orders through direct prosthetic sales and clinical therapy packages.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigateTo('products')}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-sm"
                >
                  + Add Product Order
                </button>
                <button
                  onClick={() => navigateTo('services')}
                  className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-sm"
                >
                  + Book Service
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0b1c3b] text-blue-300 uppercase tracking-wider border-b border-blue-500/30 font-semibold">
                  <tr>
                    <th className="py-3.5 px-4">Order ID</th>
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 px-4">Customer / Patient</th>
                    <th className="py-3.5 px-4">Purchased Items</th>
                    <th className="py-3.5 px-4">Payment Method</th>
                    <th className="py-3.5 px-4">Total Amount</th>
                    <th className="py-3.5 px-4">Order Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-500/20">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-blue-800/20 transition-colors">
                      <td className="py-4 px-4 font-mono font-bold text-blue-300">
                        {ord.orderNumber}
                      </td>
                      <td className="py-4 px-4 text-blue-200">
                        {new Date(ord.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-bold text-white text-sm">{ord.customerName}</div>
                        <div className="text-[11px] text-blue-300 truncate max-w-xs">{ord.customerEmail}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          {ord.items.map((it, idx) => (
                            <div key={idx} className="flex items-center gap-1.5 text-blue-100">
                              <span className={`w-2 h-2 rounded-full ${it.type === 'product' ? 'bg-blue-400' : 'bg-red-400'}`}></span>
                              <span className="font-medium truncate max-w-xs">{it.name} (x{it.quantity})</span>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-4 font-bold text-emerald-400">
                        {ord.paymentMethod}
                      </td>
                      <td className="py-4 px-4 font-extrabold text-white text-sm">
                        ${ord.total.toLocaleString()}
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-2.5 py-1 rounded-full bg-emerald-900/60 text-emerald-200 border border-emerald-500 text-[10px] font-extrabold uppercase tracking-wider">
                          {ord.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ============================================================== */}
      {/* VIEW 2: PATIENT PORTAL VIEW (With Upper Actions & Live Telemetry) */}
      {/* ============================================================== */}
      {activeDashboardMode === 'patient_portal' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Patient Overview Card with Prominent Upper Action Buttons */}
          <div className="rounded-3xl bg-gradient-to-r from-[#1c1236] via-[#102b5a] to-[#0c1e3d] border-2 border-red-500/40 p-6 sm:p-8 shadow-2xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-blue-600 p-[2px] shrink-0 shadow-lg">
                  <div className="w-full h-full bg-[#0a1a38] rounded-[14px] flex items-center justify-center text-xl font-extrabold text-white">
                    {activePatient.fullName.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-2xl font-extrabold text-white font-heading">{activePatient.fullName}</h2>
                    <span className="px-2.5 py-0.5 rounded-lg bg-blue-800 text-blue-200 border border-blue-400 text-xs font-mono font-bold">
                      {activePatient.registrationNumber}
                    </span>
                  </div>
                  <p className="text-xs text-blue-200 mt-1">
                    {activePatient.amputationLevel} ({activePatient.amputationSide} side) · {activePatient.age} years old
                  </p>
                  <p className="text-xs text-emerald-300 mt-0.5 font-semibold">
                    Assigned Specialist: {activePatient.assignedSpecialist || 'Dr. Marcus Vance, DPT, CPO'}
                  </p>
                </div>
              </div>

              {/* Upper Patient Action Buttons Suite */}
              <div className="flex flex-wrap gap-2.5">
                <button
                  onClick={() => navigateTo('registration')}
                  className="px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-600 text-xs font-bold text-white border border-blue-400 transition-all shadow-md active:scale-95"
                >
                  Update Clinical Profile
                </button>
                <button
                  onClick={() => navigateTo('services')}
                  className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-xs font-bold text-white shadow-lg shadow-red-700/50 transition-all active:scale-95 flex items-center gap-1.5"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Next Therapy Session</span>
                </button>
                <button
                  onClick={() => {
                    window.print();
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#0e244d] hover:bg-[#163673] border border-blue-400 text-xs font-bold text-blue-100 transition-all flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4 text-blue-300" />
                  <span>Print Care Card</span>
                </button>
              </div>
            </div>
          </div>

          {/* Patient Telemetry & Health Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Socket Comfort Index */}
            <div className="p-6 rounded-3xl bg-[#0d2247] border-2 border-blue-500/40 space-y-3 shadow-xl">
              <div className="flex items-center justify-between text-xs text-blue-200 font-bold">
                <span>Socket Vacuum Seal & Pressure</span>
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="text-3xl font-black text-white">99.4%</div>
              <div className="w-full bg-[#0a1a38] h-2.5 rounded-full overflow-hidden border border-blue-500/30">
                <div className="bg-emerald-400 h-full w-[99%]"></div>
              </div>
              <p className="text-xs text-blue-200">Zero skin shear detected. Active elevated vacuum seal is optimal.</p>
            </div>

            {/* Daily Ambulation Target */}
            <div className="p-6 rounded-3xl bg-[#0d2247] border-2 border-blue-500/40 space-y-3 shadow-xl">
              <div className="flex items-center justify-between text-xs text-blue-200 font-bold">
                <span>Daily Stride & Cadence</span>
                <Activity className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-3xl font-black text-white">7,420 <span className="text-sm font-semibold text-blue-300">/ 8,000 steps</span></div>
              <div className="w-full bg-[#0a1a38] h-2.5 rounded-full overflow-hidden border border-blue-500/30">
                <div className="bg-blue-500 h-full w-[85%]"></div>
              </div>
              <p className="text-xs text-blue-200">Symmetrical gait ratio: 49.2% Left / 50.8% Right balance.</p>
            </div>

            {/* Bionic Battery Life */}
            <div className="p-6 rounded-3xl bg-[#0d2247] border-2 border-blue-500/40 space-y-3 shadow-xl">
              <div className="flex items-center justify-between text-xs text-blue-200 font-bold">
                <span>Microprocessor Battery</span>
                <Battery className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="text-3xl font-black text-white">82% <span className="text-sm font-semibold text-blue-300">(~58 hrs left)</span></div>
              <div className="w-full bg-[#0a1a38] h-2.5 rounded-full overflow-hidden border border-blue-500/30">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full w-[82%]"></div>
              </div>
              <p className="text-xs text-blue-200">Firmware v4.8.2 Up to date. Bluetooth sync connected.</p>
            </div>

          </div>

          {/* Scheduled Appointments & Care Pathway */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Upcoming Therapy Sessions */}
            <div className="p-6 rounded-3xl bg-[#0d2247] border-2 border-blue-500/40 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-white text-base font-heading flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  <span>Upcoming Rehabilitation Appointments</span>
                </h3>
                <button
                  onClick={() => navigateTo('services')}
                  className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
                >
                  + Book More
                </button>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-[#0a1a38] border border-blue-500/30 flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-white">Physiotherapy: Gait Analysis & Stride Training</div>
                    <div className="text-xs text-blue-200">With Dr. Marcus Vance, DPT · In-Clinic Biomechanics Track</div>
                    <div className="text-xs text-blue-300 font-bold">Tuesday, Oct 6 at 10:00 AM</div>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-blue-800 text-blue-100 border border-blue-400 text-[11px] font-bold">
                    Confirmed
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#0a1a38] border border-red-500/30 flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-white">Trauma & Phantom Limb Counseling</div>
                    <div className="text-xs text-red-200">With Dr. Sarah Al-Mansoor, Ph.D. · Virtual Telehealth</div>
                    <div className="text-xs text-red-300 font-bold">Friday, Oct 9 at 03:00 PM</div>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-red-900 text-red-100 border border-red-500 text-[11px] font-bold">
                    Telehealth
                  </span>
                </div>
              </div>

              <button
                onClick={() => navigateTo('services')}
                className="w-full py-3 rounded-2xl border-2 border-dashed border-blue-400 hover:bg-blue-800/40 text-xs font-bold text-blue-200 transition-colors"
              >
                + Schedule Additional Clinical Session (Physio / Speech / Counseling)
              </button>
            </div>

            {/* Hardware Delivery & Socket Adjustments */}
            <div className="p-6 rounded-3xl bg-[#0d2247] border-2 border-blue-500/40 space-y-4 shadow-xl">
              <h3 className="font-extrabold text-white text-base font-heading flex items-center gap-2">
                <Cpu className="w-5 h-5 text-red-400" />
                <span>My Bionic Devices & Sockets</span>
              </h3>

              <div className="p-4 rounded-2xl bg-[#0a1a38] border border-blue-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-white text-sm">Aegis-X Titan Microprocessor Knee</h5>
                    <p className="text-xs text-blue-200">Serial: SN-TX-2026-99214 · Side: Right</p>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-lg bg-emerald-900/60 text-emerald-200 border border-emerald-500 font-bold">
                    Active & Calibrated
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div className="bg-[#071329] p-2.5 rounded-xl border border-blue-500/20">
                    <span className="text-blue-300 block text-[10px] font-bold uppercase">Warranty:</span>
                    <span className="text-white font-semibold">Until Oct 2031 (5 Yrs)</span>
                  </div>
                  <div className="bg-[#071329] p-2.5 rounded-xl border border-blue-500/20">
                    <span className="text-blue-300 block text-[10px] font-bold uppercase">Next Maintenance:</span>
                    <span className="text-white font-semibold">April 2027</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-blue-900/40 border border-blue-400/40 text-xs text-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span>Residual limb volume changed? Request socket reline check:</span>
                <button
                  onClick={() => navigateTo('services', { serviceCat: 'physiotherapy' })}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shrink-0 shadow-md"
                >
                  Request Socket Check
                </button>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Patient Details Modal */}
      {selectedPatientForModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative bg-[#0d2247] border-2 border-blue-500 rounded-3xl max-w-2xl w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-blue-500/30 pb-3">
              <div>
                <h4 className="font-extrabold text-white text-lg font-heading">{selectedPatientForModal.fullName}</h4>
                <p className="text-xs font-mono font-bold text-red-400">{selectedPatientForModal.registrationNumber}</p>
              </div>
              <button
                onClick={() => setSelectedPatientForModal(null)}
                className="w-8 h-8 rounded-full bg-blue-900/60 hover:bg-blue-800 text-blue-200 hover:text-white flex items-center justify-center text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#0a1a38] border border-blue-500/30">
                <span className="text-blue-300 block font-bold">Amputation Category:</span>
                <span className="font-extrabold text-white capitalize">{selectedPatientForModal.amputationType}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0a1a38] border border-blue-500/30">
                <span className="text-blue-300 block font-bold">Level & Side:</span>
                <span className="font-extrabold text-white">{selectedPatientForModal.amputationLevel} ({selectedPatientForModal.amputationSide})</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0a1a38] border border-blue-500/30">
                <span className="text-blue-300 block font-bold">Contact Info:</span>
                <span className="font-extrabold text-white">{selectedPatientForModal.email} · {selectedPatientForModal.phone}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0a1a38] border border-blue-500/30">
                <span className="text-blue-300 block font-bold">Emergency Contact:</span>
                <span className="font-extrabold text-white">{selectedPatientForModal.emergencyContactName} ({selectedPatientForModal.emergencyContactPhone})</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0a1a38] border border-blue-500/30 space-y-1 text-xs">
              <span className="text-blue-300 font-bold block">Primary Rehabilitation Goal:</span>
              <p className="text-white leading-relaxed">{selectedPatientForModal.primaryGoal}</p>
            </div>

            {selectedPatientForModal.additionalNotes && (
              <div className="p-3.5 rounded-xl bg-[#0a1a38] border border-blue-500/30 space-y-1 text-xs">
                <span className="text-blue-300 font-bold block">Clinical & Surgical Notes:</span>
                <p className="text-white leading-relaxed">{selectedPatientForModal.additionalNotes}</p>
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-blue-500/30">
              <div className="text-xs text-blue-200">
                Current status: <span className="font-bold text-red-400 capitalize">{selectedPatientForModal.status.replace(/_/g, ' ')}</span>
              </div>
              <button
                onClick={() => setSelectedPatientForModal(null)}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white shadow-md"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
