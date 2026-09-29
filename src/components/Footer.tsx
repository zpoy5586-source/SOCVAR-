import React from 'react';
import { 
  Activity, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Award, 
  HeartHandshake,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 relative overflow-hidden">
      {/* Ambient background glows (Red and Vibrant Blue) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Banner */}
      <div className="border-b border-slate-800 bg-slate-900/80 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-red-600 p-[1.5px] flex items-center justify-center shrink-0 shadow-lg">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <HeartHandshake className="w-6 h-6 text-red-500" />
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold text-base font-heading">
                Ready for your clinical prosthetic assessment?
              </h4>
              <p className="text-sm text-slate-300">
                Register online for custom 3D digital socket scanning and robotic gait evaluation.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigateTo('registration', { registrationType: 'legs' })}
              className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-red-600 hover:bg-red-500 shadow-lg shadow-red-600/30 transition-all flex items-center gap-2"
            >
              <span>Leg Amputee Intake</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigateTo('registration', { registrationType: 'hands' })}
              className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2"
            >
              <span>Hand Amputee Intake</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-red-600 p-[1.5px]">
                <div className="w-full h-full bg-slate-950 rounded-[6.5px] flex items-center justify-center">
                  <Activity className="w-5 h-5 text-red-500" />
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-heading">BIONIX</span>
              <span className="text-[10px] px-2 py-0.5 rounded font-extrabold uppercase tracking-wider bg-blue-600 text-white shadow-sm">
                ORTHO & REHAB
              </span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              Global manufacturer and clinical provider of next-generation microprocessor bionic limbs, 
              sensor-integrated myoelectric hands, and comprehensive amputee rehabilitation therapies.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-1.5 text-xs text-slate-200 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>ISO 13485 Medical Device</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-200 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                <Award className="w-4 h-4 text-blue-400" />
                <span>FDA Cleared Systems</span>
              </div>
            </div>
          </div>

          {/* Products Column */}
          <div className="space-y-3">
            <h5 className="text-sm font-bold uppercase tracking-wider text-blue-400 font-heading">
              Bionic Products
            </h5>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => navigateTo('products', { productCat: 'legs' })}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Bionic Legs & Knees
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('products', { productCat: 'hands' })}
                  className="hover:text-red-400 transition-colors text-left"
                >
                  Myoelectric Hands & Arms
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('products', { productCat: 'legs' })}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Carbon Sprint Blades
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('products', { productCat: 'legs' })}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Elevated Vacuum Sockets
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('products', { productCat: 'hands' })}
                  className="hover:text-red-400 transition-colors text-left"
                >
                  Haptic Feedback NeuroHands
                </button>
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div className="space-y-3">
            <h5 className="text-sm font-bold uppercase tracking-wider text-red-400 font-heading">
              Clinical Services
            </h5>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => navigateTo('services', { serviceCat: 'physiotherapy' })}
                  className="hover:text-red-400 transition-colors text-left"
                >
                  Physiotherapy & Gait Training
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('services', { serviceCat: 'speech' })}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Speech & Language Therapy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('services', { serviceCat: 'counseling' })}
                  className="hover:text-red-400 transition-colors text-left"
                >
                  Trauma & Phantom Limb Counseling
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('registration')}
                  className="hover:text-white transition-colors text-left text-slate-200 font-bold"
                >
                  Patient Intake Registration
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('dashboard')}
                  className="hover:text-blue-400 transition-colors text-left text-blue-400 font-bold"
                >
                  Patient & Provider Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Clinical Headquarters */}
          <div className="space-y-3">
            <h5 className="text-sm font-bold uppercase tracking-wider text-slate-300 font-heading">
              Clinical Center
            </h5>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>742 Bionics Blvd, Suite 400, Chicago Innovation Medical District, IL 60612</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-500 shrink-0" />
                <span>+1 (800) 555-BIONIX / (312) 555-0199</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                <span>clinical@bionix-rehab.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Mon - Sat: 8:00 AM – 7:00 PM (Emergency 24/7)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Bionix & Rehab Solutions Inc. All medical rights reserved.</p>
          <p className="max-w-xl text-center md:text-right">
            Clinical Disclaimer: Prosthetic fitment and prescription therapies are conducted by certified CPO (Certified Prosthetist/Orthotist) and licensed DPT clinicians. Medical insurance claims subject to carrier policy.
          </p>
        </div>
      </div>
    </footer>
  );
};
