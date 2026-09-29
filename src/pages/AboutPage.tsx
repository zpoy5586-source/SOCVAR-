import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  Users, 
  Activity, 
  CheckCircle2, 
  Cpu, 
  HeartHandshake, 
  ArrowRight,
  Globe2,
  Building2,
  Stethoscope
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#102d5c] via-[#0d2247] to-[#2e1022] border-2 border-blue-400/50 p-8 sm:p-12 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-blue-900/60 border border-blue-400/60 text-xs text-blue-200 font-bold">
            <Building2 className="w-3.5 h-3.5 text-blue-300" />
            <span>Pioneering Bionics & Human Rehabilitation Since 2014</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-heading">
            Engineering Freedom of Movement
          </h1>
          <p className="text-base text-blue-100 leading-relaxed">
            Bionix & Rehab Solutions was founded by a team of biomedical roboticists, orthopedic surgeons, and amputee athletes. We believe that receiving a prosthetic device is only the beginning—true independence requires mechanical excellence combined with comprehensive clinical therapies.
          </p>
        </div>
      </div>

      {/* Dual Mission Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Pillar 1: Hardware Engineering */}
        <div className="p-8 rounded-3xl bg-[#0e244d] border-2 border-blue-500/40 relative overflow-hidden space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-blue-600/30 border border-blue-400 flex items-center justify-center text-blue-300">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-white font-heading">1. Biomechanical Hardware Precision</h3>
          <p className="text-sm text-blue-100 leading-relaxed">
            Our aerospace titanium and carbon composite prosthetics feature multi-core microprocessors running predictive neural kinematics at 1,000Hz. Every socket is customized using high-precision optical 3D surface scanning to eliminate limb ulcerations and distribute pressure seamlessly.
          </p>
          <ul className="space-y-2 text-xs text-blue-200 pt-2">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Titanium Ti-6Al-4V chassis and dynamic carbon springs</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Sensory closed-loop vibrotactile feedback for bionic hands</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>IP68 waterproof certification on heavy-duty outdoor models</span>
            </li>
          </ul>
        </div>

        {/* Pillar 2: Clinical Rehabilitation */}
        <div className="p-8 rounded-3xl bg-[#0e244d] border-2 border-red-500/40 relative overflow-hidden space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-red-600/30 border border-red-400 flex items-center justify-center text-red-300">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-white font-heading">2. Multi-Disciplinary Rehabilitation</h3>
          <p className="text-sm text-blue-100 leading-relaxed">
            Technology is inert without neurological retraining. We run dedicated clinics for computerized gait retraining, speech and cognitive communication recovery, and trauma counseling for phantom limb pain.
          </p>
          <ul className="space-y-2 text-xs text-slate-300 pt-2">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Doctor of Physical Therapy (DPT) guided gait restoration</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Licensed Speech-Language Pathology for vocal and cognitive rehab</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>VR mirror therapy alleviating phantom limb syndrome</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Leadership & Clinical Board */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-1">
            Clinical Governance
          </div>
          <h2 className="text-3xl font-extrabold text-white font-heading">
            Our Medical Directors & Specialists
          </h2>
          <p className="text-xs text-slate-400 mt-2">
            Led by board-certified prosthetists, physical therapy doctors, and clinical psychologists.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              name: 'Dr. Marcus Vance, DPT, CPO',
              role: 'Director of Prosthetic Biomechanics',
              degrees: 'Doctor of Physical Therapy, Certified Prosthetist / Orthotist',
              image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
              exp: '16 Years Experience'
            },
            {
              name: 'Dr. Sarah Al-Mansoor, Ph.D.',
              role: 'Head of Psychological Counseling',
              degrees: 'Ph.D. in Clinical Rehabilitation Psychology',
              image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
              exp: '15 Years Experience'
            },
            {
              name: 'Elena Rostova, M.S., CCC-SLP',
              role: 'Speech & Cognitive Pathology Lead',
              degrees: 'Licensed Speech-Language Pathologist, ASHA',
              image: 'https://images.unsplash.com/photo-1594824813500-244f77a83416?auto=format&fit=crop&w=400&q=80',
              exp: '12 Years Experience'
            },
            {
              name: 'Julian Morales, Ph.D.',
              role: 'VP of Neural Hardware & R&D',
              degrees: 'Ph.D. in Biorobotics & Myoelectric Signal Processing',
              image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80',
              exp: '18 Years Experience'
            }
          ].map((leader, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#090e1c] border border-slate-800 text-center space-y-3"
            >
              <img
                src={leader.image}
                alt={leader.name}
                className="w-24 h-24 rounded-2xl object-cover mx-auto border-2 border-slate-700"
              />
              <div>
                <h4 className="font-bold text-white text-sm font-heading">{leader.name}</h4>
                <p className="text-xs text-red-400 font-medium mt-0.5">{leader.role}</p>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">{leader.degrees}</p>
              </div>
              <span className="inline-block text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-medium">
                {leader.exp}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Global Accreditations & Standards */}
      <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
        <h3 className="text-xl font-bold text-white font-heading text-center">
          Clinical Certifications & Global Quality Standards
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <ShieldCheck className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
            <div className="text-xs font-bold text-white">ISO 13485:2016</div>
            <div className="text-[10px] text-slate-400">Medical Device Quality Mgmt</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <Award className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <div className="text-xs font-bold text-white">FDA Cleared Partner</div>
            <div className="text-[10px] text-slate-400">Class II Bionic Prosthetics</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <Globe2 className="w-6 h-6 text-indigo-400 mx-auto mb-2" />
            <div className="text-xs font-bold text-white">CE Medical Mark</div>
            <div className="text-[10px] text-slate-400">European Conformity MDR</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <Stethoscope className="w-6 h-6 text-red-400 mx-auto mb-2" />
            <div className="text-xs font-bold text-white">ABC Accredited</div>
            <div className="text-[10px] text-slate-400">American Board for Certification</div>
          </div>
        </div>
      </div>

      {/* CTA Bottom */}
      <div className="text-center space-y-4">
        <h3 className="text-2xl font-bold text-white font-heading">
          Take the first step toward customized prosthetic mobility
        </h3>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => navigateTo('registration', { registrationType: 'legs' })}
            className="px-6 py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-red-600 to-rose-600 shadow-lg shadow-red-900/40"
          >
            Register as Leg Amputee
          </button>
          <button
            onClick={() => navigateTo('registration', { registrationType: 'hands' })}
            className="px-6 py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-900/40"
          >
            Register as Hand Amputee
          </button>
        </div>
      </div>

    </div>
  );
};
