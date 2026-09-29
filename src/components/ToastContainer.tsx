import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto p-4 rounded-xl shadow-2xl border backdrop-blur-xl transition-all duration-300 transform translate-y-0 ${
            toast.type === 'success'
              ? 'bg-[#0b1424]/95 border-emerald-500/50 text-white shadow-emerald-950/40'
              : toast.type === 'error'
              ? 'bg-[#180a0e]/95 border-red-500/50 text-white shadow-red-950/40'
              : 'bg-[#091224]/95 border-blue-500/50 text-white shadow-blue-950/40'
          }`}
        >
          <div className="flex items-start gap-3">
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />}

            <div className="flex-1">
              <div className="font-semibold text-sm">{toast.title}</div>
              <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{toast.message}</p>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
